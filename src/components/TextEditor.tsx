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
    <div className="space-y-4">
      
      {/* Workflow Stepper status */}
      <div className="bg-white dark:bg-[#121411] rounded-xl p-3.5 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between shadow-xs flex-wrap gap-2">
        <div className="flex items-center space-x-3 text-xs font-semibold">
          <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span>Upload Complete</span>
          </div>
          <span className="text-stone-300 dark:text-stone-700 font-bold">→</span>
          <div className="flex items-center space-x-1 text-[#588157] dark:text-[#a3b18a]">
            <CheckCircle className="w-4 h-4" />
            <span>Text Extracted</span>
          </div>
          <span className="text-stone-300 dark:text-stone-700 font-bold">→</span>
          <div className="flex items-center space-x-1 text-stone-400">
            <div className="w-4 h-4 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-[10px]">
              3
            </div>
            <span>Ready for Analysis</span>
          </div>
        </div>

        {fileName && (
          <div className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 truncate max-w-[180px]">
            📄 {fileName}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#121411] rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs overflow-hidden">
        
        <div className="px-5 py-3 bg-stone-50/80 dark:bg-stone-900/60 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Edit3 className="w-4 h-4 text-[#588157] dark:text-[#a3b18a]" />
            <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Extracted Social Content
            </h3>
            <span className="text-[11px] text-stone-400 hidden sm:inline">
              (Editable)
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 text-xs font-medium transition-colors flex items-center space-x-1"
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
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-medium transition-colors flex items-center space-x-1"
              title="Clear text content"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Clear</span>
            </button>

            <button
              onClick={onReset}
              className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-medium transition-colors flex items-center space-x-1"
              title="Upload new file"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Upload New</span>
            </button>
          </div>
        </div>

        <div className="p-5">
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            rows={9}
            placeholder="Extracted text will appear here. You can edit or paste your text directly..."
            className="w-full p-3.5 rounded-xl bg-stone-50 dark:bg-[#0c0d0b] border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#588157] font-sans text-xs leading-relaxed resize-y"
          />

          <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-500 flex-wrap gap-2">
            <div className="flex items-center space-x-3 text-[11px]">
              <span><strong className="text-stone-900 dark:text-stone-100 font-bold">{wordCount}</strong> Words</span>
              <span>•</span>
              <span><strong className="text-stone-900 dark:text-stone-100 font-bold">{charCount}</strong> Characters</span>
              <span>•</span>
              <span><strong className="text-stone-900 dark:text-stone-100 font-bold">{sentenceCount}</strong> Sentences</span>
            </div>

            {wordCount < 10 && wordCount > 0 && (
              <span className="text-amber-600 dark:text-amber-400 font-medium text-[11px]">
                ⚠️ Brief text. Add more content for deeper analysis.
              </span>
            )}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="p-4 bg-stone-50/80 dark:bg-stone-900/40 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-1.5 text-xs text-stone-500">
            <Sparkles className="w-3.5 h-3.5 text-[#588157] dark:text-[#a3b18a]" />
            <span>Ready to evaluate engagement, hooks, tone, & call-to-actions</span>
          </div>

          <button
            onClick={onAnalyze}
            disabled={isLoading || !text.trim()}
            className="px-5 py-2.5 rounded-xl bg-[#588157] hover:bg-[#3a5a40] dark:bg-[#a3b18a] dark:text-[#1b261b] dark:hover:bg-[#ccd5ae] text-white font-bold text-xs shadow-xs transition-colors flex items-center space-x-1.5 disabled:opacity-40"
          >
            <span>Analyze Content Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
