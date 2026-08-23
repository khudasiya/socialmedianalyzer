import React from 'react';
import { Sun, Moon, ArrowRight, Sparkles } from 'lucide-react';
import type { AppStep } from '../types';

interface HeaderProps {
  currentStep: AppStep;
  onNavigate: (page: 'home' | 'analyze', step?: AppStep) => void;
  activePage: 'home' | 'analyze';
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activePage,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0c0d0b]/95 backdrop-blur-sm border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-lg bg-[#588157] dark:bg-[#a3b18a] text-white dark:text-[#1b261b] flex items-center justify-center font-black text-xs shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-base tracking-tight text-stone-900 dark:text-stone-100">
              ContentLens
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 bg-[#e9edc9] dark:bg-[#344e41]/80 text-[#3a5a40] dark:text-[#a3b18a] rounded border border-[#ccd5ae]/60 dark:border-[#588157]/40">
              AI
            </span>
          </div>
        </div>

        {/* Center Nav Items */}
        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activePage === 'home'
                ? 'bg-[#e9edc9]/60 dark:bg-[#344e41]/60 text-[#3a5a40] dark:text-[#a3b18a]'
                : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate('analyze', 'upload')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activePage === 'analyze'
                ? 'bg-[#e9edc9]/60 dark:bg-[#344e41]/60 text-[#3a5a40] dark:text-[#a3b18a]'
                : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
            }`}
          >
            Workspace
          </button>

          <a
            href="#how-it-works"
            onClick={() => {
              if (activePage !== 'home') onNavigate('home');
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
          >
            How It Works
          </a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#3a5a40]" />
            )}
          </button>

          {/* Action Button */}
          <button
            onClick={() => onNavigate('analyze', 'upload')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#588157] hover:bg-[#3a5a40] dark:bg-[#a3b18a] dark:text-[#1b261b] dark:hover:bg-[#ccd5ae] transition-colors flex items-center space-x-1 shadow-xs"
          >
            <span>Analyze Post</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
};
