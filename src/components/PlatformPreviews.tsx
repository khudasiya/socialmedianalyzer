import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Share2,
  ThumbsUp,
  Globe,
  MoreHorizontal,
  Sparkles,
} from 'lucide-react';
import type { SocialPlatform } from '../types';

interface PlatformPreviewsProps {
  content: string;
}

export const PlatformPreviews: React.FC<PlatformPreviewsProps> = ({ content }) => {
  const [activePlatform, setActivePlatform] = useState<SocialPlatform>('linkedin');

  const platforms = [
    { id: 'linkedin' as const, label: 'LinkedIn', color: 'text-sky-600' },
    { id: 'twitter' as const, label: 'Twitter / X', color: 'text-slate-900 dark:text-white' },
    { id: 'instagram' as const, label: 'Instagram', color: 'text-pink-600' },
    { id: 'facebook' as const, label: 'Facebook', color: 'text-blue-600' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Social Platform Live Simulator</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Preview how your optimized post renders on target social media feeds
          </p>
        </div>

        {/* Platform Tabs */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl flex-wrap">
          {platforms.map(({ id, label, color }) => (
            <button
              key={id}
              onClick={() => setActivePlatform(id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activePlatform === id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span className={`font-black ${activePlatform === id ? color : ''}`}>
                {id === 'linkedin' && 'in'}
                {id === 'twitter' && '𝕏'}
                {id === 'instagram' && '📷'}
                {id === 'facebook' && 'f'}
              </span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Display Card */}
      <div className="max-w-xl mx-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-inner">
        
        {/* LINKEDIN PREVIEW */}
        {activePlatform === 'linkedin' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 font-sans">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  CL
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">ContentLens Creator</h4>
                  <p className="text-[10px] text-slate-500 flex items-center gap-1">
                    AI Content Strategist • 1h • <Globe className="w-2.5 h-2.5" />
                  </p>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-slate-400" />
            </div>

            <div className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
              {content}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1 hover:text-sky-600 transition-colors">
                <ThumbsUp className="w-3.5 h-3.5 text-sky-600" /> Like
              </span>
              <span className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-300">
                <MessageCircle className="w-3.5 h-3.5" /> Comment
              </span>
              <span className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-300">
                <Repeat2 className="w-3.5 h-3.5" /> Repost
              </span>
              <span className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-300">
                <Share2 className="w-3.5 h-3.5" /> Send
              </span>
            </div>
          </div>
        )}

        {/* TWITTER / X PREVIEW */}
        {activePlatform === 'twitter' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 font-sans">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                𝕏
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5 text-xs">
                  <span className="font-bold text-slate-900 dark:text-slate-100">ContentLens</span>
                  <span className="text-slate-500">@contentlens_ai</span>
                  <span className="text-slate-400">· 2h</span>
                </div>
                <div className="text-xs text-slate-800 dark:text-slate-200 mt-2 whitespace-pre-wrap leading-relaxed">
                  {content}
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 hover:text-sky-500"><MessageCircle className="w-3.5 h-3.5" /> 142</span>
                  <span className="flex items-center gap-1 hover:text-emerald-500"><Repeat2 className="w-3.5 h-3.5" /> 89</span>
                  <span className="flex items-center gap-1 hover:text-rose-500"><Heart className="w-3.5 h-3.5" /> 1.2k</span>
                  <span className="flex items-center gap-1 hover:text-sky-500"><Bookmark className="w-3.5 h-3.5" /> 340</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INSTAGRAM PREVIEW */}
        {activePlatform === 'instagram' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center font-bold text-xs">
                    CL
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">contentlens_ai</span>
              </div>
              <MoreHorizontal className="w-4 h-4 text-slate-400" />
            </div>

            {/* Mock Visual Placeholder */}
            <div className="w-full h-44 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-extrabold text-sm p-4 text-center shadow-inner">
              ✨ High Engagement Visual Graphic ✨
            </div>

            <div className="flex items-center justify-between text-slate-800 dark:text-slate-200">
              <div className="flex items-center space-x-3">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <MessageCircle className="w-4 h-4" />
                <Share2 className="w-4 h-4" />
              </div>
              <Bookmark className="w-4 h-4" />
            </div>

            <div className="text-xs text-slate-800 dark:text-slate-200 space-y-1">
              <p className="font-bold">1,842 likes</p>
              <p className="whitespace-pre-wrap leading-relaxed">
                <span className="font-bold mr-1.5">contentlens_ai</span>
                {content}
              </p>
            </div>
          </div>
        )}

        {/* FACEBOOK PREVIEW */}
        {activePlatform === 'facebook' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 font-sans">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                f
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">ContentLens Official</h4>
                <p className="text-[10px] text-slate-500">Just now • 🌐</p>
              </div>
            </div>

            <div className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
              {content}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1 hover:text-blue-600">
                <ThumbsUp className="w-3.5 h-3.5" /> Like
              </span>
              <span className="flex items-center gap-1 hover:text-blue-600">
                <MessageCircle className="w-3.5 h-3.5" /> Comment
              </span>
              <span className="flex items-center gap-1 hover:text-blue-600">
                <Share2 className="w-3.5 h-3.5" /> Share
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
