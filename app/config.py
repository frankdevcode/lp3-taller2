"""
Configuración de la aplicación.
Maneja diferentes entornos: desarrollo, pruebas y producción.
"""

from pydantic_settings import BaseSettings
from typing import Literal


class Settings(BaseSettings):
    """
    Configuración de la aplicación usando Pydantic Settings.
    Lee las variables de entorno desde el archivo .env
    """
    
    # Configuración básica de la aplicación
    app_name: str = "API de Películas"
    app_version: str = "1.0.0"
    
    # Configuración del entorno
    environment: Literal["development", "testing", "production"] = "development"
    debug: bool = True
    
    # Configuración de la base de datos
    database_url: str = "sqlite:///peliculas.db"
    
    class Config:
        env_file = ".env"
    # environment: Literal["development", "testing", "production"] = "development"
    environment: str = "development"
    
    # TODO: Configuración de la base de datos
    # Para SQLite: sqlite:///./peliculas.db
    # Para PostgreSQL: postgresql://user:password@localhost/dbname
    database_url: str = "sqlite:///./peliculas.db"
    
    # TODO: Configuración del servidor
    host: str = "0.0.0.0"
    port: int = 8000
    debug: bool = True
    
    # TODO: Configuración de CORS
    # En desarrollo puedes usar ["*"], en producción especifica los orígenes permitidos
    cors_origins: list[str] = ["*"]
    
    # TODO: Configuración de seguridad (para futuras mejoras)
    # secret_key: str = "your-secret-key-here"  # Cambiar en producción
    # algorithm: str = "HS256"
    # access_token_expire_minutes: int = 30
    
    # TODO: Configuración de logging
    # log_level: str = "INFO"
    
    class Config:
        """
        Configuración de Pydantic Settings.
        """
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False
        
        # TODO: Opcional - Agregar validación personalizada
        # @validator("database_url")
        # def validate_database_url(cls, v):
        #     if not v:
        #         raise ValueError("DATABASE_URL no puede estar vacío")
        #     return v


# TODO: Crear una instancia global de Settings
settings = Settings()


# TODO: Opcional - Crear diferentes configuraciones para cada entorno
class DevelopmentSettings(Settings):
    """Configuración para el entorno de desarrollo."""
    debug: bool = True
    # TODO: Agregar configuraciones específicas de desarrollo


class TestingSettings(Settings):
    """Configuración para el entorno de pruebas."""
    # TODO: Usar una base de datos diferente para pruebas
    database_url: str = "sqlite:///./test_peliculas.db"
    # TODO: Agregar configuraciones específicas de pruebas


class ProductionSettings(Settings):
    """Configuración para el entorno de producción."""
    debug: bool = False
    # TODO: Agregar configuraciones específicas de producción
    # TODO: Cambiar a una base de datos más robusta (PostgreSQL, MySQL)
    # database_url: str = "postgresql://user:password@localhost/peliculas_prod"


# TODO: Función para obtener la configuración según el entorno
def get_settings() -> Settings:
    """
    Retorna la configuración apropiada según el entorno.
    """
    env = settings.environment.lower()
    
    if env == "testing":
        return TestingSettings()
    elif env == "production":
        return ProductionSettings()
    else:
        return DevelopmentSettings()


# TODO: Opcional - Agregar validación de configuración al inicio
# def validate_settings():
#     """Valida que todas las configuraciones necesarias estén presentes."""
#     required_settings = ["database_url", "app_name"]
#     for setting in required_settings:
#         if not getattr(settings, setting, None):
#             raise ValueError(f"Configuración requerida no encontrada: {setting}")

