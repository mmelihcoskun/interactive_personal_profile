from supabase import create_client, Client
import os

class SupabaseRepository:
    def is_table_empty(self, table: str = "resume_chunks") -> bool:
        # Returns True if table is empty, False otherwise
        response = self.client.table(table).select("id").limit(1).execute()
        return len(response.data) == 0
    def __init__(self, url: str = None, key: str = None):
        self.url = url or os.getenv("SUPABASE_URL")
        self.key = key or os.getenv("SUPABASE_KEY")
        self.client: Client = create_client(self.url, self.key)

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
