#!/bin/bash

echo "===================================="
echo "DocForge Documentation Site"
echo "===================================="
echo ""

cd docs-site

echo "Checking if node_modules exists..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

echo "Starting documentation site..."
echo ""
echo "Visit: http://localhost:5173/DocForge/"
echo ""
npm run dev
