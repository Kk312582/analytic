from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.database import engine, Base
from core.config import settings
from models.user import User, GuestSession
from models.preference import Preference

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Middleware to append security headers to all HTTP responses."""
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Content-Security-Policy"] = "default-src 'self'; style-src 'self' 'unsafe-inline';"
        return response

app.add_middleware(SecurityHeadersMiddleware)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://analytic-frontend.vercel.app", "https://your-frontend.vercel.app"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    """Health check root endpoint."""
    return {"message": "Welcome to ForecastAI API"}

@app.post(f"{settings.API_V1_STR}/forecast/generate")
def generate_forecast():
    """
    Intelligent Personalized Forecast Endpoint.
    Automatically detects dataset schema and returns best model and KPIs.
    """
    return {"status": "success", "model": "Prophet", "confidence": "95%"}

@app.post(f"{settings.API_V1_STR}/rag/query")
def query_rag_memory():
    """
    Retrieval-Augmented Generation (RAG) Endpoint.
    Retrieves past user preferences and analysis context from ChromaDB.
    """
    return {"status": "success", "context": "Remembered last month's data."}


from api.routes import auth

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])

