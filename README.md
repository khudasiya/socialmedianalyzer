# Social Media Content Analyzer (ContentLens AI)

> **Upload. Extract. Analyze. Improve Engagement.**

**ContentLens AI** is a production-quality, full-stack web application designed for social media creators, growth marketers, and founders. It allows users to upload **PDF documents, PNG/JPG screenshots, scanned notes, or draft copy**, automatically extracts text using **Gemini Multimodal Vision AI** and PDF parsers, performs multi-faceted engagement analytics across 8 core metrics, and generates AI-enhanced post rewrites with live social platform previews.

---

## 🌟 Key Features

1. **Smart Multi-Format Upload System**:
   - Drag & drop zone supporting PDF, PNG, JPG, JPEG, and WebP (up to 10MB).
   - Real-time file validation, thumbnail preview, file size/type indicators, and clear error notifications.
   - Built-in **Sample Document Selector** for instant one-click testing without uploading files.

2. **Automated Gemini AI Text Extraction**:
   - **Gemini 1.5 Pro / Flash Vision AI**: Multimodal visual OCR for screenshots, scanned documents, and social post images.
   - **PDF Parser**: Extract text blocks while preserving paragraph breaks and structure.
   - **Interactive Rich Text Editor**: Edit extracted text, correct typos, view word/character/sentence counters, copy, clear, or re-extract text.

3. **8-Point Social Engagement Audit**:
   - **Overall Score Meter**: Circular animated SVG gauge (0-100) with category badge (`Excellent`, `Good`, `Needs Improvement`, `Poor`) and executive summary.
   - **Hook Strength**: Evaluates scroll-stopping curiosity triggers, questions, and numbers in opening line.
   - **Readability Score**: Evaluates sentence length and Flesch reading ease.
   - **Engagement Potential**: Checks reader addressing and open questions.
   - **Call-to-Action (CTA)**: Detects action keywords ("comment below", "save this post", "link in bio").
   - **Hashtag Quality**: Analyzes hashtag count, density, and topic relevance.
   - **Emoji Usage**: Checks visual bullet anchors and visual polish ratio.
   - **Content Length**: Evaluates word count against optimal feed targets.
   - **Tone Detection**: Classifies tone as Professional, Casual, Inspirational, Promotional, Educational, or Persuasive.

4. **Actionable Suggestions & AI Rewrite Studio**:
   - Priority-sorted fix recommendations (High, Medium, Low priority) with Before/After comparison callouts.
   - **Side-by-Side Content Improvement Studio**: Compare original vs. improved version.
   - **Tone Style Presets**: Switch between Viral Growth, Professional, Casual, and Persuasive powered by Gemini AI.
   - **Copy & Download**: Copy improved copy to clipboard or download as a formatted `.txt` file.

5. **Live Social Feed Previews**:
   - Interactive tab simulator for **LinkedIn**, **Twitter/X**, **Instagram**, and **Facebook**.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (Glassmorphic design system, CSS variables, dark/light theme)
- **Icons**: Lucide React
- **AI Vision OCR Engine**: Gemini 1.5 Pro / Flash Multimodal API

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express.js REST API
- **Middleware**: Multer (Memory storage file upload & size limit validation), CORS
- **AI OCR & Copy Engine**: `@google/generative-ai` (Gemini 1.5 Pro Vision)
- **PDF Engine**: `pdf-parse`

---

## 📁 Project Architecture

```text
copyofsocialmedia/
├── server/                      # Express REST API Server
│   ├── controllers/
│   │   └── analyzerController.js
│   ├── middleware/
│   │   └── uploadMiddleware.js
│   ├── routes/
│   │   └── apiRoutes.js
│   ├── services/
│   │   ├── aiService.js         # Gemini AI Copy Generator
│   │   ├── analysisService.js   # 8-Point NLP Heuristic Analyzer
│   │   ├── ocrService.js        # Gemini Vision OCR Engine
│   │   └── pdfService.js        # PDF Text Parser Service
│   ├── utils/
│   │   └── responseFormatter.js
│   ├── package.json
│   └── server.js
├── src/                         # React Vite Frontend SPA
│   ├── components/
│   │   ├── Header.tsx           # SaaS Navbar with Dark/Light Theme
│   │   ├── Footer.tsx
│   │   ├── FileUploader.tsx     # Drag & Drop Uploader Zone
│   │   ├── SampleDocSelector.tsx# Demo Document Quick Start
│   │   ├── TextEditor.tsx       # Extracted Text Editor & Stats
│   │   ├── EngagementScoreCard.tsx # Animated Circular Score Gauge
│   │   ├── AnalysisBreakdown.tsx # 8-Point Metric Cards
│   │   ├── SuggestionsList.tsx  # Priority Recommendations
│   │   ├── AIRewriteStudio.tsx  # Side-by-side Original vs Improved
│   │   ├── PlatformPreviews.tsx # LinkedIn, X, IG, FB Simulator
│   │   ├── LoadingState.tsx     # Contextual Step Loaders
│   │   └── NotificationToast.tsx
│   ├── pages/
│   │   ├── HomePage.tsx         # Landing Hero & Features Grid
│   │   └── AnalyzePage.tsx      # Main Multi-Step Workspace
│   ├── services/
│   │   ├── api.ts               # Backend REST API Client
│   │   └── localAnalyzer.ts     # Gemini AI Client Service
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── sampleTexts.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

### Step 1: Configure Environment Variables

Create a `.env` file in the root and `server/` directory:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
VITE_API_URL=http://localhost:5000/api
```

---

### Step 2: Run the Application

#### 1. Start Express Backend:
```bash
cd server
npm start
```
*Express API will run on `http://localhost:5000`*

#### 2. Start React Vite Frontend:
```bash
npm run dev
```
*Vite Frontend will run on `http://localhost:5173`*
