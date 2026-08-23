import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: './server/.env' });

async function testGeminiOCR() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('Testing Gemini API Key:', apiKey ? 'Present' : 'Missing');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Minimal test pixel or simple sample
  console.log('Model initialized successfully');
}

testGeminiOCR().catch(console.error);
