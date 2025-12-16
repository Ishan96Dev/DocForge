"""
Crawler module initialization
"""

from app.crawler.base import BaseCrawler
from app.crawler.sitemap_crawler import SitemapCrawler
from app.crawler.recursive_crawler import RecursiveCrawler
from app.crawler.single_page_crawler import SinglePageCrawler

__all__ = [
    "BaseCrawler",
    "SitemapCrawler",
    "RecursiveCrawler",
    "SinglePageCrawler"
]
