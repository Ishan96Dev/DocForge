import { Zap, Shield, BookOpen, FileText, Globe, Target, Settings, Download, Check, Code, Palette, Gauge, Braces, Atom } from 'lucide-react';

export default function Features() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent">
            Features
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Powerful features designed to make web-to-PDF conversion seamless and professional
        </p>
      </div>

      {/* Main Features Grid */}
      <div className="space-y-8">
        {/* Smart Detection */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up">
          <div className="flex items-start gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg flex-shrink-0 hover:scale-110 hover:rotate-3 transition-all duration-300">
              <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Smart Detection</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                DocForge intelligently analyzes websites to determine the optimal crawling strategy. It automatically discovers sitemaps, 
                evaluates site structure, and selects the best approach for comprehensive content extraction.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:shadow-md hover:scale-105 hover:border-blue-300 transition-all duration-300 group">
                  <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Automatic Sitemap Discovery</p>
                    <p className="text-xs text-gray-600 mt-1">Finds and parses sitemaps automatically</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:shadow-md hover:scale-105 hover:border-blue-300 transition-all duration-300 group">
                  <Settings className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Adaptive Strategy Selection</p>
                    <p className="text-xs text-gray-600 mt-1">Chooses best crawl method per site</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Crawling */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.1s'}}>
          <div className="flex items-start gap-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl shadow-lg flex-shrink-0 hover:scale-110 hover:rotate-3 transition-all duration-300">
              <Shield className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Ethical Crawling</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Built with responsibility in mind, DocForge respects website policies and implements intelligent rate limiting. 
                It follows robots.txt rules, respects crawl delays, and ensures responsible data collection practices.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg hover:shadow-md hover:scale-105 hover:border-green-300 transition-all duration-300 group">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Robots.txt Compliance</p>
                    <p className="text-xs text-gray-600 mt-1">Honors all crawling rules</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg hover:shadow-md hover:scale-105 hover:border-green-300 transition-all duration-300 group">
                  <Gauge className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Rate Limiting</p>
                    <p className="text-xs text-gray-600 mt-1">Prevents server overload</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg hover:shadow-md hover:scale-105 hover:border-green-300 transition-all duration-300 group">
                  <Globe className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Web Standards</p>
                    <p className="text-xs text-gray-600 mt-1">Follows best practices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional PDF Output */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-start gap-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg flex-shrink-0 hover:scale-110 hover:rotate-3 transition-all duration-300">
              <BookOpen className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Professional PDF Output</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Generate beautifully formatted PDFs with automatic table of contents, preserved styling, and professional layout. 
                Every PDF is optimized for readability and includes essential navigation features.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2 p-3 bg-purple-50 border border-purple-200 rounded-lg hover:shadow-md hover:scale-105 hover:border-purple-300 transition-all duration-300 group">
                  <FileText className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Auto Table of Contents</p>
                    <p className="text-xs text-gray-600 mt-1">Clickable navigation throughout PDF</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-purple-50 border border-purple-200 rounded-lg hover:shadow-md hover:scale-105 hover:border-purple-300 transition-all duration-300 group">
                  <Palette className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Page Numbers & Headers</p>
                    <p className="text-xs text-gray-600 mt-1">Professional document structure</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-purple-50 border border-purple-200 rounded-lg hover:shadow-md hover:scale-105 hover:border-purple-300 transition-all duration-300 group">
                  <Palette className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Preserved Styling</p>
                    <p className="text-xs text-gray-600 mt-1">Maintains original formatting</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-purple-50 border border-purple-200 rounded-lg hover:shadow-md hover:scale-105 hover:border-purple-300 transition-all duration-300 group">
                  <Download className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Optimized File Size</p>
                    <p className="text-xs text-gray-600 mt-1">Compressed for easy sharing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multiple Crawl Strategies */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.3s'}}>
          <div className="flex items-start gap-6">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-4 rounded-2xl shadow-lg flex-shrink-0 hover:scale-110 hover:rotate-3 transition-all duration-300">
              <Target className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Multiple Crawl Strategies</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Choose from three powerful crawling methods tailored to different website structures and your specific needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Sitemap Crawl */}
                <div className="group bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-400 hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-blue-500 p-3 rounded-xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 inline-block">
                    <Globe className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Sitemap Crawl</h3>
                  <p className="text-sm text-gray-600">Uses website's sitemap for comprehensive and efficient crawling</p>
                </div>

                {/* Recursive Crawl */}
                <div className="group bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-6 hover:shadow-lg hover:border-green-400 hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-green-500 p-3 rounded-xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 inline-block">
                    <Target className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Recursive Crawl</h3>
                  <p className="text-sm text-gray-600">Automatically follows links to discover interconnected pages</p>
                </div>

                {/* Single Page */}
                <div className="group bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-400 hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-purple-500 p-3 rounded-xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 inline-block">
                    <FileText className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Single Page</h3>
                  <p className="text-sm text-gray-600">Convert just one page quickly without following links</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Progress */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.4s'}}>
          <div className="flex items-start gap-6">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl shadow-lg flex-shrink-0 hover:scale-110 hover:rotate-3 transition-all duration-300">
              <Settings className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Real-time Progress Tracking</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Monitor every step of the conversion process with detailed logs, progress indicators, and live status updates.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg hover:shadow-md hover:scale-105 hover:border-orange-300 transition-all duration-300 group">
                  <Gauge className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Live Progress Bar</p>
                    <p className="text-xs text-gray-600 mt-1">Visual tracking of crawl progress</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg hover:shadow-md hover:scale-105 hover:border-orange-300 transition-all duration-300 group">
                  <Code className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Detailed Logs</p>
                    <p className="text-xs text-gray-600 mt-1">See each page being processed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Built with Modern Tech */}
      <div className="mt-12 bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-primary-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Built with Modern Technology</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="group bg-white/80 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-200">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl mb-3 inline-block group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Braces className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <p className="font-semibold text-gray-900">Python</p>
            <p className="text-xs text-gray-600 mt-1">FastAPI Backend</p>
          </div>
          <div className="group bg-white/80 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-200">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl mb-3 inline-block group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Atom className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <p className="font-semibold text-gray-900">React</p>
            <p className="text-xs text-gray-600 mt-1">Modern UI</p>
          </div>
          <div className="group bg-white/80 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-200">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl mb-3 inline-block group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Globe className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <p className="font-semibold text-gray-900">Playwright</p>
            <p className="text-xs text-gray-600 mt-1">Web Scraping</p>
          </div>
          <div className="group bg-white/80 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-200">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl mb-3 inline-block group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <FileText className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <p className="font-semibold text-gray-900">WeasyPrint</p>
            <p className="text-xs text-gray-600 mt-1">PDF Generation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
