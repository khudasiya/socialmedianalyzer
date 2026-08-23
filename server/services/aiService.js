import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Generate improved social media content using Google AI models
 * @param {string} originalText 
 * @param {string} targetTone 
 * @returns {Promise<{ improvedContent: string, highlights: string[], source: string }>}
 */
export const generateImprovedContent = async (originalText, targetTone = 'viral') => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API key is not configured.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelsToTry = ['gemma-4-31b-it', 'gemini-3.7-flash', 'gemini-3.5-flash'];
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const prompt = `You are a world-class social media copywriter.
Rewrite the following post in a ${targetTone} tone to maximize engagement, readability, and viral reach.
Keep paragraph spacing clean, use bullet points where helpful, and include an explicit Call-To-Action.

Original Post:
"""
${originalText}
"""

Return ONLY the rewritten post text. Do not add intro or outro commentary.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const rewrittenText = response.text() ? response.text().trim() : '';

      if (rewrittenText && rewrittenText.length > 0) {
        return {
          improvedContent: rewrittenText,
          highlights: [
            'Transformed opening headline into a scroll-stopping curiosity hook.',
            'Optimized text layout with bullet points for mobile skimmability.',
            'Added high-conversion Call-To-Action (CTA).',
            'Targeted hashtag selection for algorithm discovery.',
          ],
          source: `AI Engine (${modelName})`,
        };
      }
    } catch (err) {
      console.warn(`Attempt with ${modelName} failed:`, err.message);
      lastError = err;
    }
  }

  throw new Error(`AI Content Rewrite failed: ${lastError ? lastError.message : 'Unable to generate response'}`);
};
