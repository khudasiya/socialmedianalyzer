import React from 'react';
import { ArrowRight, Upload, FileSearch, TrendingUp, Sparkles } from 'lucide-react';
import type { AppStep } from '../types';
import { SampleDocSelector } from '../components/SampleDocSelector';
import type { SamplePost } from '../utils/sampleTexts';

interface HomePageProps {
  onStartAnalysis: (step?: AppStep) => void;
  onSelectSample: (sample: SamplePost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartAnalysis, onSelectSample }) => {
  return (
    <div className="space-y-16 py-8 sm:py-12">
      
      {/* Hero Section */}
      <section className="text-center max-w-2xl mx-auto space-y-6">
        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#e9edc9] dark:bg-[#344e41]/80 text-[#3a5a40] dark:text-[#a3b18a] inline-flex items-center gap-1.5 border border-[#ccd5ae] dark:border-[#588157]/40">
          <Sparkles className="w-3.5 h-3.5 text-[#588157] dark:text-[#a3b18a]" />
          Gemini 1.5 Pro Multimodal Vision AI
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
          Analyze & Improve <span className="text-[#588157] dark:text-[#a3b18a]">Social Media Content</span>
        </h1>

        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          Upload PDF documents or screenshots. Extract text with Gemini Vision AI, audit 8 engagement metrics, and generate viral copy rewrites.
        </p>

        <div>
          <button
            onClick={() => onStartAnalysis('upload')}
            className="px-6 py-3 rounded-xl bg-[#588157] hover:bg-[#3a5a40] text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center space-x-2 dark:bg-[#a3b18a] dark:text-[#1b261b] dark:hover:bg-[#ccd5ae]"
          >
            <span>Start Analyzing Content</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-xs font-bold text-[#3a5a40] dark:text-[#a3b18a] uppercase tracking-wider">
            Workflow
          </h2>
          <p className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
            Simple 3-Step Process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#121411] p-5 rounded-xl border border-stone-200/80 dark:border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#e9edc9] dark:bg-[#344e41]/60 text-[#3a5a40] dark:text-[#a3b18a] flex items-center justify-center font-bold text-xs mb-2">
              <Upload className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100">1. Upload File</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Drag & drop PDF documents, PNG screenshots, or JPG images.
            </p>
          </div>

          <div className="bg-white dark:bg-[#121411] p-5 rounded-xl border border-stone-200/80 dark:border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#e9edc9] dark:bg-[#344e41]/60 text-[#3a5a40] dark:text-[#a3b18a] flex items-center justify-center font-bold text-xs mb-2">
              <FileSearch className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100">2. Gemini OCR</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Gemini 1.5 Pro transcribes readable text with verbatim accuracy.
            </p>
          </div>

          <div className="bg-white dark:bg-[#121411] p-5 rounded-xl border border-stone-200/80 dark:border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#e9edc9] dark:bg-[#344e41]/60 text-[#3a5a40] dark:text-[#a3b18a] flex items-center justify-center font-bold text-xs mb-2">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100">3. Audit & Rewrite</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Get an 8-point engagement score and AI-enhanced post rewrites.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start Selector */}
      <section className="max-w-4xl mx-auto">
        <SampleDocSelector
          onSelectSample={(sample) => {
            onSelectSample(sample);
            onStartAnalysis('extract');
          }}
        />
      </section>

    </div>
  );
};
