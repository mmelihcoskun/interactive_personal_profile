import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def get_env_variable(key: str, default: str = None) -> str:
    return os.getenv(key, default)
