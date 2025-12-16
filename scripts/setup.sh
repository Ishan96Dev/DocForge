#!/bin/bash

# DocForge Setup Script
# This script sets up the development environment for DocForge

set -e

echo "🚀 DocForge Setup Script"
echo "========================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Python is installed
echo "📦 Checking dependencies..."
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed. Please install Python 3.11 or higher.${NC}"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
echo -e "${GREEN}✓ Python ${PYTHON_VERSION} found${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18 or higher.${NC}"
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✓ Node.js ${NODE_VERSION} found${NC}"

echo ""
echo "🔧 Setting up backend..."
cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install --upgrade pip > /dev/null
pip install -r requirements.txt

# Install Playwright browsers
echo "Installing Playwright browsers..."
playwright install chromium

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

# Create exports directory
mkdir -p exports

echo -e "${GREEN}✓ Backend setup complete${NC}"

# Go back to root
cd ..

echo ""
echo "🎨 Setting up frontend..."
cd frontend

# Install dependencies
echo "Installing npm dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo -e "${GREEN}✓ Frontend setup complete${NC}"

# Go back to root
cd ..

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "To start the development servers:"
echo ""
echo -e "${YELLOW}Backend:${NC}"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  uvicorn main:app --reload"
echo ""
echo -e "${YELLOW}Frontend:${NC}"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then visit http://localhost:3000 in your browser."
echo ""
echo "For more information, see GETTING_STARTED.md"
