import React from 'react';
import { SAMPLE_POSTS } from '../utils/sampleTexts';
import type { SamplePost } from '../utils/sampleTexts';

interface SampleDocSelectorProps {
  onSelectSample: (sample: SamplePost) => void;
  selectedId?: string;
}

export const SampleDocSelector: React.FC<SampleDocSelectorProps> = ({
  onSelectSample,
  selectedId,
}) => {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
          Quick Demo Samples
        </h3>
        <span className="text-[11px] text-zinc-400">Click to instant analyze</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {SAMPLE_POSTS.map((sample) => {
          const isSelected = selectedId === sample.id;
          return (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className={`text-left p-3 rounded-lg border transition-colors flex flex-col justify-between ${
                isSelected
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100'
                  : 'bg-white dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700/80 hover:border-zinc-400 dark:hover:border-zinc-500'
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded inline-block mb-1.5 ${
                  isSelected 
                    ? 'bg-zinc-700 text-white dark:bg-zinc-200 dark:text-zinc-900' 
                    : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                }`}>
                  {sample.type}
                </span>
                <h4 className="text-xs font-bold truncate">
                  {sample.title}
                </h4>
              </div>

              <span className={`text-[10px] font-medium mt-2 block ${isSelected ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500'}`}>
                Load Post →
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
