"""
Job storage and management
"""

from typing import Dict, Optional
from datetime import datetime
import uuid

from app.core.models import JobStatusResponse, CrawlStatus, PageInfo


class JobStorage:
    """In-memory job storage (can be replaced with Redis/DB)"""
    
    def __init__(self):
        self.jobs: Dict[str, Dict] = {}
    
    def create_job(self, url: str) -> str:
        """Create a new job and return job ID"""
        job_id = str(uuid.uuid4())
        
        self.jobs[job_id] = {
            'job_id': job_id,
            'url': url,
            'status': CrawlStatus.PENDING,
            'progress': 0.0,
            'current_step': 'Initializing',
            'pages_found': 0,
            'pages_processed': 0,
            'pages': [],
            'logs': [],
            'error': None,
            'created_at': datetime.now().isoformat(),
            'completed_at': None,
            'result_file': None,
            'result_filename': None  # Store original filename for download
        }
        
        return job_id
    
    def get_job(self, job_id: str) -> Optional[Dict]:
        """Get job by ID"""
        return self.jobs.get(job_id)
    
    def update_job(self, job_id: str, **kwargs):
        """Update job fields"""
        if job_id in self.jobs:
            self.jobs[job_id].update(kwargs)
    
    def add_page(self, job_id: str, page: PageInfo):
        """Add a page to job"""
        if job_id in self.jobs:
            self.jobs[job_id]['pages'].append(page.dict())
            self.jobs[job_id]['pages_found'] = len(self.jobs[job_id]['pages'])
    
    def add_log(self, job_id: str, message: str):
        """Add a log message to job"""
        if job_id in self.jobs:
            timestamp = datetime.now().strftime("%H:%M:%S")
            log_entry = f"[{timestamp}] {message}"
            self.jobs[job_id]['logs'].append(log_entry)
            # Keep only last 50 logs
            if len(self.jobs[job_id]['logs']) > 50:
                self.jobs[job_id]['logs'] = self.jobs[job_id]['logs'][-50:]


# Global job storage instance
job_storage = JobStorage()
