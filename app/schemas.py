"""
Esquemas Pydantic para validación y serialización de datos.
Estos esquemas se usan en los endpoints de la API para:
- Validar datos de entrada (request)
- Serializar datos de salida (response)
"""

from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, List
from datetime import datetime


# =============================================================================
# ESQUEMAS DE USUARIO
# =============================================================================

class UsuarioBase(BaseModel):
    """Schema base para usuarios"""
    nombre: str = Field(..., min_length=2, max_length=100)
    correo: EmailStr = Field(...)

class UsuarioCreate(UsuarioBase):
    """Schema para crear un nuevo usuario"""
    model_config = ConfigDict(from_attributes=True)

class UsuarioRead(UsuarioBase):
    """Schema para leer un usuario"""
    id: int
    fecha_registro: datetime
    model_config = ConfigDict(from_attributes=True)

class UsuarioUpdate(BaseModel):
    """Schema para actualizar un usuario"""
    nombre: Optional[str] = Field(None, min_length=2, max_length=100)
    correo: Optional[EmailStr] = None
    model_config = ConfigDict(from_attributes=True)

# =============================================================================
# ESQUEMAS DE PELÍCULA
# =============================================================================

class PeliculaBase(BaseModel):
    """Schema base para películas"""
    titulo: str = Field(..., min_length=1, max_length=200)
    director: str = Field(..., min_length=2, max_length=100)
    genero: str = Field(..., min_length=2, max_length=50)
    duracion: int = Field(..., gt=0)
    año: int = Field(..., gt=1888)
    clasificacion: str = Field(..., min_length=1, max_length=10)
    sinopsis: str = Field(..., min_length=10, max_length=1000)

class PeliculaCreate(PeliculaBase):
    """Schema para crear una nueva película"""
    model_config = ConfigDict(from_attributes=True)

class PeliculaRead(PeliculaBase):
    """Schema para leer una película"""
    id: int
    fecha_creacion: datetime
    model_config = ConfigDict(from_attributes=True)

class PeliculaUpdate(BaseModel):
    """Schema para actualizar una película"""
    titulo: Optional[str] = Field(None, min_length=1, max_length=200)
    director: Optional[str] = Field(None, min_length=2, max_length=100)
    genero: Optional[str] = Field(None, min_length=2, max_length=50)
    duracion: Optional[int] = Field(None, gt=0)
    año: Optional[int] = Field(None, gt=1888)
    clasificacion: Optional[str] = Field(None, min_length=1, max_length=10)
    sinopsis: Optional[str] = Field(None, min_length=10, max_length=1000)
    model_config = ConfigDict(from_attributes=True)

# =============================================================================
# ESQUEMAS DE FAVORITO
# =============================================================================

class FavoritoCreate(BaseModel):
    """Schema para crear un nuevo favorito"""
    id_pelicula: int
    model_config = ConfigDict(from_attributes=True)

class FavoritoRead(BaseModel):
    """Schema para leer un favorito"""
    id: int
    id_usuario: int
    id_pelicula: int
    fecha_marcado: datetime
    model_config = ConfigDict(from_attributes=True)
    No incluye id ni fecha_registro (se generan automáticamente).
    """
    # nombre: str = Field(min_length=1, max_length=100, description="Nombre del usuario")
    # correo: EmailStr = Field(description="Correo electrónico único")
    
    # TODO: Opcional - Agregar ejemplo para la documentación
    # model_config = ConfigDict(
    #     json_schema_extra={
    #         "example": {
    #             "nombre": "Juan Pérez",
    #             "correo": "juan.perez@email.com"
    #         }
    #     }
    # )
    pass


# TODO: Schema para actualizar un usuario (request)
class UsuarioUpdate(BaseModel):
    """
    Schema para actualizar un usuario existente.
    Todos los campos son opcionales.
    """
    # nombre: Optional[str] = Field(None, min_length=1, max_length=100)
    # correo: Optional[EmailStr] = None
    pass


# TODO: Schema para leer un usuario (response)
class UsuarioRead(BaseModel):
    """
    Schema para retornar información de un usuario.
    Incluye todos los campos del modelo.
    """
    # id: int
    # nombre: str
    # correo: str
    # fecha_registro: datetime
    
    # model_config = ConfigDict(from_attributes=True)
    pass


# TODO: Schema para usuario con sus favoritos (response)
class UsuarioWithFavoritos(UsuarioRead):
    """
    Schema para retornar un usuario con sus películas favoritas.
    """
    # favoritos: List["FavoritoRead"] = []
    pass


# =============================================================================
# ESQUEMAS DE PELÍCULA
# =============================================================================

# TODO: Schema para crear una película (request)
class PeliculaCreate(BaseModel):
    """
    Schema para crear una nueva película.
    """
    # titulo: str = Field(min_length=1, max_length=200)
    # director: str = Field(min_length=1, max_length=150)
    # genero: str = Field(min_length=1, max_length=100)
    # duracion: int = Field(gt=0, description="Duración en minutos")
    # año: int = Field(ge=1888, le=2100, description="Año de estreno")
    # clasificacion: str = Field(max_length=10)
    # sinopsis: Optional[str] = Field(None, max_length=1000)
    
    # model_config = ConfigDict(
    #     json_schema_extra={
    #         "example": {
    #             "titulo": "Inception",
    #             "director": "Christopher Nolan",
    #             "genero": "Ciencia Ficción, Acción",
    #             "duracion": 148,
    #             "año": 2010,
    #             "clasificacion": "PG-13",
    #             "sinopsis": "Un ladrón que roba secretos mediante tecnología de sueños..."
    #         }
    #     }
    # )
    pass


# TODO: Schema para actualizar una película (request)
class PeliculaUpdate(BaseModel):
    """
    Schema para actualizar una película existente.
    Todos los campos son opcionales.
    """
    # titulo: Optional[str] = Field(None, min_length=1, max_length=200)
    # director: Optional[str] = Field(None, min_length=1, max_length=150)
    # genero: Optional[str] = None
    # duracion: Optional[int] = Field(None, gt=0)
    # año: Optional[int] = Field(None, ge=1888, le=2100)
    # clasificacion: Optional[str] = None
    # sinopsis: Optional[str] = None
    pass


# TODO: Schema para leer una película (response)
class PeliculaRead(BaseModel):
    """
    Schema para retornar información de una película.
    """
    # id: int
    # titulo: str
    # director: str
    # genero: str
    # duracion: int
    # año: int
    # clasificacion: str
    # sinopsis: Optional[str]
    # fecha_creacion: datetime
    
    # model_config = ConfigDict(from_attributes=True)
    pass


# =============================================================================
# ESQUEMAS DE FAVORITO
# =============================================================================

# TODO: Schema para crear un favorito (request)
class FavoritoCreate(BaseModel):
    """
    Schema para marcar una película como favorita.
    """
    # id_usuario: int = Field(gt=0)
    # id_pelicula: int = Field(gt=0)
    pass


# TODO: Schema para leer un favorito (response)
class FavoritoRead(BaseModel):
    """
    Schema para retornar información de un favorito.
    """
    # id: int
    # id_usuario: int
    # id_pelicula: int
    # fecha_marcado: datetime
    
    # model_config = ConfigDict(from_attributes=True)
    pass


# TODO: Schema para favorito con información completa (response)
class FavoritoWithDetails(FavoritoRead):
    """
    Schema para retornar un favorito con información del usuario y película.
    """
    # usuario: UsuarioRead
    # pelicula: PeliculaRead
    pass


# =============================================================================
# ESQUEMAS DE RESPUESTA GENÉRICOS
# =============================================================================

# TODO: Schema para respuestas con mensajes
class MessageResponse(BaseModel):
    """
    Schema genérico para respuestas con mensajes.
    """
    # message: str
    # detail: Optional[str] = None
    pass


# TODO: Schema para respuestas paginadas
class PaginatedResponse(BaseModel):
    """
    Schema genérico para respuestas paginadas.
    """
    # items: List[BaseModel]
    # total: int
    # page: int = 1
    # size: int = 50
    # pages: int
    pass


# TODO: Opcional - Schema para búsqueda de películas
class PeliculaSearchParams(BaseModel):
    """
    Parámetros de búsqueda para películas.
    """
    # titulo: Optional[str] = None
    # director: Optional[str] = None
    # genero: Optional[str] = None
    # año: Optional[int] = None
    # año_min: Optional[int] = None
    # año_max: Optional[int] = None
    pass

