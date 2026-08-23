import React, { useState } from 'react';
import {
  Copy,
  Check,
  Trash2,
  Edit3,
  Sparkles,
  ArrowRight,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';

interface TextEditorProps {
  text: string;
  onTextChange: (newText: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
  isLoading: boolean;
  fileName?: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  text,
  onTextChange,
  onAnalyze,
  onReset,
  isLoading,
  fileName,
}) => {
  const [copied, setCopied] = useState(false);

  const wordCount = text.trim() ? (text.trim().match(/\b[\w'-]+\b/g) || []).length : 0;
  const charCount = text.length;
  const sentenceCount = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm flex-wrap gap-3">
        <div className="flex items-center space-x-2 sm:space-x-4 text-xs font-bold">
          <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span>Upload Complete</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">→</span>
          <div className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400">
            <CheckCircle className="w-4 h-4" />
            <span>Text Extracted</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">→</span>
          <div className="flex items-center space-x-1 text-slate-400 dark:text-slate-500">
            <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px]">
              3
            </div>
            <span>Ready for Analysis</span>
          </div>
        </div>

        {fileName && (
          <div className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 truncate max-w-[200px]">
            📄 {fileName}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
        
        <div className="px-6 py-4 bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <Edit3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Extracted Social Content
            </h3>
            <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline">
              (Editable - Correct OCR errors if any)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
              title="Copy text to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={() => onTextChange('')}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
              title="Clear text content"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            <button
              onClick={onReset}
              className="px-3 py-1.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-semibold transition-colors flex items-center space-x-1.5"
              title="Upload new file"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Upload New</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            rows={10}
            placeholder="Extracted text will appear here. You can also paste or edit your social media post text directly..."
            className="w-full p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-sans text-sm leading-relaxed resize-y"
          />

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 flex-wrap gap-2">
            <div className="flex items-center space-x-4">
              <span>
                <strong className="text-slate-800 dark:text-slate-200 font-bold">{wordCount}</strong> Words
              </span>
              <span>•</span>
              <span>
                <strong className="text-slate-800 dark:text-slate-200 font-bold">{charCount}</strong> Characters
              </span>
              <span>•</span>
              <span>
                <strong className="text-slate-800 dark:text-slate-200 font-bold">{sentenceCount}</strong> Sentences
              </span>
            </div>

            {wordCount < 10 && wordCount > 0 && (
              <span className="text-amber-600 dark:text-amber-400 font-medium text-[11px]">
                ⚠️ Very brief text. Add more content for deeper analysis.
              </span>
            )}
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Ready to evaluate engagement, hooks, tone, & call-to-actions</span>
          </div>

          <button
            onClick={onAnalyze}
            disabled={isLoading || !text.trim()}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2.5 disabled:opacity-40 disabled:hover:scale-100"
          >
            <span>Analyze Content Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
