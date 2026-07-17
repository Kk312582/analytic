from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "ForecastAI"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # Database
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./forecast_ai.db"
    
    # Gemini
    GEMINI_API_KEY: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
