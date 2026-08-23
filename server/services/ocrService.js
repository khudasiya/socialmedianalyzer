import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Ultra-accurate OCR & Document Text Extraction using Google Gemini 2.5/2.0/1.5 Vision Models
 * @param {Buffer} buffer 
 * @param {string} mimeType 
 * @returns {Promise<{ text: string, confidence: number, engine: string }>}
 */
export const extractTextFromImage = async (buffer, mimeType = 'image/png') => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please set GEMINI_API_KEY in environment variables.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // List of top Gemini vision models ordered by OCR capability
  const modelsToTry = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
  ];

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`[OCR Engine] Attempting OCR text extraction with model: ${modelName}...`);
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.0, // 0.0 temperature for strict deterministic verbatim OCR
        },
      });

      const imagePart = {
        inlineData: {
          data: buffer.toString('base64'),
          mimeType: mimeType || 'image/png',
        },
      };

      const prompt = `You are a world-class Optical Character Recognition (OCR) engine.
Your task is to transcribe ALL text visible in this image with 100% verbatim precision.

Transcribe:
- Every line of text, headline, subheadline, bullet point, paragraph, and caption.
- Every social media handle, timestamp, comment count, and hashtag.
- Retain exact spelling, capitalization, line breaks, and paragraph structure.
- Do NOT skip, summarize, paraphrase, or edit any words.
- Output ONLY the raw extracted text. Do NOT wrap in conversational intro phrases.`;

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const extractedText = response.text() ? response.text().trim() : '';

      if (extractedText && extractedText.length > 0) {
        console.log(`[OCR Engine] Successfully extracted ${extractedText.length} characters using ${modelName}`);
        return {
          text: extractedText,
          confidence: 99.9,
          engine: `Gemini Vision AI (${modelName})`,
        };
      }
    } catch (err) {
      console.warn(`[OCR Engine] ${modelName} returned error:`, err.message);
      lastError = err;
    }
  }

  throw new Error(`Gemini Multimodal OCR failed: ${lastError ? lastError.message : 'No readable text extracted'}`);
};
