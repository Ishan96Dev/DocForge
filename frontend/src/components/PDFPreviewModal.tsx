import React from 'react';
import { X, Download, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

interface PDFPreviewModalProps {
  jobId: string;
  pdfUrl: string;
  onClose: () => void;
  onDownload: () => void;
}

export const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({ 
  jobId, 
  pdfUrl, 
  onClose, 
  onDownload 
}) => {
  const [zoom, setZoom] = React.useState(100);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="flex items-center gap-3">
            <Maximize2 className="w-5 h-5 text-white" strokeWidth={2.5} />
            <h2 className="text-xl font-bold text-white">PDF Preview</h2>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 50}
                className="text-white hover:bg-white/20 p-1 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <span className="text-white text-sm font-medium min-w-[3rem] text-center">
                {zoom}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 200}
                className="text-white hover:bg-white/20 p-1 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={onDownload}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Download className="w-4 h-4" strokeWidth={2.5} />
              Download
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300"
              title="Close"
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden bg-gray-800 p-4">
          <div className="h-full w-full bg-gray-900 rounded-lg shadow-inner overflow-auto">
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              style={{ 
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s ease-out',
                minHeight: '700px',
                backgroundColor: '#1f2937'
              }}
              title="PDF Preview"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-center">
          <p className="text-sm text-gray-600">
            Job ID: <span className="font-mono text-gray-800">{jobId}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
