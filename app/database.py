"""
Configuración de la base de datos y gestión de sesiones.
Utiliza SQLModel para ORM y gestión de conexiones.
"""

from sqlmodel import SQLModel, create_engine, Session
from typing import Generator

from app.config import settings


# Crear el engine de la base de datos
engine = create_engine(
    settings.database_url,
    echo=settings.debug,  # Muestra las consultas SQL en consola si debug=True
    connect_args={"check_same_thread": False}  # Necesario para SQLite
)

def create_db_and_tables():
    """Crea todas las tablas definidas en los modelos"""
    SQLModel.metadata.create_all(engine)
    print("Tablas de la base de datos creadas correctamente")

def get_session() -> Generator[Session, None, None]:
    """
    Generador de sesiones de base de datos.
    Yield una sesión y asegura que se cierre después de usarla.
    """
    with Session(engine) as session:
        try:
            yield session
        finally:
            session.close()

def drop_db_and_tables():
    """
    Elimina todas las tablas de la base de datos.
    Usar con precaución - elimina todos los datos.
    """
    SQLModel.metadata.drop_all(engine)
    print("Tablas de la base de datos eliminadas")




