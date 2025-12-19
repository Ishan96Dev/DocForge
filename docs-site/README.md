# DocForge Documentation Site

This is the documentation site for DocForge, built with React, TypeScript, and TailwindCSS.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The documentation site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

- **Live URL**: https://yourusername.github.io/DocForge/
- **GitHub Actions**: Automatically builds and deploys on push

## Structure

- `/src/pages` - Documentation pages (Home, Getting Started, User Guide, Features)
- `/src/components` - Reusable components (Layout)
- `/screenshots` - Screenshots for the user guide

## Adding Screenshots

Place screenshot images in the `screenshots/` folder:

- `step1-url-input.png` - URL input field
- `step2-analysis.png` - Website analysis screen
- `step3-options.png` - Configuration options
- `step4-progress.png` - Crawling progress
- `step5-preview.png` - PDF preview modal
- `step6-download.png` - Download confirmation

## Customization

- Update the GitHub repo URL in the header (`src/components/Layout.tsx`)
- Modify the base path in `vite.config.ts` if deploying to a different URL
- Customize colors in `tailwind.config.js`
