from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to ForecastAI API"}

def test_openapi_schema():
    response = client.get("/api/v1/openapi.json")
    assert response.status_code == 200
