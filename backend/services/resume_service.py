from repositories.supabase_repository import SupabaseRepository
from utils.openai_client import get_embedding
import os

class ResumeService:
    def __init__(self, repo: SupabaseRepository = None):
        self.repo = repo or SupabaseRepository()
        self.resume_dir = os.getenv("RESUME_DIR", "resume")
        self.chunk_size = int(os.getenv("CHUNK_SIZE", 500))
        self.supabase_table = os.getenv("SUPABASE_TABLE", "resume_chunks")

    def read_resume_files(self):
        texts = []
        for filename in os.listdir(self.resume_dir):
            if filename.endswith(".txt") or filename.endswith(".md"):
                with open(os.path.join(self.resume_dir, filename), "r", encoding="utf-8") as f:
                    texts.append(f.read())
        return "\n".join(texts)

    def chunk_text(self, text):
        return [text[i:i+self.chunk_size] for i in range(0, len(text), self.chunk_size)]

    def is_resume_loaded(self):
        return not self.repo.is_table_empty(self.supabase_table)

    def load_and_embed_resume(self):
        if self.is_resume_loaded():
            print(f"Vector DB table '{self.supabase_table}' is not empty. Resume already loaded.")
            return False
        print(f"Loading resume files from: {self.resume_dir}")
        text = self.read_resume_files()
        chunks = self.chunk_text(text)
        print(f"Total chunks: {len(chunks)}")
        for idx, chunk in enumerate(chunks):
            print(f"Embedding chunk {idx+1}/{len(chunks)}...")
            embedding = get_embedding(chunk)
            self.repo.upsert_resume_chunk(
                chunk_id=idx,
                embedding=embedding,
                text=chunk
            )
            print(f"Chunk {idx+1} upserted.")
        print("All chunks loaded and embedded.")
        return True
