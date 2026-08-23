import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Repeat,
  Share2,
  Bookmark,
  Sparkles,
  MoreHorizontal,
  ThumbsUp,
} from 'lucide-react';

interface PlatformPreviewsProps {
  content: string;
}

export const PlatformPreviews: React.FC<PlatformPreviewsProps> = ({ content }) => {
  const [activeTab, setActiveTab] = useState<'linkedin' | 'twitter' | 'instagram' | 'facebook'>('linkedin');

  const cleanText = content || 'Your post preview will appear here...';

  return (
    <div className="bg-white dark:bg-[#121411] rounded-2xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-[#588157] dark:text-[#a3b18a]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
            Multi-Platform Feed Simulator
          </h3>
        </div>

        <div className="flex items-center space-x-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('linkedin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'linkedin'
                ? 'bg-white dark:bg-stone-900 text-[#0a66c2] shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <span>LinkedIn</span>
          </button>

          <button
            onClick={() => setActiveTab('twitter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'twitter'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <span>Twitter / X</span>
          </button>

          <button
            onClick={() => setActiveTab('instagram')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'instagram'
                ? 'bg-white dark:bg-stone-900 text-rose-600 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <span>Instagram</span>
          </button>

          <button
            onClick={() => setActiveTab('facebook')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'facebook'
                ? 'bg-white dark:bg-stone-900 text-blue-600 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <span>Facebook</span>
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto border border-stone-200 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-950 p-5 shadow-xs">
        
        {activeTab === 'linkedin' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#3a5a40] text-white flex items-center justify-center font-bold text-sm">
                  CL
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-none">
                    Content Creator
                  </h4>
                  <p className="text-[10px] text-stone-500 mt-1">
                    Growth Marketer & AI Specialist • 1h • 🌐
                  </p>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-stone-400" />
            </div>

            <div className="text-xs text-stone-800 dark:text-stone-200 whitespace-pre-wrap leading-relaxed">
              {cleanText}
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-semibold text-stone-500">
              <button className="flex items-center space-x-1.5 hover:text-[#0a66c2]">
                <ThumbsUp className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1.5 hover:text-[#0a66c2]">
                <MessageCircle className="w-4 h-4" />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1.5 hover:text-[#0a66c2]">
                <Repeat className="w-4 h-4" />
                <span>Repost</span>
              </button>
              <button className="flex items-center space-x-1.5 hover:text-[#0a66c2]">
                <Share2 className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'twitter' && (
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#3a5a40] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                CL
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    Content Lens
                  </span>
                  <span className="text-[11px] text-stone-500">@contentlens_ai · 1h</span>
                </div>
                <div className="text-xs text-stone-800 dark:text-stone-200 whitespace-pre-wrap leading-relaxed mt-2">
                  {cleanText}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-stone-500 max-w-sm">
                  <button className="flex items-center space-x-1 hover:text-sky-500">
                    <MessageCircle className="w-4 h-4" />
                    <span>24</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-emerald-500">
                    <Repeat className="w-4 h-4" />
                    <span>12</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-rose-500">
                    <Heart className="w-4 h-4" />
                    <span>148</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-sky-500">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'instagram' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full border border-[#588157] p-0.5">
                  <div className="w-full h-full rounded-full bg-[#3a5a40] text-white flex items-center justify-center font-bold text-[10px]">
                    CL
                  </div>
                </div>
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  contentlens.ai
                </span>
              </div>
              <MoreHorizontal className="w-4 h-4 text-stone-400" />
            </div>

            <div className="w-full h-44 rounded-xl bg-[#3a5a40] text-white flex items-center justify-center font-extrabold text-sm p-4 text-center">
              <span>{cleanText.slice(0, 80)}...</span>
            </div>

            <div className="flex items-center justify-between text-stone-800 dark:text-stone-200">
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 cursor-pointer hover:text-rose-500" />
                <MessageCircle className="w-5 h-5 cursor-pointer" />
                <Share2 className="w-5 h-5 cursor-pointer" />
              </div>
              <Bookmark className="w-5 h-5 cursor-pointer" />
            </div>

            <div className="text-xs text-stone-800 dark:text-stone-200 whitespace-pre-wrap leading-relaxed">
              <span className="font-bold mr-1 text-stone-900 dark:text-stone-100">
                contentlens.ai
              </span>
              {cleanText}
            </div>
          </div>
        )}

        {activeTab === 'facebook' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#3a5a40] text-white flex items-center justify-center font-bold text-sm">
                  CL
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-none">
                    ContentLens AI Page
                  </h4>
                  <p className="text-[10px] text-stone-500 mt-1">
                    Just now • 🌎
                  </p>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-stone-400" />
            </div>

            <div className="text-xs text-stone-800 dark:text-stone-200 whitespace-pre-wrap leading-relaxed">
              {cleanText}
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-around text-xs font-semibold text-stone-500">
              <button className="flex items-center space-x-1.5 hover:text-blue-600">
                <ThumbsUp className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1.5 hover:text-blue-600">
                <MessageCircle className="w-4 h-4" />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1.5 hover:text-blue-600">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
