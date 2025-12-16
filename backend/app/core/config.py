"""
Core configuration settings
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""
    
    # API Configuration
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    
    # CORS - Allow all origins for deployment flexibility
    # Update with specific domains in production for better security
    CORS_ORIGINS: List[str] = ["*"]
    
    # Crawling Configuration
    MAX_URLS: int = 500
    MAX_DEPTH: int = 5
    REQUEST_DELAY: float = 1.0
    USER_AGENT: str = "DocForge/1.0 (+https://github.com/yourusername/docforge)"
    
    # Export Configuration
    EXPORT_DIR: str = "./exports"
    MAX_FILE_SIZE: int = 100 * 1024 * 1024  # 100MB
    
    # Timeouts
    REQUEST_TIMEOUT: int = 30
    CRAWL_TIMEOUT: int = 3600  # 1 hour
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
