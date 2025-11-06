import uuid
from fastapi.testclient import TestClient

from main import app


def test_favorites_owner_check():
    unique = uuid.uuid4().hex[:8]
    correo_a = f"usera_{unique}@example.com"
    correo_b = f"userb_{unique}@example.com"
    password = "secret123"

    with TestClient(app) as client:
        # Register user A and B
        r = client.post("/api/auth/register", json={"correo": correo_a, "password": password})
        assert r.status_code == 201
        user_a_id = r.json().get("id")
        r = client.post("/api/auth/register", json={"correo": correo_b, "password": password})
        assert r.status_code == 201
        user_b_id = r.json().get("id")

        # Login as user A
        r = client.post("/api/auth/login", data={"username": correo_a, "password": password})
        assert r.status_code == 200
        token_a = r.json()["access_token"]
        headers_a = {"Authorization": f"Bearer {token_a}"}

        # Create a pelicula as user A
        pelicula_payload = {
            "titulo": f"Fav Test {unique}",
            "director": "Director",
            "genero": "Comedia",
            "duracion": 95,
            "año": 2021,
            "clasificacion": "PG",
               "sinopsis": "Sinopsis de prueba"
        }
        r = client.post("/api/peliculas/", json=pelicula_payload, headers=headers_a)
        assert r.status_code == 201
        pelicula_id = r.json()["id"]

        # User A marks favorite for user A -> ok
        r = client.post(f"/api/usuarios/{user_a_id}/favoritos/{pelicula_id}", headers=headers_a)
        assert r.status_code == 201

        # Login as user B
        r = client.post("/api/auth/login", data={"username": correo_b, "password": password})
        assert r.status_code == 200
        token_b = r.json()["access_token"]
        headers_b = {"Authorization": f"Bearer {token_b}"}

        # User B tries to mark favorite for user A -> should be forbidden (403)
        r = client.post(f"/api/usuarios/{user_a_id}/favoritos/{pelicula_id}", headers=headers_b)
        assert r.status_code == 403

