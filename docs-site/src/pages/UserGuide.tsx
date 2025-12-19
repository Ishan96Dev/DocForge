import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function UserGuide() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent">
            User Guide
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Complete step-by-step guide to converting websites to PDF
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        {/* Step 1 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                1
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Enter Website URL</h2>
              <p className="text-gray-600 mb-6">
                Start by entering the URL of the website you want to convert to PDF.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 mb-4">
                <img
                  src="/DocForge/docs/screenshots/Link-input.png"
                  alt="URL Input Field"
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">Example: Enter any website URL to get started</p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <p className="text-sm text-blue-700">
                    <strong>Tip:</strong> Make sure to include the full URL with http:// or https://
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.1s'}}>
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-green-600 to-green-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                2
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Website Analysis</h2>
              <p className="text-gray-600 mb-6">
                DocForge automatically analyzes the website structure to determine the best crawling strategy.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 mb-4">
                <img
                  src="/DocForge/docs/screenshots/analyzing-website.png"
                  alt="Website Analysis"
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">The system analyzes the website structure</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <img
                  src="/DocForge/docs/screenshots/Analyze-complete-screen.png"
                  alt="Analysis Complete"
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">Analysis complete - showing detected strategy and page count</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                3
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Scraping Method</h2>
              <p className="text-gray-600 mb-6">
                Select your preferred crawling strategy based on the website structure:
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 mb-6">
                <img
                  src="/DocForge/docs/screenshots/Choose-your-Scrapping-method.png"
                  alt="Choose Scraping Method"
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">Available crawling strategies</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-lg hover:shadow-md hover:scale-105 hover:border-blue-300 transition-all duration-300 group">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-gray-900">Sitemap Crawl</p>
                    <p className="text-sm text-gray-600">Best for sites with sitemaps - fast and comprehensive</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-white border border-green-200 rounded-lg hover:shadow-md hover:scale-105 hover:border-green-300 transition-all duration-300 group">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-gray-900">Recursive Crawl</p>
                    <p className="text-sm text-gray-600">Follows links automatically - good for interconnected pages</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-white border border-purple-200 rounded-lg hover:shadow-md hover:scale-105 hover:border-purple-300 transition-all duration-300 group">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-gray-900">Single Page</p>
                    <p className="text-sm text-gray-600">Convert just one page - quick and simple</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.3s'}}>
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                4
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Set Maximum Pages</h2>
              <p className="text-gray-600 mb-6">
                Configure how many pages you want to scrape (optional - helps control PDF size).
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <img
                  src="/DocForge/docs/screenshots/Maximum-pages-to-scrape.png"
                  alt="Maximum Pages Configuration"
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">Set the maximum number of pages to scrape</p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg mt-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <p className="text-sm text-orange-700">
                    <strong>Note:</strong> Lower page limits result in faster processing and smaller PDF files
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.4s'}}>
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-pink-600 to-pink-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                5
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing & Logs</h2>
              <p className="text-gray-600 mb-6">
                Watch real-time progress as DocForge crawls pages and generates your PDF.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <img
                  src="/DocForge/docs/screenshots/Processing-scrapping-with-logs.png"
                  alt="Processing with Logs"
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">Real-time progress logs during scraping</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <p className="text-sm text-green-700">
                    <strong>Live Monitoring:</strong> Track each page being crawled and see progress statistics in real-time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 6 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.5s'}}>
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                6
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Preview & Download</h2>
              <p className="text-gray-600 mb-6">
                Once processing is complete, preview your PDF or download it directly.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                  <img
                    src="/DocForge/docs/screenshots/PDF-preview.png"
                    alt="PDF Preview"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">Preview your PDF before downloading</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                  <img
                    src="/DocForge/docs/screenshots/Download-PDF.png"
                    alt="Download PDF"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">Download your generated PDF</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-md flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Success!</h3>
                    <p className="text-gray-700">
                      Your PDF is ready with table of contents, page numbers, and preserved styling. 
                      Click "Download PDF" to save it to your device.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-primary-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pro Tips</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white/80 rounded-lg border border-primary-200 hover:shadow-md hover:scale-105 hover:border-primary-300 transition-all duration-300 group">
              <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <p className="text-gray-700">
                <strong>Sitemap URLs:</strong> If the auto-detection doesn't find a sitemap, you can manually provide the sitemap URL for better results
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white/80 rounded-lg border border-purple-200 hover:shadow-md hover:scale-105 hover:border-purple-300 transition-all duration-300 group">
              <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <p className="text-gray-700">
                <strong>Page Limits:</strong> Start with a smaller page limit (10-20) for testing, then increase for full documentation
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white/80 rounded-lg border border-blue-200 hover:shadow-md hover:scale-105 hover:border-blue-300 transition-all duration-300 group">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <p className="text-gray-700">
                <strong>Preview First:</strong> Always preview the PDF before downloading to ensure it meets your expectations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
