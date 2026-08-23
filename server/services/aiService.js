import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Enhanced content rewrite generator (AI powered with smart rule fallback)
 * @param {string} text 
 * @param {string} targetTone 
 * @returns {Promise<{ improvedContent: string, highlights: string[], source: string }>}
 */
export const generateImprovedContent = async (text, targetTone = 'viral') => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const prompt = `You are a world-class social media strategist and viral copywriting expert.
Rewrite the following social media post to maximize reader engagement, hook curiosity, readability, and call-to-action strength while preserving the core message.

Target Tone Style: ${targetTone} (Options: viral, professional, casual, persuasive)

Original Post:
"""
${text}
"""

Instructions:
1. Craft an irresistible 1-line hook.
2. Structure main body with clean line breaks, short punchy sentences, and 2-4 strategic emojis.
3. End with a high-converting Call To Action (CTA).
4. Append 3-5 high-relevance hashtags.
5. Provide ONLY the final improved social media post. Do not add intro conversational commentary.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedText = response.text() ? response.text().trim() : null;

      if (generatedText) {
        return {
          improvedContent: generatedText,
          highlights: [
            'Transformed opening into a high-curiosity scroll-stopping hook.',
            'Optimized spacing and formatting for fast mobile skimmability.',
            'Added clear, high-converting Call-To-Action (CTA).',
            'Included high-impact hashtags tailored for algorithmic reach.',
          ],
          source: 'AI (Gemini 1.5 Flash)',
        };
      }
    } catch (err) {
      console.warn('Gemini API request failed, utilizing rule-based intelligent fallback:', err.message);
    }
  }

  // Smart Rule-Based NLP Content Rewriter Fallback
  return generateRuleBasedRewrite(text, targetTone);
};

/**
 * Intelligent Rule-Based Content Enhancer
 */
const generateRuleBasedRewrite = (text, targetTone) => {
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  const firstLine = lines[0] || text;
  const restLines = lines.slice(1).join('\n\n') || '';

  let hook = firstLine;
  if (!/(\?|!|🔥|🚀|how|why|stop|secret|truth)/i.test(firstLine)) {
    if (targetTone === 'professional') {
      hook = `💡 Industry Insight: ${firstLine}`;
    } else if (targetTone === 'casual') {
      hook = `Quick story: ${firstLine} 👇`;
    } else if (targetTone === 'persuasive') {
      hook = `Stop scrolling: ${firstLine} (Here's why 👇)`;
    } else {
      hook = `🔥 ${firstLine.replace(/^(today|here is|i want to talk about)/i, '').trim()} — and why most people miss it:`;
    }
  }

  let body = restLines;
  if (!body) {
    body = `Here's what you need to know:\n\n• Key insight #1: Focus on immediate value.\n• Key insight #2: Structure your content for skimmability.\n• Key insight #3: Always speak directly to your audience.`;
  } else {
    body = body
      .replace(/\n\n/g, '\n\n')
      .replace(/(\d+\.\s+)/g, '\n👉 ')
      .replace(/^-\s+/gm, '• ');
  }

  let cta = '';
  if (targetTone === 'professional') {
    cta = 'What strategies are working best for your team? Share your thoughts below 💬';
  } else if (targetTone === 'casual') {
    cta = 'What do you think? Drop a comment below! 👇';
  } else if (targetTone === 'persuasive') {
    cta = 'Save this post for later 📌 and share with someone who needs to see this today!';
  } else {
    cta = 'Found this helpful? Drop a 🔥 in the comments & save for later!';
  }

  let hashtags = '';
  if (!text.includes('#')) {
    hashtags = '\n\n#ContentStrategy #SocialMediaTips #DigitalMarketing #GrowthHacks #Engagement';
  }

  const improved = `${hook}\n\n${body}\n\n${cta}${hashtags}`.trim();

  return {
    improvedContent: improved,
    highlights: [
      'Enhanced scroll-stopping opening hook with visual anchor.',
      'Restructured text for maximum readability and mobile spacing.',
      'Added high-conversion Call-To-Action (CTA).',
      'Appended niche hashtags for platform discoverability.',
    ],
    source: 'Rule-Based Engine (Fallback)',
  };
};
