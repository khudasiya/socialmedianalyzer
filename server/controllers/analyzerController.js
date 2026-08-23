import { extractTextFromPDF } from '../services/pdfService.js';
import { extractTextFromImage } from '../services/ocrService.js';
import { analyzeSocialMediaContent } from '../services/analysisService.js';
import { generateImprovedContent } from '../services/aiService.js';
import { successResponse, errorResponse } from '../utils/responseFormatter.js';

/**
 * Handle document/image upload and automatic text extraction using Gemini Vision & PDF parsers
 */
export const handleUploadAndExtract = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded. Please select a valid document or image.', null, 400);
    }

    const file = req.file;
    const mimeType = file.mimetype;
    let extractedData = null;
    let fileTypeCategory = 'unknown';

    if (mimeType === 'application/pdf') {
      fileTypeCategory = 'PDF Document';
      const pdfResult = await extractTextFromPDF(file.buffer);
      extractedData = {
        text: pdfResult.text,
        numPages: pdfResult.numPages,
        confidence: 99,
        engine: 'PDF Parser Engine',
      };
    } else if (mimeType.startsWith('image/')) {
      fileTypeCategory = 'Image (Multimodal OCR)';
      const ocrResult = await extractTextFromImage(file.buffer, mimeType);
      extractedData = {
        text: ocrResult.text,
        numPages: 1,
        confidence: ocrResult.confidence,
        engine: ocrResult.engine,
      };
    } else {
      return errorResponse(res, 'Unsupported file format.', null, 400);
    }

    if (!extractedData.text || extractedData.text.length === 0) {
      return errorResponse(
        res,
        'We couldn\'t detect any readable text in this file. Please try a clearer image or document.',
        null,
        422
      );
    }

    return successResponse(res, `Text extracted successfully via ${extractedData.engine}`, {
      fileInfo: {
        originalName: file.originalname,
        mimeType: file.mimetype,
        sizeBytes: file.size,
        fileTypeCategory,
      },
      extraction: extractedData,
    });
  } catch (error) {
    console.error('Upload & Extraction Controller Error:', error);
    return errorResponse(res, error.message || 'An error occurred during file processing.', error, 500);
  }
};

/**
 * Handle raw text extraction request
 */
export const handleExtractText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim().length === 0) {
      return errorResponse(res, 'Please provide text content to process.', null, 400);
    }

    return successResponse(res, 'Text processed successfully', {
      text: text.trim(),
    });
  } catch (error) {
    return errorResponse(res, 'Failed to process text', error, 500);
  }
};

/**
 * Handle content engagement analysis
 */
export const handleAnalyze = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim().length === 0) {
      return errorResponse(res, 'No content provided for analysis.', null, 400);
    }

    const analysisResult = analyzeSocialMediaContent(text);
    return successResponse(res, 'Content analyzed successfully', analysisResult);
  } catch (error) {
    console.error('Analysis Controller Error:', error);
    return errorResponse(res, error.message || 'Failed to analyze content.', error, 500);
  }
};

/**
 * Handle content improvement & rewrite request
 */
export const handleImprove = async (req, res) => {
  try {
    const { text, targetTone } = req.body;
    if (!text || text.trim().length === 0) {
      return errorResponse(res, 'No text provided for improvement.', null, 400);
    }

    const improvementResult = await generateImprovedContent(text, targetTone || 'viral');

    return successResponse(res, 'Content improved successfully', {
      originalContent: text.trim(),
      improvedContent: improvementResult.improvedContent,
      highlights: improvementResult.highlights,
      source: improvementResult.source,
      tone: targetTone || 'viral',
    });
  } catch (error) {
    console.error('Improvement Controller Error:', error);
    return errorResponse(res, error.message || 'Failed to improve content.', error, 500);
  }
};
