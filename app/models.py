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
    
    usuario: Usuario = Relationship(back_populates="favoritos")
    pelicula: Pelicula = Relationship(back_populates="favoritos")
    # correo: str = Field(unique=True, max_length=150, index=True)
    # fecha_registro: datetime = Field(default_factory=datetime.now)
    
    # TODO: Definir relaciones con otros modelos
    # favoritos: List["Favorito"] = Relationship(back_populates="usuario")
    
    pass


# TODO: Modelo Pelicula
class Pelicula(SQLModel, table=True):
    """
    Modelo de Película.
    Representa las películas disponibles en la plataforma.
    """
    # TODO: Definir los campos del modelo
    # id: Optional[int] = Field(default=None, primary_key=True)
    # titulo: str = Field(max_length=200, index=True)
    # director: str = Field(max_length=150)
    # genero: str = Field(max_length=100)
    # duracion: int = Field(description="Duración en minutos")
    # año: int = Field(ge=1888, le=2100)  # El cine comenzó en 1888
    # clasificacion: str = Field(max_length=10)  # G, PG, PG-13, R, NC-17
    # sinopsis: Optional[str] = Field(default=None, max_length=1000)
    # fecha_creacion: datetime = Field(default_factory=datetime.now)
    
    # TODO: Definir relaciones con otros modelos
    # favoritos: List["Favorito"] = Relationship(back_populates="pelicula")
    
    pass


# TODO: Modelo Favorito
class Favorito(SQLModel, table=True):
    """
    Modelo de Favorito.
    Representa la relación muchos-a-muchos entre usuarios y películas.
    """
    # TODO: Definir los campos del modelo
    # id: Optional[int] = Field(default=None, primary_key=True)
    # id_usuario: int = Field(foreign_key="usuario.id")
    # id_pelicula: int = Field(foreign_key="pelicula.id")
    # fecha_marcado: datetime = Field(default_factory=datetime.now)
    
    # TODO: Definir relaciones con otros modelos
    # usuario: Optional[Usuario] = Relationship(back_populates="favoritos")
    # pelicula: Optional[Pelicula] = Relationship(back_populates="favoritos")
    
    # TODO: Opcional - Agregar restricción de unicidad
    # class Config:
    #     # Evita que un usuario marque la misma película como favorita más de una vez
    #     table_args = (
    #         UniqueConstraint('id_usuario', 'id_pelicula', name='unique_user_movie'),
    #     )
    
    pass


# TODO: Opcional - Agregar métodos útiles a los modelos
# Ejemplo para Usuario:
# def __repr__(self):
#     return f"<Usuario(id={self.id}, nombre={self.nombre}, correo={self.correo})>"
#
# @property
# def cantidad_favoritos(self) -> int:
#     """Retorna la cantidad de películas favoritas del usuario."""
#     return len(self.favoritos) if self.favoritos else 0


# TODO: Opcional - Agregar validadores personalizados
# from sqlmodel import validator
#
# @validator('correo')
# def validar_correo(cls, v):
#     if '@' not in v:
#         raise ValueError('Correo electrónico inválido')
#     return v.lower()

