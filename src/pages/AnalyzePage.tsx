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
      message: isImage ? 'Scanning image with Tesseract OCR...' : 'Parsing PDF text structure...',
    });

    try {
      const result = await uploadAndExtractFile(fileInfo.rawFile);
      setExtractedText(result.text);
      setCurrentStep('extract');
      setToast({ message: 'Text extracted successfully!', type: 'success' });
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
      message: `Generating ${tone} content rewrite...`,
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
    <div className="space-y-8 py-6">
      
      {toast && (
        <NotificationToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="flex items-center justify-between overflow-x-auto gap-2 pb-1 sm:pb-0 no-scrollbar">
          
          <button
            onClick={() => setCurrentStep('upload')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              currentStep === 'upload'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>1. Upload File</span>
          </button>

          <span className="text-slate-300 dark:text-slate-700 font-bold">→</span>

          <button
            onClick={() => {
              if (extractedText || fileInfo) setCurrentStep('extract');
            }}
            disabled={!extractedText && !fileInfo}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap disabled:opacity-40 ${
              currentStep === 'extract'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>2. Text Editor</span>
          </button>

          <span className="text-slate-300 dark:text-slate-700 font-bold">→</span>

          <button
            onClick={() => {
              if (analysisResult) setCurrentStep('analyze');
              else if (extractedText) handleRunAnalysis();
            }}
            disabled={!extractedText}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap disabled:opacity-40 ${
              currentStep === 'analyze'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>3. Engagement Audit</span>
          </button>

          <span className="text-slate-300 dark:text-slate-700 font-bold">→</span>

          <button
            onClick={() => {
              if (improvedData) setCurrentStep('improve');
              else if (extractedText) handleRunImprovement('viral');
            }}
            disabled={!extractedText}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap disabled:opacity-40 ${
              currentStep === 'improve'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
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
            <div className="space-y-8 animate-fadeIn">
              <EngagementScoreCard result={analysisResult} />

              <div className="bg-gradient-to-r from-indigo-900 to-purple-950 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div>
                  <h4 className="text-base font-bold flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-amber-400" />
                    Ready to generate viral post variations?
                  </h4>
                  <p className="text-xs text-indigo-200/80 mt-0.5">
                    Transform your post with enhanced hooks, CTAs, and formatting.
                  </p>
                </div>
                <button
                  onClick={() => handleRunImprovement('viral')}
                  className="px-6 py-3 rounded-2xl bg-white text-indigo-950 font-extrabold text-xs hover:bg-slate-100 transition-all flex items-center space-x-2 shadow-lg flex-shrink-0"
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
            <div className="space-y-8 animate-fadeIn">
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
