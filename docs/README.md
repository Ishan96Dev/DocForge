# Public Assets Directory

This directory contains static assets that are served directly by Vite.

## Screenshots

The `screenshots/` folder contains images used in the documentation:

- `Link-input.png` - URL input field
- `analyzing-website.png` - Website analysis in progress
- `Analyze-complete-screen.png` - Analysis results
- `Choose-your-Scrapping-method.png` - Crawl strategy selection
- `Maximum-pages-to-scrape.png` - Page limit configuration
- `Processing-scrapping-with-logs.png` - Crawling progress with logs
- `PDF-preview.png` - PDF preview modal
- `Download-PDF.png` - Download button

## Note

Screenshots are copied from the parent `screenshots/` directory to `public/screenshots/` during development setup. When updating screenshots, make sure to:

1. Update the original in `../screenshots/`
2. Copy to `public/screenshots/`

Or run this command:
```bash
Copy-Item "../screenshots/*.png" "screenshots/" -Force
```
