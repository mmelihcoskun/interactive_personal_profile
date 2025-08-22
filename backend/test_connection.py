from dotenv import load_dotenv
import os
from supabase import create_client, Client

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def test_connection():
    try:
        response = client.table("resume_chunks").select("*").limit(1).execute()
        if response.data:
            print("Connection successful. Data received:", response.data)
        else:
            print("Connection successful, but no data found in 'resume_chunks'.")
    except Exception as e:
        print("Connection failed:", e)

if __name__ == "__main__":
    test_connection()
