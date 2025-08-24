import os
import sys
from utils.env_loader import load_env
from utils.openai_client import get_embedding
from repositories.supabase_repository import SupabaseRepository

# Load environment variables
load_env()

RESUME_DIR = os.getenv("RESUME_DIR", "resume")  # Default folder name
CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", 500))  # Number of characters per chunk
SUPABASE_TABLE = os.getenv("SUPABASE_TABLE", "resume_chunks")

def read_resume_files(folder):
    texts = []
    for filename in os.listdir(folder):
        if filename.endswith(".txt") or filename.endswith(".md"):
            with open(os.path.join(folder, filename), "r", encoding="utf-8") as f:
                texts.append(f.read())
    return "\n".join(texts)

def chunk_text(text, chunk_size):
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

def main():
    folder = RESUME_DIR
    if not os.path.exists(folder):
        print(f"Resume folder '{folder}' not found.")
        sys.exit(1)
    repo = SupabaseRepository()
    if not repo.is_table_empty(SUPABASE_TABLE):
        print(f"Vector DB table '{SUPABASE_TABLE}' is not empty. Resume already loaded.")
        return
    print(f"Loading resume files from: {folder}")
    text = read_resume_files(folder)
    chunks = chunk_text(text, CHUNK_SIZE)
    print(f"Total chunks: {len(chunks)}")
    for idx, chunk in enumerate(chunks):
        print(f"Embedding chunk {idx+1}/{len(chunks)}...")
        embedding = get_embedding(chunk)
        # Upsert into Supabase
        repo.upsert_embedding(
            table=SUPABASE_TABLE,
            chunk=chunk,
            embedding=embedding,
            metadata={"chunk_index": idx}
        )
        print(f"Chunk {idx+1} upserted.")
    print("All chunks loaded and embedded.")

if __name__ == "__main__":
    main()
