import { useCallback, memo, lazy, Suspense } from 'react'
import { Zap, Moon, Sun } from 'lucide-react'

// Critical Components (loaded immediately)
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Footer from './components/Footer'
import SearchCommand from './components/SearchCommand'
import AIAssistant from './components/AIAssistant'

// Lazy-loaded Components (below the fold)
const CurriculumSection = lazy(() => import('./components/CurriculumSection'))
const ProjectsSection = lazy(() => import('./components/ProjectsSection'))
const DataSection = lazy(() => import('./components/DataSection'))
const AIAnalystSection = lazy(() => import('./components/AIAnalystSection'))
const GamificationPanel = lazy(() => import('./components/GamificationPanel'))
const MarketTicker = lazy(() => import('./components/MarketTicker'))

// Providers & Stores
import { ThemeProvider, useTheme } from './lib/theme'
import { useCurriculumStore, useSimulationStore, useUIStore } from './lib/store'
import { curriculumData } from './lib/constants'

// Skeleton loader for lazy sections
const SectionSkeleton = memo(function SectionSkeleton() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <div className="animate-pulse">
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
        <div className="h-10 w-64 bg-slate-200 dark:bg-slate-700 rounded mb-8" />
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
})

// Theme Toggle Button
const ThemeToggle = memo(function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center active:scale-95 transition-transform"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-500" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  )
})

// Section Divider
const SectionDivider = memo(function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
    </div>
  )
})

// Main App Content
function AppContent() {
  const { activeSection, setActiveSection } = useUIStore()
  const { toggleModule, isModuleComplete, resetProgress } = useCurriculumStore()
  const { isSimulating, progress, startSimulation } = useSimulationStore()

  // Memoized tracks transformation
  const tracksWithStatus = curriculumData.tracks.map(track => ({
    ...track,
    modules: track.modules.map(module => ({
      ...module,
      status: isModuleComplete(track.id, module.name) ? 'complete' : 'pending'
    }))
  }))

  const handleReset = useCallback(() => {
    if (confirm("Reset all progress for a fresh start?")) {
      resetProgress()
    }
  }, [resetProgress])

  const handleToggleModule = useCallback((trackId, moduleName) => {
    toggleModule(trackId, moduleName)
  }, [toggleModule])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Fixed Navigation */}
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onReset={handleReset}
      />

      <main>
        {/* SECTION 1: Hero - Full viewport intro */}
        <Hero />

        {/* SECTION 2: Learning Hint & Call to Action */}
        <section className="py-12 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl flex items-center gap-5 shadow-xl text-white">
              <div className="flex-shrink-0 p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold mb-1 tracking-widest uppercase opacity-80">Getting Started</p>
                <p className="text-base font-semibold leading-relaxed">
                  Click any module below to mark it complete. Press <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-sm font-mono">⌘K</kbd> to quickly search and navigate!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Curriculum - Main learning content */}
        <Suspense fallback={<SectionSkeleton />}>
          <CurriculumSection tracks={tracksWithStatus} onToggle={handleToggleModule} />
        </Suspense>

        <SectionDivider />

        {/* SECTION 4: Projects - Hands-on practice */}
        <Suspense fallback={<SectionSkeleton />}>
          <ProjectsSection />
        </Suspense>

        <SectionDivider />

        {/* SECTION 5: Data - Datasets & resources */}
        <Suspense fallback={<SectionSkeleton />}>
          <DataSection />
        </Suspense>

        <SectionDivider />

        {/* SECTION 6: Gamification - Progress tracking */}
        <Suspense fallback={<SectionSkeleton />}>
          <GamificationPanel />
        </Suspense>

        <SectionDivider />

        {/* SECTION 7: AI Analyst - Advanced feature */}
        <Suspense fallback={<SectionSkeleton />}>
          <AIAnalystSection
            isSimulating={isSimulating}
            simProgress={progress}
            onStartSim={startSimulation}
          />
        </Suspense>

        {/* SECTION 8: Market Ticker - At the bottom before footer */}
        <Suspense fallback={<div className="h-24 bg-slate-900" />}>
          <MarketTicker />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating UI Elements */}
      <ThemeToggle />
      <SearchCommand />
      <AIAssistant />
    </div>
  )
}

// Root App with Providers
export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="aqa-theme">
      <AppContent />
    </ThemeProvider>
  )
}
