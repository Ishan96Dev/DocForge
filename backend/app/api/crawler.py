"""
Crawler API endpoints
"""

from fastapi import APIRouter, HTTPException
from app.core.models import (
    CrawlRequest, CrawlResponse, JobStatusResponse,
    CrawlStatus, CrawlMode
)
from app.core.storage import job_storage
from app.core.config import settings
from app.crawler import SitemapCrawler, RecursiveCrawler, SinglePageCrawler
from app.renderer import ContentRenderer
from app.exporter import PDFExporter
from app.exporter.playwright_pdf_exporter import PlaywrightPDFExporter
import asyncio
import os

router = APIRouter()


async def process_crawl_job(job_id: str, request: CrawlRequest):
    """Background task to process crawl job"""
    # Fix Windows event loop policy for subprocess support
    import sys
    import asyncio
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
    
    # Write to log file since print doesn't work in background tasks
    sys.stdout.flush()
    with open('crawl_debug.log', 'a', encoding='utf-8') as f:
        f.write(f"\n{'='*60}\n>>> TASK STARTED: Job {job_id}\n{'='*60}\n")
    try:
        with open('crawl_debug.log', 'a', encoding='utf-8') as f:
            f.write(">>> Step 1: Updating status to ANALYZING\n")
        # Update status
        job_storage.update_job(
            job_id,
            status=CrawlStatus.ANALYZING,
            current_step="Analyzing URL"
        )
        job_storage.add_log(job_id, f"Starting analysis of {request.url}")
        with open('crawl_debug.log', 'a', encoding='utf-8') as f:
            f.write(">>> Step 1: DONE\n")
        
        # Select crawler
        crawler = None
        start_url = str(request.url)
        
        if request.mode == CrawlMode.SITEMAP_URL and request.sitemap_url:
            crawler = SitemapCrawler(request.config, settings.USER_AGENT)
            start_url = request.sitemap_url
        elif request.mode == CrawlMode.RECURSIVE:
            crawler = RecursiveCrawler(request.config, settings.USER_AGENT)
        elif request.mode == CrawlMode.SINGLE_PAGE:
            crawler = SinglePageCrawler(request.config, settings.USER_AGENT)
        else:
            # Auto mode - detect
            from app.detector import SitemapDetector
            detector = SitemapDetector(settings.USER_AGENT, settings.REQUEST_TIMEOUT)
            suggested_mode, sitemap_info = await detector.detect(start_url)
            
            if suggested_mode == CrawlMode.SITEMAP_URL and sitemap_info:
                crawler = SitemapCrawler(request.config, settings.USER_AGENT)
                start_url = sitemap_info.url
            else:
                crawler = RecursiveCrawler(request.config, settings.USER_AGENT)
        
        # Log strategy
        strategy_name = request.mode.value if hasattr(request.mode, 'value') else str(request.mode)
        if request.mode == CrawlMode.SINGLE_PAGE:
            job_storage.add_log(job_id, f"Using {strategy_name} strategy - capturing this page only")
        else:
            job_storage.add_log(job_id, f"Using {strategy_name} strategy")
        
        # Update status
        job_storage.update_job(
            job_id,
            status=CrawlStatus.CRAWLING,
            current_step="Crawling pages"
        )
        job_storage.add_log(job_id, "Starting page crawl...")
        
        # Crawl pages with error handling
        pages_data = []
        with open('crawl_debug.log', 'a', encoding='utf-8') as f:
            f.write(f">>> Step 2: Starting crawl of {start_url}\n")
        
        try:
            async for page_info in crawler.crawl(start_url):
                job_storage.add_page(job_id, page_info)
                pages_data.append(page_info)
                job_storage.add_log(job_id, f"Found: {page_info.title or page_info.url}")
                with open('crawl_debug.log', 'a', encoding='utf-8') as f:
                    f.write(f">>> Step 2: Found page {len(pages_data)}\n")
                
                # Update progress and pages found
                progress = (len(pages_data) / request.config.max_urls) * 50  # 0-50% for crawling
                job_storage.update_job(
                    job_id,
                    progress=progress,
                    pages_found=len(pages_data)
                )
                
                # Stop if we hit max URLs
                if len(pages_data) >= request.config.max_urls:
                    break
        except Exception as e:
            job_storage.add_log(job_id, f"⚠ Crawl error: {str(e)}. Found {len(pages_data)} pages so far.")
            print(f"Error during crawl: {e}")
        
        # If no pages found, fall back to single page
        if not pages_data:
            job_storage.add_log(job_id, "No pages found. Trying single page mode...")
            single_crawler = SinglePageCrawler(request.config, settings.USER_AGENT)
            try:
                async for page_info in single_crawler.crawl(str(request.url)):
                    job_storage.add_page(job_id, page_info)
                    pages_data.append(page_info)
                    job_storage.add_log(job_id, f"Found: {page_info.title or page_info.url}")
                    job_storage.update_job(job_id, pages_found=len(pages_data))
            except Exception as e:
                job_storage.add_log(job_id, f"✗ Single page crawl also failed: {str(e)}")
        
        # Update status
        with open('crawl_debug.log', 'a', encoding='utf-8') as f:
            f.write(f">>> Step 3: Moving to PROCESSING status, pages found: {len(pages_data)}\n")
        job_storage.update_job(
            job_id,
            status=CrawlStatus.PROCESSING,
            current_step="Processing content"
        )
        job_storage.add_log(job_id, f"Processing {len(pages_data)} pages...")
        with open('crawl_debug.log', 'a', encoding='utf-8') as f:
            f.write(">>> Step 4: About to start rendering\n")
        
        # Render pages with Playwright
        rendered_pages = []
        try:
            with open('crawl_debug.log', 'a', encoding='utf-8') as f:
                f.write(f"DEBUG: Creating ContentRenderer for job {job_id}\n")
            job_storage.add_log(job_id, "Initializing page renderer...")
            print(f"[DEBUG] About to create ContentRenderer async context")
            job_storage.add_log(job_id, "[DEBUG] Creating ContentRenderer object...")
            try:
                renderer_context = ContentRenderer()
                job_storage.add_log(job_id, "[DEBUG] ContentRenderer object created, entering context...")
                async with renderer_context as renderer:
                    with open('crawl_debug.log', 'a', encoding='utf-8') as f:
                        f.write("ContentRenderer created successfully\n")
                    job_storage.add_log(job_id, "Renderer ready")
                    print(f"[DEBUG] ContentRenderer ready, processing {len(pages_data)} pages")
                    for i, page in enumerate(pages_data):
                        try:
                            job_storage.add_log(job_id, f"Rendering: {page.title or page.url}")
                            print(f"About to render page: {page.url}")
                            rendered = await renderer.render_page(
                                page.url,
                                include_images=request.config.include_images
                            )
                            print(f"Page rendered successfully: {page.url}")
                            rendered_pages.append(rendered)
                            
                            # Update progress (50-80%)
                            progress = 50 + (i / len(pages_data)) * 30
                            job_storage.update_job(
                                job_id,
                                progress=progress,
                                pages_processed=i + 1
                            )
                            job_storage.add_log(job_id, f"Rendered page {i + 1}/{len(pages_data)}")
                        except Exception as e:
                            import traceback
                            error_trace = traceback.format_exc()
                            error_msg = f"Failed to render page: {str(e)[:200]}"
                            job_storage.add_log(job_id, f"ERROR: {error_msg}")
                            print(f">>> ERROR rendering page {page.url}: {e}")
                            print(f"Full traceback:\n{error_trace}")
                            # Re-raise to stop processing on error
                            raise
            except Exception as e:
                job_storage.add_log(job_id, f"[DEBUG] ERROR creating/entering ContentRenderer: {type(e).__name__}: {str(e)}")
                raise
            print(f">>> Step 5: Rendering complete! {len(rendered_pages)} pages rendered")
        except Exception as e:
            import traceback
            error_trace = traceback.format_exc()
            error_msg = f"Rendering failed: {str(e)[:200]}"
            job_storage.add_log(job_id, f"✗ {error_msg}")
            print(f"Fatal error creating/using ContentRenderer: {e}")
            print(f"Full traceback:\n{error_trace}")
            raise
        
        # Update status
        print(f">>> Step 6: Moving to GENERATING status")
        job_storage.update_job(
            job_id,
            status=CrawlStatus.GENERATING,
            current_step="Generating document"
        )
        job_storage.add_log(job_id, "Generating document...")
        
        # Export to PDF using Playwright (no GTK needed!)
        from datetime import datetime
        import re
        pdf_path = None
        try:
            print(f">>> Step 7: Starting PDF export, {len(rendered_pages)} pages")
            
            # Generate meaningful filename from title or URL
            if rendered_pages and rendered_pages[0].get('title'):
                # Use the first page title
                filename_base = rendered_pages[0]['title']
            else:
                # Fallback to URL
                filename_base = str(request.url).split('//')[-1].split('/')[0]
            
            # Sanitize filename: remove invalid characters
            filename_base = re.sub(r'[<>:"/\\|?*]', '', filename_base)
            filename_base = filename_base.strip()
            # Limit length
            if len(filename_base) > 100:
                filename_base = filename_base[:100]
            # Fallback if empty
            if not filename_base:
                filename_base = f"document_{job_id[:8]}"
            
            pdf_filename = f"{filename_base}.pdf"
            # Create a clean download filename
            download_filename = f"docforge-{filename_base}.pdf"
            job_storage.add_log(job_id, f"Exporting as: {pdf_filename}")
            
            # Use Playwright PDF exporter - works on all platforms without dependencies
            exporter = PlaywrightPDFExporter(settings.EXPORT_DIR, job_storage=job_storage, job_id=job_id)
            print(f"Exporter created, calling export with filename: {pdf_filename}")
            pdf_path = await exporter.export(
                rendered_pages,
                pdf_filename,
                include_toc=True,
                include_cover=True
            )
            print(f"PDF export successful: {pdf_path}")
            job_storage.add_log(job_id, "✓ PDF document ready for download!")
            
            # Store the download filename for later use
            job_storage.update_job(job_id, result_filename=download_filename)
        except Exception as e:
            # If Playwright PDF fails, save as HTML
            import traceback
            print(f"PDF export error: {e}")
            print(f"Traceback: {traceback.format_exc()}")
            job_storage.add_log(job_id, f"PDF export failed: {str(e)}")
            job_storage.add_log(job_id, "Saving as HTML instead...")
            
            # Save rendered pages as HTML
            html_output_dir = os.path.join(settings.EXPORT_DIR, job_id)
            os.makedirs(html_output_dir, exist_ok=True)
            
            for i, page in enumerate(rendered_pages):
                page_file = os.path.join(html_output_dir, f"page_{i+1}.html")
                with open(page_file, 'w', encoding='utf-8') as f:
                    f.write(page.get('html', ''))
            
            # Create index file
            index_file = os.path.join(html_output_dir, 'index.html')
            with open(index_file, 'w', encoding='utf-8') as f:
                f.write('<html><body><h1>Pages</h1><ul>')
                for i, page in enumerate(rendered_pages):
                    title = page.get('title', f'Page {i+1}')
                    f.write(f'<li><a href="page_{i+1}.html">{title}</a></li>')
                f.write('</ul></body></html>')
            
            pdf_path = html_output_dir
            # Create meaningful download filename for HTML export
            html_download_filename = f"docforge-{filename_base}.zip"
            job_storage.update_job(job_id, result_filename=html_download_filename)
            job_storage.add_log(job_id, f"SUCCESS: HTML export complete! ({len(rendered_pages)} pages)")
        
        # Complete
        print(f">>> Step 8: Job complete!")
        job_storage.update_job(
            job_id,
            status=CrawlStatus.COMPLETED,
            current_step="Complete",
            progress=100.0,
            completed_at=datetime.now().isoformat(),
            result_file=pdf_path
        )
    
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error processing job {job_id}: {e}")
        print(f"Full traceback:\n{error_details}")
        from datetime import datetime
        
        # Extract the most useful error message
        error_msg = str(e) if str(e) else type(e).__name__
        if len(error_msg) > 300:
            error_msg = error_msg[:300] + "..."
        
        # Add multiple log entries for better visibility
        job_storage.add_log(job_id, f"✗ Job failed: {error_msg}")
        
        # Try to extract the root cause from traceback
        tb_lines = error_details.split('\n')
        relevant_lines = [line for line in tb_lines if 'File' in line or 'Error' in line or 'Exception' in line]
        if relevant_lines:
            job_storage.add_log(job_id, f"Details: {relevant_lines[-1][:200]}")
        
        job_storage.update_job(
            job_id,
            status=CrawlStatus.FAILED,
            error=error_msg,
            completed_at=datetime.now().isoformat()
        )


@router.post("/crawl", response_model=CrawlResponse)
async def start_crawl(request: CrawlRequest):
    """
    Start a crawl job
    """
    try:
        # Create job
        job_id = job_storage.create_job(str(request.url))
        
        # Start background task using asyncio.create_task instead of FastAPI BackgroundTasks
        # This ensures we have proper event loop support for subprocesses
        asyncio.create_task(process_crawl_job(job_id, request))
        
        return CrawlResponse(
            job_id=job_id,
            status=CrawlStatus.PENDING,
            message="Crawl job started"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start crawl: {str(e)}")


@router.get("/job/{job_id}", response_model=JobStatusResponse)
async def get_job_status(job_id: str):
    """
    Get job status
    """
    job = job_storage.get_job(job_id)
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return JobStatusResponse(**job)

