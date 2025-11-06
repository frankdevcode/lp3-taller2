# API de Películas

![CI](https://github.com/frankdevcode/lp3-taller2/actions/workflows/ci.yml/badge.svg)

Una [API RESTful](https://aws.amazon.com/es/what-is/restful-api/) para gestionar usuarios, películas y favoritos. Desarrollada con [FastAPI](https://fastapi.tiangolo.com/), [SQLModel](https://sqlmodel.tiangolo.com/) y [Pydantic](https://docs.pydantic.dev/).

## Descripción

Esta API permite administrar:
- **Usuarios**: crear y gestionar perfiles de usuarios.
- **Películas**: agregar, actualizar y eliminar películas con sus metadatos.
- **Favoritos**: gestionar las películas favoritas de cada usuario.

El proyecto incluye una interfaz de documentación interactiva generada automáticamente disponible en los *endpoints* `/docs` (Swagger UI) y `/redoc` (ReDoc).

## Estructura del Proyecto

```
lp3-taller2
├── README.md            # Este archivo, documentación completa del proyecto
├── .env                 # Variables de entorno (desarrollo, pruebas, producción)
├── .gitignore           # Archivos y directorios a ignorar por Git
├── main.py              # Script principal para ejecutar la aplicación
├── peliculas.db         # Base de Datos SQLite
├── app
│   ├── __init__.py      # Inicialización del módulo
│   ├── config.py        # Configuraciones para diferentes entornos
│   ├── database.py      # Configuración de la base de datos y sesión
│   ├── models.py        # Modelos de datos usando SQLModel
│   ├── schemas.py       # Esquemas Pydantic para validación y serialización
│   └── routers
│       ├── __init__.py
│       ├── usuarios.py  # Endpoints de usuarios
│       ├── peliculas.py # Endpoints de películas
│       └── favoritos.py # Endpoints de favoritos
├── requirements.txt     # Dependencias del proyecto
├── tests
│   └── test_api.py      # Pruebas Unitarias
└── utils.py             # Funciones de utilidad
```

## Modelo de Datos

1. **Usuario**:
   - id: Identificador único
   - nombre: Nombre del usuario
   - correo: Correo electrónico (único)
   - fecha_registro: Fecha de registro

2. **Película**:
   - id: Identificador único
   - titulo: Título de la película
   - director: Director de la película
   - genero: Género cinematográfico
   - duracion: Duración en minutos
   - año: Año de estreno
   - clasificacion: Clasificación por edad (G, PG, PG-13, R, etc.)
   - sinopsis: Breve descripción de la trama
   - fecha_creacion: Fecha de creación del registro

3. **Favorito**:
   - id: Identificador único
   - id_usuario: ID del usuario (clave foránea)
   - id_pelicula: ID de la película (clave foránea)
   - fecha_marcado: Fecha en que se marcó como favorito

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/UR-CC/lp3-taller2.git
   cd lp3-taller2
   ```

2. Crea y activa un entorno virtual:

    - Linux / macOS:

       ```bash
       python -m venv .venv
       source .venv/bin/activate
       ```

    - Windows (PowerShell):

       ```powershell
       python -m venv .venv
       .\.venv\Scripts\Activate.ps1
       ```

3. Instala las dependencias:

   ```bash
   pip install -r requirements.txt
   ```

4. Ajusta las variables de entorno, editando el archivo `.env`

## Ejecución

1. Inicializar la base de datos (opcional — crea `peliculas.db`):

   ```powershell
   # Desde PowerShell (Windows)
   .venv\Scripts\python.exe scripts\init_db.py --db peliculas.db --sql init_db.sql
   
   # O desde Linux/macOS
   .venv/bin/python scripts/init_db.py --db peliculas.db --sql init_db.sql
   ```

   Alternativamente, si tienes `make` disponible (WSL o una utilidad make), puedes usar el Makefile:

   ```powershell
   make init-db
   ```

2. Ejecuta la aplicación (después de activar el entorno):

   Puedes usar el Makefile para atajos en desarrollo (requiere `make`):

   ```powershell
   make run
   ```

   O ejecuta uvicorn directamente:

   ```powershell
   # PowerShell
   .venv\Scripts\python.exe -m uvicorn main:app --reload
   ```

   ### Ejecutar con Docker (opcional)

   Si prefieres usar Docker, construye la imagen y levanta el servicio con docker-compose:

   ```powershell
   # Construir la imagen
   docker build -t lp3-taller2:latest .

   # O con docker-compose (levanta en http://0.0.0.0:8000)
   docker-compose up --build
   ```

   La configuración de `docker-compose.yml` monta la carpeta del proyecto dentro del contenedor
   y también monta `peliculas.db` en la raíz del proyecto para persistir la base de datos SQLite.

2. Accede a la aplicación:
    - API: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
    - Documentación *Swagger UI*: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
    - Documentación *ReDoc*: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

Makefile: objetivos útiles añadidos al repositorio (`Makefile`). Ejemplos:

```powershell
make init-db   # inicializar DB
make run       # ejecutar uvicorn
make test      # ejecutar tests
make lint      # ejecutar ruff
```

2. Accede a la aplicación:
   - API: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
   - Documentación *Swagger UI*: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
   - Documentación *ReDoc*: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

## Uso de la API

Todos los endpoints están bajo el prefijo `/api`.
Ejemplos:
- Listar usuarios: `GET /api/usuarios/`
- Crear película: `POST /api/peliculas/`
- Marcar favorito (usuario): `POST /api/usuarios/{usuario_id}/favoritos/{pelicula_id}`

### Usuarios

- GET `/` - Listar usuarios con paginación
- POST `/` - Crear usuario con validación de correo único
- GET `/{usuario_id}` - Obtener usuario específico
- PUT `/{usuario_id}` - Actualizar usuario
- DELETE `/{usuario_id}` - Eliminar usuario
- GET `/{usuario_id}/favoritos` - Listar favoritos del usuario
- POST `/{usuario_id}/favoritos/{pelicula_id}` - Marcar favorito
- DELETE `/{usuario_id}/favoritos/{pelicula_id}` - Eliminar favorito
- GET `/{usuario_id}/estadisticas` - Estadísticas (opcional)

### Películas

- GET `/` - Listar películas con paginación
- POST `/` - Crear película con validación de duplicados
- GET `/{pelicula_id}` - Obtener película específica
- PUT `/{pelicula_id}` - Actualizar película
- DELETE `/{pelicula_id}` - Eliminar película
- GET `/buscar/` - Búsqueda avanzada (título, director, género, año)
- GET `/populares/top` - Películas más populares (opcional)
- GET `/clasificacion/{clasificacion}` - Por clasificación (opcional)
- GET `/recientes/nuevas` - Películas recientes (opcional)

### Favoritos

- GET `/` - Listar todos los favoritos
- POST `/` - Crear favorito con validaciones
- GET `/{favorito_id}` - Obtener favorito con detalles
- DELETE `/{favorito_id}` - Eliminar favorito
- GET `/usuario/{usuario_id}` - Favoritos por usuario
- GET `/pelicula/{pelicula_id}` - Favoritos por película
- GET `/verificar/{usuario_id}/{pelicula_id}` - Verificar favorito (opcional)
- GET `/estadisticas/generales` - Estadísticas globales (opcional)
- DELETE `/usuario/{usuario_id}/todos` - Eliminar todos los favoritos (opcional)
- GET `/recomendaciones/{usuario_id}` - Sistema de recomendaciones (opcional)

## Desarrollo del Taller

1. Ajustar este `README.md` con los datos del Estudiante

2. Inicializa la base de datos con el script provisto (recomendado para entorno local):

   ```powershell
   .venv\Scripts\python.exe scripts\init_db.py --db peliculas.db --sql init_db.sql
   ```

   También puedes usar DBeaver para ejecutar `init_db.sql` si prefieres una UI.

3. Busca todos los comentarios `# TODO`, realiza los ajustes necesarios, y ejecuta un `commit` por cada uno.

4. Prueba el funcionamiento del API, desde la documentación *Swagger UI* o *ReDoc*.

5. Implementar una (1) de las sugerencias que se presentan a continuación.

## Sugerencias de Mejora

1. **Autenticación y autorización**: Implementar JWT o OAuth2 para proteger los endpoints y asociar los usuarios automáticamente con sus favoritos.

2. **Paginación**: Añadir soporte para paginación en las listas de películas, usuarios y favoritos para mejorar el rendimiento con grandes volúmenes de datos.

3. **Validación de datos**: Implementar validación más robusta de datos de entrada utilizando bibliotecas como Marshmallow o Pydantic.

4. **Tests unitarios e integración**: Desarrollar pruebas automatizadas para verificar el funcionamiento correcto de la API.

5. **Base de datos en producción**: Migrar a una base de datos más robusta como PostgreSQL o MySQL para entornos de producción.

6. **Docker**: Contenerizar la aplicación para facilitar su despliegue en diferentes entornos.

7. **Registro (logging)**: Implementar un sistema de registro más completo para monitorear errores y uso de la API.

8. **Caché**: Añadir caché para mejorar la velocidad de respuesta en consultas frecuentes.

9. **Sistema de valoraciones**: Implementar un sistema que permita a los usuarios calificar películas con estrellas y dejar reseñas.

10. **Recomendaciones inteligentes**: Desarrollar un algoritmo de recomendación basado en las películas favoritas y valoraciones de usuarios con gustos similares.

11. **Integración con APIs externas**: Conectar con APIs como TMDB (The Movie Database) u OMDB para obtener información adicional, posters y tráilers.

12. **Listas personalizadas**: Permitir a los usuarios crear listas temáticas personalizadas más allá de favoritos (por ejemplo: "Pendientes por ver", "Clásicos", "Para ver en familia").

