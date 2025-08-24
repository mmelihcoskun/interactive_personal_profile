import hashlib
from typing import Optional

class CAGCache:
    def __init__(self):
        self.cache = {}

    def get(self, question: str) -> Optional[str]:
        key = self._hash(question)
        return self.cache.get(key)

    def set(self, question: str, answer: str):
        key = self._hash(question)
        self.cache[key] = answer

    def _hash(self, question: str) -> str:
        return hashlib.sha256(question.strip().lower().encode()).hexdigest()
