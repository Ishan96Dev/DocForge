"""
Pydantic models for API requests and responses
"""

from pydantic import BaseModel, HttpUrl, Field
from typing import Optional, List, Dict
from enum import Enum


class CrawlMode(str, Enum):
    """Crawl strategy modes"""
    AUTO = "auto"
    SITEMAP_URL = "sitemap_url"
    SITEMAP_UPLOAD = "sitemap_upload"
    RECURSIVE = "recursive"
    SINGLE_PAGE = "single_page"


class ExportFormat(str, Enum):
    """Export format options"""
    PDF = "pdf"
    MARKDOWN = "markdown"
    EPUB = "epub"
    HTML = "html"
    ZIP = "zip"


class AnalyzeRequest(BaseModel):
    """Request model for URL analysis"""
    url: HttpUrl
    check_sitemap: bool = True


class SitemapInfo(BaseModel):
    """Sitemap information"""
    url: Optional[str] = None
    url_count: int = 0
    valid: bool = False
    source: Optional[str] = None  # robots.txt, common_path, html_link


class AnalyzeResponse(BaseModel):
    """Response model for URL analysis"""
    url: str
    domain: str
    suggested_mode: CrawlMode
    sitemap_detected: Optional[SitemapInfo] = None
    robots_txt_found: bool = False
    title: Optional[str] = None
    description: Optional[str] = None
    estimated_pages: Optional[int] = None


class CrawlConfig(BaseModel):
    """Crawl configuration"""
    max_urls: int = Field(default=100, ge=1, le=1000)
    max_depth: int = Field(default=3, ge=1, le=10)
    include_images: bool = True
    respect_canonical: bool = True
    exclude_patterns: List[str] = Field(default_factory=list)
    request_delay: float = Field(default=1.0, ge=0.1, le=10.0)


class CrawlRequest(BaseModel):
    """Request model for crawling"""
    url: HttpUrl
    mode: CrawlMode = CrawlMode.AUTO
    sitemap_url: Optional[str] = None
    config: CrawlConfig = Field(default_factory=CrawlConfig)


class PageInfo(BaseModel):
    """Information about a crawled page"""
    url: str
    title: Optional[str] = None
    size: int
    has_images: bool
    word_count: Optional[int] = None
    status: str = "pending"  # pending, success, failed


class CrawlStatus(str, Enum):
    """Crawl job status"""
    PENDING = "pending"
    ANALYZING = "analyzing"
    CRAWLING = "crawling"
    PROCESSING = "processing"
    GENERATING = "generating"
    COMPLETED = "completed"
    FAILED = "failed"


class CrawlResponse(BaseModel):
    """Response model for crawl initiation"""
    job_id: str
    status: CrawlStatus
    message: str


class JobStatusResponse(BaseModel):
    """Response model for job status"""
    job_id: str
    status: CrawlStatus
    progress: float = 0.0  # 0.0 to 100.0
    current_step: Optional[str] = None
    pages_found: int = 0
    pages_processed: int = 0
    pages: List[PageInfo] = Field(default_factory=list)
    logs: List[str] = Field(default_factory=list)  # Activity logs
    error: Optional[str] = None
    created_at: str
    completed_at: Optional[str] = None


class ExportRequest(BaseModel):
    """Request model for export"""
    job_id: str
    format: ExportFormat = ExportFormat.PDF
    include_toc: bool = True
    include_cover: bool = True
    custom_title: Optional[str] = None


class ExportResponse(BaseModel):
    """Response model for export"""
    job_id: str
    format: ExportFormat
    file_url: str
    file_size: int
    page_count: Optional[int] = None
