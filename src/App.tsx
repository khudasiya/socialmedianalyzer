import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AnalyzePage } from './pages/AnalyzePage';
import type { AppStep } from './types';
import type { SamplePost } from './utils/sampleTexts';
import './App.css';

export function App() {
  const [activePage, setActivePage] = useState<'home' | 'analyze'>('home');
  const [currentStep, setCurrentStep] = useState<AppStep>('upload');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavigate = (page: 'home' | 'analyze', step: AppStep = 'upload') => {
    setActivePage(page);
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSample = (_sample: SamplePost) => {
    setActivePage('analyze');
    setCurrentStep('extract');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-150">
      
      <Header
        currentStep={currentStep}
        onNavigate={handleNavigate}
        activePage={activePage}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6">
        {activePage === 'home' ? (
          <HomePage
            onStartAnalysis={(step) => handleNavigate('analyze', step || 'upload')}
            onSelectSample={handleSelectSample}
          />
        ) : (
          <AnalyzePage initialStep={currentStep} />
        )}
      </main>

      <Footer />
      
    </div>
  );
}

export default App;
