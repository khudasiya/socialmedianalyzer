import React, { useState } from 'react';
import { Copy, Check, Download, Edit3, CheckCircle2, Sparkles } from 'lucide-react';
import type { ImprovedContentData, TonePreset } from '../types';

interface AIRewriteStudioProps {
  improvedData: ImprovedContentData | null;
  originalText: string;
  onRegenerateTone: (tone: TonePreset) => void;
  isLoading: boolean;
}

export const AIRewriteStudio: React.FC<AIRewriteStudioProps> = ({
  improvedData,
  originalText,
  onRegenerateTone,
  isLoading,
}) => {
  const [activeTone, setActiveTone] = useState<TonePreset>('viral');
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(improvedData?.improvedContent || '');

  React.useEffect(() => {
    if (improvedData?.improvedContent) {
      setEditedText(improvedData.improvedContent);
    }
  }, [improvedData]);

  const handleToneChange = (tone: TonePreset) => {
    setActiveTone(tone);
    onRegenerateTone(tone);
  };

  const handleCopy = () => {
    const textToCopy = isEditing ? editedText : improvedData?.improvedContent || '';
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const textToDownload = isEditing ? editedText : improvedData?.improvedContent || '';
    const blob = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `improved-social-post-${activeTone}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const currentImprovedText = isEditing ? editedText : improvedData?.improvedContent || '';

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-[#3a5a40] dark:bg-[#1b261b] text-white rounded-2xl p-5 shadow-xs border border-[#588157]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold tracking-tight flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-[#e9edc9]" />
            <span>AI Content Improvement Engine</span>
          </h2>
          <p className="text-xs text-[#ccd5ae] mt-0.5">
            Optimized opening hook, structure, CTA, and hashtag density while preserving core message.
          </p>
        </div>

        {/* Tone Selector Pills */}
        <div className="flex items-center space-x-1 flex-wrap bg-[#344e41] dark:bg-[#0c0d0b] p-1 rounded-xl">
          {(
            [
              { id: 'viral', label: 'Viral' },
              { id: 'professional', label: 'Professional' },
              { id: 'casual', label: 'Casual' },
              { id: 'persuasive', label: 'Persuasive' },
            ] as const
          ).map((tone) => (
            <button
              key={tone.id}
              onClick={() => handleToneChange(tone.id)}
              disabled={isLoading}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                activeTone === tone.id
                  ? 'bg-[#e9edc9] text-[#3a5a40] font-bold'
                  : 'text-stone-300 dark:text-stone-400 hover:text-white dark:hover:text-stone-200'
              }`}
            >
              {tone.label}
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Comparison Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Box: Original Content */}
        <div className="bg-white dark:bg-[#121411] rounded-2xl p-5 border border-stone-200 dark:border-stone-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Original Content
            </span>
            <span className="text-[11px] text-stone-400">
              {originalText.length} chars
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-[#0c0d0b] border border-stone-200/80 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 whitespace-pre-wrap leading-relaxed min-h-[200px]">
            {originalText || 'No text provided'}
          </div>
        </div>

        {/* Right Box: Improved Version */}
        <div className="bg-white dark:bg-[#121411] rounded-2xl p-5 border-2 border-[#588157] dark:border-[#a3b18a] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800 flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3a5a40] dark:text-[#a3b18a]">
              Improved Version
            </span>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors flex items-center space-x-1 ${
                  isEditing
                    ? 'bg-[#588157] text-white border-[#588157]'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                }`}
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditing ? 'Done' : 'Edit'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors flex items-center space-x-1"
              >
                {copied ? (
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

              <button
                onClick={handleDownload}
                className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors flex items-center space-x-1"
              >
                <Download className="w-3 h-3" />
                <span>TXT</span>
              </button>
            </div>
          </div>

          {isEditing ? (
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows={9}
              className="w-full p-3.5 rounded-xl bg-stone-50 dark:bg-[#0c0d0b] border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 leading-relaxed focus:outline-none"
            />
          ) : (
            <div className="p-3.5 rounded-xl bg-[#e9edc9]/20 dark:bg-[#344e41]/20 border border-[#ccd5ae]/60 dark:border-[#588157]/40 text-xs text-stone-900 dark:text-stone-100 whitespace-pre-wrap leading-relaxed min-h-[200px]">
              {currentImprovedText}
            </div>
          )}

          {improvedData?.highlights && improvedData.highlights.length > 0 && (
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-stone-500">
                {improvedData.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
