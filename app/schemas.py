"""
Esquemas Pydantic para validación y serialización de datos.
Estos esquemas se usan en los endpoints de la API para:
- Validar datos de entrada (request)
- Serializar datos de salida (response)
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from pydantic import ConfigDict


# ==========================
# USUARIO
# ==========================

class UsuarioBase(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=100)
    correo: EmailStr = Field(...)


class UsuarioCreate(UsuarioBase):
    model_config = ConfigDict(from_attributes=True)


class UsuarioRead(UsuarioBase):
    id: int
    fecha_registro: datetime
    model_config = ConfigDict(from_attributes=True)


class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=2, max_length=100)
    correo: Optional[EmailStr] = None
    model_config = ConfigDict(from_attributes=True)


# ==========================
# PELICULA
# ==========================

class PeliculaBase(BaseModel):
    titulo: str = Field(..., min_length=1, max_length=200)
    director: str = Field(..., min_length=2, max_length=100)
    genero: str = Field(..., min_length=2, max_length=50)
    duracion: int = Field(..., gt=0)
    año: int = Field(..., gt=1888)
    clasificacion: str = Field(..., min_length=1, max_length=10)
    sinopsis: str = Field(..., min_length=10, max_length=1000)


class PeliculaCreate(PeliculaBase):
    model_config = ConfigDict(from_attributes=True)


class PeliculaRead(PeliculaBase):
    id: int
    fecha_creacion: datetime
    model_config = ConfigDict(from_attributes=True)


class PeliculaUpdate(BaseModel):
    titulo: Optional[str] = Field(None, min_length=1, max_length=200)
    director: Optional[str] = Field(None, min_length=2, max_length=100)
    genero: Optional[str] = Field(None, min_length=2, max_length=50)
    duracion: Optional[int] = Field(None, gt=0)
    año: Optional[int] = Field(None, gt=1888)
    clasificacion: Optional[str] = Field(None, min_length=1, max_length=10)
    sinopsis: Optional[str] = Field(None, min_length=10, max_length=1000)
    model_config = ConfigDict(from_attributes=True)


# ==========================
# FAVORITO
# ==========================

class FavoritoCreate(BaseModel):
    id_pelicula: int
    model_config = ConfigDict(from_attributes=True)


class FavoritoRead(BaseModel):
    id: int
    id_usuario: int
    id_pelicula: int
    fecha_marcado: datetime
    model_config = ConfigDict(from_attributes=True)


