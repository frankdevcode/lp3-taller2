# Frontend (React + Vite)

Este frontend es una aplicación ligera creada con Vite + React para consumir la API existente en `http://localhost:8000/api`.

Instrucciones rápidas:

1. Abrir terminal en `frontend/`
2. Instalar dependencias: `npm install`
3. Ejecutar en desarrollo: `npm run dev`

Variables de entorno:
- `VITE_API_BASE` (opcional) — URL base de la API (por defecto `http://localhost:8000/api`).

Integración:
El frontend usa `axios` y el archivo `src/api.js` para llamadas a los endpoints:

- `POST /api/auth/login` — login (form-data)
- `POST /api/auth/register` — registro (JSON)
- `GET /api/peliculas` — listar películas
- `POST /api/usuarios/{usuario_id}/favoritos/{pelicula_id}` — marcar favorito
- `GET /api/usuarios/{usuario_id}/favoritos` — listar favoritos de usuario

Commit y push:
Después de revisar los cambios puedes ejecutar:

```powershell
git add frontend/
git commit -m "feat(frontend): add Vite React frontend skeleton and API integration"
git push origin main
```
