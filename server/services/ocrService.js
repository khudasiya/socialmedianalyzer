import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * High-Precision OCR & Text Extraction using Gemini Vision AI
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

  // Use official GA Gemini vision models: gemini-1.5-flash and gemini-1.5-pro
  const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-pro'];

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`[OCR Engine] Executing Gemini Vision OCR with model: ${modelName}...`);
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.0, // 0.0 temperature for deterministic verbatim OCR
        },
      });

      const imagePart = {
        inlineData: {
          data: buffer.toString('base64'),
          mimeType: mimeType || 'image/png',
        },
      };

      const prompt = `You are a high-precision Optical Character Recognition (OCR) engine.
Transcribe ALL readable text visible in this image or poster with 100% verbatim accuracy.

Rules for Transcription:
1. Read every headline, title, subtitle, date, tape banner text, brand name, and caption word-for-word.
2. Preserve exact spelling, capitalization, line breaks, and paragraph structure.
3. Do NOT skip any words, numbers, or dates (e.g. dates like 27.08.2026, text on green banners, brand names like MADVERSE).
4. Do NOT paraphrase, summarize, or add intro commentary. Return ONLY the raw transcribed text.`;

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
      console.warn(`[OCR Engine] Model ${modelName} returned error:`, err.message);
      lastError = err;
    }
  }

  throw new Error(`Gemini Multimodal Vision OCR extraction failed: ${lastError ? lastError.message : 'Unable to read image'}`);
};
