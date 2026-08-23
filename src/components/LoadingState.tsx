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
          color: 'from-blue-500 to-indigo-600',
        };
      case 'ocr':
        return {
          title: 'Gemini Vision AI Extraction...',
          desc: message || 'Reading and recognizing text elements using Gemini 1.5 Flash Multimodal Vision...',
          icon: ImageIcon,
          color: 'from-purple-500 to-indigo-600',
        };
      case 'pdf':
        return {
          title: 'Extracting PDF Text...',
          desc: message || 'Parsing document structure, headings, and paragraph blocks...',
          icon: FileText,
          color: 'from-indigo-600 to-purple-600',
        };
      case 'analyzing':
        return {
          title: 'Evaluating Engagement Potential...',
          desc: message || 'Auditing hook curiosity, readability, call-to-actions, tone, & hashtags...',
          icon: Cpu,
          color: 'from-indigo-600 via-purple-600 to-pink-600',
        };
      case 'improving':
        return {
          title: 'Generating Gemini AI Content Rewrite...',
          desc: message || 'Crafting scroll-stopping hooks, mobile spacing, and high-converting CTAs...',
          icon: Zap,
          color: 'from-amber-500 via-purple-600 to-indigo-600',
        };
    }
  };

  const details = getStageDetails();
  const StageIcon = details.icon;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl text-center flex flex-col items-center justify-center max-w-lg mx-auto space-y-6 animate-fadeIn">
      
      <div className="relative">
        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-tr ${details.color} p-0.5 shadow-xl shadow-indigo-500/20 animate-pulse`}>
          <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[22px] flex items-center justify-center">
            <StageIcon className="w-9 h-9 text-indigo-600 dark:text-indigo-400 animate-bounce" />
          </div>
        </div>

        <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-1.5 rounded-full shadow-md">
          <Loader2 className="w-4 h-4 animate-spin text-white" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2">
          <span>{details.title}</span>
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
          {details.desc}
        </p>
      </div>

      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden max-w-xs">
        <div className={`h-full bg-gradient-to-r ${details.color} rounded-full animate-indeterminate`} />
      </div>

      <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
        Gemini AI Processing • Please hold on a moment
      </div>
    </div>
  );
};
