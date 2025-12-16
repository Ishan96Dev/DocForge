# Quick Start Guide

Get DocForge running locally in minutes!

> **Note**: This guide is for running DocForge on your local machine for development or testing. For production deployment, see the [Deployment Guide](DEPLOYMENT.md).

## Option 1: Docker (Easiest) 🐳

```bash
# Clone the repository (or clone your fork)
git clone https://github.com/Ishan96Dev/DocForge.git
cd DocForge
docker-compose up

# Open http://localhost:3000
```

## Option 2: Automated Setup Script

### Linux/macOS
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Windows (PowerShell)
```powershell
.\scripts\dev.ps1
```

Then start the servers:

**Terminal 1 (Backend):**
```bash
cd backend
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
uvicorn main:app --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## Option 3: Manual Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
playwright install chromium
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## First Use

1. Open http://localhost:3000
2. Enter a URL (try: https://docs.python.org/3/)
3. Click "Analyze"
4. Review detected pages
5. Click "Start Crawl"
6. Wait for processing
7. Preview and download your PDF!

## Troubleshooting

**Port already in use?**
```bash
# Backend - use different port
uvicorn main:app --port 8001

# Frontend - change in vite.config.ts
```

**Module not found?**
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

**Playwright errors?**
```bash
playwright install chromium
```

**CORS errors?**
- Check that backend is running on port 8000
- Check frontend API configuration in services/api.ts

## Need Help?

- 📖 Read [ARCHITECTURE.md](ARCHITECTURE.md)
- 💬 Open a [GitHub issue](https://github.com/Ishan96Dev/DocForge/issues)
- 🤝 See [CONTRIBUTING.md](../CONTRIBUTING.md)

Happy converting! 🎉
