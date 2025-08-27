
import os
import sys
from utils.env_loader import load_env
from services.resume_service import ResumeService

# Load environment variables
load_env()

RESUME_DIR = os.getenv("RESUME_DIR", "resume")  # Default folder name
CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", 800))  # Number of characters per chunk
SUPABASE_TABLE = os.getenv("SUPABASE_TABLE", "resume_chunks")

def read_resume_files(folder):
    texts = []
    for filename in os.listdir(folder):
        if filename.endswith(".txt") or filename.endswith(".md"):
            with open(os.path.join(folder, filename), "r", encoding="utf-8") as f:
                texts.append(f.read())
    return "\n".join(texts)


import re

def smart_chunk_markdown(md_text, max_chunk_size=1200):
    # 1. Extract About section as a single chunk
    about_match = re.search(r'(## About Melih[\s\S]*?)(?=^## |\Z)', md_text, re.MULTILINE)
    chunks = []
    if about_match:
        chunks.append(about_match.group(1).strip())
    # 2. Find all other ## sections
    sections = re.split(r'(?m)^## ', md_text)
    for section in sections:
        section = section.strip()
        if not section or section.startswith('About Melih'):
            continue
        # If section is short, add as single chunk
        if len(section) < max_chunk_size:
            chunks.append(section)
        else:
            # 3. For sections with bullets, chunk each top bullet with its child bullets
            # Find top-level bullets (lines starting with '- ')
            bullets = re.split(r'(?m)^- ', section)
            for bullet in bullets:
                bullet = bullet.strip()
                if bullet:
                    chunks.append(bullet)
    return [chunk for chunk in chunks if chunk]

def main():
    folder = RESUME_DIR
    if not os.path.exists(folder):
        print(f"Resume folder '{folder}' not found.")
        sys.exit(1)
    text = read_resume_files(folder)
    chunks = smart_chunk_markdown(text)
    print(f"Smart chunking produced {len(chunks)} chunks.")
    from utils.openai_client import get_embedding
    from repositories.supabase_repository import SupabaseRepository
    repo = SupabaseRepository()
    # Optionally clear table before loading
    # if not repo.is_table_empty(SUPABASE_TABLE):
    #     print(f"Vector DB table '{SUPABASE_TABLE}' is not empty. Resume already loaded.")
    #     return
    for idx, chunk in enumerate(chunks):
        print(f"Embedding chunk {idx+1}/{len(chunks)}...")
        embedding = get_embedding(chunk)
        repo.upsert_resume_chunk(
            chunk_id=idx,
            embedding=embedding,
            text=chunk
        )
        print(f"Chunk {idx+1} upserted.")
    print("All chunks loaded and embedded.")

if __name__ == "__main__":
    main()
