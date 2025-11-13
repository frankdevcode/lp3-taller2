# LP3 Taller 2 - Frontend + Backend

Aplicación completa para gestionar películas, usuarios y favoritos.

## Estructura del Proyecto

```
.
├── app/                    # Backend (FastAPI)
├── frontend/               # Frontend (React + Vite)
├── tests/                  # Tests del backend
├── docker-compose.yml
├── Dockerfile
├── main.py                 # Punto de entrada del backend
├── requirements.txt
└── pyproject.toml
```

## Requisitos Previos

- Python 3.9+ (para backend)
- Node.js 16+ (para frontend)
- Git

## Instalación y Ejecución

### 1. Backend (FastAPI)

```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor
python main.py
# O con uvicorn directamente:
# uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

El backend estará disponible en `http://localhost:8000`
- Documentación API: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 2. Frontend (React + Vite)

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## Variables de Entorno

### Frontend (`frontend/.env`)

```text
VITE_API_BASE=http://localhost:8000/api
```

## Características Implementadas

### ✅ Módulo de Usuarios
- ✅ Listar usuarios con paginación
- ✅ Crear nuevos usuarios
- ✅ Editar usuarios existentes
- ✅ Eliminar usuarios con confirmación
- ✅ Búsqueda de usuarios
- ✅ Validación de correo y campos
- ✅ Mostrar fecha de registro

### ✅ Módulo de Películas
- ✅ Catálogo de películas con diseño tipo tarjetas
- ✅ Paginación con controles de navegación
- ✅ Crear, editar, eliminar películas
- ✅ Búsqueda avanzada (título, director)
- ✅ Filtros por género, año, clasificación
- ✅ Validación de campos obligatorios
- ✅ Diseño visual atractivo

### ✅ Módulo de Favoritos
- ✅ Listar películas favoritas por usuario
- ✅ Marcar/desmarcar favoritos
- ✅ Indicador visual de películas favoritas
- ✅ Eliminar favoritos con confirmación
- ✅ Contador de favoritos

### ✅ Página Principal
- ✅ Página de bienvenida
- ✅ Navegación clara
- ✅ Estadísticas generales
- ✅ Accesos rápidos a secciones
- ✅ Diseño responsivo

### ✅ Estadísticas y Reportes
- ✅ Gráficos de películas por género
- ✅ Películas por clasificación
- ✅ Películas recientes
- ✅ Estadísticas generales

### ✅ UI/UX
- ✅ Diseño moderno estilo Netflix
- ✅ Tema oscuro
- ✅ Diseño responsivo (mobile, tablet, desktop)
- ✅ Notificaciones Toast
- ✅ Animaciones suaves

## Endpoints del Backend

### Autenticación
- `POST /api/auth/login` - Login (form-data)
- `POST /api/auth/register` - Registro (JSON)
- `GET /api/auth/me` - Obtener usuario autenticado

### Usuarios
- `GET /api/usuarios` - Listar usuarios
- `GET /api/usuarios/{id}` - Obtener usuario
- `POST /api/usuarios` - Crear usuario
- `PATCH /api/usuarios/{id}` - Actualizar usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario

### Películas
- `GET /api/peliculas` - Listar películas
- `GET /api/peliculas/{id}` - Obtener película
- `POST /api/peliculas` - Crear película
- `PATCH /api/peliculas/{id}` - Actualizar película
- `DELETE /api/peliculas/{id}` - Eliminar película
- `GET /api/peliculas/buscar` - Búsqueda avanzada

### Favoritos
- `POST /api/usuarios/{usuario_id}/favoritos/{pelicula_id}` - Marcar favorito
- `GET /api/usuarios/{usuario_id}/favoritos` - Listar favoritos
- `DELETE /api/favoritos/{favorito_id}` - Eliminar favorito

## Pruebas Recomendadas

1. **Registro e Login**
   - Crear una cuenta nueva
   - Verificar que el token se almacena en localStorage
   - Iniciar sesión con credenciales correctas/incorrectas

2. **CRUD de Películas**
   - Crear una película
   - Editar película
   - Buscar películas por título/director
   - Eliminar película

3. **Gestión de Favoritos**
   - Marcar película como favorita
   - Verificar que el indicador visual aparece
   - Ver lista de favoritos
   - Remover de favoritos

4. **CRUD de Usuarios**
   - Crear usuario
   - Editar información
   - Eliminar usuario con confirmación

5. **Estadísticas**
   - Verificar que carga datos correctamente
   - Ver gráficos de géneros y clasificaciones

## Construcción para Producción

### Backend

```bash
# Build con Docker
docker build -t lp3-backend .
docker run -p 8000:8000 lp3-backend
```

### Frontend

```bash
cd frontend
npm run build
# El output estará en frontend/dist/
```

## Tecnologías Usadas

### Backend
- FastAPI
- SQLModel
- Pydantic
- SQLite / PostgreSQL
- JWT para autenticación

### Frontend
- React 18
- Vite
- React Router v6
- Axios
- React Toastify
- CSS moderno (sin frameworks)

## Git Workflow

Se han realizado los siguientes commits:

1. `feat(backend): add GET /api/auth/me endpoint to retrieve current user info`
2. `feat(frontend): add full React app with router, pages, components, and modern styling`
3. `fix(frontend): add Peliculas page and ensure imports are correct`

Para ver el historial completo:
```bash
git log --oneline
```

## Próximos Pasos (Opcional)

- [ ] Integrar Chart.js para gráficos interactivos
- [ ] Agregar paginación en favoritos
- [ ] Sistema de recomendaciones basado en favoritos
- [ ] Modo claro/oscuro
- [ ] Exportar datos a CSV/JSON
- [ ] Validaciones más robustas
- [ ] Tests E2E con Playwright
- [ ] Docker Compose para correr todo fácilmente

## Soporte

Para preguntas o issues, crear un issue en el repositorio o contactar al equipo de desarrollo.

