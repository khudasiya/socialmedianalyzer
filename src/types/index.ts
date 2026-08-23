export interface MetricItem {
  score: number;
  status: string;
  explanation: string;
  suggestion: string;
}

export interface MetricBreakdown {
  hook: MetricItem;
  readability: MetricItem;
  engagement: MetricItem;
  cta: MetricItem;
  hashtags: MetricItem;
  emoji: MetricItem;
  length: MetricItem;
  tone: MetricItem;
}

export interface Suggestion {
  id: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  issue: string;
  recommendation: string;
  exampleCurrent?: string;
  exampleSuggested?: string;
}

export interface AnalysisResult {
  overallScore: number;
  category: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor';
  summary: string;
  wordCount: number;
  sentenceCount: number;
  detectedTone: string;
  metrics: MetricBreakdown;
  suggestions: Suggestion[];
}

export interface ImprovedContentData {
  originalContent: string;
  improvedContent: string;
  highlights: string[];
  source: string;
  tone: string;
}

export interface FileUploadInfo {
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  rawFile?: File;
}

export type AppStep = 'upload' | 'extract' | 'analyze' | 'improve';
export type TonePreset = 'viral' | 'professional' | 'casual' | 'persuasive';
export type SocialPlatform = 'linkedin' | 'twitter' | 'instagram' | 'facebook';
