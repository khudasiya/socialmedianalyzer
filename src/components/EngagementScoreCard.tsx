import React from 'react';
import type { AnalysisResult } from '../types';

interface EngagementScoreCardProps {
  result: AnalysisResult;
}

export const EngagementScoreCard: React.FC<EngagementScoreCardProps> = ({ result }) => {
  const { overallScore, category, summary, wordCount, sentenceCount, detectedTone } = result;

  let scoreColor = 'text-indigo-600 dark:text-indigo-400';
  let badgeStyle = 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';

  if (category === 'Excellent') {
    scoreColor = 'text-emerald-600 dark:text-emerald-400';
    badgeStyle = 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
  } else if (category === 'Needs Improvement') {
    scoreColor = 'text-amber-600 dark:text-amber-400';
    badgeStyle = 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
  } else if (category === 'Poor') {
    scoreColor = 'text-rose-600 dark:text-rose-400';
    badgeStyle = 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
  }

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Gauge */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="text-zinc-200 dark:text-zinc-700"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                className={`${scoreColor} transition-all duration-700`}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                {overallScore}
              </span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                SCORE / 100
              </span>
            </div>
          </div>

          <span className={`mt-3 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded border ${badgeStyle}`}>
            {category} Potential
          </span>
        </div>

        {/* Right Summary */}
        <div className="md:col-span-8 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Executive Engagement Audit
          </h3>

          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/50 p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800">
            "{summary}"
          </p>

          <div className="grid grid-cols-3 gap-2.5 pt-1 text-xs">
            <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Words</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{wordCount}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Lines</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{sentenceCount}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Tone</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400 truncate block">{detectedTone}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
