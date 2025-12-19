"""
Content renderer - extracts and cleans content from HTML
"""

from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from typing import Dict, List
import re
import asyncio
from concurrent.futures import ThreadPoolExecutor
import urllib3

# Suppress SSL warnings when downloading images
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


class ContentRenderer:
    """Renders and cleans HTML content using sync Playwright in thread pool"""
    
    def __init__(self):
        self.playwright = None
        self.browser = None
        self.executor = ThreadPoolExecutor(max_workers=1)
    
    async def __aenter__(self):
        """Async context manager entry - runs sync Playwright in thread"""
        try:
            print("[ContentRenderer] Starting Playwright in thread pool (Windows-compatible)")
            # Run sync Playwright setup in a thread to avoid Windows event loop issues
            loop = asyncio.get_event_loop()
            await loop.run_in_executor(self.executor, self._setup_browser)
            print("[ContentRenderer] Browser launched successfully")
            return self
        except Exception as e:
            print(f"[ContentRenderer] ERROR in __aenter__: {e}")
            print(f"[ContentRenderer] Exception type: {type(e).__name__}")
            import traceback
            traceback.print_exc()
            raise
    
    def _setup_browser(self):
        """Setup browser in thread (sync)"""
        self.playwright = sync_playwright().start()
        self.browser = self.playwright.chromium.launch(headless=True)
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit"""
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(self.executor, self._cleanup_browser)
        self.executor.shutdown(wait=True)
    
    def _cleanup_browser(self):
        """Cleanup browser in thread (sync)"""
        if self.browser:
            self.browser.close()
        if self.playwright:
            self.playwright.stop()
    
    async def render_page(self, url: str, include_images: bool = True) -> Dict:
        """
        Render page with JavaScript and extract clean content
        
        Args:
            url: URL to render
            include_images: Whether to include images
            
        Returns:
            Dict with title, content, images, metadata
        """
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(
            self.executor, 
            self._render_page_sync, 
            url, 
            include_images
        )
    
    def _render_page_sync(self, url: str, include_images: bool = True) -> Dict:
        """Synchronous page rendering in thread"""
        page = self.browser.new_page()
        
        try:
            page.goto(url, wait_until='networkidle', timeout=30000)
            
            # Wait for images to load
            try:
                page.wait_for_load_state('load', timeout=5000)
            except:
                pass
            
            # Get rendered HTML
            content = page.content()
            
            # Extract main content
            soup = BeautifulSoup(content, 'html.parser')
            
            # Remove unwanted elements
            for element in soup.find_all(['script', 'style', 'nav', 'footer', 'header', 'iframe', 'noscript']):
                element.decompose()
            
            # Extract title
            title = soup.title.string if soup.title else page.title()
            
            # Find main content area (heuristic)
            main_content = self._extract_main_content(soup)
            
            # Process images - make URLs absolute
            if include_images:
                self._process_images(main_content, url)
            
            # Process links - ensure they're clickable
            self._process_links(main_content, url)
            
            # Extract images list
            images = []
            if include_images:
                images = self._extract_images_sync(main_content, url)
            
            # Extract metadata
            metadata = {
                'title': title,
                'url': url,
                'description': self._get_meta_description(soup)
            }
            
            return {
                'title': title,
                'html': str(main_content),
                'text': main_content.get_text(separator='\n', strip=True),
                'images': images,
                'metadata': metadata
            }
        
        finally:
            page.close()
    
    def _extract_main_content(self, soup: BeautifulSoup):
        """Extract main content using heuristics"""
        # Try common content selectors
        selectors = [
            'main',
            'article',
            '.content',
            '#content',
            '.main-content',
            '.post-content',
            '.entry-content',
            '[role="main"]'
        ]
        
        for selector in selectors:
            element = soup.select_one(selector)
            if element:
                return element
        
        # Fallback: find largest text block
        body = soup.body
        if body:
            return body
        
        return soup
    
    def _process_images(self, soup: BeautifulSoup, base_url: str):
        """Process images to convert to base64 data URIs for PDF embedding"""
        from urllib.parse import urljoin
        import requests
        import base64
        from io import BytesIO
        from PIL import Image
        
        total_images = len(soup.find_all('img'))
        processed = 0
        
        print(f"[ContentRenderer] Processing {total_images} images for PDF embedding...")
        
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if not src:
                continue
                
            try:
                # Check if it's already a data URI (base64 encoded)
                if src.startswith('data:image'):
                    print(f"[ContentRenderer] Image already embedded as data URI, skipping download...")
                    processed += 1
                    
                    # Ensure alt text exists
                    if not img.get('alt'):
                        img['alt'] = 'Image'
                    
                    # Add styling
                    img['style'] = 'max-width: 100%; height: auto; display: block; margin: 10px 0;'
                    continue
                
                # Convert to absolute URL
                absolute_src = urljoin(base_url, src)
                print(f"[ContentRenderer] Downloading image: {absolute_src[:80]}...")
                
                # Download and convert to base64
                response = requests.get(absolute_src, timeout=15, headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8'
                }, verify=False)
                
                if response.status_code == 200:
                    # Get image content
                    img_content = response.content
                    content_type = response.headers.get('Content-Type', 'image/png')
                    
                    # Optimize image size for PDF
                    try:
                        pil_img = Image.open(BytesIO(img_content))
                        
                        # Resize if too large (max width 800px)
                        if pil_img.width > 800:
                            ratio = 800 / pil_img.width
                            new_size = (800, int(pil_img.height * ratio))
                            pil_img = pil_img.resize(new_size, Image.Resampling.LANCZOS)
                        
                        # Convert to RGB if needed
                        if pil_img.mode in ('RGBA', 'LA', 'P'):
                            background = Image.new('RGB', pil_img.size, (255, 255, 255))
                            if pil_img.mode == 'P':
                                pil_img = pil_img.convert('RGBA')
                            background.paste(pil_img, mask=pil_img.split()[-1] if pil_img.mode in ('RGBA', 'LA') else None)
                            pil_img = background
                        
                        # Save optimized image
                        buffer = BytesIO()
                        pil_img.save(buffer, format='JPEG', quality=85, optimize=True)
                        img_content = buffer.getvalue()
                        content_type = 'image/jpeg'
                    except Exception as e:
                        print(f"[ContentRenderer] Image optimization failed for {absolute_src[:50]}: {e}")
                    
                    # Convert to base64
                    base64_img = base64.b64encode(img_content).decode('utf-8')
                    data_uri = f"data:{content_type};base64,{base64_img}"
                    
                    # Set as src
                    img['src'] = data_uri
                    processed += 1
                    print(f"[ContentRenderer] ✓ Image embedded successfully ({len(base64_img)} chars, {processed}/{total_images})")
                    
                    # Ensure alt text exists
                    if not img.get('alt'):
                        img['alt'] = 'Image'
                    
                    # Add styling
                    img['style'] = 'max-width: 100%; height: auto; display: block; margin: 10px 0;'
                    
                else:
                    print(f"[ContentRenderer] ✗ Failed to download image: {absolute_src[:60]} (Status: {response.status_code})")
                    # Remove image if download failed
                    img.decompose()
                    
            except Exception as e:
                print(f"[ContentRenderer] ✗ Error processing image {src[:60]}: {str(e)[:100]}")
                # Remove image if processing failed
                img.decompose()
                
            # Remove lazy loading attributes
            if img.parent:  # Check if img still exists
                img.attrs.pop('loading', None)
                img.attrs.pop('data-src', None)
        
        print(f"[ContentRenderer] Image processing complete: {processed}/{total_images} successfully embedded")
    
    def _process_links(self, soup: BeautifulSoup, base_url: str):
        """Process links to make URLs absolute and ensure they're clickable"""
        from urllib.parse import urljoin
        
        for link in soup.find_all('a'):
            href = link.get('href', '')
            if href:
                # Convert to absolute URL
                absolute_href = urljoin(base_url, href)
                link['href'] = absolute_href
                
                # Add styling to make links visually distinct
                link['style'] = 'color: #2563eb; text-decoration: underline; word-break: break-all;'
                
                # Ensure link has content or href as text
                if not link.get_text(strip=True):
                    link.string = absolute_href
    
    def _extract_images_sync(self, soup: BeautifulSoup, base_url: str) -> List[Dict]:
        """Extract image information (sync version)"""
        images = []
        
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if not src:
                continue
            
            # Make absolute URL
            from urllib.parse import urljoin
            absolute_src = urljoin(base_url, src)
            
            images.append({
                'src': absolute_src,
                'alt': img.get('alt', ''),
                'title': img.get('title', '')
            })
        
        return images
    
    def _get_meta_description(self, soup: BeautifulSoup) -> str:
        """Extract meta description"""
        meta = soup.find('meta', attrs={'name': 'description'})
        if meta:
            return meta.get('content', '')
        
        meta = soup.find('meta', attrs={'property': 'og:description'})
        if meta:
            return meta.get('content', '')
        
        return ''
