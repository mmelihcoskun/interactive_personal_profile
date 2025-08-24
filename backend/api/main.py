import requests
import os
from fastapi import Request, HTTPException
import time
RECAPTCHA_SECRET = os.getenv("RECAPTCHA_SECRET_KEY", "YOUR_RECAPTCHA_SECRET_KEY") # Set in .env

RECAPTCHA_VERIFY_URL = os.getenv("RECAPTCHA_VERIFY_URL", "https://www.google.com/recaptcha/api/siteverify")

def verify_recaptcha(token: str) -> bool:
    data = {"secret": RECAPTCHA_SECRET, "response": token}
    try:
        response = requests.post(RECAPTCHA_VERIFY_URL, data=data)
        result = response.json()
        print("reCAPTCHA verification response:", result)  # Debug log
        return result.get("success", False)
    except Exception as e:
        print("reCAPTCHA verification error:", e)
        return False

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
    import time
    ip = request.client.host
    start_time = time.time()
    now = start_time
    # Clean up old entries
    if ip in rate_limit_cache:
        timestamps = [t for t in rate_limit_cache[ip] if now - t < RATE_LIMIT_WINDOW]
        rate_limit_cache[ip] = timestamps
    else:
        rate_limit_cache[ip] = []
    if len(rate_limit_cache[ip]) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again later.")
    rate_limit_cache[ip].append(now)
    t0 = time.time()
    data = await request.json()
    t1 = time.time()
    question = data.get("question", "")
    captcha = data.get("captcha")
    print(f"[PROFILE] request.json() took {t1-t0:.2f}s")
    # Require CAPTCHA only for the first question per IP/session
    if len(rate_limit_cache[ip]) == 1:
        t2 = time.time()
        if not captcha or not verify_recaptcha(captcha):
            raise HTTPException(status_code=403, detail="CAPTCHA verification failed.")
        t3 = time.time()
        print(f"[PROFILE] verify_recaptcha() took {t3-t2:.2f}s")
    t4 = time.time()
    answer = rag_service.answer_question(question)
    t5 = time.time()
    print(f"[PROFILE] rag_service.answer_question() took {t5-t4:.2f}s")
    print(f"[PROFILE] Total ask_endpoint time: {t5-start_time:.2f}s")
    return AskResponse(answer=answer)

handler = Mangum(app)
