# Resume RAG Backend

Python backend for interactive AI resume using Supabase vector DB and OpenAI, deployable to AWS Lambda.

## Structure
- `api/` - Lambda handler and API logic
- `services/` - Business logic (RAG, LLM)
- `repositories/` - Data access (Supabase)
- `models/` - Data models
- `utils/` - Helpers

## Setup
1. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure environment variables for Supabase and OpenAI keys.

## Deployment
- Use AWS Lambda + API Gateway (Mangum for FastAPI adaptation)

## Principles
- SOLID
- Inversion of Control
- Testable, modular code
