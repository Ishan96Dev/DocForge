import React from 'react';
import { X, BookOpen, FileText, Archive, Database, Check, ArrowRight } from 'lucide-react';

interface UseCaseModalProps {
  useCase: 'documentation' | 'research-papers' | 'blog-archives' | 'knowledge-bases' | null;
  onClose: () => void;
}

export const UseCaseModal: React.FC<UseCaseModalProps> = ({ useCase, onClose }) => {
  if (!useCase) return null;

  const useCaseContent = {
    'documentation': {
      icon: BookOpen,
      title: 'Documentation',
      color: 'blue',
      description: 'Convert technical documentation, API references, and software guides into portable, offline-accessible PDF formats.',
      benefits: [
        'Offline Access - Read documentation anywhere without internet connectivity',
        'Version Snapshots - Preserve specific documentation versions for reference',
        'Team Distribution - Share comprehensive guides with your entire team',
        'Print-Ready Format - Create physical copies for workshops and training',
        'Search & Archive - Build a searchable library of technical resources',
        'Cross-Platform - Access on any device that supports PDF files'
      ],
      examples: [
        'API Documentation (Stripe, Twilio, AWS)',
        'Framework Guides (React, Vue, Angular)',
        'Software Manuals (Adobe, Microsoft)',
        'Developer Tutorials and Getting Started Guides'
      ]
    },
    'research-papers': {
      icon: FileText,
      title: 'Research Papers',
      color: 'green',
      description: 'Aggregate and compile online research articles, academic papers, and scholarly content into organized PDF collections.',
      benefits: [
        'Citation Management - Maintain proper references and sources',
        'Literature Review - Compile multiple papers into one document',
        'Annotation Ready - Add notes and highlights to your PDFs',
        'Academic Integrity - Preserve original formatting and attribution',
        'Organized Collections - Create topic-based research bundles',
        'Accessibility - Read papers on e-readers and tablets'
      ],
      examples: [
        'arXiv Papers and Preprints',
        'Journal Articles (JSTOR, PubMed)',
        'Conference Proceedings',
        'University Research Publications'
      ]
    },
    'blog-archives': {
      icon: Archive,
      title: 'Blog Archives',
      color: 'purple',
      description: 'Archive blog posts, article series, and web content before they disappear or get updated, preserving them for future reference.',
      benefits: [
        'Content Preservation - Save articles before they\'re removed or changed',
        'Series Compilation - Combine blog series into single documents',
        'Offline Reading - Read your favorite blogs during commutes',
        'Portfolio Building - Create archives of your own published work',
        'Educational Resources - Compile tutorials and guides for students',
        'Historical Records - Maintain snapshots of web content over time'
      ],
      examples: [
        'Medium Articles and Publications',
        'Tech Blogs (CSS-Tricks, Smashing Magazine)',
        'Personal Blogs and Essay Collections',
        'News Articles and Opinion Pieces'
      ]
    },
    'knowledge-bases': {
      icon: Database,
      title: 'Knowledge Bases',
      color: 'orange',
      description: 'Transform internal wikis, help centers, and knowledge repositories into comprehensive PDF guides for your team or organization.',
      benefits: [
        'Onboarding Materials - Create comprehensive training documents',
        'Process Documentation - Standardize procedures across teams',
        'Backup & Disaster Recovery - Maintain offline copies of critical info',
        'Compliance & Auditing - Archive policy documents with timestamps',
        'Client Deliverables - Package knowledge base content for clients',
        'Internal Distribution - Share company wikis without web access'
      ],
      examples: [
        'Confluence Wiki Pages',
        'Notion Documentation',
        'Help Scout Knowledge Bases',
        'Internal Company Wikis and SOPs'
      ]
    }
  };

  const content = useCaseContent[useCase];
  const Icon = content.icon;
  const colorClasses: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600 border-blue-200',
    green: 'from-green-500 to-green-600 border-green-200',
    purple: 'from-purple-500 to-purple-600 border-purple-200',
    orange: 'from-orange-500 to-orange-600 border-orange-200'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
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
        <div className="p-8 space-y-8">
          {/* Benefits Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Check className="w-6 h-6 text-green-600" strokeWidth={2.5} />
              Why Use DocForge for {content.title}?
            </h3>
            <div className="grid gap-4">
              {content.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${colorClasses[content.color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-semibold text-gray-900">{benefit.split(' - ')[0]}</span>
                      {benefit.includes(' - ') && <span> - {benefit.split(' - ')[1]}</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Examples Section */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-primary-600" strokeWidth={2.5} />
              Popular Use Cases
            </h3>
            <ul className="space-y-2">
              {content.examples.map((example, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className={`w-full bg-gradient-to-r ${colorClasses[content.color]} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300`}
          >
            Start Converting Now
          </button>
        </div>
      </div>
    </div>
  );
};
