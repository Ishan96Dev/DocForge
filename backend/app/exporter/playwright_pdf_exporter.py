"""
PDF exporter using Playwright (no GTK required!)
"""

from playwright.sync_api import sync_playwright
from typing import List, Dict
import os
from datetime import datetime
import asyncio
from concurrent.futures import ThreadPoolExecutor


class PlaywrightPDFExporter:
    """Export content to PDF using Playwright"""
    
    def __init__(self, output_dir: str, job_storage=None, job_id=None):
        self.output_dir = output_dir
        self.job_storage = job_storage
        self.job_id = job_id
        os.makedirs(output_dir, exist_ok=True)
    
    async def export(
        self,
        pages: List[Dict],
        output_filename: str,
        include_toc: bool = True,
        include_cover: bool = True,
        custom_title: str = None
    ) -> str:
        """
        Export pages to PDF using Playwright (sync in thread for Windows compatibility)
        
        Args:
            pages: List of page dicts with 'title', 'html', 'url', 'metadata'
            output_filename: Output PDF filename
            include_toc: Include table of contents
            include_cover: Include cover page
            custom_title: Custom document title
            
        Returns:
            Path to generated PDF
        """
        total_pages = len(pages)
        self._log(f"Starting PDF generation for {total_pages} pages...")
        self._update_progress(80, f"Preparing PDF document with {total_pages} pages")
        
        # Build complete HTML document
        self._log("Building HTML document...")
        html_content = self._build_html(
            pages,
            include_toc=include_toc,
            include_cover=include_cover,
            custom_title=custom_title
        )
        
        output_path = os.path.join(self.output_dir, output_filename)
        self._log(f"Output file: {output_filename}")
        self._log(f"HTML content size: {len(html_content):,} bytes")
        print(f"PlaywrightPDFExporter: Building PDF at {output_path}")
        print(f"PlaywrightPDFExporter: HTML content length: {len(html_content)}")
        
        self._update_progress(85, "Initializing PDF renderer...")
        self._log("Launching PDF renderer engine...")
        
        # Run sync Playwright in thread pool for Windows compatibility
        loop = asyncio.get_event_loop()
        with ThreadPoolExecutor(max_workers=1) as executor:
            await loop.run_in_executor(
                executor,
                self._generate_pdf_sync,
                html_content,
                output_path
            )
        
        self._update_progress(98, "Finalizing PDF...")
        self._log(f"✓ PDF generated successfully: {output_filename}")
        
        return output_path
    
    def _generate_pdf_sync(self, html_content: str, output_path: str):
        """Generate PDF synchronously in thread"""
        try:
            print("PlaywrightPDFExporter: Starting sync Playwright in thread...")
            self._log("Initializing browser engine...")
            
            with sync_playwright() as p:
                print("PlaywrightPDFExporter: Launching browser...")
                self._log("Launching headless browser...")
                browser = p.chromium.launch(
                    args=['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
                )
                page = browser.new_page()
                page.set_viewport_size({'width': 1200, 'height': 1600})
                page.emulate_media(media='print')
                
                print("PlaywrightPDFExporter: Setting content...")
                self._log("Loading HTML content into browser...")
                self._update_progress(87, "Loading content...")
                page.set_content(html_content, wait_until='load')
                
                # Wait additional time for images to load
                import time
                time.sleep(3)
                
                # Try to wait for network to be idle
                try:
                    page.wait_for_load_state('networkidle', timeout=5000)
                except:
                    pass
                
                print("PlaywrightPDFExporter: Generating PDF...")
                self._log("Rendering pages to PDF format...")
                self._update_progress(90, "Rendering PDF pages...")
                page.pdf(
                    path=output_path,
                    format='A4',
                    print_background=True,
                    margin={
                        'top': '10mm',
                        'right': '10mm',
                        'bottom': '10mm',
                        'left': '10mm'
                    },
                    display_header_footer=False
                )
                
                print("PlaywrightPDFExporter: Closing browser...")
                self._log("Cleaning up browser resources...")
                self._update_progress(95, "Finalizing document...")
                browser.close()
                print(f"PlaywrightPDFExporter: PDF created successfully at {output_path}")
                self._log("✓ PDF generation completed successfully!")
        except Exception as e:
            print(f"PlaywrightPDFExporter ERROR: {e}")
            self._log(f"✗ PDF generation error: {str(e)}")
            import traceback
            print(f"PlaywrightPDFExporter traceback: {traceback.format_exc()}")
            raise
    
    def _build_html(
        self,
        pages: List[Dict],
        include_toc: bool = True,
        include_cover: bool = True,
        custom_title: str = None
    ) -> str:
        """Build complete HTML document from pages"""
        
        # Get title from first page or use custom
        doc_title = custom_title or (pages[0].get('title') if pages else 'Document')
        
        html_parts = ['<!DOCTYPE html><html><head>']
        html_parts.append('<meta charset="UTF-8">')
        html_parts.append(f'<title>{doc_title}</title>')
        html_parts.append('<style>')
        html_parts.append(self._get_pdf_styles())
        html_parts.append('</style>')
        html_parts.append('</head><body>')
        
        # Cover page
        if include_cover:
            html_parts.append(self._build_cover_page(doc_title, pages))
        
        # Table of contents
        if include_toc and len(pages) > 1:
            html_parts.append(self._build_toc(pages))
        
        # Content pages
        for i, page in enumerate(pages):
            html_parts.append(f'<div class="page-content" id="page-{i+1}">')
            html_parts.append(f'<h1 class="page-title">{page.get("title", f"Page {i+1}")}</h1>')
            html_parts.append(page.get('html', ''))
            html_parts.append('</div>')
            
            # Page break between pages (except last)
            if i < len(pages) - 1:
                html_parts.append('<div style="page-break-after: always;"></div>')
        
        html_parts.append('</body></html>')
        
        return ''.join(html_parts)
    
    def _build_cover_page(self, title: str, pages: List[Dict]) -> str:
        """Build cover page with enhanced professional styling"""
        now = datetime.now().strftime('%B %d, %Y at %I:%M %p')
        
        return f'''
        <div class="cover-page">
            <div class="cover-content">
                <div class="cover-icon">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 2V8H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 13L8 15L10 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 13L16 15L14 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h1 class="cover-title">{title}</h1>
                <div class="cover-divider"></div>
                <p class="cover-meta"><strong>{len(pages)}</strong> pages</p>
                <p class="cover-date">Generated on {now}</p>
                <p class="cover-footer">Created with <strong>DocForge</strong><br/><span style="font-size: 0.85em; opacity: 0.85;">Intelligent Web Crawler</span></p>
            </div>
        </div>
        '''
    
    def _build_toc(self, pages: List[Dict]) -> str:
        """Build table of contents"""
        toc_items = []
        
        for i, page in enumerate(pages):
            title = page.get('title', f'Page {i+1}')
            toc_items.append(f'<li><a href="#page-{i+1}">{title}</a></li>')
        
        toc_html = '''
        <div style="page-break-before: always;"></div>
        <div class="toc-page">
            <h1 class="toc-title">Table of Contents</h1>
            <ul class="toc-list">
        '''
        toc_html += '\n'.join(toc_items)
        toc_html += '''
            </ul>
        </div>
        <div style="page-break-after: always;"></div>
        '''
        
        return toc_html
    
    def _log(self, message: str):
        """Add log message if job_storage is available"""
        if self.job_storage and self.job_id:
            self.job_storage.add_log(self.job_id, message)
        print(f"[PDF Export] {message}")
    
    def _update_progress(self, progress: float, step: str = None):
        """Update job progress if job_storage is available"""
        if self.job_storage and self.job_id:
            update_data = {"progress": progress}
            if step:
                update_data["current_step"] = step
            self.job_storage.update_job(self.job_id, **update_data)
    
    def _get_pdf_styles(self) -> str:
        """Get CSS styles for PDF"""
        return '''
        @page {
            margin: 15mm;
        }
        
        * {
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            line-height: 1.8;
            color: #333;
            font-size: 12pt;
            margin: 0;
            padding: 0;
        }
        
        /* Cover page */
        .cover-page {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            position: relative;
        }
        
        .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%);
        }
        
        .cover-content {
            position: relative;
            z-index: 1;
            padding: 20px;
        }
        
        .cover-icon {
            margin: 0 auto 30px;
            width: 80px;
            height: 80px;
            animation: fadeIn 0.6s ease-out;
        }
        
        .cover-title {
            font-size: 52pt;
            font-weight: 800;
            margin-bottom: 20px;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
            letter-spacing: -1px;
            line-height: 1.2;
        }
        
        .cover-divider {
            width: 100px;
            height: 4px;
            background: white;
            margin: 25px auto;
            border-radius: 2px;
            opacity: 0.9;
        }
        
        .cover-meta {
            font-size: 20pt;
            margin: 15px 0;
            opacity: 0.95;
            font-weight: 300;
        }
        
        .cover-date {
            font-size: 14pt;
            margin: 12px 0;
            opacity: 0.85;
            font-weight: 300;
        }
        
        .cover-footer {
            margin-top: 40px;
            font-size: 13pt;
            opacity: 0.75;
            font-weight: 300;
            line-height: 1.6;
        }
        
        /* Table of contents */
        .toc-page {
            padding: 40px 50px;
        }
        
        .toc-title {
            font-size: 36pt;
            margin-bottom: 35px;
            color: #667eea;
            border-bottom: 4px solid #667eea;
            padding-bottom: 15px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }
        
        .toc-list {
            list-style: none;
            padding: 0;
        }
        
        .toc-list li {
            margin: 15px 0;
            font-size: 14pt;
        }
        
        .toc-list a {
            color: #333;
            text-decoration: none;
            display: block;
            padding: 10px;
            border-left: 4px solid #667eea;
            padding-left: 20px;
            transition: all 0.3s;
        }
        
        .toc-list a:hover {
            background: #f0f0f0;
            border-left-width: 8px;
        }
        
        /* Content pages */
        .page-content {
            padding: 30px 40px;
            max-width: 100%;
            margin: 0 auto;
        }
        
        .page-title {
            font-size: 28pt;
            margin-bottom: 20px;
            color: #667eea;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 10px;
        }
        
        h1 { font-size: 24pt; margin: 25px 0 15px; color: #444; line-height: 1.4; }
        h2 { font-size: 20pt; margin: 22px 0 12px; color: #555; line-height: 1.4; }
        h3 { font-size: 16pt; margin: 20px 0 10px; color: #666; line-height: 1.4; }
        
        p {
            margin: 15px 0;
            text-align: justify;
            line-height: 1.8;
        }
        
        /* Links styling */
        a {
            color: #2563eb;
            text-decoration: underline;
            word-break: break-all;
        }
        
        a:hover {
            color: #1d4ed8;
        }
        
        img {
            max-width: 90%;
            height: auto;
            display: block;
            margin: 25px auto;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-radius: 4px;
            page-break-inside: avoid;
        }
        
        /* Handle broken images */
        img[src=""], img:not([src]) {
            display: none;
        }
        
        code {
            background: #f5f5f5;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 10pt;
        }
        
        pre {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            margin: 15px 0;
        }
        
        pre code {
            background: none;
            padding: 0;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
            page-break-inside: avoid;
        }
        
        th, td {
            border: 1px solid #ddd;
            padding: 12px 15px;
            text-align: left;
            line-height: 1.6;
        }
        
        th {
            background: #667eea;
            color: white;
            font-weight: 600;
        }
        
        tr:nth-child(even) {
            background: #f9f9f9;
        }
        
        a {
            color: #667eea;
            text-decoration: underline;
            word-wrap: break-word;
        }
        
        a:hover {
            color: #5568d3;
        }
        
        blockquote {
            border-left: 4px solid #667eea;
            padding-left: 20px;
            margin: 20px 0;
            color: #666;
            font-style: italic;
        }
        
        ul, ol {
            margin: 10px 0 10px 30px;
        }
        
        li {
            margin: 5px 0;
        }
        '''
