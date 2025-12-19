# 📚 DocForge Documentation Site

Welcome to the DocForge documentation website! This interactive documentation site provides comprehensive guides, tutorials, and references for using DocForge.

## 🌐 Live Documentation

**Access the live documentation at:** [https://ishan96dev.github.io/DocForge/docs/](https://ishan96dev.github.io/DocForge/docs/)

## 📖 What's Inside

The documentation site includes:

### 🏠 Home
- Overview of DocForge features
- Quick links to all documentation sections
- Embedded video tutorial

### 🚀 Getting Started
- Installation methods (Docker, manual setup)
- Prerequisites and requirements
- Quick start guide
- First-time usage instructions

### 👤 User Guide
Complete step-by-step walkthrough:
1. **Enter Website URL** - How to input and validate URLs
2. **Website Analysis** - Understanding the analysis phase
3. **Choose Crawling Strategy** - Select between Sitemap, Recursive, or Single-page crawl
4. **Configure Settings** - Set maximum pages and customize options
5. **Processing & Logs** - Monitor real-time crawling progress
6. **Preview & Download** - View and download your generated PDF

### ✨ Features
- Detailed feature descriptions
- Use cases and examples
- Technical capabilities
- Smart detection and optimization features

## 🖼️ Screenshots

The `public/screenshots/` folder contains all UI screenshots used in the documentation:

- `Link-input.png` - URL input field interface
- `analyzing-website.png` - Website analysis in progress
- `Analyze-complete-screen.png` - Analysis results screen
- `Choose-your-Scrapping-method.png` - Crawl strategy selection
- `Maximum-pages-to-scrape.png` - Page limit configuration
- `Processing-scrapping-with-logs.png` - Real-time crawling progress with logs
- `PDF-preview.png` - PDF preview modal
- `Download-PDF.png` - Download button and completion screen

## 🚀 Deployment

The documentation site is automatically deployed to GitHub Pages when changes are pushed to the `docs-site/**` directory.

### Build Process
```bash
# Install dependencies
cd docs-site
npm install

# Build for production
npm run build

# Preview locally
npm run dev
```

### Access URLs
- **Live App**: `https://yourusername.github.io/DocForge/`
- **Documentation**: `https://yourusername.github.io/DocForge/docs/`

Replace `yourusername` with your GitHub username.

## 🔄 Updating Screenshots

When updating screenshots:

1. Take new screenshots from the live application
2. Place them in `public/screenshots/`
3. Ensure filenames match the references in documentation pages
4. Commit and push - GitHub Actions will automatically deploy

```powershell
# PowerShell command to verify all screenshots exist
Get-ChildItem "public/screenshots/*.png" | ForEach-Object { $_.Name }
```

## 🛠️ Development

### Local Development
```bash
# Navigate to docs-site
cd docs-site

# Install dependencies
npm install

# Start development server
npm run dev

# Access at http://localhost:5173/DocForge/docs/
```

**Note**: After deployment, your documentation will be available at `https://yourusername.github.io/DocForge/docs/`

### Technology Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Deployment**: GitHub Pages

## 📝 Updating Content

Documentation pages are located in:
- `src/pages/Home.tsx` - Homepage content
- `src/pages/GettingStarted.tsx` - Getting started guide
- `src/pages/UserGuide.tsx` - Step-by-step user guide
- `src/pages/Features.tsx` - Features overview

To update content:
1. Edit the relevant `.tsx` file
2. Test locally with `npm run dev`
3. Commit and push to deploy

## 🔗 Related Documentation

- **Main README**: [../README.md](../README.md)
- **Technical Docs**: [../docs/](../docs/)
- **API Reference**: [../docs/API.md](../docs/API.md)
- **Architecture**: [../docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)
- **Deployment Guide**: [../docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md)

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/DocForge/issues)
- **Repository**: `https://github.com/yourusername/DocForge`
- **Live Demo**: `https://yourusername.github.io/DocForge/`

Replace `yourusername` with your GitHub username.

---

**Built with ❤️ by [Ishan Chakraborty](https://github.com/Ishan96Dev) - Creator & Lead Developer of DocForge**
