import React, { useState } from 'react';
import { Zap } from 'lucide-react';

// Components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CurriculumSection from './components/CurriculumSection';
import ProjectsSection from './components/ProjectsSection';
import DataSection from './components/DataSection';
import AIAnalystSection from './components/AIAnalystSection';
import Footer from './components/Footer';

// Data
import { curriculumData } from './lib/constants';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [tracks, setTracks] = useState(curriculumData.tracks.map(t => ({
    ...t,
    modules: t.modules.map(m => ({ ...m, status: 'pending' }))
  })));
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);

  const handleReset = () => {
    if (confirm("Reset all progress for a fresh start?")) {
      setTracks(curriculumData.tracks.map(t => ({
        ...t,
        modules: t.modules.map(m => ({ ...m, status: 'pending' }))
      })));
    }
  };

  const toggleModule = (trackId, moduleName) => {
    setTracks(prev => prev.map(t => {
      if (t.id !== trackId) return t;
      return {
        ...t,
        modules: t.modules.map(m => {
          if (m.name !== moduleName) return m;
          const nextStatus = m.status === 'complete' ? 'pending' : 'complete';
          return { ...m, status: nextStatus };
        })
      };
    }));
  };

  const startSimulation = () => {
    setIsSimulating(true);
    setSimProgress(0);
    const interval = setInterval(() => {
      setSimProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsSimulating(false), 2000);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} onReset={handleReset} />

      <main>
        <Hero />

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-blue-50/80 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200/50 dark:border-slate-800 flex items-center gap-5 shadow-xl shadow-blue-500/5 -webkit-backdrop-filter blur-md backdrop-filter blur-md">
            <div className="flex-shrink-0 p-2.5 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg ring-4 ring-blue-500/10">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-blue-900 dark:text-blue-100 mb-0.5 tracking-tight">Learning Hint:</p>
              <p className="text-xs text-blue-800 dark:text-slate-300 font-bold leading-relaxed opacity-90">Click on any module in the curriculum to mark it as complete and track your journey through the tracks!</p>
            </div>
          </div>
        </div>

        <CurriculumSection tracks={tracks} onToggle={toggleModule} />
        <ProjectsSection />
        <DataSection />
        <AIAnalystSection
          isSimulating={isSimulating}
          simProgress={simProgress}
          onStartSim={startSimulation}
        />
      </main>

      <Footer />
    </div>
  );
}
