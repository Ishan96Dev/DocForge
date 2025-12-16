import React from 'react';
import { AnalyzeResponse, CrawlMode } from '../types';
import { CheckCircle, Globe, FileText, AlertCircle, AlertTriangle, Info, ArrowLeft } from 'lucide-react';

interface AnalysisResultProps {
  result: AnalyzeResponse;
  onStartCrawl: (mode: CrawlMode, maxUrls: number, sitemapUrl?: string) => void;
  isLoading: boolean;
  onBack?: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ 
  result, 
  onStartCrawl, 
  isLoading,
  onBack
}) => {
  const [maxUrls, setMaxUrls] = React.useState(100);
  
  const getModeLabel = (mode: CrawlMode): string => {
    const labels = {
      [CrawlMode.AUTO]: 'Auto-detect',
      [CrawlMode.SITEMAP_URL]: 'Sitemap Crawl',
      [CrawlMode.RECURSIVE]: 'Recursive Crawl',
      [CrawlMode.SINGLE_PAGE]: 'Single Page',
      [CrawlMode.SITEMAP_UPLOAD]: 'Upload Sitemap',
    };
    return labels[mode];
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Back Button */}
      {onBack && (
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>
      )}
      
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-7 h-7" strokeWidth={2.5} />
          <h3 className="text-xl font-semibold">Analysis Complete</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Site Info */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" strokeWidth={2.5} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500">Website</p>
              <p className="font-medium text-gray-900 truncate">{result.title || 'Untitled'}</p>
              <p className="text-sm text-gray-600 truncate">{result.url}</p>
            </div>
          </div>

          {result.description && (
            <p className="text-gray-700 text-sm leading-relaxed pl-8">
              {result.description}
            </p>
          )}
        </div>

        {/* Detection Results */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Suggested Strategy:</span>
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              {getModeLabel(result.suggested_mode)}
            </span>
          </div>

          {result.sitemap_detected?.valid && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <CheckCircle className="w-4 h-4" strokeWidth={2.5} />
                <span className="font-medium">Sitemap detected</span>
              </div>
              <div className="pl-6 space-y-1 text-sm text-gray-600">
                <p>• Source: {result.sitemap_detected.source}</p>
                <p>• Estimated pages: {result.sitemap_detected.url_count}</p>
              </div>
            </div>
          )}

          {result.estimated_pages && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FileText className="w-4 h-4" strokeWidth={2.5} />
              <span>Approximately {result.estimated_pages} pages found</span>
            </div>
          )}
        </div>

        {/* Page Limit Control */}
        {result.suggested_mode !== CrawlMode.SINGLE_PAGE && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-5 space-y-3 border border-purple-100">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">
                Maximum Pages to Scrape
              </label>
              <span className="text-2xl font-bold text-primary-600">{maxUrls}</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={maxUrls}
              onChange={(e) => setMaxUrls(Number(e.target.value))}
              disabled={isLoading}
              className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer accent-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(to right, #667eea 0%, #667eea ${((maxUrls - 10) / 490) * 100}%, #e5e7eb ${((maxUrls - 10) / 490) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-600 px-1">
              <span>10 pages</span>
              <span>250 pages</span>
              <span>500 pages</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed bg-blue-50 p-3 rounded-lg border border-blue-100">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <p>
                <span className="font-semibold text-blue-800">Pro Tip:</span> Control how many pages you want to scrape. Higher values take longer but capture more content. <span className="font-medium">Recommended: 50-150 pages</span> for most documentation sites.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={() => onStartCrawl(
              result.suggested_mode,
              maxUrls,
              result.sitemap_detected?.url
            )}
            disabled={isLoading}
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Starting crawl...
              </>
            ) : (
              <>Use detected strategy</>
            )}
          </button>

          <div className="flex gap-3">
            {result.suggested_mode !== CrawlMode.RECURSIVE && (
              <button
                onClick={() => onStartCrawl(CrawlMode.RECURSIVE, maxUrls)}
                disabled={isLoading}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 transition-colors"
              >
                Use recursive crawl instead
              </button>
            )}
            
            <button
              onClick={() => onStartCrawl(CrawlMode.SINGLE_PAGE, 1)}
              disabled={isLoading}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 transition-colors"
            >
              Crawl single page only
            </button>
          </div>
        </div>

        {/* Info Notice */}
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" strokeWidth={2.5} />
            <div className="space-y-1">
              <p className="font-medium text-blue-800">Crawl Modes:</p>
              <ul className="space-y-0.5 text-gray-700">
                <li>• <strong>Detected strategy:</strong> Uses the recommended method for this site</li>
                <li>• <strong>Recursive crawl:</strong> Follows links from the starting page</li>
                <li>• <strong>Single page only:</strong> Captures just this one page without following links</li>
              </ul>
              <p className="mt-2 text-xs">All crawls respect robots.txt and rate limits.</p>
            </div>
          </div>
          
          {/* Warning about blocked websites */}
          <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
            <div>
              <p className="font-medium mb-1">Important Note:</p>
              <p className="text-xs text-amber-600">
                Some websites may block scraping due to security policies, rate limiting, or anti-bot protection. 
                If crawling fails, the website may be restricting automated access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
