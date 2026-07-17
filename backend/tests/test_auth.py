from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_guest_login():
    response = client.post("/api/v1/auth/guest")
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
