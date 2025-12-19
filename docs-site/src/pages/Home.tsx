import { Link } from 'react-router-dom';
import { FileCode, Zap, Shield, BookOpen, ArrowRight, Sparkles, FileText, Archive, Database } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden pb-12">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative text-center space-y-10 py-12">
          {/* Main Hero Content */}
          <div className="space-y-6 animate-fade-in">
            {/* Logo/Brand */}
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

            {/* Tagline */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary-600 animate-pulse" strokeWidth={2.5} />
              <p className="text-xl md:text-2xl text-gray-700 font-semibold">
                Transform websites into pristine PDFs
              </p>
              <Sparkles className="w-5 h-5 text-primary-600 animate-pulse" strokeWidth={2.5} />
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Intelligent web crawler that converts documentation, articles, and websites into{' '}
              <span className="text-primary-600 font-semibold">beautifully formatted PDFs</span> with 
              table of contents, preserved styling, and professional output.
            </p>

            {/* CTA Button */}
            <Link
              to="/getting-started"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </Link>

            {/* CTA Pills */}
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

          {/* Video Demo Section */}
          <div className="max-w-4xl mx-auto pt-12 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
                <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent">
                  See DocForge in Action
                </span>
              </h2>
              <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{paddingBottom: '44.6875%', height: 0}}>
                <iframe 
                  src="https://www.loom.com/embed/a03797b7c48d482ba5c11088c42c3898" 
                  frameBorder="0" 
                  allowFullScreen
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                  title="DocForge Demo Video"
                />
              </div>
              <p className="text-center text-gray-600 mt-4 text-sm">
                Watch how easy it is to convert any website into a professional PDF
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6">
            {/* Feature 1 - Smart Detection */}
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
                <Link
                  to="/features"
                  className="mt-4 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:underline"
                >
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            {/* Feature 2 - Ethical Crawling */}
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
                <Link
                  to="/features"
                  className="mt-4 flex items-center text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:underline"
                >
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            {/* Feature 3 - Professional PDFs */}
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
                <Link
                  to="/features"
                  className="mt-4 flex items-center text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:underline"
                >
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>

          {/* Perfect For Section */}
          <div className="max-w-5xl mx-auto pt-12">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6 text-center">Perfect For</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Documentation */}
              <div className="group bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-blue-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Documentation</p>
                </div>
              </div>

              {/* Research Papers */}
              <div className="group bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-6 hover:shadow-lg hover:border-green-400 transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-green-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Research Papers</p>
                </div>
              </div>

              {/* Blog Archives */}
              <div className="group bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-400 transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-purple-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Archive className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Blog Archives</p>
                </div>
              </div>

              {/* Knowledge Bases */}
              <div className="group bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg hover:border-orange-400 transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-orange-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Database className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Knowledge Bases</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="max-w-2xl mx-auto pt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/getting-started"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-white border border-primary-200 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300 group"
                >
                  <span className="font-medium text-gray-900">Getting Started</span>
                  <ArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </Link>
                <Link
                  to="/user-guide"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-white border border-purple-200 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300 group"
                >
                  <span className="font-medium text-gray-900">User Guide</span>
                  <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
