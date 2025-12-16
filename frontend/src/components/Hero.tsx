import React, { useState } from 'react';
import { FileCode, Zap, Shield, ArrowRight, Sparkles, BookOpen, Search, AlertCircle, FileText, Archive, Database } from 'lucide-react';
import { FeatureModal } from './FeatureModal';
import { UseCaseModal } from './UseCaseModal';

interface HeroProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [selectedFeature, setSelectedFeature] = useState<'smart-detection' | 'ethical-crawling' | 'professional-pdfs' | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<'documentation' | 'research-papers' | 'blog-archives' | 'knowledge-bases' | null>(null);

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
    <div className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative text-center space-y-10 py-12">
        {/* Main Hero Section */}
        <div className="space-y-6 animate-fade-in">
          {/* Logo/Brand with premium design */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary-600 to-primary-700 p-4 rounded-2xl shadow-2xl hover:shadow-primary-500/50 transition-all duration-500 hover:scale-105">
                <FileCode className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Main Heading with gradient */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 pb-2">
            <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent inline-block leading-tight" style={{paddingBottom: '0.1em'}}>
              DocForge
            </span>
          </h1>

          {/* Tagline with icon */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary-600 animate-pulse" strokeWidth={2.5} />
            <p className="text-xl md:text-2xl text-gray-700 font-semibold">
              Transform websites into pristine PDFs
            </p>
            <Sparkles className="w-5 h-5 text-primary-600 animate-pulse" strokeWidth={2.5} />
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Intelligent web crawler that converts documentation, articles, and websites into 
            <span className="text-primary-600 font-semibold"> beautifully formatted PDFs</span> with 
            table of contents, preserved styling, and professional output.
          </p>

          {/* URL Input - Primary CTA */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative group">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter website URL (e.g., https://docs.python.org)"
                  className="w-full px-6 py-4 pr-14 text-lg border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-200 outline-none transition-all shadow-sm group-hover:shadow-md disabled:bg-gray-50 disabled:cursor-not-allowed"
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
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </form>
          </div>

          {/* CTA Pills with Hover Effects */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <div className="group flex items-center gap-2 px-4 py-2 bg-green-50 border-2 border-green-200 rounded-full text-sm text-green-700 cursor-default hover:bg-green-100 hover:border-green-300 hover:scale-105 hover:shadow-md transition-all duration-300">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover:scale-125 transition-transform"></div>
              <span className="font-medium">Open Source</span>
            </div>
            <div className="group flex items-center gap-2 px-4 py-2 bg-blue-50 border-2 border-blue-200 rounded-full text-sm text-blue-700 cursor-default hover:bg-blue-100 hover:border-blue-300 hover:scale-105 hover:shadow-md transition-all duration-300">
              <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <span className="font-medium">Respects robots.txt</span>
            </div>
            <div className="group flex items-center gap-2 px-4 py-2 bg-purple-50 border-2 border-purple-200 rounded-full text-sm text-purple-700 cursor-default hover:bg-purple-100 hover:border-purple-300 hover:scale-105 hover:shadow-md transition-all duration-300">
              <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <span className="font-medium">Lightning Fast</span>
            </div>
          </div>
        </div>

        {/* Features Grid with new design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6">
          {/* Feature 1 */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Smart Detection
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically discovers sitemaps, analyzes site structure, and selects the optimal crawling strategy for best results.
              </p>
              <button
                onClick={() => setSelectedFeature('smart-detection')}
                className="mt-4 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:underline"
              >
                <span className="text-sm">Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-green-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Shield className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                Ethical Crawling
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Respects robots.txt, implements intelligent rate limiting, and follows all web standards to ensure responsible data collection.
              </p>
              <button
                onClick={() => setSelectedFeature('ethical-crawling')}
                className="mt-4 flex items-center text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:underline"
              >
                <span className="text-sm">Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-purple-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <BookOpen className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                Professional PDFs
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Generate clean, well-formatted PDFs with automatic table of contents, page numbers, and preserved styling for perfect output.
              </p>
              <button
                onClick={() => setSelectedFeature('professional-pdfs')}
                className="mt-4 flex items-center text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:underline"
              >
                <span className="text-sm">Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="max-w-5xl mx-auto pt-12">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6 text-center">Perfect For</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button
              onClick={() => setSelectedUseCase('documentation')}
              className="group bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="bg-blue-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-sm font-semibold text-gray-900">Documentation</p>
                <div className="flex items-center text-blue-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 ml-1" strokeWidth={2.5} />
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedUseCase('research-papers')}
              className="group bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-6 hover:shadow-lg hover:border-green-400 transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="bg-green-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-sm font-semibold text-gray-900">Research Papers</p>
                <div className="flex items-center text-green-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 ml-1" strokeWidth={2.5} />
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedUseCase('blog-archives')}
              className="group bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-400 transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="bg-purple-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Archive className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-sm font-semibold text-gray-900">Blog Archives</p>
                <div className="flex items-center text-purple-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 ml-1" strokeWidth={2.5} />
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedUseCase('knowledge-bases')}
              className="group bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg hover:border-orange-400 transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="bg-orange-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Database className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-sm font-semibold text-gray-900">Knowledge Bases</p>
                <div className="flex items-center text-orange-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 ml-1" strokeWidth={2.5} />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Modal */}
      <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
      
      {/* Use Case Modal */}
      <UseCaseModal useCase={selectedUseCase} onClose={() => setSelectedUseCase(null)} />
    </div>
  );
};
