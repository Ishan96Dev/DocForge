# Contributing to DocForge

Thank you for your interest in contributing to DocForge! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, constructive, and professional in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Python/Node versions)
   - Screenshots if applicable

### Suggesting Features

1. Check existing issues and discussions
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Potential implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes with clear, descriptive commits
4. Write or update tests as needed
5. Update documentation if needed
6. Push to your fork and submit a pull request

## Development Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
playwright install chromium
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Running Tests

```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm test
```

## Code Style

### Python
- Follow PEP 8
- Use type hints
- Write docstrings for functions and classes
- Keep functions focused and small

### TypeScript/React
- Use TypeScript strict mode
- Follow React best practices
- Use functional components with hooks
- Keep components small and reusable

## Project Structure

```
DocForge/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── api/         # API routes
│   │   ├── crawler/     # Crawling logic
│   │   ├── detector/    # Sitemap detection
│   │   ├── renderer/    # Content rendering
│   │   ├── exporter/    # PDF generation
│   │   └── core/        # Core models and config
│   └── tests/
├── frontend/             # React frontend
│   └── src/
│       ├── components/  # UI components
│       ├── services/    # API services
│       └── types/       # TypeScript types
└── docs/
```

## Commit Messages

Use clear, descriptive commit messages:

```
feat: add EPUB export functionality
fix: resolve sitemap parsing error
docs: update API documentation
refactor: simplify crawler logic
test: add tests for PDF exporter
```

## Review Process

1. All PRs require at least one review
2. CI/CD checks must pass
3. Code should follow style guidelines
4. Tests should pass
5. Documentation should be updated

## Areas for Contribution

- **Core Features**: Improve crawling, rendering, or export quality
- **New Formats**: Add support for EPUB, Markdown, etc.
- **Performance**: Optimize crawling speed or memory usage
- **UI/UX**: Enhance frontend design and user experience
- **Documentation**: Improve guides, examples, and API docs
- **Testing**: Add unit tests, integration tests, or E2E tests
- **Accessibility**: Improve accessibility features
- **Internationalization**: Add multi-language support

## Questions?

Open a discussion or reach out through issues.

Thank you for contributing to DocForge!
