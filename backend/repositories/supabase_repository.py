import os
from supabase import create_client, Client

class SupabaseRepository:
    def __init__(self, url: str = None, key: str = None):
        self.url = url or os.getenv("SUPABASE_URL")
        self.key = key or os.getenv("SUPABASE_KEY")
        self.client = create_client(self.url, self.key)

    def is_table_empty(self, table: str = "resume_chunks") -> bool:
        response = self.client.table(table).select("id").limit(1).execute()
        return len(response.data) == 0

    def upsert_resume_chunk(self, chunk_id: str, embedding: list, text: str):
        return self.client.table("resume_chunks").upsert({
            "id": chunk_id,
            "embedding": embedding,
            "text": text
        }).execute()

    def query_similar_chunks(self, query_embedding: list, top_k: int = 3):
        return self.client.rpc("match_resume_chunks", {
            "query_embedding": query_embedding,
            "top_k": top_k
        }).execute()

    def get_question(self, question: str):
        response = self.client.table("questions").select("id", "question", "count").eq("question", question).limit(1).execute()
        if response.data:
            return response.data[0]
        return None

    def insert_question(self, question: str):
        return self.client.table("questions").insert({
            "question": question,
            "count": 1
        }).execute()

    def increment_question_count(self, question: str):
        existing = self.get_question(question)
        if existing:
            new_count = existing["count"] + 1
            return self.client.table("questions").update({
                "count": new_count
            }).eq("id", existing["id"]).execute()
        return None

    def upsert_resume_chunk(self, chunk_id: str, embedding: list, text: str):
        # Upsert a resume chunk with its embedding and text
        return self.client.table("resume_chunks").upsert({
            "id": chunk_id,
            "embedding": embedding,
            "text": text
        }).execute()

    def query_similar_chunks(self, query_embedding: list, top_k: int = 3):
        # Query for similar resume chunks using vector similarity
        # This assumes you have a vector similarity function in Supabase
        return self.client.rpc("match_resume_chunks", {
            "query_embedding": query_embedding,
            "top_k": top_k
        }).execute()
