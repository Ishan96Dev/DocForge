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
        
        # Step 0: Check if it's a single-page website (SPA or single scrolling page)
        is_single_page = await self._detect_single_page_website(url)
        if is_single_page:
            print(f"[SitemapDetector] Detected single-page website: {url}")
            return CrawlMode.SINGLE_PAGE, None
        
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
    
    async def _detect_single_page_website(self, url: str) -> bool:
        """
        Detect if the website is a single-page application or single scrolling page
        
        Checks for:
        - SPA frameworks (React, Vue, Angular)
        - Hash-based navigation (#section)
        - Minimal internal links (most links are anchors)
        - Single HTML page structure
        
        Returns:
            True if detected as single-page website
        """
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    url,
                    headers={"User-Agent": self.user_agent},
                    timeout=aiohttp.ClientTimeout(total=self.timeout)
                ) as response:
                    if response.status != 200:
                        return False
                    
                    content = await response.text()
                    content_lower = content.lower()
                    
                    # Check for SPA framework indicators
                    spa_indicators = [
                        'react',
                        'vue.js',
                        'vue.min.js',
                        'angular',
                        'ng-app',
                        'data-react-root',
                        '__next',  # Next.js
                        '_next/static',  # Next.js
                        'nuxt',  # Nuxt.js
                    ]
                    
                    spa_score = sum(1 for indicator in spa_indicators if indicator in content_lower)
                    
                    # Parse HTML to analyze links
                    from bs4 import BeautifulSoup
                    soup = BeautifulSoup(content, 'html.parser')
                    
                    # Get all links
                    all_links = soup.find_all('a', href=True)
                    
                    if not all_links:
                        # No links at all, likely single page
                        return True
                    
                    # Count different types of links
                    anchor_links = 0  # Links to #sections on same page
                    same_page_links = 0  # Links to same URL or just #
                    external_links = 0
                    internal_unique_pages = set()
                    
                    parsed_url = urlparse(url)
                    domain = f"{parsed_url.scheme}://{parsed_url.netloc}"
                    current_path = parsed_url.path.rstrip('/')
                    
                    for link in all_links:
                        href = link.get('href', '').strip()
                        
                        if not href or href == '#':
                            same_page_links += 1
                            continue
                        
                        # Anchor link on same page
                        if href.startswith('#'):
                            anchor_links += 1
                            continue
                        
                        # Parse the link
                        if href.startswith('http'):
                            link_parsed = urlparse(href)
                            if link_parsed.netloc != parsed_url.netloc:
                                external_links += 1
                                continue
                            
                            # Same domain, check if different page
                            link_path = link_parsed.path.rstrip('/')
                            if link_path == current_path or link_path == '':
                                if link_parsed.fragment:
                                    anchor_links += 1
                                else:
                                    same_page_links += 1
                            else:
                                internal_unique_pages.add(link_path)
                        else:
                            # Relative URL
                            if href.startswith('/'):
                                link_path = href.split('#')[0].rstrip('/')
                                if link_path == current_path or link_path == '':
                                    if '#' in href:
                                        anchor_links += 1
                                    else:
                                        same_page_links += 1
                                else:
                                    internal_unique_pages.add(link_path)
                            else:
                                # Relative to current path
                                internal_unique_pages.add(href.split('#')[0])
                    
                    total_links = len(all_links)
                    navigation_links = anchor_links + same_page_links
                    unique_internal_pages = len(internal_unique_pages)
                    
                    print(f"[SitemapDetector] Link analysis for {url}:")
                    print(f"  Total links: {total_links}")
                    print(f"  Anchor links (#sections): {anchor_links}")
                    print(f"  Same page links: {same_page_links}")
                    print(f"  Unique internal pages: {unique_internal_pages}")
                    print(f"  External links: {external_links}")
                    print(f"  SPA indicators: {spa_score}")
                    
                    # Decision logic (conservative to avoid false positives):
                    # 1. STRONG: 80%+ links are navigation (anchors/same-page) → clearly single-page
                    # 2. MODERATE: ≤2 unique pages + 60%+ navigation → likely single-page with minimal structure
                    # 3. SPA: Framework detected + ≤3 unique pages + 70%+ navigation → single-page SPA
                    # Otherwise: Use recursive/sitemap crawling for multi-page sites
                    
                    if total_links == 0:
                        # No links at all - could be a simple landing page
                        return True
                    
                    navigation_ratio = navigation_links / total_links
                    
                    # Rule 1: Strong single-page indicator (80%+ navigation links)
                    if navigation_ratio >= 0.8:
                        print(f"[SitemapDetector] Single-page detected: {navigation_ratio*100:.1f}% navigation links")
                        return True
                    
                    # Rule 2: Very few unique pages + high navigation ratio
                    # (Avoids classifying small blogs/sites with 3-4 pages as single-page)
                    if unique_internal_pages <= 2 and navigation_ratio >= 0.6:
                        print(f"[SitemapDetector] Single-page detected: only {unique_internal_pages} pages, {navigation_ratio*100:.1f}% navigation")
                        return True
                    
                    # Rule 3: SPA framework with minimal routing + high navigation
                    if spa_score >= 2 and unique_internal_pages <= 3 and navigation_ratio >= 0.7:
                        print(f"[SitemapDetector] Single-page SPA detected: {spa_score} indicators, {unique_internal_pages} pages, {navigation_ratio*100:.1f}% navigation")
                        return True
                    
                    # Not a single-page site - will fall through to sitemap or recursive crawling
                    print(f"[SitemapDetector] Multi-page site detected - will use sitemap or recursive crawling")
                    return False
                    
        except Exception as e:
            print(f"Error detecting single-page website: {e}")
            return False
    
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
