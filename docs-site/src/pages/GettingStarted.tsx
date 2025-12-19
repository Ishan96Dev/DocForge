import { Terminal, Package, Play, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

export default function GettingStarted() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent">
            Getting Started
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Quick installation guide to get DocForge up and running on your machine
        </p>
      </div>

      {/* Installation Steps */}
      <div className="space-y-8">
        {/* Prerequisites */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md flex-shrink-0">
              <Info className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h2>
              <p className="text-gray-600 mb-4">Before you begin, make sure you have the following installed:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span><strong>Python 3.8+</strong> - Backend server and PDF generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span><strong>Node.js 18+</strong> - Frontend development</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span><strong>Git</strong> - Version control</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step 1: Clone Repository */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-md flex-shrink-0">
              <Terminal className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  1
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Clone the Repository</h2>
              </div>
              <p className="text-gray-600 mb-4">Get the source code from GitHub:</p>
              <CodeBlock>
{`git clone https://github.com/Ishan96Dev/DocForge.git
cd DocForge`}
              </CodeBlock>
            </div>
          </div>
        </div>

        {/* Step 2: Backend Setup */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.1s'}}>
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-md flex-shrink-0">
              <Package className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  2
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Set Up Backend</h2>
              </div>
              <p className="text-gray-600 mb-4">Install Python dependencies and configure the backend:</p>
              <CodeBlock>
{`# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\\Scripts\\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt`}
              </CodeBlock>
            </div>
          </div>
        </div>

        {/* Step 3: Frontend Setup */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md flex-shrink-0">
              <Package className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  3
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Set Up Frontend</h2>
              </div>
              <p className="text-gray-600 mb-4">Install Node.js dependencies for the frontend:</p>
              <CodeBlock>
{`# Navigate to frontend directory (from backend)
cd ../frontend

# Install dependencies
npm install`}
              </CodeBlock>
            </div>
          </div>
        </div>

        {/* Step 4: Run the Application */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.3s'}}>
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-md flex-shrink-0">
              <Play className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  4
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Run the Application</h2>
              </div>
              <p className="text-gray-600 mb-4">Start both backend and frontend servers:</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">Start Backend Server:</h3>
              <CodeBlock>
{`# In the backend directory
python main.py

# Server will run on http://localhost:8000`}
              </CodeBlock>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">Start Frontend (in a new terminal):</h3>
              <CodeBlock>
{`# In the frontend directory
npm run dev

# Frontend will run on http://localhost:5173`}
              </CodeBlock>

              <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-green-800">Success!</p>
                    <p className="text-sm text-green-700 mt-1">
                      Open <code className="bg-green-100 px-2 py-1 rounded text-green-900">http://localhost:5173</code> in your browser to use DocForge
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start with Scripts */}
        <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-primary-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start with Scripts</h2>
          <p className="text-gray-600 mb-4">For convenience, you can use these scripts to start both servers:</p>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Windows:</h3>
          <CodeBlock>
{`# Run from project root
.\\dev.bat`}
          </CodeBlock>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">macOS/Linux:</h3>
          <CodeBlock>
{`# Run from project root
chmod +x dev.ps1
./dev.ps1`}
          </CodeBlock>
        </div>

        {/* Troubleshooting */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-md flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Port Already in Use:</h3>
                  <p>If port 8000 or 5173 is already in use, you can change the port in the configuration files or kill the process using that port.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Dependencies Installation Failed:</h3>
                  <p>Make sure you're using compatible Python (3.8+) and Node.js (18+) versions. Try updating pip: <code className="bg-gray-100 px-2 py-1 rounded text-gray-900">pip install --upgrade pip</code></p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Backend Connection Error:</h3>
                  <p>Ensure the backend server is running before starting the frontend. Check that there are no firewall blocks on port 8000.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
