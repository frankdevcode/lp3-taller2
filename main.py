from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.database import create_db_and_tables
from app.routers import usuarios, peliculas, favoritos
from app.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Startup: crear tablas si no existen.
    Shutdown: lugar para limpieza si se requiere.
    """
    create_db_and_tables()
    yield


# Crear la aplicación
app = FastAPI(
    title=settings.app_name,
    description="API RESTful para gestionar usuarios, películas y favoritos",
    version=settings.app_version,
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers bajo prefijo /api
app.include_router(usuarios.router, prefix="/api")
app.include_router(peliculas.router, prefix="/api")
app.include_router(favoritos.router, prefix="/api")


@app.get("/", tags=["Root"])
async def root():
    return {
        "app_name": settings.app_name,
        "version": settings.app_version,
        "documentation": "/docs",
        "redoc": "/redoc",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=settings.host, port=settings.port, reload=settings.debug)

