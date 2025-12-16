"""
DocForge Backend API
Main application entry point

Created by: Ishan Chakraborty
GitHub: https://github.com/Ishan96Dev
LinkedIn: https://www.linkedin.com/in/ishan-chakraborty-0085571a1
License: MIT
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import os
import sys
import asyncio
from dotenv import load_dotenv

from app.api import analyzer, crawler, exporter
from app.core.config import settings

load_dotenv()

# Fix for Windows asyncio subprocess support in FastAPI background tasks
if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    print("DocForge API starting up...")
    
    # Ensure export directory exists
    os.makedirs(settings.EXPORT_DIR, exist_ok=True)
    
    yield
    
    # Shutdown
    print("👋 DocForge API shutting down...")


app = FastAPI(
    title="DocForge API",
    description="Open-source website-to-PDF engine with intelligent crawling",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analyzer.router, prefix="/api", tags=["Analyzer"])
app.include_router(crawler.router, prefix="/api", tags=["Crawler"])
app.include_router(exporter.router, prefix="/api", tags=["Exporter"])


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": "DocForge API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "docforge-backend"
    }


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler"""
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": str(exc)
        }
    )
