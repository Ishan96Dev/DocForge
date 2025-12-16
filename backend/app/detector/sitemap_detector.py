"""
Sitemap and crawl strategy detector
Implements intelligent detection of sitemaps and best crawl strategy
"""

import aiohttp
import xml.etree.ElementTree as ET
from typing import Optional, Tuple, List
from urllib.parse import urljoin, urlparse
import re

from app.core.models import SitemapInfo, CrawlMode


class SitemapDetector:
    """Detects sitemaps and determines optimal crawl strategy"""
    
    COMMON_SITEMAP_PATHS = [
        "/sitemap.xml",
        "/sitemap_index.xml",
        "/sitemap/sitemap.xml",
        "/wp-sitemap.xml",
        "/sitemap1.xml",
    ]
    
    def __init__(self, user_agent: str, timeout: int = 30):
        self.user_agent = user_agent
        self.timeout = timeout
    
    async def detect(self, url: str) -> Tuple[CrawlMode, Optional[SitemapInfo]]:
        """
        Detect the best crawl strategy for a URL
        
        Returns:
            Tuple of (suggested_mode, sitemap_info)
        """
        domain = self._get_domain(url)
        
        # Step 1: Check robots.txt
        sitemap_from_robots = await self._check_robots_txt(domain)
        if sitemap_from_robots:
            sitemap_info = await self._validate_sitemap(sitemap_from_robots, "robots.txt")
            if sitemap_info and sitemap_info.valid:
                return CrawlMode.SITEMAP_URL, sitemap_info
        
        # Step 2: Try common sitemap locations
        for path in self.COMMON_SITEMAP_PATHS:
            sitemap_url = urljoin(domain, path)
            sitemap_info = await self._validate_sitemap(sitemap_url, "common_path")
            if sitemap_info and sitemap_info.valid:
                return CrawlMode.SITEMAP_URL, sitemap_info
        
        # Step 3: Check HTML for sitemap links
        sitemap_from_html = await self._check_html_for_sitemap(url)
        if sitemap_from_html:
            sitemap_info = await self._validate_sitemap(sitemap_from_html, "html_link")
            if sitemap_info and sitemap_info.valid:
                return CrawlMode.SITEMAP_URL, sitemap_info
        
        # Fallback: Suggest recursive crawl
        return CrawlMode.RECURSIVE, None
    
    async def _check_robots_txt(self, domain: str) -> Optional[str]:
        """Check robots.txt for sitemap declarations"""
        robots_url = urljoin(domain, "/robots.txt")
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    robots_url,
                    headers={"User-Agent": self.user_agent},
                    timeout=aiohttp.ClientTimeout(total=self.timeout)
                ) as response:
                    if response.status == 200:
                        content = await response.text()
                        # Parse robots.txt for Sitemap: directives
                        for line in content.split('\n'):
                            if line.lower().startswith('sitemap:'):
                                sitemap_url = line.split(':', 1)[1].strip()
                                return sitemap_url
        except Exception as e:
            print(f"Error checking robots.txt: {e}")
        
        return None
    
    async def _check_html_for_sitemap(self, url: str) -> Optional[str]:
        """Check HTML page for sitemap links"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    url,
                    headers={"User-Agent": self.user_agent},
                    timeout=aiohttp.ClientTimeout(total=self.timeout)
                ) as response:
                    if response.status == 200:
                        content = await response.text()
                        # Look for <link rel="sitemap"> tags
                        pattern = r'<link[^>]*rel=["\']sitemap["\'][^>]*href=["\']([^"\']+)["\']'
                        match = re.search(pattern, content, re.IGNORECASE)
                        if match:
                            return match.group(1)
        except Exception as e:
            print(f"Error checking HTML for sitemap: {e}")
        
        return None
    
    async def _validate_sitemap(self, sitemap_url: str, source: str) -> Optional[SitemapInfo]:
        """
        Validate a sitemap URL and extract information
        
        Args:
            sitemap_url: URL of the sitemap
            source: Where the sitemap was found (robots.txt, common_path, html_link)
        """
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    sitemap_url,
                    headers={"User-Agent": self.user_agent},
                    timeout=aiohttp.ClientTimeout(total=self.timeout)
                ) as response:
                    if response.status != 200:
                        return None
                    
                    content = await response.read()
                    
                    # Handle gzipped sitemaps
                    if sitemap_url.endswith('.gz'):
                        import gzip
                        content = gzip.decompress(content)
                    
                    # Parse XML
                    try:
                        root = ET.fromstring(content)
                        
                        # Count URLs
                        # Handle both regular sitemaps and sitemap indexes
                        namespaces = {
                            'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'
                        }
                        
                        urls = root.findall('.//ns:url', namespaces)
                        sitemaps = root.findall('.//ns:sitemap', namespaces)
                        
                        url_count = len(urls)
                        
                        # If it's a sitemap index, we need to count recursively
                        # For now, just note it has sitemaps
                        if sitemaps:
                            url_count = len(sitemaps) * 50  # Estimate
                        
                        if url_count > 0:
                            return SitemapInfo(
                                url=sitemap_url,
                                url_count=url_count,
                                valid=True,
                                source=source
                            )
                    
                    except ET.ParseError as e:
                        print(f"XML parse error for {sitemap_url}: {e}")
                        return None
        
        except Exception as e:
            print(f"Error validating sitemap {sitemap_url}: {e}")
        
        return None
    
    def _get_domain(self, url: str) -> str:
        """Extract domain from URL"""
        parsed = urlparse(url)
        return f"{parsed.scheme}://{parsed.netloc}"
