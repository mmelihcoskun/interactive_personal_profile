from typing import List
from repositories.supabase_repository import SupabaseRepository
from utils.cag_cache import CAGCache
import openai
import os

class RAGService:
    def __init__(self, repo: SupabaseRepository = None, cache: CAGCache = None):
        self.repo = repo or SupabaseRepository()
        self.cache = cache or CAGCache()
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        openai.api_key = self.openai_api_key

    def embed_text(self, text: str) -> List[float]:
        # Use OpenAI to embed text
        response = openai.embeddings.create(
            input=text,
            model="text-embedding-ada-002"
        )
        return response.data[0].embedding

    def retrieve_context(self, question: str, top_k: int = 3) -> List[str]:
        query_embedding = self.embed_text(question)
        result = self.repo.query_similar_chunks(query_embedding, top_k)
        return [row["text"] for row in result.data]

    def generate_answer(self, question: str, context: List[str]) -> str:
        prompt = f"Context:\n{chr(10).join(context)}\n\nQuestion: {question}\nAnswer:"
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                 {"role": "system", "content": "You are an assistant that answers questions about Melih Coskun based on the provided context. "
"When asked about his work experience, list **all relevant companies and roles**, not just the first ones. "
"If the context includes multiple companies, summarize them all in order with job title, years, and key contributions. "
"If the context does not contain enough details, say so, but never stop at only the first 1–2 items if more are available."
"Using only answer using the provided resume context. Do not use any external information or internet search.Do not omit any relevant information."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content.strip()

    def answer_question(self, question: str) -> str:
        cached = self.cache.get(question)
        if cached:
            print(f"CAG cache hit for: {question}")
            return cached
        print(f"CAG cache miss for: {question}")
        context = self.retrieve_context(question)
        answer = self.generate_answer(question, context)
        self.cache.set(question, answer)
        return answer
