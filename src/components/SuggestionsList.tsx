import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Copy, Check } from 'lucide-react';
import type { Suggestion } from '../types';

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

export const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions }) => {
  const [filterPriority, setFilterPriority] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSuggestions = suggestions.filter(
    (s) => filterPriority === 'All' || s.priority === filterPriority
  );

  const handleCopyExample = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (suggestions.length === 0) {
    return (
      <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900 rounded-xl p-6 text-center space-y-2">
        <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
        <h3 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
          No Critical Fixes Required!
        </h3>
        <p className="text-xs text-emerald-700 dark:text-emerald-400 max-w-md mx-auto">
          Your content already adheres to optimal hook, readability, and call-to-action standards.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
          Recommended Improvements
        </h3>

        <div className="flex items-center space-x-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
          {(['All', 'High', 'Medium', 'Low'] as const).map((priority) => (
            <button
              key={priority}
              onClick={() => setFilterPriority(priority)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                filterPriority === priority
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredSuggestions.map((sug) => {
          let priorityTag = 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';

          if (sug.priority === 'High') {
            priorityTag = 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
          } else if (sug.priority === 'Medium') {
            priorityTag = 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
          } else if (sug.priority === 'Low') {
            priorityTag = 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
          }

          return (
            <div
              key={sug.id}
              className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200/80 dark:border-zinc-800 space-y-3"
            >
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${priorityTag}`}>
                  {sug.priority} Priority
                </span>
                <span className="text-[11px] font-semibold text-zinc-500">
                  {sug.category}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{sug.issue}</span>
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 pl-5 leading-relaxed">
                  💡 <strong>Recommendation:</strong> {sug.recommendation}
                </p>
              </div>

              {sug.exampleSuggested && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                  <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-0.5">
                      Current
                    </span>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 italic">
                      "{sug.exampleCurrent || 'Original text'}"
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Suggested Improvement
                      </span>
                      <button
                        onClick={() => handleCopyExample(sug.exampleSuggested!, sug.id)}
                        className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        {copiedId === sug.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-zinc-900 dark:text-zinc-100 font-medium">
                      "{sug.exampleSuggested}"
                    </p>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};
