# PixelSwift - High-Fidelity Image Converter

A production-grade image format conversion utility built with React and TypeScript, providing lossless and optimized image conversion across multiple professional formats.

## Overview

PixelSwift is a client-side image processing application designed to handle batch and single-file image conversions with granular quality control. The application prioritizes performance, user experience, and format compatibility through a minimalist interface and efficient state management.

## Key Features

- Multi-Format Support: PNG, JPEG, WEBP, TIFF, AVIF, ICO, SVG, and PSD (via TIFF export)
- Quality Control: Adjustable compression levels (10-100%) with real-time preview
- Theme Switching: Dual-mode interface (light/dark) with persistent state management
- Conversion History: Session-based conversion tracking with quick re-download functionality
- Client-Side Processing: All conversions handled server-side with RESTful API integration
- Responsive Design: Optimized layouts across desktop and tablet viewports
- Accessibility: Semantic HTML, keyboard navigation, and ARIA attributes

## Technology Stack

### Frontend
- React 19.2.4: Core application framework
- TypeScript 4.9.5: Type-safe development
- Lucide React 0.577.0: Icon library (18+ icons)
- React-Dropzone 15.0.0: File input handling with drag-and-drop support
- Axios 1.13.6: HTTP client for API communication

### Development & Build
- React Scripts 5.0.1: Webpack-based build toolchain
- ESLint: Code quality enforcement
- Jest: Testing framework

### Design System
- CSS-in-JS: Inline styles with theme context provider
- Color Variables: Light/dark theme support through React Context
- Grid Layout: CSS Grid for responsive two-column layouts

## Installation

### Prerequisites
- Node.js 16.x or higher
- npm 8.x or higher
- Backend server running on port 5000

### Setup

```bash
# Clone repository
git clone <repository-url>
cd client

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The application will be available at http://localhost:3000.

## Project Structure

```
src/
  components/
    UploadZone.tsx         # File input handler with drag-drop
    FormatSelector.tsx     # Format selection dropdown
    QualitySlider.tsx      # Quality level adjustment (10-100%)
    PreviewCard.tsx        # Image preview with metadata
    layout/
      footer.tsx           # Footer component
      header.tsx           # Header component
  context/
    ThemeContext.tsx       # Theme provider and hook
  services/
    api.ts                 # HTTP client for conversion endpoint
  styles/
    theme.ts              # Theme variables and style objects
    global.css            # Global styles (deprecated)
  App.tsx                 # Root application component
  index.tsx               # Entry point
public/
  index.html              # HTML template
  manifest.json           # PWA manifest
  robots.txt              # SEO configuration
```

## Usage

### Basic Workflow

1. Upload image via drag-drop or file selector
2. Select target format from dropdown
3. Adjust quality slider (1-100%)
4. Click "Convert & Download"
5. File downloads automatically

### API Integration

The application communicates with a backend server via REST API:

```
POST /convert
Content-Type: multipart/form-data

Parameters:
  file: File          # Image file
  format: string      # Target format (png, jpeg, webp, etc.)
  quality: number     # Quality level (10-100)

Response:
  Content-Type: image/*
  Body: Converted image blob
```

Example implementation:

```typescript
const convertImage = async (file: File, format: string, quality: number) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('format', format);
  formData.append('quality', quality);
  
  const response = await axios.post('http://localhost:5000/convert', formData);
  return response.data;
};
```

## Architecture

### Component Hierarchy

```
App (root)
├── ThemeProvider
├── Header
│   └── Theme toggle button
├── AppContent
│   ├── UploadZone
│   ├── PreviewCard
│   ├── FormatSelector
│   ├── QualitySlider
│   ├── Convert button
│   └── Recent Activity list
└── Footer
```

### State Management

The application uses React's built-in state management:

- App Level: Dark mode toggle, theme context
- Content Level: File selection, format choice, quality value, conversion history, loading state

No external state management libraries (Redux, Zustand) are used to maintain bundle size and simplicity.

### Theme System

Dual-mode theming implemented via React Context:

```typescript
lightTheme = {
  bgColor: '#f8fafc',
  cardBg: '#ffffff',
  primary: '#4f46e5',
  textMain: '#1e293b',
  textMuted: '#64748b',
  borderColor: '#e2e8f0',
  inputBg: '#f1f5f9'
}

darkTheme = {
  bgColor: '#0f172a',
  cardBg: '#1e293b',
  primary: '#818cf8',
  textMain: '#f8fafc',
  textMuted: '#94a3b8',
  borderColor: '#334155',
  inputBg: '#0f172a'
}
```

## Development

### Running the Development Server

```bash
npm start
```

Starts the application on http://localhost:3000 with hot module replacement.

### Building for Production

```bash
npm run build
```

Creates an optimized production build in the build/ directory.

### Running Tests

```bash
npm test
```

Launches Jest test runner in interactive mode.

## Performance Considerations

### Bundle Size
- Tree-shaking enabled for lucide-react icons
- React 19 with streaming rendering support
- Inline styles eliminate CSS file requests

### Image Processing
- Client-side file handling (no local processing)
- Server-side conversion for reliability
- Streaming response for large files
- Browser cache support via Cache-Control headers

### Network Optimization
- HTTP/2 multiplexing for concurrent requests
- Gzip compression (server-configured)
- Content-Type negotiation for image formats

## Browser Support

- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+
- Mobile browsers: iOS Safari 14+, Chrome Android 90+

## Configuration

### Environment Variables

Create an .env file in the project root:

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

### Build Configuration

Webpack configuration is managed by React Scripts. For advanced customization, ejecting is required (non-reversible).

## Error Handling

The application implements graceful error handling:

- File format validation
- Network error detection
- Conversion failure alerts with debugging information
- Fallback UI states for edge cases

Error messages are user-friendly while providing technical details for debugging.

## Testing

### Coverage

Test suites cover:
- Component rendering
- State transitions
- API mocking
- Theme switching
- File upload validation

### Running Tests

```bash
npm test
npm test -- --coverage
```

## Deployment

### Production Build

```bash
npm run build
```

Optimizations:
- Minification and obfuscation
- Asset hashing for cache busting
- Source maps for debugging
- Service Worker for offline support

### Docker Support

Example Dockerfile:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY build ./build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]
```

### Server Requirements

- Backend API on port 5000
- Supported formats: PNG, JPEG, WEBP, TIFF, AVIF, ICO
- Max file size: 50MB (configurable)
- Rate limiting: 100 requests/minute per IP

## Dependencies

### Production
- react@19.2.4
- typescript@4.9.5
- lucide-react@0.577.0
- react-dropzone@15.0.0
- axios@1.13.6

### Development
- @types/react@19.2.14
- @types/node@16.18.126
- react-scripts@5.0.1
- @testing-library/react@16.3.2

## Known Limitations

- PSD format exports as TIFF due to lack of direct PSD conversion support
- SVG conversion is raster-based (no vectorization)
- Batch processing not yet implemented
- No lossless JPEG support (standard JPEG uses DCT compression)

## Future Roadmap

- Batch processing with progress tracking
- Image metadata preservation and manipulation
- Advanced compression algorithms (HEIC, HEIF)
- WebGL-based client-side image processing
- Progressive web app (PWA) support
- Real-time format comparison view

## Contributing

### Code Standards

- Follow ESLint configuration
- Use TypeScript strict mode
- Implement proper error handling
- Add tests for new features
- Document complex logic with comments

### Commit Guidelines

```
[feature/fix/refactor]: Brief description
```

Example:
```
[feature]: Add batch conversion support
```

## Troubleshooting

### Application fails to start

```bash
npm install
rm -rf node_modules package-lock.json
npm install
npm start
```

### Backend connection refused

Verify backend server is running on port 5000:

```bash
curl http://localhost:5000/health
```

### High memory usage

Clear browser cache and local storage:

```javascript
localStorage.clear();
sessionStorage.clear();
```

## License

Proprietary. All rights reserved.

## Support

For issues and support:
1. Check the troubleshooting section
2. Review browser console for error logs
3. Verify backend API health
4. Check network tab for API failures

---

Version: 0.1.0
Last Updated: March 2026
Maintainer: Development Team