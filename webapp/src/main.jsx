import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// React 19 Concurrent Features
const root = createRoot(document.getElementById('root'))

// Enable View Transitions API if supported
if (document.startViewTransition) {
  document.documentElement.classList.add('view-transitions-enabled')
}

// Render with Suspense boundary for async components
root.render(
  <StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </StrictMode>
)

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 mx-auto mb-4 animate-pulse" />
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Loading Academy...</p>
      </div>
    </div>
  )
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then((registration) => {
        console.log('SW registered:', registration.scope)
      })
      .catch((error) => {
        console.log('SW registration failed:', error)
      })
  })
}

// Performance monitoring (Web Vitals ready)
if (import.meta.env.DEV) {
  // Log performance metrics in development
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log(`[Perf] ${entry.name}:`, entry.startTime.toFixed(2) + 'ms')
    }
  })
  observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
}
