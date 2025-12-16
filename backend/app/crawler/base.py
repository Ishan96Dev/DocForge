"""
Base crawler interface
"""

from abc import ABC, abstractmethod
from typing import List, Dict, AsyncIterator
from app.core.models import PageInfo, CrawlConfig


class BaseCrawler(ABC):
    """Abstract base class for crawlers"""
    
    def __init__(self, config: CrawlConfig, user_agent: str):
        self.config = config
        self.user_agent = user_agent
        self.visited_urls = set()
    
    @abstractmethod
    async def crawl(self, start_url: str) -> AsyncIterator[PageInfo]:
        """
        Crawl from start URL and yield PageInfo objects
        
        Args:
            start_url: Starting URL
            
        Yields:
            PageInfo objects for each discovered page
        """
        pass
    
    def should_crawl(self, url: str) -> bool:
        """Check if URL should be crawled based on configuration"""
        # Already visited
        if url in self.visited_urls:
            return False
        
        # Check exclude patterns
        for pattern in self.config.exclude_patterns:
            if pattern in url:
                return False
        
        # Max URLs limit
        if len(self.visited_urls) >= self.config.max_urls:
            return False
        
        return True
