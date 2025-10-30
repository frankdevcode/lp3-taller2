from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.database import create_db_and_tables
from app.routers import usuarios, peliculas, favoritos
from app.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Gestor de ciclo de vida de la aplicación.
    Se ejecuta al iniciar y al cerrar la aplicación.
    """
    # Startup: Crear tablas en la base de datos
    create_db_and_tables()
    yield
    # Shutdown: No hay acciones necesarias por ahora
    pass

# Crear la aplicación FastAPI
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    lifespan=lifespan
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir los routers
app.include_router(usuarios.router)
app.include_router(peliculas.router)
app.include_router(favoritos.router)

@app.get("/")
async def root():
    """Endpoint raíz que muestra información básica de la API"""
    return {
        "app_name": settings.app_name,
        "version": settings.app_version,
        "documentation": "/docs",
        "redoc": "/redoc"
    }
    
    # Shutdown: Limpiar recursos si es necesario
    print("cerrando aplicación...")


# TODO: Crear la instancia de FastAPI con metadatos apropiados
# Incluir: title, description, version, contact, license_info
app = FastAPI(
    title="API de Películas",
    description="API RESTful para gestionar usuarios, películas y favoritos",
    version="1.0.0",
    lifespan=lifespan,
    # TODO: Agregar información de contacto y licencia
    # contact={
    #     "name": "Tu Nombre",
    #     "email": "tu.email@example.com",
    # },
    # license_info={
    #     "name": "MIT",
    # },
)


# TODO: Configurar CORS para permitir solicitudes desde diferentes orígenes
# Esto es importante para desarrollo con frontend separado
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: En producción, especificar orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# TODO: Incluir los routers de usuarios, peliculas y favoritos
# Ejemplo:
# app.include_router(usuarios.router, prefix="/api/usuarios", tags=["Usuarios"])


# TODO: Crear un endpoint raíz que retorne información básica de la API
@app.get("/", tags=["Root"])
async def root():
    """
    Endpoint raíz de la API.
    Retorna información básica y enlaces a la documentación.
    """
    return {
        # TODO: Agregar información 
    }


# Crear un endpoint de health check para monitoreo
@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint para verificar el estado de la API.
    Útil para sistemas de monitoreo y orquestación.
    """
    return {
        "status": "healthy",
        # TODO: Agregar verificación de conexión a base de datos
        # TODO: Agregar información sobre el sistema (uptime, memoria, etc.)
    }


# TODO: Opcional - Agregar middleware para logging de requests


# TODO: Opcional - Agregar manejadores de errores personalizados


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        # TODO: Configurar el servidor uvicorn con los parámetros apropiados
    )

