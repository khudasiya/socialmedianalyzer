import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
console.log('GEMINI_API_KEY loaded:', apiKey ? 'YES (' + apiKey.substring(0, 8) + '...)' : 'NO');

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
console.log('Gemini 1.5 Flash Model ready for Vision OCR');
