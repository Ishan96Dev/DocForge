# Architecture Overview

This document provides a detailed overview of DocForge's architecture and design decisions.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                          Frontend                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React + TypeScript + Tailwind CSS                   │  │
│  │  - URL Input & Analysis                              │  │
│  │  - Progress Monitoring                               │  │
│  │  - PDF Download                                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend (FastAPI)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    API Layer                          │  │
│  │  - Analyzer API    - Crawler API    - Exporter API   │  │
│  └──────────────────────────────────────────────────────┘  │
│                              │                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Detector Layer                       │  │
│  │  - Sitemap Detection                                 │  │
│  │  - robots.txt Parser                                 │  │
│  │  - Strategy Selection                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                              │                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Crawler Layer                        │  │
│  │  - Sitemap Crawler                                   │  │
│  │  - Recursive Crawler                                 │  │
│  │  - Single Page Crawler                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                              │                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Renderer Layer                       │  │
│  │  - Playwright (Browser Automation)                   │  │
│  │  - Content Extraction                                │  │
│  │  - HTML Cleaning                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                              │                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Exporter Layer                       │  │
│  │  - PDF Generator (WeasyPrint)                        │  │
│  │  - Cover Page & TOC                                  │  │
│  │  - Styling & Formatting                              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Detector Layer

**Purpose**: Intelligently detect the best crawling strategy for a given URL.

**Flow**:
1. Check `robots.txt` for sitemap declarations
2. Try common sitemap paths (`/sitemap.xml`, etc.)
3. Parse HTML for sitemap links
4. Validate discovered sitemaps
5. Return suggested strategy

**Key Files**:
- `backend/app/detector/sitemap_detector.py`

### 2. Crawler Layer

**Purpose**: Implement different crawling strategies.

**Strategies**:

**Sitemap Crawler**
- Parses sitemap XML files
- Handles sitemap indexes (recursive)
- Supports gzipped sitemaps
- Most efficient for large sites

**Recursive Crawler**
- Traditional BFS crawling
- Respects depth and URL limits
- Extracts links from HTML
- Stays within same domain

**Single Page Crawler**
- Fetches one page only
- Quick and simple
- No link following

**Key Files**:
- `backend/app/crawler/sitemap_crawler.py`
- `backend/app/crawler/recursive_crawler.py`
- `backend/app/crawler/single_page_crawler.py`

### 3. Renderer Layer

**Purpose**: Extract and clean content from web pages.

**Process**:
1. Launch headless browser (Playwright)
2. Render JavaScript
3. Wait for content to load
4. Extract HTML
5. Remove unwanted elements (nav, footer, ads)
6. Identify main content area
7. Extract images and metadata

**Key Files**:
- `backend/app/renderer/content_renderer.py`

### 4. Exporter Layer

**Purpose**: Generate professional PDF documents.

**Features**:
- Cover page with metadata
- Table of contents with links
- Page headers and footers
- Syntax-highlighted code blocks
- Properly scaled images
- Page numbers
- Source URLs

**Key Files**:
- `backend/app/exporter/pdf_exporter.py`

## Data Flow

### Analysis Flow

```
User Input URL
    │
    ▼
Analyzer API
    │
    ▼
Sitemap Detector
    │
    ├─► Check robots.txt
    ├─► Try common paths
    └─► Parse HTML
    │
    ▼
Return Strategy + Metadata
```

### Crawl Flow

```
User Starts Crawl
    │
    ▼
Create Job (Pending)
    │
    ▼
Background Task
    │
    ├─► Analyzing: Select Crawler
    ├─► Crawling: Discover Pages
    ├─► Processing: Render Content
    └─► Generating: Create PDF
    │
    ▼
Job Complete (Ready for Download)
```

## Design Decisions

### Why FastAPI?
- Modern, fast, async support
- Automatic API documentation
- Type validation with Pydantic
- Easy to test and extend

### Why Playwright over Puppeteer/Selenium?
- More reliable than Selenium
- Better developer experience
- Cross-browser support
- Active development

### Why WeasyPrint for PDF?
- Pure Python (easy installation)
- CSS support for styling
- Good table/layout handling
- Open source

### Why React + TypeScript?
- Type safety reduces bugs
- Modern, component-based
- Great developer tooling
- Large ecosystem

### Why Tailwind CSS?
- Rapid UI development
- Consistent design system
- Small production bundle
- No CSS conflicts

## Performance Considerations

### Crawling
- Rate limiting prevents server overload
- Concurrent requests for faster crawling
- URL deduplication prevents waste
- Depth limits prevent infinite loops

### Rendering
- Browser instances reused
- Lazy loading for images
- Timeouts prevent hanging
- Content size limits

### PDF Generation
- Streaming for large documents
- Image optimization
- Font subsetting
- CSS optimization

## Security Considerations

### Input Validation
- URL format validation
- Sitemap XML validation
- Path traversal prevention
- Size limits

### Rate Limiting
- Configurable request delays
- Max URLs per job
- Timeout limits
- Memory limits

### Respectful Crawling
- robots.txt compliance
- User-agent identification
- No aggressive crawling
- Clear documentation

## Scalability

### Current Limitations
- In-memory job storage
- Single server processing
- Synchronous PDF generation

### Future Improvements
- Redis for job queue
- Distributed workers
- Async PDF generation
- Database for job history
- CDN for static assets

## Testing Strategy

### Unit Tests
- Detector logic
- Crawler implementations
- Content extraction
- PDF generation

### Integration Tests
- API endpoints
- Full crawl workflow
- Error handling

### E2E Tests
- User workflows
- Browser automation
- PDF validation

## Monitoring

### Metrics to Track
- Crawl success rate
- Average processing time
- PDF generation time
- Error rates
- Memory usage

### Logging
- Request/response logs
- Error logs with stack traces
- Crawl progress logs
- Performance metrics

## Future Architecture

### Phase 2: Job Queue
```
API ──► Redis Queue ──► Worker Pool ──► Storage
```

### Phase 3: Microservices
```
API Gateway
    ├─► Analyzer Service
    ├─► Crawler Service
    ├─► Renderer Service
    └─► Exporter Service
```

### Phase 4: Cloud Native
```
Load Balancer
    ├─► API Containers (scaled)
    ├─► Worker Containers (scaled)
    ├─► Object Storage (PDFs)
    └─► Database (job history)
```

## Contributing to Architecture

When proposing architectural changes:

1. Consider scalability
2. Maintain separation of concerns
3. Document trade-offs
4. Include migration path
5. Update this document

## References

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Playwright Documentation](https://playwright.dev/)
- [WeasyPrint Documentation](https://weasyprint.org/)
- [React Documentation](https://react.dev/)
