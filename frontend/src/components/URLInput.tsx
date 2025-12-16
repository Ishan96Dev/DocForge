import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface URLInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export const URLInput: React.FC<URLInputProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic URL validation
    try {
      new URL(url);
      onAnalyze(url);
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., https://docs.python.org)"
            className="w-full px-6 py-4 pr-14 text-lg border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !url}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-3 rounded-lg hover:bg-primary-700 hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200 animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
            <span>{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};
