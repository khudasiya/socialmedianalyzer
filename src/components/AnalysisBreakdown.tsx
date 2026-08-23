import React from 'react';
import {
  Zap,
  BookOpen,
  Users,
  Target,
  Hash,
  Smile,
  Ruler,
  Volume2,
} from 'lucide-react';
import type { MetricBreakdown } from '../types';

interface AnalysisBreakdownProps {
  metrics: MetricBreakdown;
}

export const AnalysisBreakdown: React.FC<AnalysisBreakdownProps> = ({ metrics }) => {
  const cardsData = [
    { key: 'hook', title: 'Hook Strength', icon: Zap, data: metrics.hook, accent: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' },
    { key: 'readability', title: 'Readability', icon: BookOpen, data: metrics.readability, accent: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40' },
    { key: 'engagement', title: 'Engagement Potential', icon: Users, data: metrics.engagement, accent: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40' },
    { key: 'cta', title: 'Call-to-Action', icon: Target, data: metrics.cta, accent: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' },
    { key: 'hashtags', title: 'Hashtags', icon: Hash, data: metrics.hashtags, accent: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40' },
    { key: 'emoji', title: 'Emoji Usage', icon: Smile, data: metrics.emoji, accent: 'text-pink-500 bg-pink-50 dark:bg-pink-950/40' },
    { key: 'length', title: 'Content Length', icon: Ruler, data: metrics.length, accent: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/40' },
    { key: 'tone', title: 'Tone Analysis', icon: Volume2, data: metrics.tone, accent: 'text-sky-500 bg-sky-50 dark:bg-sky-950/40' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
        Detailed Content Breakdown
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cardsData.map(({ key, title, icon: Icon, data, accent }) => {
          const scoreOutOfTen = (data.score / 10).toFixed(1);

          return (
            <div
              key={key}
              className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200/80 dark:border-zinc-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`p-1.5 rounded-lg ${accent}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {title}
                  </h4>
                </div>
                <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100">
                  {scoreOutOfTen}/10
                </span>
              </div>

              <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(8, data.score)}%` }}
                />
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed">
                {data.explanation}
              </p>

              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-700 dark:text-zinc-300">
                💡 <strong className="text-indigo-600 dark:text-indigo-400">Tip:</strong> {data.suggestion}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
