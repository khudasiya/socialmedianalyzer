import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 transition-colors py-8 text-xs">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-[10px] flex items-center justify-center">
            CL
          </div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">ContentLens AI</span>
          <span>•</span>
          <span>Social Media Content Analyzer</span>
        </div>

        <p>© {new Date().getFullYear()} ContentLens AI. All rights reserved.</p>
      </div>
    </footer>
  );
};
