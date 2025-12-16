"""
Analyzer API endpoints
"""

from fastapi import APIRouter, HTTPException
from app.core.models import AnalyzeRequest, AnalyzeResponse
from app.detector import SitemapDetector
from app.core.config import settings
from urllib.parse import urlparse

router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_url(request: AnalyzeRequest):
    """
    Analyze URL and detect best crawl strategy
    """
    url = str(request.url)
    
    try:
        # Initialize detector
        detector = SitemapDetector(
            user_agent=settings.USER_AGENT,
            timeout=settings.REQUEST_TIMEOUT
        )
        
        # Detect crawl strategy
        suggested_mode, sitemap_info = await detector.detect(url)
        
        # Extract domain
        parsed = urlparse(url)
        domain = f"{parsed.scheme}://{parsed.netloc}"
        
        # Try to get page title and description
        import aiohttp
        from bs4 import BeautifulSoup
        
        title = None
        description = None
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    url,
                    headers={"User-Agent": settings.USER_AGENT},
                    timeout=aiohttp.ClientTimeout(total=settings.REQUEST_TIMEOUT)
                ) as response:
                    if response.status == 200:
                        content = await response.text()
                        soup = BeautifulSoup(content, 'html.parser')
                        
                        if soup.title:
                            title = soup.title.string
                        
                        meta_desc = soup.find('meta', attrs={'name': 'description'})
                        if meta_desc:
                            description = meta_desc.get('content', '')
        except Exception as e:
            print(f"Error fetching page metadata: {e}")
        
        # Estimate pages
        estimated_pages = None
        if sitemap_info and sitemap_info.valid:
            estimated_pages = sitemap_info.url_count
        
        return AnalyzeResponse(
            url=url,
            domain=domain,
            suggested_mode=suggested_mode,
            sitemap_detected=sitemap_info,
            robots_txt_found=sitemap_info is not None if sitemap_info else False,
            title=title,
            description=description,
            estimated_pages=estimated_pages
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
