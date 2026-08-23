import type { AnalysisResult, ImprovedContentData } from '../types';
import {
  extractImageTextLocal,
  extractPdfTextLocal,
  analyzeContentLocal,
  improveContentLocal,
} from './localAnalyzer';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Upload file and extract text (API with Local fallback)
 */
export const uploadAndExtractFile = async (
  file: File
): Promise<{ text: string; fileInfo: { name: string; size: number; type: string } }> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      if (json.success && json.data?.extraction?.text) {
        return {
          text: json.data.extraction.text,
          fileInfo: {
            name: file.name,
            size: file.size,
            type: file.type,
          },
        };
      }
    }
  } catch (err) {
    console.warn('Backend upload server offline or unreachable. Using client-side extraction:', err);
  }

  // Client-Side Fallback Extraction
  let extractedText = '';
  if (file.type.startsWith('image/')) {
    extractedText = await extractImageTextLocal(file);
  } else {
    extractedText = await extractPdfTextLocal(file);
  }

  return {
    text: extractedText,
    fileInfo: {
      name: file.name,
      size: file.size,
      type: file.type,
    },
  };
};

/**
 * Analyze Social Media Content (API with Local fallback)
 */
export const analyzeContent = async (text: string): Promise<AnalysisResult> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      if (json.success && json.data) {
        return json.data as AnalysisResult;
      }
    }
  } catch (err) {
    console.warn('Backend analysis server offline. Using local analyzer:', err);
  }

  return analyzeContentLocal(text);
};

/**
 * Improve Social Media Content (API with Local fallback)
 */
export const improveContent = async (
  text: string,
  targetTone: string = 'viral'
): Promise<ImprovedContentData> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(`${API_BASE}/improve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetTone }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      if (json.success && json.data) {
        return json.data as ImprovedContentData;
      }
    }
  } catch (err) {
    console.warn('Backend improvement server offline. Using local AI rewrite engine:', err);
  }

  return improveContentLocal(text, targetTone);
};
