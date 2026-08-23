export interface SamplePost {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'Image' | 'Text';
  content: string;
}

export const SAMPLE_POSTS: SamplePost[] = [
  {
    id: 'sample-1',
    title: 'Productivity Tip Post',
    description: 'A typical LinkedIn post needing hook and CTA optimization.',
    type: 'Text',
    content: `Today I want to talk about productivity and time management. Many founders spend 4+ hours every day managing emails and administrative tasks instead of building product.

Here are 3 ways to fix it:
1. Block time for deep work.
2. Delegate non-core operations.
3. Turn off social media notifications.

Hope this helps you save time.`,
  },
  {
    id: 'sample-2',
    title: 'SaaS Launch Announcement',
    description: 'Promotional announcement missing strong hook and hashtags.',
    type: 'PDF',
    content: `We are super excited to announce that ContentLens AI version 2.0 is live!

After 6 months of intense development, we added AI OCR text extraction, automated social media engagement scoring, and platform preview tools.

Check out our website to sign up for a free trial today. Let us know if you have any feedback or questions.`,
  },
  {
    id: 'sample-3',
    title: 'Viral Story Hook Post',
    description: 'High-performing story format post with strong hook and engagement.',
    type: 'Image',
    content: `You're probably wasting 3 hours every single day without realizing it. 🧠

3 years ago, I was working 14-hour days and barely making progress. Then I implemented the "Rule of 1":

• 1 main goal per day
• 1 hour of uninterrupted focus
• 1 single task at a time

Result? Output tripled in 30 days. 🚀

What's your #1 rule for staying focused? Drop it in the comments below! 👇

#ProductivityHacks #FounderLife #GrowthMindset #TimeManagement`,
  },
];
