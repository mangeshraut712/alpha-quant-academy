# Alpha Quant Academy - Web Interface

**Modern React 19 + Vite 6 Progressive Web App**

A cutting-edge educational platform for mastering Python in quantitative finance, built with the latest 2025 web technologies.

**Live site:** [https://mangeshraut712.github.io/alpha-quant-academy/](https://mangeshraut712.github.io/alpha-quant-academy/) (GitHub Pages; formerly Vercel).

## 🚀 Tech Stack (2025 Edition)

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.0.0 | UI Framework with Concurrent Features |
| **Vite** | 6.0.5 | Next-gen Build Tool with Lightning CSS |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS with Container Queries |
| **Framer Motion** | 11.15.0 | Production-grade Animations |
| **Zustand** | 5.0.2 | Lightweight State Management |
| **TanStack Query** | 5.62.0 | Data Fetching & Caching |
| **PWA** | ✓ | Offline-capable Progressive Web App |

## ✨ 2025 Features

### Architecture
- **React 19** - Concurrent rendering, Suspense, Server Components ready
- **Vite 6** - Lightning-fast HMR, ESNext target, tree-shaking
- **Zustand** - Zero-boilerplate state with persistence
- **Lightning CSS** - 10x faster CSS processing

### User Experience
- **PWA Support** - Install as native app, works offline
- **Dark Mode** - System preference + manual toggle
- **Reduced Motion** - Respects `prefers-reduced-motion`
- **View Transitions API** - Native-like page transitions (Chrome 111+)

### Performance
- **Code Splitting** - Automatic vendor chunking
- **Tree Shaking** - Dead code elimination
- **Lazy Loading** - Dynamic imports for routes
- **Service Worker** - Intelligent caching strategy

### Accessibility
- **WCAG 2.1 AA** - Full keyboard navigation
- **Focus Management** - Visible focus indicators
- **Screen Reader** - Semantic HTML + ARIA labels
- **Color Contrast** - 4.5:1 minimum ratio

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Development server (port 5173)
npm run dev

# Production build
npm run build

# Preview production
npm run preview
```

## 🎨 Design System

### Colors (CSS Custom Properties)
- Light/Dark theme via CSS variables
- OKLCH color space for perceptual uniformity
- Glow effects with `--glow-color` token

### Typography
- **Inter Variable** - Headlines & body
- **JetBrains Mono** - Code blocks
- `text-balance` for headline wrapping

### Animations
- `fade-in`, `fade-up`, `slide-up`
- `shimmer` for loading states
- `glow` for interactive elements
- Spring easing for natural motion

## 📱 PWA Capabilities

The app can be installed on any device:

1. **Desktop Chrome/Edge**: Click install icon in address bar
2. **Mobile Safari**: Share → Add to Home Screen
3. **Android**: Banner prompt or Menu → Install

Offline features:
- All static assets cached
- Google Fonts cached for 1 year
- Curriculum progress persisted locally

## 🔧 Development

### Environment
- Node.js 18, 20, or 22+
- npm 9+ or pnpm 8+

### Scripts
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview production
- `npm run lint` - ESLint fix

### File Structure
```
src/
├── components/     # UI Components
├── lib/
│   ├── constants.js   # Curriculum data
│   ├── store.js       # Zustand stores
│   ├── theme.jsx      # Theme provider
│   └── utils.js       # Utilities
├── App.jsx         # Root component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## 📄 License

Apache 2.0 - Based on JPMorgan Chase Python Training
