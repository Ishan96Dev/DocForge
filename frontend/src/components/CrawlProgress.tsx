import React, { useEffect, useRef } from 'react';
import { JobStatusResponse, CrawlStatus } from '../types';
import { CheckCircle, XCircle, Loader, FileText, Download, Eye } from 'lucide-react';

interface CrawlProgressProps {
  jobStatus: JobStatusResponse;
  onDownload?: () => void;
  onPreview?: () => void;
}

export const CrawlProgress: React.FC<CrawlProgressProps> = ({ jobStatus, onDownload, onPreview }) => {
  const logsEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll logs to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [jobStatus.logs]);
  const getStatusColor = (status: CrawlStatus): string => {
    const colors = {
      [CrawlStatus.PENDING]: 'bg-gray-500',
      [CrawlStatus.ANALYZING]: 'bg-blue-500',
      [CrawlStatus.CRAWLING]: 'bg-primary-500',
      [CrawlStatus.PROCESSING]: 'bg-purple-500',
      [CrawlStatus.GENERATING]: 'bg-indigo-500',
      [CrawlStatus.COMPLETED]: 'bg-green-500',
      [CrawlStatus.FAILED]: 'bg-red-500',
    };
    return colors[status];
  };

  const isInProgress = ![CrawlStatus.COMPLETED, CrawlStatus.FAILED].includes(jobStatus.status);
  const isCompleted = jobStatus.status === CrawlStatus.COMPLETED;
  const isFailed = jobStatus.status === CrawlStatus.FAILED;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`${getStatusColor(jobStatus.status)} text-white px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isInProgress && <Loader className="w-7 h-7 animate-spin" strokeWidth={2.5} />}
            {isCompleted && <CheckCircle className="w-7 h-7" strokeWidth={2.5} />}
            {isFailed && <XCircle className="w-7 h-7" strokeWidth={2.5} />}
            <h3 className="text-xl font-semibold">
              {isCompleted ? 'Export Complete!' : isFailed ? 'Export Failed' : 'Processing...'}
            </h3>
          </div>
          <span className="text-sm font-medium">
            {jobStatus.progress.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      {isInProgress && (
        <div className="bg-gray-200 h-2">
          <div
            className={`${getStatusColor(jobStatus.status)} h-full transition-all duration-300 ease-out`}
            style={{ width: `${jobStatus.progress}%` }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Current Step */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Current Step</p>
          <p className="text-lg font-medium text-gray-900">{jobStatus.current_step}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">Pages Found</p>
            <p className="text-2xl font-bold text-gray-900">{jobStatus.pages_found}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">Pages Processed</p>
            <p className="text-2xl font-bold text-gray-900">{jobStatus.pages_processed}</p>
          </div>
        </div>

        {/* Activity Logs */}
        {jobStatus.logs && jobStatus.logs.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Activity Log</p>
            <div className="max-h-48 overflow-y-auto bg-gray-900 rounded-xl p-4 space-y-1 scroll-smooth">
              {jobStatus.logs.slice(-20).map((log, idx) => (
                <div
                  key={idx}
                  className="text-xs font-mono text-green-400 opacity-90 hover:opacity-100 transition-opacity"
                >
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        )}

        {/* Pages List */}
        {jobStatus.pages.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Discovered Pages</p>
            <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
              {jobStatus.pages.map((page, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-md"
                >
                  <FileText className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0 group-hover:text-primary-600 transition-colors" strokeWidth={2.5} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {page.title || 'Untitled'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{page.url}</p>
                    {page.word_count && (
                      <p className="text-xs text-gray-400 mt-1">
                        ~{page.word_count} words
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {page.status === 'success' && (
                      <CheckCircle className="w-4 h-4 text-green-500" strokeWidth={2.5} />
                    )}
                    {page.status === 'failed' && (
                      <XCircle className="w-4 h-4 text-red-500" strokeWidth={2.5} />
                    )}
                    {page.status === 'pending' && (
                      <Loader className="w-4 h-4 text-gray-400 animate-spin" strokeWidth={2.5} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {isFailed && jobStatus.error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800">{jobStatus.error}</p>
          </div>
        )}

        {/* Preview and Download Buttons */}
        {isCompleted && (onPreview || onDownload) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Preview Button */}
            {onPreview && (
              <button
                onClick={onPreview}
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-3 group"
              >
                <Eye className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                Preview PDF
              </button>
            )}
            
            {/* Download Button */}
            {onDownload && (
              <button
                onClick={onDownload}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-3 group"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                Download PDF
              </button>
            )}
          </div>
        )}

        {/* Time Info */}
        <div className="text-xs text-gray-500 text-center">
          Started: {new Date(jobStatus.created_at).toLocaleString()}
          {jobStatus.completed_at && (
            <> • Completed: {new Date(jobStatus.completed_at).toLocaleString()}</>
          )}
        </div>
      </div>
    </div>
  );
};
