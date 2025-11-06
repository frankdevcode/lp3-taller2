"""
Router de Usuarios.
Endpoints para gestionar usuarios en la plataforma.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from app.database import get_session
from app.models import Usuario, Pelicula, Favorito
from app.schemas import (
    UsuarioCreate,
    UsuarioRead,
    UsuarioUpdate,
    PeliculaRead,
)

router = APIRouter(prefix="/usuarios", tags=["usuarios"])

@router.post("/", response_model=UsuarioRead, status_code=status.HTTP_201_CREATED)
def create_usuario(usuario: UsuarioCreate, session: Session = Depends(get_session)):
    """Crear un nuevo usuario"""
    db_usuario = Usuario.from_orm(usuario)
    session.add(db_usuario)
    try:
        session.commit()
        session.refresh(db_usuario)
        return db_usuario
    except Exception as e:
        session.rollback()
        if "UNIQUE constraint failed: usuario.correo" in str(e):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El correo electrónico ya está registrado"
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al crear el usuario"
        )

@router.get("/", response_model=List[UsuarioRead])
def read_usuarios(
    skip: int = 0, 
    limit: int = 100,
    session: Session = Depends(get_session)
):
    """Obtener lista de usuarios"""
    usuarios = session.exec(
        select(Usuario).offset(skip).limit(limit)
    ).all()
    return usuarios

@router.get("/{usuario_id}", response_model=UsuarioRead)
def read_usuario(usuario_id: int, session: Session = Depends(get_session)):
    """Obtener un usuario por su ID"""
    usuario = session.get(Usuario, usuario_id)
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    return usuario

@router.patch("/{usuario_id}", response_model=UsuarioRead)
def update_usuario(
    usuario_id: int,
    usuario: UsuarioUpdate,
    session: Session = Depends(get_session)
):
    """Actualizar un usuario"""
    db_usuario = session.get(Usuario, usuario_id)
    if not db_usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    
    usuario_data = usuario.model_dump(exclude_unset=True)
    for key, value in usuario_data.items():
        setattr(db_usuario, key, value)
    
    try:
        session.add(db_usuario)
        session.commit()
        session.refresh(db_usuario)
        return db_usuario
    except Exception as e:
        session.rollback()
        if "UNIQUE constraint failed: usuario.correo" in str(e):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El correo electrónico ya está registrado"
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al actualizar el usuario"
        )

@router.delete("/{usuario_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_usuario(usuario_id: int, session: Session = Depends(get_session)):
    """Eliminar un usuario"""
    usuario = session.get(Usuario, usuario_id)
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    
    session.delete(usuario)
    session.commit()
    return None




def eliminar_usuario(
    usuario_id: int,
    session: Session = Depends(get_session)
):
    """
    Elimina un usuario de la plataforma.
    
    - **usuario_id**: ID del usuario a eliminar
    
    También se eliminarán todos los favoritos asociados al usuario.
    """
    # Buscar el usuario
    usuario = session.get(Usuario, usuario_id)
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Usuario con id {usuario_id} no encontrado"
        )
    
    # Eliminar el usuario (los favoritos se eliminan por CASCADE)
    session.delete(usuario)
    session.commit()
    return None


@router.get("/{usuario_id}/favoritos", response_model=List[PeliculaRead])
def listar_favoritos_usuario(
    usuario_id: int,
    session: Session = Depends(get_session)
):
    """Listar películas favoritas de un usuario"""
    usuario = session.get(Usuario, usuario_id)
    if not usuario:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")

    statement = select(Favorito).where(Favorito.id_usuario == usuario_id)
    favoritos = session.exec(statement).all()
    peliculas = []
    for f in favoritos:
        p = session.get(Pelicula, f.id_pelicula)
        if p:
            peliculas.append(p)
    return peliculas


# TODO: Endpoint para marcar una película como favorita
@router.post(
    "/{usuario_id}/favoritos/{pelicula_id}",
    status_code=status.HTTP_201_CREATED
)
def marcar_favorito(
    usuario_id: int,
    pelicula_id: int,
    session: Session = Depends(get_session)
):
    """
    Marca una película como favorita para un usuario.
    
    - **usuario_id**: ID del usuario
    - **pelicula_id**: ID de la película
    """
    # Verificar que el usuario existe
    usuario = session.get(Usuario, usuario_id)
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Usuario con id {usuario_id} no encontrado"
        )
    
    # Verificar que la película existe
    pelicula = session.get(Pelicula, pelicula_id)
    if not pelicula:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Película con id {pelicula_id} no encontrada"
        )
   
    # Verificar si ya existe el favorito
    statement = select(Favorito).where(
        Favorito.id_usuario == usuario_id,
        Favorito.id_pelicula == pelicula_id
    )
    existing_favorito = session.exec(statement).first()
    if existing_favorito:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La película ya está marcada como favorita"
        )
    favorito = Favorito(id_usuario=usuario_id, id_pelicula=pelicula_id)
    session.add(favorito)
    session.commit()
    session.refresh(favorito)
    return {"message": "Película marcada como favorita exitosamente", "favorito_id": favorito.id}


# TODO: Endpoint para eliminar una película de favoritos
@router.delete(
    "/{usuario_id}/favoritos/{pelicula_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def eliminar_favorito(
    usuario_id: int,
    pelicula_id: int,
    session: Session = Depends(get_session)
):
    """
    Elimina una película de los favoritos de un usuario.
    
    - **usuario_id**: ID del usuario
    - **pelicula_id**: ID de la película
    """
    statement = select(Favorito).where(
        Favorito.id_usuario == usuario_id,
        Favorito.id_pelicula == pelicula_id
    )
    favorito = session.exec(statement).first()
    
    if not favorito:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="El favorito no existe"
        )
    
    session.delete(favorito)
    session.commit()
    return None


# TODO: Opcional - Endpoint para estadísticas del usuario
@router.get("/{usuario_id}/estadisticas")
def obtener_estadisticas_usuario(
    usuario_id: int,
    session: Session = Depends(get_session)
):
    """
    Obtiene estadísticas del usuario (películas favoritas, géneros preferidos, etc.)
    
    - **usuario_id**: ID del usuario
    """
    # TODO: Verificar que el usuario existe
    # TODO: Calcular número total de favoritos
    # TODO: Obtener géneros más favoritos
    # TODO: Calcular tiempo total de películas favoritas
    pass
