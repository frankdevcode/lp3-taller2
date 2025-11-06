import uuid
from fastapi.testclient import TestClient

from main import app


def test_register_and_login_and_access_protected():
    # Use an email unique per test run
    unique = uuid.uuid4().hex[:8]
    correo = f"test_{unique}@example.com"
    password = "secret123"

    with TestClient(app) as client:
        # Register
        r = client.post("/api/auth/register", json={"correo": correo, "password": password})
        assert r.status_code == 201
        data = r.json()
        assert data["correo"] == correo

        # Login
        r = client.post("/api/auth/login", json={"correo": correo, "password": password})
        assert r.status_code == 200
        token_data = r.json()
        assert "access_token" in token_data
        access_token = token_data["access_token"]

        # Use token to create a pelicula (protected endpoint)
        pelicula_payload = {
            "titulo": f"Pelicula Auth Test {unique}",
            "director": "Director",
            "genero": "Drama",
            "duracion": 100,
            "año": 2020,
            "clasificacion": "PG-13",
            "sinopsis": "Sinopsis de prueba para auth"
        }

        headers = {"Authorization": f"Bearer {access_token}"}
        r = client.post("/api/peliculas/", json=pelicula_payload, headers=headers)
        assert r.status_code == 201, r.text
        pelicula = r.json()
        assert pelicula["titulo"] == pelicula_payload["titulo"]
