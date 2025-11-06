from fastapi.testclient import TestClient
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parents[1]))
from app.main import app
import uuid

unique = uuid.uuid4().hex[:8]
correo_a = f"usera_{unique}@example.com"
password = "secret123"

with TestClient(app) as client:
    r = client.post("/api/auth/register", json={"correo": correo_a, "password": password})
    print('register:', r.status_code, r.text)
    r = client.post("/api/auth/login", data={"username": correo_a, "password": password})
    print('login:', r.status_code, r.text)
    token = r.json().get('access_token')
    headers = {"Authorization": f"Bearer {token}"}

    pelicula_payload = {
        "titulo": f"Fav Test {unique}",
        "director": "Director",
        "genero": "Comedia",
        "duracion": 95,
        "año": 2021,
        "clasificacion": "PG",
        "sinopsis": "Sinopsis"
    }
    r = client.post('/api/peliculas/', json=pelicula_payload, headers=headers)
    print('create pelicula:', r.status_code)
    try:
        print(r.json())
    except Exception:
        print(r.text)
