export interface AnalyzeResponse {
  url: string;
  domain: string;
  suggested_mode: CrawlMode;
  sitemap_detected?: SitemapInfo;
  robots_txt_found: boolean;
  title?: string;
  description?: string;
  estimated_pages?: number;
}

export interface SitemapInfo {
  url?: string;
  url_count: number;
  valid: boolean;
  source?: string;
}

export enum CrawlMode {
  AUTO = 'auto',
  SITEMAP_URL = 'sitemap_url',
  SITEMAP_UPLOAD = 'sitemap_upload',
  RECURSIVE = 'recursive',
  SINGLE_PAGE = 'single_page',
}

export enum CrawlStatus {
  PENDING = 'pending',
  ANALYZING = 'analyzing',
  CRAWLING = 'crawling',
  PROCESSING = 'processing',
  GENERATING = 'generating',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface CrawlConfig {
  max_urls: number;
  max_depth: number;
  include_images: boolean;
  respect_canonical: boolean;
  exclude_patterns: string[];
  request_delay: number;
}

export interface CrawlRequest {
  url: string;
  mode: CrawlMode;
  sitemap_url?: string;
  config: CrawlConfig;
}

export interface CrawlResponse {
  job_id: string;
  status: CrawlStatus;
  message: string;
}

export interface PageInfo {
  url: string;
  title?: string;
  size: number;
  has_images: boolean;
  word_count?: number;
  status: string;
}

export interface JobStatusResponse {
  job_id: string;
  status: CrawlStatus;
  progress: number;
  current_step?: string;
  pages_found: number;
  pages_processed: number;
  pages: PageInfo[];
  logs: string[];  // Activity logs
  error?: string;
  created_at: string;
  completed_at?: string;
}
