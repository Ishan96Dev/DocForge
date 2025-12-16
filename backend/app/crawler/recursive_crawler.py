"""
Recursive web crawler
"""

import aiohttp
from typing import AsyncIterator, Set
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import asyncio

from app.crawler.base import BaseCrawler
from app.core.models import PageInfo


class RecursiveCrawler(BaseCrawler):
    """Traditional recursive web crawler"""
    
    def __init__(self, config, user_agent: str):
        super().__init__(config, user_agent)
        self.domain = None
    
    async def crawl(self, start_url: str) -> AsyncIterator[PageInfo]:
        """
        Recursively crawl from start URL
        
        Args:
            start_url: Starting URL
            
        Yields:
            PageInfo for each discovered page
        """
        self.domain = self._get_domain(start_url)
        pages_yielded = 0
        
        print(f"[RecursiveCrawler] Starting crawl from {start_url}")
        print(f"[RecursiveCrawler] Max URLs: {self.config.max_urls}, Max depth: {self.config.max_depth}")
        
        # BFS queue: (url, depth)
        queue = [(start_url, 0)]
        
        while queue and pages_yielded < self.config.max_urls:
            url, depth = queue.pop(0)
            
            # Check depth limit
            if depth > self.config.max_depth:
                print(f"[RecursiveCrawler] Skipping {url} - exceeds max depth {self.config.max_depth}")
                continue
            
            if not self.should_crawl(url):
                print(f"[RecursiveCrawler] Skipping {url} - filtered by crawl rules")
                continue
            
            self.visited_urls.add(url)
            
            # Fetch page
            print(f"[RecursiveCrawler] Crawling ({pages_yielded + 1}/{self.config.max_urls}): {url}")
            page_info, links = await self._fetch_page(url)
            
            if page_info:
                pages_yielded += 1
                print(f"[RecursiveCrawler] ✓ Successfully crawled page {pages_yielded}: {page_info.title or url}")
                yield page_info
                
                # Check if we've hit the limit
                if pages_yielded >= self.config.max_urls:
                    print(f"[RecursiveCrawler] Reached max URL limit ({self.config.max_urls}). Stopping crawl.")
                    break
            
            # Add discovered links to queue
            if depth < self.config.max_depth and pages_yielded < self.config.max_urls:
                new_links = 0
                for link in links:
                    if link not in self.visited_urls and link not in [item[0] for item in queue]:
                        queue.append((link, depth + 1))
                        new_links += 1
                if new_links > 0:
                    print(f"[RecursiveCrawler] Found {new_links} new links at depth {depth}")
            
            # Rate limiting
            await asyncio.sleep(self.config.request_delay)
        
        print(f"[RecursiveCrawler] Crawl complete. Total pages: {pages_yielded}")
    
    async def _fetch_page(self, url: str) -> tuple:
        """
        Fetch page and extract information and links
        
        Returns:
            Tuple of (PageInfo, list of discovered links)
        """
        links = []
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    url,
                    headers={"User-Agent": self.user_agent},
                    timeout=aiohttp.ClientTimeout(total=30)
                ) as response:
                    if response.status != 200:
                        return None, []
                    
                    content = await response.text()
                    
                    # Parse HTML
                    soup = BeautifulSoup(content, 'html.parser')
                    
                    # Extract title
                    title = soup.title.string if soup.title else None
                    
                    # Check for images
                    has_images = len(soup.find_all('img')) > 0
                    
                    # Word count
                    text = soup.get_text()
                    word_count = len(text.split())
                    
                    # Extract links
                    for link in soup.find_all('a', href=True):
                        href = link['href']
                        absolute_url = urljoin(url, href)
                        
                        # Only include same-domain links
                        if self._same_domain(absolute_url):
                            links.append(absolute_url)
                    
                    page_info = PageInfo(
                        url=url,
                        title=title,
                        size=len(content),
                        has_images=has_images,
                        word_count=word_count,
                        status="success"
                    )
                    
                    return page_info, links
        
        except Exception as e:
            print(f"[RecursiveCrawler] ✗ Error fetching page {url}: {e}")
            page_info = PageInfo(
                url=url,
                title=None,
                size=0,
                has_images=False,
                status="failed"
            )
            return page_info, []
    
    def _get_domain(self, url: str) -> str:
        """Extract domain from URL"""
        parsed = urlparse(url)
        return f"{parsed.scheme}://{parsed.netloc}"
    
    def _same_domain(self, url: str) -> bool:
        """Check if URL is on the same domain"""
        return url.startswith(self.domain)
