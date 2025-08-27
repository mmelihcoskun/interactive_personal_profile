import os
from dotenv import load_dotenv


def load_env():
    load_dotenv()

def get_env_variable(key: str, default: str = None) -> str:
    return os.getenv(key, default)
