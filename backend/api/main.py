from fastapi import Request, HTTPException
import time
# Simple in-memory rate limit: max 5 requests per IP per hour
RATE_LIMIT = 5
RATE_LIMIT_WINDOW = 3600  # seconds
rate_limit_cache = {}
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from pydantic import BaseModel
from services.rag_service import RAGService
from services.resume_service import ResumeService
import os



rag_service = RAGService()
resume_service = ResumeService()
app = FastAPI()

# Allow frontend (localhost:3000) to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
@app.on_event("startup")
async def load_resume_on_startup():
    # Only loads resume if not already present in DB
    resume_service.load_and_embed_resume()

class AskRequest(BaseModel):
    question: str

class AskResponse(BaseModel):
    answer: str

@app.post("/ask", response_model=AskResponse)
async def ask_endpoint(request: Request):
    ip = request.client.host
    now = time.time()
    # Clean up old entries
    if ip in rate_limit_cache:
        timestamps = [t for t in rate_limit_cache[ip] if now - t < RATE_LIMIT_WINDOW]
        rate_limit_cache[ip] = timestamps
    else:
        rate_limit_cache[ip] = []
    if len(rate_limit_cache[ip]) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again later.")
    rate_limit_cache[ip].append(now)
    data = await request.json()
    question = data.get("question", "")
    answer = rag_service.answer_question(question)
    return AskResponse(answer=answer)

handler = Mangum(app)
