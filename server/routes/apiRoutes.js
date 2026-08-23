import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import {
  handleUploadAndExtract,
  handleExtractText,
  handleAnalyze,
  handleImprove,
} from '../controllers/analyzerController.js';

const router = express.Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Social Media Content Analyzer API',
    timestamp: new Date().toISOString(),
    aiEngineConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
  });
});

// File Upload & Text Extraction Route
router.post('/upload', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File size exceeds limit. Please upload a file smaller than 10MB.',
          error: 'File size limit exceeded (10MB)',
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed.',
        error: err.message,
      });
    }
    next();
  });
}, handleUploadAndExtract);

// Text Extraction Endpoint
router.post('/extract-text', handleExtractText);

// Content Analysis Endpoint
router.post('/analyze', handleAnalyze);

// Content Improvement Endpoint
router.post('/improve', handleImprove);

export default router;
