import uuid
from fastapi.testclient import TestClient

from main import app


def test_login_invalid_and_protected_access():
    unique = uuid.uuid4().hex[:8]
    correo = f"neg_{unique}@example.com"
    password = "secret123"

    with TestClient(app) as client:
        # Register successfully
        r = client.post("/api/auth/register", json={"correo": correo, "password": password})
        assert r.status_code == 201

        # Login with wrong password (form data)
        r = client.post("/api/auth/login", data={"username": correo, "password": "wrongpass"})
        assert r.status_code == 401

        # Access protected endpoint without token
        pelicula_payload = {
            "titulo": f"Neg Test {unique}",
            "director": "Director",
            "genero": "Drama",
            "duracion": 90,
            "año": 2020,
            "clasificacion": "PG",
            "sinopsis": "Sinopsis"
        }
        r = client.post("/api/peliculas/", json=pelicula_payload)
        # OAuth2PasswordBearer will require Authorization header -> 401
        assert r.status_code == 401

        # Use invalid token
        headers = {"Authorization": "Bearer invalid.token.here"}
        r = client.post("/api/peliculas/", json=pelicula_payload, headers=headers)
        assert r.status_code == 401
