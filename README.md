
# Interactive Personal Profile (AI Resume)

This repository powers an interactive personal profile and resume site for Melih Coskun, featuring AI-powered Q&A, text-to-speech, and analytics. It uses Retrieval-Augmented Generation (RAG), Context-Aware Generation (CAG), and TTS for a recruiter-friendly, modern experience.

## Features
- AI chatbot answers questions about Melih Coskun's career, skills, and projects
- Text-to-speech for responses
- Analytics and question logging
- Mobile-first, responsive design
- Articles and videos with modern card layouts

## Tech Stack
- **Frontend:** Next.js (React), Chakra UI, Vercel
- **Backend:** FastAPI, AWS Lambda, Supabase, OpenAI
- **AI:** OpenAI GPT (RAG, CAG)

## Structure
- `frontend/` — Next.js app (profile, chatbot, articles, videos)
- `backend/` — FastAPI backend (RAG, Supabase, OpenAI integration)

## Setup & Deployment
See `frontend/README.md` and `backend/README.md` for setup and deployment instructions for each part.

## How It Works
1. Users ask questions via the chatbot (web/mobile)
2. The backend retrieves relevant resume context and generates answers using OpenAI
3. Answers are returned to the frontend and optionally spoken aloud (TTS)
4. All questions are logged for analytics

## Contributing
Pull requests and issues are welcome! Please keep assets under 1MB and use Git LFS for large files.

---
For more details, see the individual README files in `frontend/` and `backend/` folders.
