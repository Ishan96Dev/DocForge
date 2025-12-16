# API Documentation

DocForge Backend API reference and usage guide.

## Base URL

- **Development**: `http://localhost:8000`
- **Production**: Your Render.com URL (e.g., `https://docforge-backend-xxxx.onrender.com`)

## Authentication

Currently, no authentication is required. The API is open for public use.

## Endpoints

### Health Check

Check if the API is running.

```http
GET /health
```

**Response**
```json
{
  "status": "healthy",
  "service": "DocForge API"
}
```

---

### Analyze URL

Analyze a website and detect the best crawling strategy.

```http
POST /api/analyze
Content-Type: application/json

{
  "url": "https://docs.python.org"
}
```

**Request Body**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| url | string | Yes | The website URL to analyze |

**Response** (200 OK)
```json
{
  "url": "https://docs.python.org",
  "sitemaps": [
    {
      "url": "https://docs.python.org/sitemap.xml",
      "format": "xml",
      "is_index": false,
      "url_count": 1250,
      "is_valid": true
    }
  ],
  "suggested_mode": "sitemap",
  "estimated_pages": 1250,
  "robots_txt_found": true,
  "base_domain": "docs.python.org"
}
```

**Response Fields**
| Field | Type | Description |
|-------|------|-------------|
| url | string | The analyzed URL |
| sitemaps | array | List of discovered sitemaps |
| suggested_mode | string | Recommended crawling mode: "sitemap", "recursive", or "single" |
| estimated_pages | integer | Approximate number of pages found |
| robots_txt_found | boolean | Whether robots.txt was found |
| base_domain | string | The base domain of the website |

**Error Responses**

- `400 Bad Request` - Invalid URL format
- `403 Forbidden` - Website blocks crawling (robots.txt)
- `404 Not Found` - Website not found
- `500 Internal Server Error` - Server error

---

### Start Crawl

Start crawling a website with the specified configuration.

```http
POST /api/crawl
Content-Type: application/json

{
  "url": "https://docs.python.org",
  "mode": "sitemap",
  "sitemap_url": "https://docs.python.org/sitemap.xml",
  "config": {
    "max_urls": 50,
    "max_depth": 3,
    "include_images": true,
    "respect_canonical": true,
    "exclude_patterns": [],
    "request_delay": 1.0
  }
}
```

**Request Body**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| url | string | Yes | The website URL to crawl |
| mode | string | Yes | Crawling mode: "sitemap", "recursive", or "single" |
| sitemap_url | string | No | Sitemap URL (required if mode is "sitemap") |
| config | object | Yes | Crawl configuration |

**Config Object**
| Field | Type | Default | Description |
|-------|------|---------|-------------|
| max_urls | integer | 50 | Maximum number of pages to crawl (10-500) |
| max_depth | integer | 3 | Maximum crawl depth for recursive mode |
| include_images | boolean | true | Whether to include images in PDF |
| respect_canonical | boolean | true | Whether to respect canonical URLs |
| exclude_patterns | array | [] | URL patterns to exclude (regex) |
| request_delay | float | 1.0 | Delay between requests in seconds |

**Response** (200 OK)
```json
{
  "job_id": "abc123xyz",
  "status": "started",
  "message": "Crawl job started successfully"
}
```

**Response Fields**
| Field | Type | Description |
|-------|------|-------------|
| job_id | string | Unique identifier for the crawl job |
| status | string | Job status: "started", "crawling", "generating_pdf", "completed", "failed" |
| message | string | Human-readable status message |

---

### Get Job Status

Get the current status of a crawl job.

```http
GET /api/status/{job_id}
```

**Path Parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| job_id | string | The job ID returned from start crawl |

**Response** (200 OK)
```json
{
  "job_id": "abc123xyz",
  "status": "crawling",
  "progress": {
    "current": 25,
    "total": 50,
    "percentage": 50
  },
  "crawled_urls": [
    "https://docs.python.org/",
    "https://docs.python.org/tutorial/",
    "..."
  ],
  "failed_urls": [],
  "pdf_ready": false,
  "pdf_filename": null,
  "error": null,
  "started_at": "2025-12-17T10:30:00Z",
  "completed_at": null
}
```

**Status Values**
- `started` - Job created, not yet started
- `crawling` - Currently crawling pages
- `generating_pdf` - Creating PDF document
- `completed` - Job finished successfully
- `failed` - Job failed with error

---

### Download PDF

Download the generated PDF for a completed job.

```http
GET /api/download/{job_id}
```

**Path Parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| job_id | string | The job ID of a completed crawl |

**Response** (200 OK)
- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="website-export.pdf"`
- Binary PDF data

**Error Responses**
- `404 Not Found` - Job ID not found or PDF not ready
- `500 Internal Server Error` - Error generating PDF

---

### Preview PDF

Get a preview URL for the generated PDF (opens in browser).

```http
GET /api/preview/{job_id}
```

**Path Parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| job_id | string | The job ID of a completed crawl |

**Response** (200 OK)
- Content-Type: `application/pdf`
- Content-Disposition: `inline; filename="website-export.pdf"`
- Binary PDF data (displayed in browser)

---

## Error Responses

All errors follow this format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

**Common HTTP Status Codes**
- `200 OK` - Request successful
- `400 Bad Request` - Invalid request parameters
- `403 Forbidden` - Access denied (e.g., robots.txt)
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error
- `503 Service Unavailable` - Service temporarily unavailable

---

## Rate Limiting

The API respects rate limiting to prevent abuse:

- Maximum 10 concurrent crawl jobs per IP
- Request delay between page fetches (configurable, default 1s)
- Respects website's robots.txt and rate limits

---

## Example Usage

### Python

```python
import requests

# Analyze website
response = requests.post('http://localhost:8000/api/analyze', json={
    'url': 'https://docs.python.org'
})
analysis = response.json()

# Start crawl
response = requests.post('http://localhost:8000/api/crawl', json={
    'url': 'https://docs.python.org',
    'mode': 'sitemap',
    'sitemap_url': analysis['sitemaps'][0]['url'],
    'config': {
        'max_urls': 20,
        'max_depth': 3,
        'include_images': True,
        'request_delay': 1.0
    }
})
job = response.json()
job_id = job['job_id']

# Check status
import time
while True:
    response = requests.get(f'http://localhost:8000/api/status/{job_id}')
    status = response.json()
    print(f"Status: {status['status']}, Progress: {status['progress']['percentage']}%")
    
    if status['status'] in ['completed', 'failed']:
        break
    time.sleep(2)

# Download PDF
if status['status'] == 'completed':
    response = requests.get(f'http://localhost:8000/api/download/{job_id}')
    with open('output.pdf', 'wb') as f:
        f.write(response.content)
```

### JavaScript/TypeScript

```typescript
// Analyze website
const analyzeResponse = await fetch('http://localhost:8000/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://docs.python.org' })
});
const analysis = await analyzeResponse.json();

// Start crawl
const crawlResponse = await fetch('http://localhost:8000/api/crawl', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://docs.python.org',
    mode: 'sitemap',
    sitemap_url: analysis.sitemaps[0].url,
    config: {
      max_urls: 20,
      max_depth: 3,
      include_images: true,
      request_delay: 1.0
    }
  })
});
const job = await crawlResponse.json();
const jobId = job.job_id;

// Poll status
const pollStatus = async () => {
  const response = await fetch(`http://localhost:8000/api/status/${jobId}`);
  const status = await response.json();
  console.log(`Status: ${status.status}, Progress: ${status.progress.percentage}%`);
  
  if (status.status === 'completed') {
    // Download PDF
    window.open(`http://localhost:8000/api/download/${jobId}`, '_blank');
  } else if (status.status !== 'failed') {
    setTimeout(pollStatus, 2000);
  }
};

pollStatus();
```

### cURL

```bash
# Analyze
curl -X POST http://localhost:8000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://docs.python.org"}'

# Start crawl
curl -X POST http://localhost:8000/api/crawl \
  -H "Content-Type: application/json" \
  -d '{
    "url":"https://docs.python.org",
    "mode":"sitemap",
    "sitemap_url":"https://docs.python.org/sitemap.xml",
    "config":{
      "max_urls":20,
      "max_depth":3,
      "include_images":true,
      "request_delay":1.0
    }
  }'

# Check status
curl http://localhost:8000/api/status/abc123xyz

# Download PDF
curl -O http://localhost:8000/api/download/abc123xyz
```

---

## Interactive API Docs

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## WebSocket Support (Future)

WebSocket support for real-time progress updates is planned for a future release.

---

## Changelog

### v1.0.0 (Current)
- Initial API release
- Analyze, crawl, and export endpoints
- Three crawling modes: sitemap, recursive, single
- PDF generation with cover page and TOC

---

**Made with ❤️ by the DocForge Community**

[⬆ Back to Documentation Index](INDEX.md)
