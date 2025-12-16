"""
Exporter API endpoints
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from app.core.storage import job_storage
from app.core.models import CrawlStatus
import os

router = APIRouter()


@router.get("/preview/{job_id}")
async def preview_result(job_id: str):
    """
    Preview PDF in browser (inline display)
    """
    job = job_storage.get_job(job_id)
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if job['status'] != CrawlStatus.COMPLETED:
        raise HTTPException(status_code=400, detail="Job not completed")
    
    result_path = job.get('result_file')
    if not result_path or not os.path.exists(result_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    # Only PDFs can be previewed
    if os.path.isfile(result_path) and result_path.endswith('.pdf'):
        from fastapi.responses import Response
        with open(result_path, 'rb') as f:
            pdf_content = f.read()
        return Response(
            content=pdf_content,
            media_type='application/pdf',
            headers={
                'Content-Disposition': 'inline',
                'Cache-Control': 'no-cache'
            }
        )
    else:
        raise HTTPException(status_code=400, detail="Only PDF files can be previewed")


@router.get("/download/{job_id}")
async def download_result(job_id: str):
    """
    Download generated PDF or HTML archive
    """
    job = job_storage.get_job(job_id)
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if job['status'] != CrawlStatus.COMPLETED:
        raise HTTPException(status_code=400, detail="Job not completed")
    
    result_path = job.get('result_file')
    if not result_path or not os.path.exists(result_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    # Get the stored filename or create a fallback
    download_filename = job.get('result_filename')
    if not download_filename:
        # Fallback to job_id-based naming if no filename stored
        download_filename = f"docforge-export-{job_id}.pdf"
    
    # Check if it's a file (PDF) or directory (HTML export)
    if os.path.isfile(result_path):
        # PDF file - ensure .pdf extension
        if not download_filename.endswith('.pdf'):
            download_filename = download_filename.replace('.zip', '.pdf')
        return FileResponse(
            result_path,
            media_type='application/pdf',
            filename=download_filename
        )
    elif os.path.isdir(result_path):
        # HTML directory - create a zip file
        import shutil
        import tempfile
        
        # Create a temporary zip file
        temp_zip = tempfile.NamedTemporaryFile(delete=False, suffix='.zip')
        temp_zip.close()
        
        # Zip the directory
        shutil.make_archive(temp_zip.name[:-4], 'zip', result_path)
        zip_path = temp_zip.name[:-4] + '.zip'
        
        # Ensure .zip extension for HTML exports
        if not download_filename.endswith('.zip'):
            download_filename = download_filename.replace('.pdf', '.zip')
        
        return FileResponse(
            zip_path,
            media_type='application/zip',
            filename=download_filename,
            background=lambda: os.unlink(zip_path) if os.path.exists(zip_path) else None
        )
    else:
        raise HTTPException(status_code=500, detail=f"File at path {result_path} is not a file.")
