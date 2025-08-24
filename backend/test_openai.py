from dotenv import load_dotenv
import os
import openai

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

def test_embedding():
    try:
        response = openai.embeddings.create(
            input="Test embedding for resume.",
            model="text-embedding-ada-002"
        )
        print("Embedding success. Vector size:", len(response.data[0].embedding))
    except Exception as e:
        print("Embedding failed:", e)

def test_completion():
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Tell me about Melih Coskun."}]
        )
        print("Completion success. Response:", response.choices[0].message.content.strip())
    except Exception as e:
        print("Completion failed:", e)

if __name__ == "__main__":
    test_embedding()
    test_completion()
