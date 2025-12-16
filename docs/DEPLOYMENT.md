# DocForge Deployment Guide

Complete guide to deploy **your own instance** of DocForge for **FREE** using open-source platforms.

> **Important**: This guide helps you deploy YOUR OWN instance of DocForge. You'll get your own unique URLs different from the demo/original repository.

## 🎯 Deployment Strategy

- **Frontend**: GitHub Pages (free, unlimited bandwidth)
- **Backend**: Render.com (free tier with Docker support)
- **Total Cost**: $0/month 🎉

---

## 📦 Part 1: Backend Deployment (Render.com)

### Why Render.com?
- ✅ Free tier with 750 hours/month
- ✅ Supports Docker (needed for Playwright/Chrome)
- ✅ Auto-deploy from GitHub
- ✅ HTTPS included
- ✅ Auto-scaling and zero-downtime deploys

### Prerequisites
- GitHub account with **your fork** of DocForge repository
- Render.com account (free)

> **Note**: Make sure to fork the repository to your GitHub account first!

### Step-by-Step Instructions

#### 1. Prepare Your Repository

Ensure these files exist in your repository (already configured):
- `backend/Dockerfile` - Docker configuration for backend
- `backend/requirements.txt` - Python dependencies
- `docker-compose.yml` - Local development setup

#### 2. Create Render Account

1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with your GitHub account
4. Authorize Render to access your repositories

#### 3. Deploy Backend

1. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select **YOUR forked repository** (e.g., `your-username/DocForge`)

2. **Configure Service**
   ```
   Name: your-app-name (choose any unique name)
   Region: Choose closest to your users
   Branch: main
   Root Directory: backend
   Environment: Docker
   Instance Type: Free
   ```
   
   > **Note**: Choose a unique name for your service. This will be part of your URL.

3. **Advanced Settings** (Optional)
   - Auto-deploy: Yes (deploy on push to main)
   - Health Check Path: `/health`

4. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for first build
   - **IMPORTANT**: Copy **YOUR unique backend URL**: `https://your-app-name-xxxx.onrender.com`
   
   > **Save this URL!** You'll need it to configure your frontend.

5. **Verify Deployment**
   - Visit: `https://your-app-name-xxxx.onrender.com/health`
   - Expected response:
     ```json
     {
       "status": "healthy",
       "service": "DocForge API"
     }
     ```
   
   > Replace `your-app-name-xxxx` with your actual Render URL.

#### Important Notes

⚠️ **Free tier limitations:**
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds (cold start)
- 750 hours/month free (sufficient for personal/demo use)

💡 **To keep service warm:**
- Use a service like UptimeRobot to ping your health endpoint every 14 minutes
- Upgrade to paid plan ($7/month) for always-on service

---

## 🌐 Part 2: Frontend Deployment (GitHub Pages)

### Step 1: Configure Frontend

#### Update API URL

Create `frontend/.env.production` in **your repository**:
```env
VITE_API_URL=https://your-app-name-xxxx.onrender.com
```

> **IMPORTANT**: Replace `your-app-name-xxxx.onrender.com` with **YOUR actual Render backend URL** from Part 1.

#### Update package.json (if using manual deployment)

Add homepage field with **YOUR GitHub username**:
```json
{
  "homepage": "https://your-username.github.io/DocForge"
}
```

> Replace `your-username` with your actual GitHub username.

### Step 2: Deploy Frontend

#### Option A: GitHub Actions (Recommended - Automatic)

1. **Add GitHub Secret**
   - Go to **YOUR repository** on GitHub
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `VITE_API_URL`
   - Value: **YOUR backend URL** (e.g., `https://your-app-name-xxxx.onrender.com`)
   - Click "Add secret"

2. **Enable GitHub Pages**
   - Go to **YOUR repository** on GitHub
   - Click **Settings** → **Pages** (in left sidebar)
   - Under **"Build and deployment"**:
     - **Source**: Select "**Deploy from a branch**"
     - **Branch**: Select "**gh-pages**" and "**/ (root)**"
   - Click **Save**
   
   > Note: The `gh-pages` branch will be created automatically on first deployment

3. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Configure deployment"
   git push origin main
   ```

4. **Wait for Deployment**
   - Go to Actions tab in **your repository**
   - Wait for workflow to complete (~2-3 minutes)
   - **Your site will be live at**: `https://your-username.github.io/DocForge/`
   
   > Replace `your-username` with your actual GitHub username.

#### Option B: Manual Deployment

```bash
cd frontend

# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script to package.json
npm run build
npm run deploy
```

Then enable GitHub Pages:
- Settings → Pages
- Source: "gh-pages" branch
- Save

---

## ✅ Post-Deployment Checklist

### Backend Verification
- [ ] Health endpoint responds: `/health`
- [ ] API docs accessible: `/docs`
- [ ] CORS configured for your frontend domain
- [ ] Playwright/Chromium installed correctly

### Frontend Verification
- [ ] Site loads at GitHub Pages URL
- [ ] Can connect to backend API
- [ ] Analysis works for test URLs
- [ ] PDF generation completes successfully
- [ ] Preview and download work

### Test Complete Flow

1. Open **YOUR GitHub Pages URL**: `https://your-username.github.io/DocForge/`
2. Enter test URL: `https://example.com`
3. Click "Analyze Website"
4. Start crawl with 5-10 pages
5. Wait for completion
6. Preview PDF
7. Download PDF

> **Success!** Your own instance of DocForge is now live and working!

---

## 🐛 Troubleshooting

### Backend Issues

**Service won't start**
- Check build logs in Render dashboard
- Verify Dockerfile is correct
- Check Python dependencies

**Cold starts are slow**
- Expected behavior on free tier
- Use UptimeRobot to keep warm
- Consider paid plan for production

**PDF generation fails**
- Check Playwright installation
- Verify memory limits (Render free: 512MB)
- Try smaller page counts

### Frontend Issues

**GitHub Actions Deployment Fails**

1. **Check Workflow Permissions**:
   - Settings → Actions → General
   - Scroll to "Workflow permissions"
   - Select "**Read and write permissions**"
   - Click Save

2. **Enable GitHub Pages**:
   - Settings → Pages
   - **Source**: Select "**Deploy from a branch**"
   - **Branch**: Select "**gh-pages**" / **(root)**
   - Click Save

3. **Add Backend URL Secret**:
   - Settings → Secrets and variables → Actions
   - Add secret: `VITE_API_URL` with your backend URL

4. **Re-run the Workflow**:
   - Go to Actions tab
   - Click on the failed workflow
   - Click "Re-run all jobs"

5. **Wait for Deployment**:
   - First deployment may take 2-5 minutes
   - Check Settings → Pages to see your site URL

**Cannot connect to backend**
- Verify `VITE_API_URL` is set correctly
- Check CORS configuration in backend
- Open browser dev tools for errors

**Build fails**
- Run `npm install` locally
- Check for TypeScript errors: `npm run type-check`
- Verify all dependencies in package.json

**GitHub Pages 404**
- Wait 2-3 minutes after deployment
- Clear browser cache
- Check Actions tab for deployment status

### CORS Errors

Backend has CORS configured for:
- `http://localhost:3000` (development)
- GitHub Pages domains (production)

**If you get CORS errors**, edit `backend/main.py` to add **YOUR GitHub Pages URL**:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-username.github.io",  # Replace with YOUR GitHub username
        "https://your-custom-domain.com"  # Add custom domain if needed
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

> Replace `your-username` with your actual GitHub username.

---

## 🚀 Advanced Configuration

### Custom Domain (Frontend)

1. Add CNAME record pointing to: `Ishan96Dev.github.io`
2. Add `CNAME` file to `frontend/public/`:
   ```
   your-domain.com
   ```
3. GitHub Settings → Pages → Custom domain
4. Enter your domain and verify

### Custom Domain (Backend - Paid Plan)

1. Upgrade Render service to paid plan
2. Go to service settings
3. Add custom domain
4. Update DNS records as instructed

### Environment Variables

Add environment variables in Render dashboard:
- `LOG_LEVEL=INFO`
- `MAX_CRAWL_DEPTH=5`
- `DEFAULT_REQUEST_DELAY=1.0`

### Monitoring

**Render**
- Built-in logs and metrics
- Configure alerts for downtime

**Frontend**
- Use Google Analytics
- Setup error tracking (Sentry)

---

## 💰 Cost Optimization

### Free Tier Limits

**Render.com**
- 750 hours/month
- 512MB RAM
- 0.1 CPU
- Spins down after 15min inactivity

**GitHub Pages**
- 100GB bandwidth/month
- 1GB storage
- No server costs

### When to Upgrade

Consider upgrading when:
- Need always-on backend (no cold starts)
- Processing many large sites
- Require more memory/CPU
- Commercial/business use

**Render Starter Plan**: $7/month
- Always-on (no spin-down)
- More memory and CPU
- Custom domain support

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)

---

## 🆘 Need Help?

- **Issues**: [GitHub Issues](https://github.com/Ishan96Dev/DocForge/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Ishan96Dev/DocForge/discussions)
- **Render Support**: [Render Community](https://community.render.com/)

---

**Made with ❤️ by the DocForge Community**

[⬆ Back to Documentation Index](INDEX.md)
