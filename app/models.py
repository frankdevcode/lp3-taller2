"""
Modelos de datos usando SQLModel.
Define la estructura de las tablas de la base de datos.
SQLModel combina SQLAlchemy con Pydantic para validación automática.
"""

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime


class UsuarioBase(SQLModel):
    """Modelo base para Usuario con campos comunes"""
    nombre: str = Field(max_length=100, index=True)
    correo: str = Field(max_length=100, unique=True, index=True)
    fecha_registro: datetime = Field(default_factory=datetime.utcnow)

class Usuario(UsuarioBase, table=True):
    """
    Modelo de Usuario.
    Representa a los usuarios registrados en la plataforma.
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    favoritos: List["Favorito"] = Relationship(back_populates="usuario")
    # Password hash (no almacenar contraseñas en texto plano)
    password_hash: Optional[str] = Field(default=None, max_length=255)

class PeliculaBase(SQLModel):
    """Modelo base para Película con campos comunes"""
    titulo: str = Field(max_length=200, index=True)
    director: str = Field(max_length=100)
    genero: str = Field(max_length=50)
    duracion: int = Field(gt=0)  # en minutos
    año: int = Field(gt=1888)  # Primera película de la historia
    clasificacion: str = Field(max_length=10)
    sinopsis: str = Field(max_length=1000)
    fecha_creacion: datetime = Field(default_factory=datetime.utcnow)

class Pelicula(PeliculaBase, table=True):
    """
    Modelo de Película.
    Almacena la información de las películas.
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    favoritos: List["Favorito"] = Relationship(back_populates="pelicula")

class Favorito(SQLModel, table=True):
    """
    Modelo de Favorito.
    Representa la relación entre usuarios y sus películas favoritas.
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    id_usuario: int = Field(foreign_key="usuario.id")
    id_pelicula: int = Field(foreign_key="pelicula.id")
    fecha_marcado: datetime = Field(default_factory=datetime.utcnow)

    usuario: Optional[Usuario] = Relationship(back_populates="favoritos")
    pelicula: Optional[Pelicula] = Relationship(back_populates="favoritos")


    # Nota: Las clases Usuario, Pelicula y Favorito están definidas arriba.
    # Eliminamos definiciones duplicadas y se mantiene una única fuente de verdad para los modelos.


# TODO: Opcional - Agregar validadores personalizados
# from sqlmodel import validator
#
# @validator('correo')
# def validar_correo(cls, v):
#     if '@' not in v:
#         raise ValueError('Correo electrónico inválido')
#     return v.lower()

