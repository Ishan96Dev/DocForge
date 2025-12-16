"""
Sitemap-based crawler
"""

import aiohttp
import xml.etree.ElementTree as ET
from typing import AsyncIterator
import gzip

from app.crawler.base import BaseCrawler
from app.core.models import PageInfo


class SitemapCrawler(BaseCrawler):
    """Crawler that uses sitemap.xml files"""
    
    def __init__(self, config, user_agent: str):
        super().__init__(config, user_agent)
        self.max_recursion_depth = 3  # Prevent infinite recursion
    
    async def crawl(self, sitemap_url: str) -> AsyncIterator[PageInfo]:
        """
        Crawl URLs from sitemap
        
        Args:
            sitemap_url: URL of the sitemap.xml file
            
        Yields:
            PageInfo for each URL in the sitemap
        """
        print(f"[SitemapCrawler] Starting sitemap crawl: {sitemap_url}")
        print(f"[SitemapCrawler] Max URLs limit: {self.config.max_urls}")
        
        urls = await self._parse_sitemap(sitemap_url, depth=0)
        print(f"[SitemapCrawler] Found {len(urls)} URLs in sitemap (limited to {min(len(urls), self.config.max_urls)})")
        
        pages_yielded = 0
        total_urls = min(len(urls), self.config.max_urls)
        
        for i, url in enumerate(urls[:self.config.max_urls], 1):
            if not self.should_crawl(url):
                print(f"[SitemapCrawler] Skipping {url} - filtered by crawl rules")
                continue
            
            self.visited_urls.add(url)
            
            # Fetch page info
            print(f"[SitemapCrawler] Crawling ({i}/{total_urls}): {url}")
            page_info = await self._fetch_page_info(url)
            if page_info:
                pages_yielded += 1
                print(f"[SitemapCrawler] ✓ Successfully crawled page {pages_yielded}: {page_info.title or url}")
                yield page_info
        
        print(f"[SitemapCrawler] Crawl complete. Total pages: {pages_yielded}")
    
    async def _parse_sitemap(self, sitemap_url: str, depth: int = 0) -> list:
        """Parse sitemap and extract URLs"""
        urls = []
        
        # Prevent infinite recursion
        if depth > self.max_recursion_depth:
            print(f"[SitemapCrawler] Max recursion depth reached for {sitemap_url}")
            return urls
        
        try:
            print(f"[SitemapCrawler] Fetching sitemap (depth {depth}): {sitemap_url}")
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    sitemap_url,
                    headers={"User-Agent": self.user_agent},
                    timeout=aiohttp.ClientTimeout(total=30)  # Add 30 second timeout
                ) as response:
                    if response.status != 200:
                        print(f"[SitemapCrawler] Sitemap returned status {response.status}: {sitemap_url}")
                        return urls
                    
                    content = await response.read()
                    print(f"[SitemapCrawler] Downloaded {len(content):,} bytes from sitemap")
                    
                    # Handle gzipped sitemaps
                    if sitemap_url.endswith('.gz'):
                        content = gzip.decompress(content)
                    
                    # Parse XML
                    root = ET.fromstring(content)
                    namespaces = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
                    
                    # Check if it's a sitemap index
                    sitemaps = root.findall('.//ns:sitemap/ns:loc', namespaces)
                    if sitemaps:
                        print(f"[SitemapCrawler] Found {len(sitemaps)} child sitemaps in index")
                        # Limit number of child sitemaps to prevent hanging
                        max_child_sitemaps = 10
                        for idx, sitemap_elem in enumerate(sitemaps[:max_child_sitemaps], 1):
                            try:
                                print(f"[SitemapCrawler] Processing child sitemap {idx}/{min(len(sitemaps), max_child_sitemaps)}...")
                                child_urls = await self._parse_sitemap(sitemap_elem.text, depth + 1)
                                urls.extend(child_urls)
                                print(f"[SitemapCrawler] Collected {len(urls)} total URLs so far")
                                # Stop if we have enough URLs
                                if len(urls) >= self.config.max_urls:
                                    print(f"[SitemapCrawler] Reached max URLs limit: {self.config.max_urls}")
                                    break
                            except Exception as e:
                                print(f"[SitemapCrawler] Error parsing child sitemap {sitemap_elem.text}: {e}")
                                continue
                    else:
                        # Extract URLs from regular sitemap
                        url_elements = root.findall('.//ns:url/ns:loc', namespaces)
                        urls = [elem.text for elem in url_elements if elem.text]
                        print(f"[SitemapCrawler] Extracted {len(urls)} URLs from sitemap")
        
        except asyncio.TimeoutError:
            print(f"[SitemapCrawler] ✗ Timeout fetching sitemap {sitemap_url}")
        except Exception as e:
            print(f"[SitemapCrawler] ✗ Error parsing sitemap {sitemap_url}: {e}")
        
        return urls[:self.config.max_urls]  # Limit total URLs
    
    async def _fetch_page_info(self, url: str) -> PageInfo:
        """Fetch basic information about a page"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    url,
                    headers={"User-Agent": self.user_agent},
                    timeout=aiohttp.ClientTimeout(total=30)
                ) as response:
                    if response.status == 200:
                        content = await response.text()
                        
                        # Extract title
                        title = None
                        import re
                        title_match = re.search(r'<title[^>]*>([^<]+)</title>', content, re.IGNORECASE)
                        if title_match:
                            title = title_match.group(1).strip()
                        
                        # Check for images
                        has_images = '<img' in content.lower()
                        
                        # Estimate word count (rough)
                        from bs4 import BeautifulSoup
                        soup = BeautifulSoup(content, 'html.parser')
                        text = soup.get_text()
                        word_count = len(text.split())
                        
                        return PageInfo(
                            url=url,
                            title=title,
                            size=len(content),
                            has_images=has_images,
                            word_count=word_count,
                            status="success"
                        )
        except Exception as e:
            print(f"[SitemapCrawler] ✗ Error fetching page info for {url}: {e}")
            return PageInfo(
                url=url,
                title=None,
                size=0,
                has_images=False,
                status="failed"
            )
        
        return None
