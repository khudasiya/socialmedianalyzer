/**
 * Comprehensive NLP & Social Media Content Analysis Engine
 */

export const analyzeSocialMediaContent = (text) => {
  if (!text || text.trim().length === 0) {
    throw new Error('Content is empty. Please provide social media text to analyze.');
  }

  const cleanText = text.trim();
  const lines = cleanText.split('\n').filter(line => line.trim().length > 0);
  const words = cleanText.match(/\b[\w'-]+\b/g) || [];
  const wordCount = words.length;
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = sentences.length || 1;

  // 1. Hook Strength Analysis
  const firstLine = lines[0] || '';
  const firstLineWords = (firstLine.match(/\b[\w'-]+\b/g) || []).length;
  let hookScore = 50; // base
  let hookReason = '';
  let hookSuggestion = '';

  const curiosityTriggers = ['how', 'why', 'stop', 'secret', 'never', 'don\'t', 'avoid', 'hack', 'truth', 'mistake', 'you\'re', 'imagine', 'what if'];
  const numberInHook = /\b\d+\b/.test(firstLine);
  const questionInHook = firstLine.includes('?');
  const exclamationInHook = firstLine.includes('!');

  const hasCuriosity = curiosityTriggers.some(trigger => firstLine.toLowerCase().includes(trigger));

  if (firstLineWords < 3) {
    hookScore = 40;
    hookReason = 'Your opening hook is too brief to hook readers or spark interest.';
    hookSuggestion = 'Expand the opening into a compelling statement or curiosity-inducing question.';
  } else if (hasCuriosity || numberInHook || questionInHook) {
    hookScore = 85;
    if (numberInHook) hookScore += 5;
    if (questionInHook) hookScore += 5;
    hookReason = 'Strong hook! Your opening uses curiosity triggers or questions to catch interest instantly.';
    hookSuggestion = 'Maintain this pattern. Bold statements or unexpected facts keep scroll-stoppers effective.';
  } else {
    hookScore = 60;
    hookReason = 'Your opening is clear and informative, but it lacks curiosity or urgency.';
    hookSuggestion = 'Consider starting with a surprising stat, a bold question, or an unexpected problem statement.';
  }
  hookScore = Math.min(100, Math.max(0, hookScore));

  // 2. Readability Analysis
  const avgSentenceLength = wordCount / sentenceCount;
  const avgWordLength = words.reduce((acc, w) => acc + w.length, 0) / (wordCount || 1);
  let readabilityScore = 80;
  let readabilityStatus = 'Clear & Accessible';
  let readabilitySuggestion = 'Sentence length and vocabulary are well-tuned for quick online reading.';

  if (avgSentenceLength > 20 || avgWordLength > 6.5) {
    readabilityScore = 58;
    readabilityStatus = 'Complex / Dense';
    readabilitySuggestion = 'Break down long sentences and use simpler vocabulary to increase mobile skimmability.';
  } else if (avgSentenceLength > 14) {
    readabilityScore = 72;
    readabilityStatus = 'Moderate Complexity';
    readabilitySuggestion = 'Shorten 1-2 multi-clause sentences for higher engagement on fast feeds.';
  } else {
    readabilityScore = 90;
  }

  // 3. Engagement Potential
  const questionCount = (cleanText.match(/\?/g) || []).length;
  const userAddressing = (cleanText.match(/\b(you|your|yours|we|us|imagine|share|comment|tell)\b/gi) || []).length;
  let engagementScore = 65;
  let engagementReason = 'Moderate potential to encourage comments and interactions.';
  let engagementTip = 'Incorporate direct open questions to invite discussion in the comments.';

  if (questionCount > 0 && userAddressing >= 3) {
    engagementScore = 88;
    engagementReason = 'High engagement potential! You speak directly to the audience and ask questions.';
    engagementTip = 'Promote sharing by emphasizing key takeaways or actionable cheat-sheets.';
  } else if (userAddressing < 2) {
    engagementScore = 52;
    engagementReason = 'Low engagement cues detected. The post feels broadcasted rather than interactive.';
    engagementTip = 'Reframe passive statements into direct questions directed at your reader.';
  }

  // 4. Call to Action (CTA)
  const ctaKeywords = [
    'comment', 'share', 'save', 'follow', 'link in bio', 'click', 'subscribe', 
    'check out', 'let me know', 'what do you think', 'tag a friend', 'dm me', 'drop a'
  ];
  const lowerText = cleanText.toLowerCase();
  const foundCTAs = ctaKeywords.filter(keyword => lowerText.includes(keyword));
  let ctaScore = 0;
  let ctaStatus = 'Missing Call to Action';
  let ctaSuggestion = 'Add an explicit prompt at the end asking readers to comment, save, or share.';

  if (foundCTAs.length >= 2) {
    ctaScore = 95;
    ctaStatus = 'Strong Call to Action';
    ctaSuggestion = 'Clear multi-channel prompt provided. Ensure the primary action stands out.';
  } else if (foundCTAs.length === 1) {
    ctaScore = 75;
    ctaStatus = 'Moderate Call to Action';
    ctaSuggestion = 'Good CTA detected. Make it even more specific (e.g., "Drop a 🔥 if you agree!").';
  } else {
    ctaScore = 40;
  }

  // 5. Hashtags Analysis
  const hashtags = cleanText.match(/#[a-zA-Z0-9_]+/g) || [];
  const hashtagCount = hashtags.length;
  let hashtagScore = 70;
  let hashtagStatus = 'Balanced';
  let hashtagSuggestion = '';

  if (hashtagCount === 0) {
    hashtagScore = 50;
    hashtagStatus = 'No Hashtags';
    hashtagSuggestion = 'Add 3-5 relevant niche hashtags to improve reach and discoverability.';
  } else if (hashtagCount >= 3 && hashtagCount <= 8) {
    hashtagScore = 92;
    hashtagStatus = 'Optimal Range';
    hashtagSuggestion = 'Great hashtag placement. Mix broad topic tags with specific niche keywords.';
  } else if (hashtagCount > 10) {
    hashtagScore = 60;
    hashtagStatus = 'Hashtag Overuse';
    hashtagSuggestion = 'Reduce hashtag count to 4-7 to avoid looking spammy on main platforms.';
  } else {
    hashtagScore = 75;
    hashtagSuggestion = 'Add 1-2 more contextual hashtags to maximize topic categorization.';
  }

  // 6. Emoji Usage
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const emojis = cleanText.match(emojiRegex) || [];
  const emojiCount = emojis.length;
  let emojiScore = 80;
  let emojiStatus = 'Well Balanced';
  let emojiSuggestion = '';

  if (emojiCount === 0) {
    emojiScore = 65;
    emojiStatus = 'Text-heavy';
    emojiSuggestion = 'Add 2-3 visual emojis as bullet points or headers to enhance readability.';
  } else if (emojiCount >= 2 && emojiCount <= 7) {
    emojiScore = 95;
    emojiStatus = 'Optimal Visual Polish';
    emojiSuggestion = 'Emoji placement provides great visual anchors without clutter.';
  } else if (emojiCount > 12) {
    emojiScore = 55;
    emojiStatus = 'Overused';
    emojiSuggestion = 'Trim down emojis to maintain professional credibility.';
  }

  // 7. Content Length
  let lengthScore = 85;
  let lengthCategory = 'Balanced';
  let lengthSuggestion = 'Word count is suitable for LinkedIn, Facebook, and Instagram captions.';

  if (wordCount < 25) {
    lengthScore = 55;
    lengthCategory = 'Too Short';
    lengthSuggestion = 'Expand with context, a practical example, or key takeaways to deliver higher value.';
  } else if (wordCount > 400) {
    lengthScore = 65;
    lengthCategory = 'Very Long';
    lengthSuggestion = 'Use formatting, line breaks, or bullet points to ensure readers don\'t lose interest.';
  } else if (wordCount >= 50 && wordCount <= 220) {
    lengthScore = 95;
    lengthCategory = 'Ideal Engagement Range';
  }

  // 8. Tone Detection
  let detectedTone = 'Professional';
  if (/excite|amazing|incredible|fire|boom|wow|🚀|🔥|huge/i.test(cleanText)) {
    detectedTone = 'Inspirational & High Energy';
  } else if (/buy|order|sale|discount|limited|offer|click link/i.test(cleanText)) {
    detectedTone = 'Promotional';
  } else if (/learn|how to|guide|tip|step|strategy|framework/i.test(cleanText)) {
    detectedTone = 'Educational';
  } else if (/hey guys|lol|tbh|fun|funny|crazy|😊|😄/i.test(cleanText)) {
    detectedTone = 'Casual & Conversational';
  } else if (/proven|results|guarantee|why you should|must/i.test(cleanText)) {
    detectedTone = 'Persuasive';
  }

  // Overall Weighted Score
  const overallScore = Math.round(
    hookScore * 0.25 +
    readabilityScore * 0.15 +
    engagementScore * 0.20 +
    ctaScore * 0.15 +
    hashtagScore * 0.10 +
    emojiScore * 0.08 +
    lengthScore * 0.07
  );

  let category = 'Good';
  let summary = 'Your content has clear messaging and good readability, but refining the hook and strengthening the CTA will significantly boost overall reach and engagement.';

  if (overallScore >= 85) {
    category = 'Excellent';
    summary = 'Outstanding post! Your content features a captivating hook, great readability, visual appeal, and strong reader engagement potential.';
  } else if (overallScore >= 70) {
    category = 'Good';
  } else if (overallScore >= 50) {
    category = 'Needs Improvement';
    summary = 'Your core message is intact, but the post lacks engagement triggers, an opening curiosity hook, or a clear call to action.';
  } else {
    category = 'Poor';
    summary = 'The content requires restructuring. Focus on writing a strong first-line hook, improving formatting, and adding direct reader prompts.';
  }

  // Structured Actionable Suggestions
  const suggestions = [];

  if (hookScore < 80) {
    suggestions.push({
      id: 'sug-hook',
      priority: hookScore < 60 ? 'High' : 'Medium',
      category: 'Hook Strength',
      issue: 'The opening line doesn\'t create enough urgency or curiosity to stop scrolling.',
      recommendation: 'Rephrase your first sentence into an intriguing question, surprising stat, or bold problem statement.',
      exampleCurrent: firstLine || 'Original opening sentence...',
      exampleSuggested: hasCuriosity 
        ? `🔥 ${firstLine}` 
        : `Are you making this common mistake? ${firstLine.replace(/^(today|i want to|here is)/i, '')}`,
    });
  }

  if (ctaScore < 75) {
    suggestions.push({
      id: 'sug-cta',
      priority: 'High',
      category: 'Call to Action',
      issue: 'No clear invitation for readers to like, comment, save, or share.',
      recommendation: 'End with a compelling question or direct prompt to boost algorithm reach.',
      exampleCurrent: lines[lines.length - 1] || 'End of your post.',
      exampleSuggested: 'What\'s your take on this? Comment below or save this post for your next project! 📌',
    });
  }

  if (readabilityScore < 75) {
    suggestions.push({
      id: 'sug-readability',
      priority: 'Medium',
      category: 'Readability',
      issue: 'Text blocks or sentence structures are dense for fast mobile scanning.',
      recommendation: 'Break paragraphs into 1-2 sentence lines and add space between bullet points.',
      exampleCurrent: 'Long multi-clause sentence block...',
      exampleSuggested: 'Short sentence.\n\nKey point #1\nKey point #2',
    });
  }

  if (hashtagScore < 75) {
    suggestions.push({
      id: 'sug-hashtags',
      priority: 'Low',
      category: 'Hashtags',
      issue: hashtagCount === 0 ? 'Missing hashtags for platform discoverability.' : 'Suboptimal hashtag density.',
      recommendation: 'Include 3-5 relevant, targeted hashtags at the bottom of your post.',
      exampleCurrent: hashtagCount === 0 ? 'No hashtags present' : hashtags.join(' '),
      exampleSuggested: '#SocialMediaTips #ContentStrategy #DigitalMarketing #GrowthHacks',
    });
  }

  if (emojiScore < 75 && emojiCount === 0) {
    suggestions.push({
      id: 'sug-emoji',
      priority: 'Low',
      category: 'Visual Structure',
      issue: 'Lack of visual anchors in text.',
      recommendation: 'Incorporate 2-4 strategic emojis to highlight section headers or key takeaways.',
      exampleCurrent: 'Section headers without emojis',
      exampleSuggested: '🚀 Key Growth Tip\n💡 Pro Insight\n👇 Check this out',
    });
  }

  return {
    overallScore,
    category,
    summary,
    wordCount,
    sentenceCount,
    detectedTone,
    metrics: {
      hook: { score: hookScore, status: firstLineWords > 0 ? 'Analyzed' : 'Weak', explanation: hookReason, suggestion: hookSuggestion },
      readability: { score: readabilityScore, status: readabilityStatus, explanation: `Average sentence length is ${Math.round(avgSentenceLength)} words.`, suggestion: readabilitySuggestion },
      engagement: { score: engagementScore, status: engagementScore > 75 ? 'High' : 'Moderate', explanation: engagementReason, suggestion: engagementTip },
      cta: { score: ctaScore, status: ctaStatus, explanation: foundCTAs.length > 0 ? `Detected keywords: ${foundCTAs.join(', ')}` : 'No explicit call to action detected.', suggestion: ctaSuggestion },
      hashtags: { score: hashtagScore, status: hashtagStatus, explanation: `Found ${hashtagCount} hashtag(s).`, suggestion: hashtagSuggestion },
      emoji: { score: emojiScore, status: emojiStatus, explanation: `Found ${emojiCount} emoji(s).`, suggestion: emojiSuggestion },
      length: { score: lengthScore, status: lengthCategory, explanation: `Total ${wordCount} words across ${sentenceCount} sentences.`, suggestion: lengthSuggestion },
      tone: { score: 90, status: detectedTone, explanation: `Detected tone feels ${detectedTone}.`, suggestion: 'Align tone consistently with your core target audience persona.' }
    },
    suggestions,
  };
};
