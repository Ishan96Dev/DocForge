import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Hero } from './components/Hero';
import { AnalysisResult } from './components/AnalysisResult';
import { CrawlProgress } from './components/CrawlProgress';
import { PDFPreviewModal } from './components/PDFPreviewModal';
import { analyzeUrl, startCrawl, getJobStatus, downloadPDF, previewPDF } from './services/api';
import { AnalyzeResponse, CrawlMode, CrawlConfig, JobStatusResponse } from './types';
import { Github, FileCode, AlertTriangle, Linkedin, BookOpen } from 'lucide-react';

const queryClient = new QueryClient();

function AppContent() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatusResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isStartingCrawl, setIsStartingCrawl] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [isBackendHealthy, setIsBackendHealthy] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setJobStatus(null);
    setBackendError(null);

    try {
      const result = await analyzeUrl(url);
      setAnalysisResult(result);
      setIsBackendHealthy(true);
    } catch (error: any) {
      console.error('Analysis failed:', error);
      if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
        setBackendError('Cannot connect to backend server. Please ensure the server is running on port 8000.');
        setIsBackendHealthy(false);
      } else if (error.response?.status === 403 || error.response?.status === 429) {
        setBackendError('This website is blocking our requests due to rate limiting or security restrictions.');
      } else {
        setBackendError(error.response?.data?.detail || 'Failed to analyze URL. Please check the URL and try again.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartCrawl = async (mode: CrawlMode, maxUrls: number, sitemapUrl?: string) => {
    if (!analysisResult) return;

    setIsStartingCrawl(true);

    const config: CrawlConfig = {
      max_urls: maxUrls,
      max_depth: 3,
      include_images: true,
      respect_canonical: true,
      exclude_patterns: [],
      request_delay: 1.0,
    };

    try {
      const response = await startCrawl({
        url: analysisResult.url,
        mode,
        sitemap_url: sitemapUrl,
        config,
      });

      setBackendError(null);
      // Start polling for job status
      pollJobStatus(response.job_id);
    } catch (error: any) {
      console.error('Failed to start crawl:', error);
      if (error.code === 'ERR_NETWORK') {
        setBackendError('Lost connection to backend server.');
        setIsBackendHealthy(false);
      } else {
        setBackendError(error.response?.data?.detail || 'Failed to start crawl. Please try again.');
      }
      setIsStartingCrawl(false);
    }
  };

  const pollJobStatus = async (jobId: string) => {
    const poll = async () => {
      try {
        const status = await getJobStatus(jobId);
        setJobStatus(status);
        setIsStartingCrawl(false);

        // Continue polling if not complete
        if (status.status !== 'completed' && status.status !== 'failed') {
          setTimeout(poll, 2000);
        }
      } catch (error) {
        console.error('Failed to get job status:', error);
      }
    };

    poll();
  };

  const handleDownload = () => {
    if (jobStatus) {
      window.open(downloadPDF(jobStatus.job_id), '_blank');
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setJobStatus(null);
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex flex-col">

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            onClick={handleReset}
            className="flex items-center gap-3 group cursor-pointer"
            role="button"
            aria-label="Return to home"
          >
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-2 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <FileCode className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors">DocForge</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/ishan-chakraborty-0085571a1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-all duration-300 group"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="hidden md:inline">LinkedIn</span>
            </a>
            <a
              href="https://github.com/Ishan96Dev/DocForge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-all duration-300 group"
              aria-label="GitHub Repository"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="hidden md:inline">GitHub</span>
            </a>
            <a
              href="https://ishan96dev.github.io/DocForge/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-all duration-300 group shadow-sm hover:shadow-md"
              aria-label="Documentation"
            >
              <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Docs</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Hero Section with URL Input */}
          {!analysisResult && !jobStatus && !isAnalyzing && (
            <Hero onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
          )}
              
          {/* Error Message - Only shown after user action */}
          {backendError && !jobStatus && !isAnalyzing && (
            <div className="max-w-4xl mx-auto bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm animate-shake">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800 mb-1">Error</h3>
                  <p className="text-sm text-red-700">{backendError}</p>
                  {!isBackendHealthy && (
                    <p className="text-xs text-red-600 mt-2">
                      💡 Tip: Make sure the backend server is running on <code className="bg-red-100 px-1 py-0.5 rounded">http://localhost:8000</code>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Loading State - Full Screen Prominent */}
          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-32 space-y-8 min-h-[600px] animate-fade-in">
              <div className="relative">
                {/* Glowing background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-300 via-purple-300 to-primary-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                
                {/* Triple ring spinner */}
                <div className="relative mx-auto w-28 h-28">
                  <div className="absolute inset-0 border-4 border-primary-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border-4 border-purple-400 border-b-transparent rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
                  <div className="absolute inset-4 border-4 border-blue-300 border-l-transparent rounded-full animate-spin" style={{animationDuration: '1.5s'}}></div>
                </div>
              </div>
              
              {/* Text content */}
              <div className="text-center space-y-4 max-w-md">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  Analyzing Website
                </h2>
                <div className="space-y-2">
                  <p className="text-lg text-gray-700 font-medium">Discovering sitemaps...</p>
                  <p className="text-base text-gray-600">Analyzing site structure and determining optimal crawl strategy</p>
                </div>
                
                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2 pt-4">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Result */}
          {analysisResult && !jobStatus && (
            <div>
              <AnalysisResult
                result={analysisResult}
                onStartCrawl={handleStartCrawl}
                isLoading={isStartingCrawl}
                onBack={handleReset}
              />
            </div>
          )}

          {/* Crawl Progress */}
          {jobStatus && (
            <div className="space-y-6">
              <CrawlProgress 
                jobStatus={jobStatus} 
                onDownload={handleDownload}
                onPreview={handlePreview}
              />
              
              {(jobStatus.status === 'completed' || jobStatus.status === 'failed') && (
                <div className="text-center">
                  <button
                    onClick={handleReset}
                    className="text-primary-600 hover:text-primary-700 font-medium hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                    Convert another website
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* PDF Preview Modal */}
      {showPreview && jobStatus && (
        <PDFPreviewModal
          jobId={jobStatus.job_id}
          pdfUrl={previewPDF(jobStatus.job_id)}
          onClose={handleClosePreview}
          onDownload={handleDownload}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600 text-sm space-y-4">
            <div className="flex items-center justify-center gap-2">
              <FileCode className="w-4 h-4 text-primary-600" strokeWidth={2.5} />
              <p className="font-medium text-gray-700">
                Built with ❤️ for developers, researchers, and teams who need reliable knowledge snapshots.
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-700 font-medium">
                Created by Ishan Chakraborty
              </p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://github.com/Ishan96Dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/ishan-chakraborty-0085571a1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </div>
            
            <p className="text-gray-500">
              Open source • MIT License • Respects robots.txt
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
