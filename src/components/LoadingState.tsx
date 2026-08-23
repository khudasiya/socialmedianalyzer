import React from 'react';
import { Loader2, Sparkles, FileText, Image as ImageIcon, Cpu, Zap } from 'lucide-react';

interface LoadingStateProps {
  stage: 'uploading' | 'ocr' | 'pdf' | 'analyzing' | 'improving';
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ stage, message }) => {
  const getStageDetails = () => {
    switch (stage) {
      case 'uploading':
        return {
          title: 'Uploading File...',
          desc: message || 'Uploading your document securely to the processing pipeline...',
          icon: FileText,
        };
      case 'ocr':
        return {
          title: 'Gemini Vision AI Extraction...',
          desc: message || 'Reading and recognizing text elements using Gemini 1.5 Pro Multimodal Vision...',
          icon: ImageIcon,
        };
      case 'pdf':
        return {
          title: 'Extracting PDF Text...',
          desc: message || 'Parsing document structure, headings, and paragraph blocks...',
          icon: FileText,
        };
      case 'analyzing':
        return {
          title: 'Evaluating Engagement Potential...',
          desc: message || 'Auditing hook curiosity, readability, call-to-actions, tone, & hashtags...',
          icon: Cpu,
        };
      case 'improving':
        return {
          title: 'Generating Gemini AI Content Rewrite...',
          desc: message || 'Crafting scroll-stopping hooks, mobile spacing, and high-converting CTAs...',
          icon: Zap,
        };
    }
  };

  const details = getStageDetails();
  const StageIcon = details.icon;

  return (
    <div className="bg-white dark:bg-[#121411] rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-stone-800 shadow-xs text-center flex flex-col items-center justify-center max-w-lg mx-auto space-y-6 animate-fadeIn">
      
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-[#e9edc9] dark:bg-[#344e41]/60 p-0.5 border border-[#ccd5ae] dark:border-[#588157]/40 flex items-center justify-center">
          <StageIcon className="w-9 h-9 text-[#588157] dark:text-[#a3b18a] animate-bounce" />
        </div>

        <div className="absolute -bottom-2 -right-2 bg-[#588157] text-white p-1.5 rounded-full shadow-xs">
          <Loader2 className="w-4 h-4 animate-spin text-white" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center justify-center gap-2">
          <span>{details.title}</span>
          <Sparkles className="w-4 h-4 text-[#588157] animate-spin" />
        </h3>
        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs mx-auto">
          {details.desc}
        </p>
      </div>

      <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-1.5 overflow-hidden max-w-xs">
        <div className="h-full bg-[#588157] dark:bg-[#a3b18a] rounded-full animate-indeterminate" />
      </div>

      <div className="text-[11px] font-semibold text-stone-400 dark:text-stone-500">
        Gemini Vision AI • Verbatim Extraction Processing
      </div>
    </div>
  );
};
