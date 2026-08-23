import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  BarChart3,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import type {
  AppStep,
  FileUploadInfo,
  AnalysisResult,
  ImprovedContentData,
  TonePreset,
} from '../types';
import { FileUploader } from '../components/FileUploader';
import { TextEditor } from '../components/TextEditor';
import { EngagementScoreCard } from '../components/EngagementScoreCard';
import { AnalysisBreakdown } from '../components/AnalysisBreakdown';
import { SuggestionsList } from '../components/SuggestionsList';
import { AIRewriteStudio } from '../components/AIRewriteStudio';
import { PlatformPreviews } from '../components/PlatformPreviews';
import { LoadingState } from '../components/LoadingState';
import { NotificationToast } from '../components/NotificationToast';
import { uploadAndExtractFile, analyzeContent, improveContent } from '../services/api';
import type { SamplePost } from '../utils/sampleTexts';

interface AnalyzePageProps {
  initialStep?: AppStep;
}

export const AnalyzePage: React.FC<AnalyzePageProps> = ({ initialStep = 'upload' }) => {
  const [currentStep, setCurrentStep] = useState<AppStep>(initialStep);
  const [fileInfo, setFileInfo] = useState<FileUploadInfo | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [improvedData, setImprovedData] = useState<ImprovedContentData | null>(null);

  const [loadingState, setLoadingState] = useState<{
    isLoading: boolean;
    stage: 'uploading' | 'ocr' | 'pdf' | 'analyzing' | 'improving';
    message?: string;
  }>({ isLoading: false, stage: 'uploading' });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleFileSelected = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const previewUrl = isImage ? URL.createObjectURL(file) : undefined;

    setFileInfo({
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl,
      rawFile: file,
    });
  };

  const handleSampleSelected = (sample: SamplePost) => {
    setFileInfo({
      name: `${sample.title} (${sample.type})`,
      size: 2048,
      type: sample.type === 'PDF' ? 'application/pdf' : 'image/png',
    });
    setExtractedText(sample.content);
    setCurrentStep('extract');
    setToast({ message: `Loaded sample document: "${sample.title}"`, type: 'success' });
  };

  const handleProceedToExtract = async () => {
    if (!fileInfo?.rawFile) {
      if (extractedText.trim()) {
        setCurrentStep('extract');
      }
      return;
    }

    const isImage = fileInfo.type.startsWith('image/');
    setLoadingState({
      isLoading: true,
      stage: isImage ? 'ocr' : 'pdf',
      message: isImage ? 'Scanning image with Gemini Vision AI...' : 'Parsing PDF text structure...',
    });

    try {
      const result = await uploadAndExtractFile(fileInfo.rawFile);
      setExtractedText(result.text);
      setCurrentStep('extract');
      setToast({ message: 'Text extracted successfully via Gemini Vision!', type: 'success' });
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to extract text from file.', type: 'error' });
    } finally {
      setLoadingState({ isLoading: false, stage: 'uploading' });
    }
  };

  const handleRunAnalysis = async () => {
    if (!extractedText.trim()) {
      setToast({ message: 'Please provide text content to analyze.', type: 'error' });
      return;
    }

    setLoadingState({
      isLoading: true,
      stage: 'analyzing',
      message: 'Evaluating engagement score, readability, CTAs, & tone...',
    });

    try {
      const result = await analyzeContent(extractedText);
      setAnalysisResult(result);
      setCurrentStep('analyze');
      setToast({ message: `Content analysis complete! Score: ${result.overallScore}/100`, type: 'success' });
    } catch (err: any) {
      setToast({ message: err.message || 'Analysis failed. Please try again.', type: 'error' });
    } finally {
      setLoadingState({ isLoading: false, stage: 'analyzing' });
    }
  };

  const handleRunImprovement = async (tone: TonePreset = 'viral') => {
    if (!extractedText.trim()) return;

    setLoadingState({
      isLoading: true,
      stage: 'improving',
      message: `Generating ${tone} content rewrite with Gemini AI...`,
    });

    try {
      const result = await improveContent(extractedText, tone);
      setImprovedData(result);
      setCurrentStep('improve');
    } catch (err: any) {
      setToast({ message: err.message || 'Content improvement failed.', type: 'error' });
    } finally {
      setLoadingState({ isLoading: false, stage: 'improving' });
    }
  };

  const handleResetAll = () => {
    if (fileInfo?.previewUrl) {
      URL.revokeObjectURL(fileInfo.previewUrl);
    }
    setFileInfo(null);
    setExtractedText('');
    setAnalysisResult(null);
    setImprovedData(null);
    setCurrentStep('upload');
  };

  return (
    <div className="space-y-6 py-6">
      
      {toast && (
        <NotificationToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Stepper Navbar */}
      <div className="bg-white dark:bg-[#121411] rounded-2xl p-3 border border-stone-200/80 dark:border-stone-800 shadow-xs">
        <div className="flex items-center justify-between overflow-x-auto gap-2 pb-1 sm:pb-0 no-scrollbar">
          
          <button
            onClick={() => setCurrentStep('upload')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              currentStep === 'upload'
                ? 'bg-[#588157] text-white dark:bg-[#a3b18a] dark:text-[#1b261b]'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>1. Upload File</span>
          </button>

          <span className="text-stone-300 dark:text-stone-700 font-bold">→</span>

          <button
            onClick={() => {
              if (extractedText || fileInfo) setCurrentStep('extract');
            }}
            disabled={!extractedText && !fileInfo}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap disabled:opacity-40 ${
              currentStep === 'extract'
                ? 'bg-[#588157] text-white dark:bg-[#a3b18a] dark:text-[#1b261b]'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>2. Text Editor</span>
          </button>

          <span className="text-stone-300 dark:text-stone-700 font-bold">→</span>

          <button
            onClick={() => {
              if (analysisResult) setCurrentStep('analyze');
              else if (extractedText) handleRunAnalysis();
            }}
            disabled={!extractedText}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap disabled:opacity-40 ${
              currentStep === 'analyze'
                ? 'bg-[#588157] text-white dark:bg-[#a3b18a] dark:text-[#1b261b]'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>3. Engagement Audit</span>
          </button>

          <span className="text-stone-300 dark:text-stone-700 font-bold">→</span>

          <button
            onClick={() => {
              if (improvedData) setCurrentStep('improve');
              else if (extractedText) handleRunImprovement('viral');
            }}
            disabled={!extractedText}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap disabled:opacity-40 ${
              currentStep === 'improve'
                ? 'bg-[#588157] text-white dark:bg-[#a3b18a] dark:text-[#1b261b]'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>4. AI Rewrite & Preview</span>
          </button>

        </div>
      </div>

      {loadingState.isLoading ? (
        <LoadingState stage={loadingState.stage} message={loadingState.message} />
      ) : (
        <>
          {currentStep === 'upload' && (
            <FileUploader
              onFileSelected={handleFileSelected}
              onSampleSelected={handleSampleSelected}
              currentFile={fileInfo}
              onClearFile={() => setFileInfo(null)}
              isLoading={loadingState.isLoading}
              onProceedToExtract={handleProceedToExtract}
            />
          )}

          {currentStep === 'extract' && (
            <TextEditor
              text={extractedText}
              onTextChange={setExtractedText}
              onAnalyze={handleRunAnalysis}
              onReset={handleResetAll}
              isLoading={loadingState.isLoading}
              fileName={fileInfo?.name}
            />
          )}

          {currentStep === 'analyze' && analysisResult && (
            <div className="space-y-6 animate-fadeIn">
              <EngagementScoreCard result={analysisResult} />

              <div className="bg-[#3a5a40] dark:bg-[#1b261b] text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#588157]/40 shadow-xs">
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#e9edc9]" />
                    Ready to generate viral post variations with Gemini AI?
                  </h4>
                  <p className="text-xs text-[#ccd5ae] mt-0.5">
                    Transform your post with enhanced hooks, CTAs, and formatting.
                  </p>
                </div>
                <button
                  onClick={() => handleRunImprovement('viral')}
                  className="px-5 py-2.5 rounded-xl bg-[#e9edc9] text-[#3a5a40] font-bold text-xs hover:bg-[#ccd5ae] transition-colors flex items-center space-x-1.5 flex-shrink-0"
                >
                  <span>Improve Content Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <AnalysisBreakdown metrics={analysisResult.metrics} />
              <SuggestionsList suggestions={analysisResult.suggestions} />
            </div>
          )}

          {currentStep === 'improve' && (
            <div className="space-y-6 animate-fadeIn">
              <AIRewriteStudio
                improvedData={improvedData}
                originalText={extractedText}
                onRegenerateTone={(tone) => handleRunImprovement(tone)}
                isLoading={loadingState.isLoading}
              />

              <PlatformPreviews
                content={improvedData?.improvedContent || extractedText}
              />
            </div>
          )}
        </>
      )}

    </div>
  );
};
