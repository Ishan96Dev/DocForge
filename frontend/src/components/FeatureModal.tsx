import React from 'react';
import { X, Zap, Shield, BookOpen, Check } from 'lucide-react';

interface FeatureModalProps {
  feature: 'smart-detection' | 'ethical-crawling' | 'professional-pdfs' | null;
  onClose: () => void;
}

export const FeatureModal: React.FC<FeatureModalProps> = ({ feature, onClose }) => {
  if (!feature) return null;

  const featureContent = {
    'smart-detection': {
      icon: Zap,
      title: 'Smart Detection',
      color: 'blue',
      description: 'Our intelligent detection system automatically analyzes your target website to determine the best crawling strategy.',
      features: [
        'Automatic Sitemap Discovery - Scans for XML sitemaps and sitemap index files',
        'Site Structure Analysis - Examines navigation patterns and link hierarchy',
        'Optimal Strategy Selection - Chooses between sitemap, recursive, or hybrid crawling',
        'robots.txt Validation - Ensures compliance before starting',
        'Performance Estimation - Predicts crawl time and page count',
        'Adaptive Behavior - Adjusts strategy based on site characteristics'
      ]
    },
    'ethical-crawling': {
      icon: Shield,
      title: 'Ethical Crawling',
      color: 'green',
      description: 'We prioritize responsible web crawling that respects website owners and follows industry best practices.',
      features: [
        'robots.txt Compliance - Strictly follows crawl permissions and restrictions',
        'Intelligent Rate Limiting - Prevents server overload with adaptive delays',
        'Canonical URL Respect - Honors preferred page versions',
        'User-Agent Identification - Clearly identifies as DocForge crawler',
        'Bandwidth Consideration - Minimizes impact on server resources',
        'Graceful Error Handling - Backs off on errors without bombarding servers'
      ]
    },
    'professional-pdfs': {
      icon: BookOpen,
      title: 'Professional PDFs',
      color: 'purple',
      description: 'Generate publication-quality PDFs with professional formatting and comprehensive features.',
      features: [
        'Beautiful Cover Pages - Branded, gradient-styled cover with metadata',
        'Automatic Table of Contents - Clickable links to all pages',
        'Preserved Styling - Maintains fonts, colors, and layout',
        'Page Numbers - Professional footer pagination',
        'Optimized Images - Compressed without quality loss',
        'Clean Typography - Readable fonts with proper spacing'
      ]
    }
  };

  const content = featureContent[feature];
  const Icon = content.icon;
  const colorClasses: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600 border-blue-200',
    green: 'from-green-500 to-green-600 border-green-200',
    purple: 'from-purple-500 to-purple-600 border-purple-200'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`relative bg-gradient-to-br ${colorClasses[content.color]} p-8 text-white`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-all duration-300"
          >
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <Icon className="w-10 h-10" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{content.title}</h2>
              <p className="text-white/90 text-lg">{content.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Key Features</h3>
          <div className="space-y-4">
            {content.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 group">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${colorClasses[content.color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">{feature.split(' - ')[0]}</span>
                    {feature.includes(' - ') && <span> - {feature.split(' - ')[1]}</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};
