import { Link, useLocation } from 'react-router-dom';
import { FileCode, Github, Linkedin } from 'lucide-react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="https://ishan96dev.github.io/DocForge/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group cursor-pointer"
              aria-label="Go to DocForge Application"
            >
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-2 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <FileCode className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors">
                DocForge
              </span>
            </a>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === '/' ? 'text-primary-600' : 'text-gray-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/getting-started"
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === '/getting-started' ? 'text-primary-600' : 'text-gray-600'
                }`}
              >
                Getting Started
              </Link>
              <Link
                to="/user-guide"
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === '/user-guide' ? 'text-primary-600' : 'text-gray-600'
                }`}
              >
                User Guide
              </Link>
              <Link
                to="/features"
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === '/features' ? 'text-primary-600' : 'text-gray-600'
                }`}
              >
                Features
              </Link>
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/ishan-chakraborty-0085571a1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-all duration-300 group"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden lg:inline text-sm">LinkedIn</span>
              </a>
              <a
                href="https://github.com/Ishan96Dev/DocForge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-all duration-300 group"
                aria-label="GitHub Repository"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden lg:inline text-sm">GitHub</span>
              </a>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex items-center gap-4 mt-4 overflow-x-auto">
            <Link
              to="/"
              className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-primary-600 ${
                location.pathname === '/' ? 'text-primary-600' : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/getting-started"
              className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-primary-600 ${
                location.pathname === '/getting-started' ? 'text-primary-600' : 'text-gray-600'
              }`}
            >
              Getting Started
            </Link>
            <Link
              to="/user-guide"
              className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-primary-600 ${
                location.pathname === '/user-guide' ? 'text-primary-600' : 'text-gray-600'
              }`}
            >
              User Guide
            </Link>
            <Link
              to="/features"
              className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-primary-600 ${
                location.pathname === '/features' ? 'text-primary-600' : 'text-gray-600'
              }`}
            >
              Features
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600 text-sm space-y-4">
            <div className="flex items-center justify-center gap-2">
              <FileCode className="w-4 h-4 text-primary-600" strokeWidth={2.5} />
              <p className="font-medium text-gray-700">
                Built with ❤️ for developers, researchers, and teams who need reliable knowledge snapshots.
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-700 font-medium">
                Created by Ishan Chakraborty
              </p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://github.com/Ishan96Dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/ishan-chakraborty-0085571a1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </div>
            
            <p className="text-gray-500">
              Open source • MIT License • Respects robots.txt
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
