<div align="center">

# 📄 DocForge

### Intelligent Web-to-PDF Converter

**Transform any website into a beautiful, professional PDF document with just one click.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11+-green.svg)](https://www.python.org/)
[![React 18](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-teal.svg)](https://fastapi.tiangolo.com/)

🚀 **[Try Live App](https://ishan96dev.github.io/DocForge/)** 🚀

📚 **[Documentation Site](https://ishan96dev.github.io/DocForge/docs/)** 📚

[Quick Start](docs/QUICKSTART.md) | [Documentation](docs/INDEX.md) | [Deploy](docs/DEPLOYMENT.md) | [API Docs](docs/API.md) | [Architecture](docs/ARCHITECTURE.md) | [Contributing](CONTRIBUTING.md)

---

### 📸 Preview

<div align="center">
  <img src="screenshots/landing-page.png" alt="DocForge Landing Page" width="800">
  <p><em>DocForge's beautiful landing page - Transform websites into pristine PDFs</em></p>
</div>

</div>

---

## 📚 Quick Links

| Getting Started | Documentation | Development |
|----------------|---------------|-------------|
| [🌐 **Try Live App**](https://ishan96dev.github.io/DocForge/) | [📖 **Full Documentation Site**](https://ishan96dev.github.io/DocForge/docs/) | [🤝 Contributing](CONTRIBUTING.md) |
| [⚡ Quick Start](docs/QUICKSTART.md) | [🏗️ Architecture](docs/ARCHITECTURE.md) | [👥 Contributors](docs/CONTRIBUTORS.md) |
| [🚀 Deployment Guide](docs/DEPLOYMENT.md) | [📄 License](LICENSE) | [🐛 Report Issues](https://github.com/Ishan96Dev/DocForge/issues) |
| [🛠️ API Reference](docs/API.md) | [📚 Documentation Index](docs/INDEX.md) | [📖 Deploy Docs](DOCUMENTATION_DEPLOYMENT.md) |

---

## 🎯 What is DocForge?

**DocForge** is a powerful, free, open-source tool that converts entire websites into professional PDF documents. Whether you want to save online documentation, archive blog posts, or create offline copies of web content, DocForge does it all automatically with a beautiful, readable format.

Simply paste any website URL, and DocForge will:
- 🔍 **Analyze** the website structure  
- 🤖 **Crawl** all pages intelligently (using sitemaps when available)  
- 🎨 **Extract** clean content with images and links  
- 📑 **Generate** a professional PDF with table of contents  
- 👁️ **Preview** before downloading  

**No technical knowledge required** - just paste a URL and click!

### 🌐 Try It Now!

**Live Demo**: [https://ishan96dev.github.io/DocForge/](https://ishan96dev.github.io/DocForge/)

No installation needed - use DocForge directly in your browser!

---

## 💡 Why DocForge?

### Problems It Solves:

- **📚 Save Documentation**: Create offline backups of documentation that might change or disappear
- **🎓 Research & Study**: Convert online articles and tutorials into PDFs for offline reading
- **📖 Archive Blogs**: Save entire blog series as a single, searchable PDF document
- **💼 Professional Use**: Create polished PDF reports from web content for sharing with teams
- **🔒 Preserve Knowledge**: Capture important web content before it's gone
- **📱 Offline Access**: Read web content anywhere without internet connection

### What Makes DocForge Special:

✨ **Smart Crawling**: Automatically detects sitemaps and crawls efficiently  
🎨 **Beautiful Output**: Professional PDF design with proper formatting  
🖼️ **Image Preservation**: All images embedded directly in the PDF  
🔗 **Clickable Links**: Internal links work within the PDF  
📋 **Table of Contents**: Auto-generated navigation for easy browsing  
⚡ **Fast & Efficient**: Optimized crawling with rate limiting  
🎯 **Page Limit Control**: Choose how many pages to include (10-500 pages)  
👁️ **PDF Preview**: See your PDF before downloading  
🆓 **100% Free**: No subscriptions, no limits, completely open-source  

---
## 🎥 See DocForge in Action

<div align="center">

### 📹 Step-by-Step Video Guide

Watch this quick tutorial to see how easy it is to convert any website into a professional PDF:

[![DocForge Tutorial - Watch on Loom](https://img.shields.io/badge/▶️_Watch_Video-Loom-8B5CF6?style=for-the-badge&logo=loom&logoColor=white)](https://www.loom.com/share/a03797b7c48d482ba5c11088c42c3898)

*Learn how to use DocForge from URL input to PDF download in just a few minutes!*

</div>

---
## ✨ Features

### For Everyone:

- **🌐 Any Website**: Works with blogs, documentation sites, news sites, and more
- **🎯 One-Click Conversion**: Just paste URL and click analyze
- **📊 Progress Tracking**: Real-time progress updates during crawling
- **👁️ PDF Preview**: View your PDF in the browser before downloading
- **📥 Instant Download**: Get your PDF in seconds
- **🎨 Professional Design**: Beautiful cover page with site branding
- **📑 Auto Table of Contents**: Easy navigation between pages
- **🖼️ Image Support**: All images preserved and embedded
- **🔗 Hyperlinks**: External and internal links preserved
- **⚙️ Customizable**: Control page limits and crawl depth

### For Developers:

- **🛠️ REST API**: Full API access for automation
- **🐳 Docker Support**: Easy deployment with containers
- **📝 TypeScript Frontend**: Modern React 18 with full typing
- **⚡ FastAPI Backend**: High-performance Python backend
- **🎭 Playwright Integration**: Reliable browser automation
- **🔄 Async Processing**: Non-blocking crawl operations
- **📊 Real-time Updates**: WebSocket-style status streaming
- **🔧 Extensible**: Easy to add new features or export formats

---

## 🚀 Getting Started

### 🌟 Try It Live

Want to try DocForge without installing anything? Check out the [Live Demo](#) (coming soon)

### 💻 Run Locally

Want to run DocForge on your own machine? Follow these simple steps:

#### Prerequisites

Before you begin, make sure you have:
- **Python 3.11 or higher** - [Download Python](https://www.python.org/downloads/)
- **Node.js 18 or higher** - [Download Node.js](https://nodejs.org/)
- **Git** - [Download Git](https://git-scm.com/downloads)

#### Step 1: Clone the Repository

```bash
# Clone this repository
git clone https://github.com/Ishan96Dev/DocForge.git

# Navigate to project folder
cd DocForge
```

#### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Install Playwright browser (Chrome)
playwright install chromium

# Start the backend server
python start.py
```

✅ Backend should now be running at `http://localhost:8000`

#### Step 3: Setup Frontend

Open a **new terminal window** (keep backend running):

```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend should now be running at `http://localhost:3000`

#### Step 4: Use DocForge!

1. Open your browser and go to `http://localhost:3000`
2. Paste any website URL (try `https://example.com`)
3. Click "Analyze Website"
4. Review the detected pages
5. Click "Start Crawl"
6. Preview and download your PDF!

---

## 🐳 Run with Docker (Alternative)

If you prefer using Docker:

```bash
# Start both frontend and backend
docker-compose up

# Access the app at http://localhost:3000
```

---

## 🌐 Deploy to Production

Want to deploy DocForge for free and share it with others?

### **Free Deployment (Recommended)**

- **Backend**: [Render.com](https://render.com) (Free Docker hosting)
- **Frontend**: GitHub Pages (Free static hosting)
- **Total Cost**: $0/month 🎉

### Quick Deploy Guide

1. **Deploy Backend to Render.com** (5 minutes)
   - Sign up at [render.com](https://render.com) with GitHub
   - Create new Web Service → Connect your forked DocForge repository
   - Configure: Language: `Docker`, Root Directory: `backend`, Instance Type: `Free`
   - **Save your unique backend URL**: `https://your-app-name-xxxx.onrender.com`

2. **Configure Frontend** (2 minutes)
   - Edit `frontend/.env.production` in your repository
   - Add **your backend URL**: `VITE_API_URL=https://your-app-name-xxxx.onrender.com`
   - Commit and push to GitHub

3. **Deploy Frontend to GitHub Pages** (3 minutes)
   - Go to **your repo** Settings → Actions → General → Enable "Read and write permissions"
   - Go to Settings → Secrets → Add `VITE_API_URL` secret with **your backend URL**
   - Push your changes - deployment happens automatically
   - After first deploy, go to Settings → Pages → Source: "Deploy from a branch" → Branch: "gh-pages"
   - **Your app will be live at**: `https://your-username.github.io/DocForge/`

> **Note**: Replace `your-username` with your GitHub username and `your-app-name-xxxx` with your Render app URL.

### Need Help Deploying?

📖 **See the complete [Deployment Guide](docs/DEPLOYMENT.md)** for detailed instructions on:
- Backend deployment (Render.com)
- Frontend deployment (GitHub Pages)
- Environment configuration
- Troubleshooting common issues

### Alternative Deployment Options

- **Vercel**: Deploy both frontend and backend
- **Railway**: Alternative to Render.com ($5/month after trial)
- **DigitalOcean**: VPS deployment (requires more setup)

---

## 📖 Documentation

- **📚 [Full Documentation Index](docs/INDEX.md)** - Complete guide to all features
- **🚀 [Quick Start Guide](docs/QUICKSTART.md)** - Get started in 5 minutes
- **🏗️ [Architecture Overview](docs/ARCHITECTURE.md)** - How DocForge works
- **🌐 [Deployment Guide](docs/DEPLOYMENT.md)** - Deploy to production for free
- **🛠️ [API Documentation](docs/API.md)** - REST API reference
- **🤝 [Contributing Guide](CONTRIBUTING.md)** - Help improve DocForge

---

## 🎨 How It Works

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│  Enter URL  │ ───► │   Analyze    │ ───► │   Detect    │
│             │      │   Website    │      │   Sitemap   │
└─────────────┘      └──────────────┘      └─────────────┘
                                                    │
┌─────────────┐      ┌──────────────┐             │
│   Preview   │ ◄─── │   Generate   │ ◄─── │      │
│  Download   │      │     PDF      │      │      │
└─────────────┘      └──────────────┘      │      │
                             ▲              ▼      │
                             │       ┌─────────────┐
                             │       │    Crawl    │
                             │       │    Pages    │
                             │       └─────────────┘
                             │              │
                             │              ▼
                             │       ┌─────────────┐
                             └────── │   Extract   │
                                     │   Content   │
                                     └─────────────┘
```

1. **Analysis**: DocForge examines the website structure
2. **Detection**: Finds sitemaps automatically (if available)
3. **Crawling**: Intelligently crawls all pages with rate limiting
4. **Extraction**: Cleans and extracts readable content
5. **Generation**: Creates beautiful PDF with table of contents
6. **Preview**: View the PDF before downloading

---

## 🛠️ Tech Stack

**Backend**
- Python 3.11+ - Core language
- FastAPI - Modern REST API framework
- Playwright - Headless browser automation
- BeautifulSoup4 - HTML parsing and cleanup
- Pillow - Image processing
- ChromePDF - PDF generation via Chromium

**Frontend**
- React 18 - Modern UI library
- TypeScript - Type-safe development
- Vite - Lightning-fast build tool
- Tailwind CSS - Utility-first styling
- TanStack Query - Data fetching and caching
- Lucide React - Beautiful icons
- Axios - HTTP client

**DevOps**
- Docker - Containerization
- GitHub Actions - CI/CD automation
- Render.com - Backend hosting
- GitHub Pages - Frontend hosting

---

## 📱 Usage Examples

### Save Documentation

```
1. Paste documentation URL (e.g., https://docs.python.org)
2. DocForge detects sitemap automatically
3. Choose page limit (e.g., 50 pages)
4. Preview and download PDF
```

### Archive Blog Series

```
1. Enter blog URL or tag page
2. DocForge crawls all articles
3. Creates single PDF with table of contents
4. All images and links preserved
```

### Create Study Material

```
1. Paste tutorial or course URL
2. Set page limit based on content
3. Generate PDF with chapters
4. Study offline anytime
```

---

## ⚙️ Configuration

### Environment Variables

**Backend** (`backend/.env`)
```env
API_HOST=0.0.0.0
API_PORT=8000
MAX_URLS=500
MAX_DEPTH=5
REQUEST_DELAY=1.0
EXPORT_DIR=./exports
```

**Frontend** (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8000
```

### Advanced Settings

Available in the UI:
- **Page Limit**: 10-500 pages (slider control)
- **Crawl Mode**: Auto, Sitemap, or Recursive
- **Image Inclusion**: Toggle image embedding
- **Rate Limiting**: Automatic (respects robots.txt)

---

## 🔌 API Documentation

DocForge provides a full REST API for automation:

**Base URL**: `http://localhost:8000`

### Key Endpoints

```bash
# Analyze website
POST /api/analyze
Body: { "url": "https://example.com" }

# Start crawl
POST /api/crawl
Body: { "url": "https://example.com", "mode": "auto", "max_pages": 50 }

# Check status
GET /api/status/{job_id}

# Download PDF
GET /api/download/{job_id}

# Preview PDF
GET /api/preview/{job_id}
```

**Interactive API Docs**: Visit `http://localhost:8000/docs` when running locally

---

## 🤝 Contributing

We love contributions! DocForge is open-source and community-driven.

### How to Contribute

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **✨ Make** your changes with clear commit messages
4. **✅ Test** your changes thoroughly
5. **📫 Submit** a pull request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Be respectful and collaborative

**Read more**: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🗺️ Roadmap

### Current Features ✅
- [x] Sitemap detection and crawling
- [x] Single page and recursive crawling
- [x] PDF generation with images
- [x] PDF preview before download
- [x] Page limit controls
- [x] Real-time progress tracking
- [x] Professional PDF templates

### Planned Features 🚧
- [ ] Authentication for team features
- [ ] Scheduled/automated crawls
- [ ] Multiple export formats (EPUB, Markdown)
- [ ] Custom PDF templates and styling
- [ ] Browser extension
- [ ] AI-powered content summaries
- [ ] Batch processing multiple URLs
- [ ] Cloud storage integration
- [ ] Citation mode for academic use
- [ ] Diff tracking for version control

**Have an idea?** [Open an issue](https://github.com/Ishan96Dev/DocForge/issues) to suggest features!

---

## 🔒 Privacy & Ethics

DocForge is designed with responsibility in mind:

- ✅ **Respects `robots.txt`**: Honors website crawling policies
- ✅ **Rate Limiting**: Prevents server overload (1 second delay between requests)
- ✅ **Clear User-Agent**: Identifies itself properly
- ✅ **Local Processing**: All data processed locally, nothing stored on external servers
- ✅ **No Tracking**: No analytics, no data collection

### ⚖️ Responsible Use

**Important**: Users are responsible for:
- Ensuring they have permission to scrape and redistribute content
- Respecting copyright and intellectual property rights
- Following terms of service of websites they crawl
- Using DocForge ethically and legally

**DocForge is a tool - use it responsibly.**

---

## 🐛 Troubleshooting

### Common Issues

**Backend won't start**
```bash
# Make sure Python 3.11+ is installed
python --version

# Install Playwright browsers
playwright install chromium

# Check if port 8000 is available
```

**Frontend won't connect**
```bash
# Verify backend is running
curl http://localhost:8000/health

# Check .env file has correct API URL
```

**PDF generation fails**
- Ensure Playwright/Chromium is installed
- Check website allows crawling (robots.txt)
- Try with fewer pages first

**More help**: Check [Issues](https://github.com/Ishan96Dev/DocForge/issues) or create a new one

---

## 📞 Support & Community

- **🐛 Bug Reports**: [GitHub Issues](https://github.com/Ishan96Dev/DocForge/issues)
- **💡 Feature Requests**: [GitHub Issues](https://github.com/Ishan96Dev/DocForge/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/Ishan96Dev/DocForge/discussions)
- **📖 Documentation**: [Wiki](https://github.com/Ishan96Dev/DocForge/wiki)

---

## ⭐ Show Your Support

If you find DocForge useful, please:
- ⭐ **Star this repository**
- 🐦 **Share on social media**
- 🤝 **Contribute** to the project
- 💬 **Spread the word**

Every star motivates us to keep improving DocForge! 🚀

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Ishan Chakraborty

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**Ishan Chakraborty**

- GitHub: [@Ishan96Dev](https://github.com/Ishan96Dev)
- LinkedIn: [Connect on LinkedIn](https://www.linkedin.com/in/ishan-chakraborty-0085571a1)
- Project: [DocForge on GitHub](https://github.com/Ishan96Dev/DocForge)

---

## 🙏 Acknowledgments

Built with amazing open-source tools:

- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [React](https://reactjs.org/) - UI library
- [Playwright](https://playwright.dev/) - Browser automation
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) - HTML parsing

Special thanks to all contributors and the open-source community! 💙

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Ishan96Dev/DocForge?style=social)
![GitHub forks](https://img.shields.io/github/forks/Ishan96Dev/DocForge?style=social)
![GitHub issues](https://img.shields.io/github/issues/Ishan96Dev/DocForge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Ishan96Dev/DocForge)
![GitHub last commit](https://img.shields.io/github/last-commit/Ishan96Dev/DocForge)

---

<div align="center">

**⚡ Built with ❤️ by [Ishan Chakraborty](https://github.com/Ishan96Dev)**

**📄 DocForge - Transform Knowledge into Permanence**

[⬆ Back to Top](#-docforge)

</div>
