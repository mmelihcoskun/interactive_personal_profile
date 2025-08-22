import os
import openai
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

def get_embedding(text: str, model: str = "text-embedding-ada-002") -> list:
    response = openai.embeddings.create(
        input=text,
        model=model
    )
    return response.data[0].embedding

def get_completion(prompt: str, model: str = "gpt-3.5-turbo") -> str:
    response = openai.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()
