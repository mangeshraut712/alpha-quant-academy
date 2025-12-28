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
          <div className="bg-blue-600/10 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-800/50 flex items-center gap-4 shadow-sm saturate-[1.1]">
            <div className="flex-shrink-0 p-2 bg-blue-600 rounded-xl shadow-lg ring-4 ring-blue-500/10">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-900 dark:text-blue-200 mb-0.5 tracking-tight uppercase opacity-60">Learning Hint</p>
              <p className="text-sm text-blue-800 dark:text-blue-100 font-semibold leading-relaxed">Click on any module below to mark it as complete and track your progress through the tracks.</p>
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
