import { useState, useCallback, memo, lazy, Suspense } from 'react'
import { Zap, Moon, Sun } from 'lucide-react'

// Critical Components (loaded immediately)
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Footer from './components/Footer'

// Lazy-loaded Components (below the fold)
const CurriculumSection = lazy(() => import('./components/CurriculumSection'))
const ProjectsSection = lazy(() => import('./components/ProjectsSection'))
const DataSection = lazy(() => import('./components/DataSection'))
const AIAnalystSection = lazy(() => import('./components/AIAnalystSection'))

// Providers & Stores
import { ThemeProvider, useTheme } from './lib/theme'
import { useCurriculumStore, useSimulationStore, useUIStore } from './lib/store'
import { curriculumData } from './lib/constants'

// Skeleton loader for lazy sections
const SectionSkeleton = memo(function SectionSkeleton() {
  return (
    <div className="px-6 py-24 max-w-6xl mx-auto">
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
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center active:scale-95 transition-transform"
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
    <div className="min-h-screen bg-background text-foreground">
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onReset={handleReset}
      />

      <main>
        <Hero />

        {/* Learning Hint Banner */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-blue-600/15 dark:bg-blue-900/40 p-5 rounded-2xl border border-blue-300 dark:border-blue-700 flex items-center gap-5 shadow-sm">
            <div className="flex-shrink-0 p-2.5 bg-blue-600 rounded-xl shadow-lg ring-4 ring-blue-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-900 dark:text-blue-100 mb-0.5 tracking-widest uppercase">Learning Hint</p>
              <p className="text-sm text-blue-950 dark:text-blue-50 font-bold leading-relaxed">
                Click on any module below to mark it as complete and track your progress through the tracks.
              </p>
            </div>
          </div>
        </div>

        {/* Lazy-loaded sections with Suspense */}
        <Suspense fallback={<SectionSkeleton />}>
          <CurriculumSection tracks={tracksWithStatus} onToggle={handleToggleModule} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <DataSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <AIAnalystSection
            isSimulating={isSimulating}
            simProgress={progress}
            onStartSim={startSimulation}
          />
        </Suspense>
      </main>

      <Footer />
      <ThemeToggle />
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
