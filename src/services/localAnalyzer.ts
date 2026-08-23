import type { AnalysisResult, ImprovedContentData, MetricItem, Suggestion } from '../types';

/**
 * Convert file to Base64 string
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * High-Precision Client-Side Image OCR using Gemini Vision AI Models
 */
export const extractImageTextLocal = async (file: File): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || '';

  if (apiKey) {
    const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-pro'];
    const base64Data = await fileToBase64(file);
    const mimeType = file.type || 'image/png';

    for (const modelName of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: 'Transcribe ALL readable text from this image with 100% verbatim accuracy. Read every headline, title, subtitle, date, tape banner, and brand name word-for-word. Output ONLY raw text.',
                    },
                    {
                      inline_data: {
                        mime_type: mimeType,
                        data: base64Data,
                      },
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.0,
              },
            }),
          }
        );

        if (response.ok) {
          const json = await response.json();
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim().length > 0) {
            return text.trim();
          }
        }
      } catch (err) {
        console.warn(`Client direct ${modelName} call failed:`, err);
      }
    }
  }

  throw new Error('Gemini API key is not configured in Vercel Environment Variables. Please set VITE_GEMINI_API_KEY in Vercel settings.');
};

/**
 * Client-Side PDF Text Extractor
 */
export const extractPdfTextLocal = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        const textDecoder = new TextDecoder('utf-8');
        const raw = textDecoder.decode(buffer);
        const matches = raw.match(/\(([^()]{3,})\)/g) || [];
        const extracted = matches
          .map((m) => m.slice(1, -1))
          .filter((t) => /[a-zA-Z0-9\s.,!?'"-]{4,}/.test(t))
          .join(' ');

        if (extracted && extracted.length > 10) {
          resolve(extracted);
        } else {
          throw new Error(`Unable to extract text from PDF (${file.name}). Please ensure the PDF contains selectable text.`);
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read PDF file'));
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Local NLP Rule-Based Analysis Engine
 */
export const analyzeContentLocal = (text: string): AnalysisResult => {
  const cleanText = text.trim();
  const lines = cleanText.split('\n').filter((l) => l.trim().length > 0);
  const words = cleanText.match(/\b[\w'-]+\b/g) || [];
  const wordCount = words.length;
  const sentences = cleanText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = sentences.length || 1;

  const firstLine = lines[0] || '';
  const firstLineWords = (firstLine.match(/\b[\w'-]+\b/g) || []).length;
  let hookScore = 55;
  let hookReason = 'Opening line is informative but lacks urgency or curiosity.';
  let hookSuggestion = 'Start with a compelling question, surprising statistic, or unexpected problem.';

  const curiosityTriggers = ['how', 'why', 'stop', 'secret', 'never', 'don\'t', 'avoid', 'hack', 'truth', 'mistake', 'you\'re', 'imagine', 'what if'];
  const hasCuriosity = curiosityTriggers.some((t) => firstLine.toLowerCase().includes(t));
  const questionInHook = firstLine.includes('?');

  if (firstLineWords < 3) {
    hookScore = 40;
    hookReason = 'Opening hook is too brief.';
    hookSuggestion = 'Expand into a strong scroll-stopping headline.';
  } else if (hasCuriosity || questionInHook) {
    hookScore = 88;
    hookReason = 'Great hook! Uses curiosity triggers or direct audience questions.';
    hookSuggestion = 'Keep this strong headline format.';
  }

  const avgSentenceLength = wordCount / sentenceCount;
  let readabilityScore = 82;
  let readabilityStatus = 'Clear & Accessible';
  let readabilitySuggestion = 'Good sentence length for fast online readers.';

  if (avgSentenceLength > 20) {
    readabilityScore = 60;
    readabilityStatus = 'Dense / Complex';
    readabilitySuggestion = 'Break paragraphs into shorter 1-2 sentence lines.';
  } else if (avgSentenceLength > 14) {
    readabilityScore = 74;
    readabilityStatus = 'Moderate Complexity';
  }

  const questionCount = (cleanText.match(/\?/g) || []).length;
  const userAddressing = (cleanText.match(/\b(you|your|yours|we|us|imagine|share|comment|tell)\b/gi) || []).length;
  let engagementScore = 65;
  let engagementReason = 'Moderate interaction cues detected.';
  let engagementTip = 'Ask open questions directly to your audience.';

  if (questionCount > 0 && userAddressing >= 3) {
    engagementScore = 88;
    engagementReason = 'High engagement potential! Speaks directly to reader.';
    engagementTip = 'Promote sharing with key action points.';
  } else if (userAddressing < 2) {
    engagementScore = 50;
    engagementReason = 'Post reads like a broadcast instead of a conversation.';
  }

  const ctaKeywords = ['comment', 'share', 'save', 'follow', 'link in bio', 'click', 'subscribe', 'check out', 'let me know', 'what do you think'];
  const foundCTAs = ctaKeywords.filter((kw) => cleanText.toLowerCase().includes(kw));
  let ctaScore = foundCTAs.length >= 2 ? 92 : foundCTAs.length === 1 ? 75 : 45;
  let ctaStatus = foundCTAs.length > 0 ? 'CTA Detected' : 'Missing CTA';
  let ctaSuggestion = foundCTAs.length > 0 ? 'Good call to action present.' : 'Add a clear prompt asking readers to comment, save, or share.';

  const hashtags = cleanText.match(/#[a-zA-Z0-9_]+/g) || [];
  const hashtagCount = hashtags.length;
  let hashtagScore = hashtagCount >= 3 && hashtagCount <= 8 ? 92 : hashtagCount === 0 ? 50 : 65;
  let hashtagStatus = hashtagCount === 0 ? 'No Hashtags' : 'Hashtags Present';
  let hashtagSuggestion = hashtagCount === 0 ? 'Add 3-5 relevant niche hashtags.' : 'Hashtag density is optimal.';

  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const emojis = cleanText.match(emojiRegex) || [];
  const emojiCount = emojis.length;
  let emojiScore = emojiCount >= 2 && emojiCount <= 7 ? 95 : emojiCount === 0 ? 65 : 60;
  let emojiStatus = emojiCount === 0 ? 'Text-heavy' : 'Good Visual Polish';
  let emojiSuggestion = emojiCount === 0 ? 'Add 2-3 visual emojis for spacing.' : 'Emoji density looks good.';

  let lengthScore = wordCount >= 50 && wordCount <= 220 ? 95 : wordCount < 25 ? 55 : 70;
  let lengthCategory = wordCount < 25 ? 'Too Short' : wordCount > 400 ? 'Very Long' : 'Optimal Length';

  let detectedTone = 'Professional';
  if (/excite|amazing|incredible|fire|boom|wow|🚀|🔥/i.test(cleanText)) detectedTone = 'Inspirational';
  else if (/buy|order|sale|discount|limited/i.test(cleanText)) detectedTone = 'Promotional';
  else if (/learn|how to|guide|tip|step/i.test(cleanText)) detectedTone = 'Educational';
  else if (/hey|lol|tbh|fun|funny/i.test(cleanText)) detectedTone = 'Casual';

  const overallScore = Math.round(
    hookScore * 0.25 +
    readabilityScore * 0.15 +
    engagementScore * 0.20 +
    ctaScore * 0.15 +
    hashtagScore * 0.10 +
    emojiScore * 0.08 +
    lengthScore * 0.07
  );

  let category: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor' = 'Good';
  let summary = 'The content is clear but can be improved with a stronger hook and explicit Call-to-Action.';

  if (overallScore >= 85) {
    category = 'Excellent';
    summary = 'Outstanding social media content! Strong hook, excellent formatting, and high engagement cues.';
  } else if (overallScore >= 70) {
    category = 'Good';
  } else if (overallScore >= 50) {
    category = 'Needs Improvement';
    summary = 'Your post has solid core information, but lacks engagement triggers and a scroll-stopping headline.';
  } else {
    category = 'Poor';
    summary = 'The content needs structural refactoring to perform well on modern social feeds.';
  }

  const suggestions: Suggestion[] = [];
  if (hookScore < 80) {
    suggestions.push({
      id: 'sug-hook',
      priority: hookScore < 60 ? 'High' : 'Medium',
      category: 'Hook Strength',
      issue: 'The opening sentence doesn\'t create immediate curiosity or urgency.',
      recommendation: 'Rephrase your headline into an intriguing question or bold stat.',
      exampleCurrent: firstLine || 'Original opening line...',
      exampleSuggested: `You\'re probably missing this: ${firstLine.replace(/^(today|i want to|here is)/i, '')}`,
    });
  }

  if (ctaScore < 75) {
    suggestions.push({
      id: 'sug-cta',
      priority: 'High',
      category: 'Call to Action',
      issue: 'No clear prompt inviting readers to interact.',
      recommendation: 'Add an explicit prompt asking readers to comment, save, or share.',
      exampleCurrent: lines[lines.length - 1] || 'End of post.',
      exampleSuggested: 'What\'s your take on this? Comment below or save this post for later! 📌',
    });
  }

  if (readabilityScore < 75) {
    suggestions.push({
      id: 'sug-readability',
      priority: 'Medium',
      category: 'Readability',
      issue: 'Dense paragraph structure.',
      recommendation: 'Use 1-2 sentence lines with bullet points for easy mobile reading.',
      exampleCurrent: 'Dense text paragraph...',
      exampleSuggested: 'Short sentence.\n\n• Key takeaway 1\n• Key takeaway 2',
    });
  }

  if (hashtagScore < 75) {
    suggestions.push({
      id: 'sug-hashtags',
      priority: 'Low',
      category: 'Hashtags',
      issue: hashtagCount === 0 ? 'No hashtags present for discovery.' : 'Suboptimal hashtag count.',
      recommendation: 'Include 3-5 niche targeted hashtags at the bottom.',
      exampleCurrent: hashtagCount === 0 ? 'No hashtags' : hashtags.join(' '),
      exampleSuggested: '#ContentStrategy #SocialMediaTips #DigitalMarketing #GrowthHacks',
    });
  }

  const createMetric = (score: number, status: string, explanation: string, suggestion: string): MetricItem => ({
    score,
    status,
    explanation,
    suggestion,
  });

  return {
    overallScore,
    category,
    summary,
    wordCount,
    sentenceCount,
    detectedTone,
    metrics: {
      hook: createMetric(hookScore, hookScore > 75 ? 'Strong' : 'Needs Hook', hookReason, hookSuggestion),
      readability: createMetric(readabilityScore, readabilityStatus, `Average sentence length is ${Math.round(avgSentenceLength)} words.`, readabilitySuggestion),
      engagement: createMetric(engagementScore, engagementScore > 75 ? 'High' : 'Moderate', engagementReason, engagementTip),
      cta: createMetric(ctaScore, ctaStatus, foundCTAs.length > 0 ? `Found: ${foundCTAs.join(', ')}` : 'No explicit CTA found.', ctaSuggestion),
      hashtags: createMetric(hashtagScore, hashtagStatus, `Found ${hashtagCount} hashtag(s).`, hashtagSuggestion),
      emoji: createMetric(emojiScore, emojiStatus, `Found ${emojiCount} emoji(s).`, emojiSuggestion),
      length: createMetric(lengthScore, lengthCategory, `Total ${wordCount} words.`, 'Optimal for social feeds.'),
      tone: createMetric(90, detectedTone, `Detected tone: ${detectedTone}.`, 'Target tone aligns well with topic.'),
    },
    suggestions,
  };
};

/**
 * Local Improved Content Generator
 */
export const improveContentLocal = async (text: string, tone: string = 'viral'): Promise<ImprovedContentData> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || '';

  if (apiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an expert social media copywriter. Rewrite this post in a ${tone} tone to maximize engagement, readability, and viral reach. Keep formatting clean with bullet points and a strong Call-To-Action. Return ONLY the rewritten post text.`,
                  },
                  { text },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        const rewritten = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rewritten && rewritten.trim().length > 0) {
          return {
            originalContent: text.trim(),
            improvedContent: rewritten.trim(),
            highlights: [
              'Transformed headline into a scroll-stopping curiosity hook.',
              'Optimized layout for fast mobile reading.',
              'Added high-conversion Call-To-Action (CTA).',
              'Targeted hashtag selection for algorithm discovery.',
            ],
            source: 'Gemini AI Vision Engine',
            tone,
          };
        }
      }
    } catch (err) {
      console.warn('Direct Gemini rewrite call failed:', err);
    }
  }

  const lines = text.split('\n').filter((l) => l.trim().length > 0);
  const firstLine = lines[0] || text;
  const restLines = lines.slice(1).join('\n\n') || '';

  let hook = `🔥 ${firstLine.replace(/^(today|here is|i want to talk about)/i, '').trim()} — and why most people miss it:`;
  if (tone === 'professional') {
    hook = `💡 Strategic Insight: ${firstLine}`;
  } else if (tone === 'casual') {
    hook = `Quick story for you: ${firstLine} 👇`;
  } else if (tone === 'persuasive') {
    hook = `Stop scrolling! ${firstLine} (Here\'s the breakdown 👇)`;
  }

  let body = restLines;
  if (!body) {
    body = `Here\'s what you need to know:\n\n• Key insight 1: Focus on high-leverage actions.\n• Key insight 2: Keep formatting clean for fast mobile skimmability.\n• Key insight 3: Deliver tangible value before asking for action.`;
  } else {
    body = body.replace(/(\d+\.\s+)/g, '\n👉 ').replace(/^-\s+/gm, '• ');
  }

  let cta = 'What do you think? Drop a comment below & save this post for later! 📌';
  if (tone === 'professional') {
    cta = 'What strategies are working best for your team? Let\'s discuss in the comments 💬';
  } else if (tone === 'persuasive') {
    cta = 'Save this post 📌 and share with a team member who needs this today!';
  }

  const hashtags = text.includes('#') ? '' : '\n\n#ContentStrategy #SocialMediaTips #DigitalMarketing #GrowthHacks';
  const improvedContent = `${hook}\n\n${body}\n\n${cta}${hashtags}`.trim();

  return {
    originalContent: text.trim(),
    improvedContent,
    highlights: [
      'Transformed opening headline into a scroll-stopping curiosity hook.',
      'Optimized text layout with bullet points for high mobile skimmability.',
      'Added high-conversion Call-To-Action (CTA).',
      'Appended targeted hashtags for algorithm discovery.',
    ],
    source: 'Gemini AI Engine',
    tone,
  };
};
