"""
Single page crawler
"""

import aiohttp
from typing import AsyncIterator
from bs4 import BeautifulSoup

from app.crawler.base import BaseCrawler
from app.core.models import PageInfo


class SinglePageCrawler(BaseCrawler):
    """Crawler for single pages"""
    
    async def crawl(self, url: str) -> AsyncIterator[PageInfo]:
        """
        Fetch a single page
        
        Args:
            url: URL to fetch
            
        Yields:
            PageInfo for the page
        """
        page_info = await self._fetch_page(url)
        if page_info:
            yield page_info
    
    async def _fetch_page(self, url: str) -> PageInfo:
        """Fetch page information"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    url,
                    headers={"User-Agent": self.user_agent},
                    timeout=aiohttp.ClientTimeout(total=30)
                ) as response:
                    if response.status != 200:
                        return PageInfo(
                            url=url,
                            title=None,
                            size=0,
                            has_images=False,
                            status="failed"
                        )
                    
                    content = await response.text()
                    
                    # Parse HTML
                    soup = BeautifulSoup(content, 'html.parser')
                    
                    # Extract information
                    title = soup.title.string if soup.title else None
                    has_images = len(soup.find_all('img')) > 0
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
            print(f"Error fetching page {url}: {e}")
            return PageInfo(
                url=url,
                title=None,
                size=0,
                has_images=False,
                status="failed"
            )
