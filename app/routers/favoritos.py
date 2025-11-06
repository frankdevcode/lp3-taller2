"""
Router de Favoritos.
Endpoints para gestionar las relaciones de favoritos entre usuarios y películas.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from app.database import get_session
from app.models import Favorito, Usuario, Pelicula
from app.schemas import FavoritoCreate, FavoritoRead
from app.security import get_current_user
from fastapi import Depends

router = APIRouter(tags=["favoritos"])


@router.post("/favoritos/", response_model=FavoritoRead, status_code=status.HTTP_201_CREATED)
def create_favorito(favorito: FavoritoCreate, session: Session = Depends(get_session), current_user=Depends(get_current_user)):
    # Verificar existencia de usuario y película
    usuario = session.get(Usuario, favorito.id_usuario)
    if not usuario:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    pelicula = session.get(Pelicula, favorito.id_pelicula)
    if not pelicula:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Película no encontrada")

    statement = select(Favorito).where(
        Favorito.id_usuario == favorito.id_usuario,
        Favorito.id_pelicula == favorito.id_pelicula
    )
    existing = session.exec(statement).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Este favorito ya existe")

    db_fav = Favorito(id_usuario=favorito.id_usuario, id_pelicula=favorito.id_pelicula)
    session.add(db_fav)
    session.commit()
    session.refresh(db_fav)
    return db_fav


@router.get("/favoritos/", response_model=List[FavoritoRead])
def listar_favoritos(skip: int = 0, limit: int = 100, session: Session = Depends(get_session)):
    statement = select(Favorito).offset(skip).limit(limit)
    favoritos = session.exec(statement).all()
    return favoritos


@router.delete("/favoritos/{favorito_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_favorito(favorito_id: int, session: Session = Depends(get_session), current_user=Depends(get_current_user)):
    favorito = session.get(Favorito, favorito_id)
    if not favorito:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorito no encontrado")
    session.delete(favorito)
    session.commit()
    return None


@router.post("/usuarios/{usuario_id}/favoritos/{pelicula_id}", status_code=status.HTTP_201_CREATED)
def marcar_favorito_usuario(usuario_id: int, pelicula_id: int, session: Session = Depends(get_session), current_user=Depends(get_current_user)):
    usuario = session.get(Usuario, usuario_id)
    if not usuario:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    pelicula = session.get(Pelicula, pelicula_id)
    if not pelicula:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Película no encontrada")

    statement = select(Favorito).where(Favorito.id_usuario == usuario_id, Favorito.id_pelicula == pelicula_id)
    existing = session.exec(statement).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="La película ya está en favoritos")

    db_fav = Favorito(id_usuario=usuario_id, id_pelicula=pelicula_id)
    session.add(db_fav)
    session.commit()
    session.refresh(db_fav)
    return db_fav


@router.get("/usuarios/{usuario_id}/favoritos", response_model=List[FavoritoRead])
def favoritos_por_usuario(usuario_id: int, session: Session = Depends(get_session)):
    usuario = session.get(Usuario, usuario_id)
    if not usuario:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    statement = select(Favorito).where(Favorito.id_usuario == usuario_id)
    favoritos = session.exec(statement).all()
    return favoritos
@router.get("/recomendaciones/{usuario_id}", response_model=List)
def obtener_recomendaciones(
    usuario_id: int,
    limit: int = 5,
    session: Session = Depends(get_session)
):
    """
    Obtiene recomendaciones de películas para un usuario basadas en sus favoritos.
    
    La lógica básica busca películas del mismo género o director que las favoritas del usuario.
    
    - **usuario_id**: ID del usuario
    - **limit**: Número máximo de recomendaciones
    """
    # TODO: Verificar que el usuario existe
    # usuario = session.get(Usuario, usuario_id)
    # if not usuario:
    #     raise HTTPException(
    #         status_code=status.HTTP_404_NOT_FOUND,
    #         detail=f"Usuario con id {usuario_id} no encontrado"
    #     )
    
    # TODO: Obtener géneros y directores de películas favoritas del usuario
    # statement = (
    #     select(Pelicula.genero, Pelicula.director)
    #     .join(Favorito)
    #     .where(Favorito.id_usuario == usuario_id)
    # )
    # favoritos_info = session.exec(statement).all()
    
    # if not favoritos_info:
    #     return []
    
    # TODO: Buscar películas similares que el usuario NO haya marcado como favoritas
    # generos = [info[0] for info in favoritos_info]
    # directores = [info[1] for info in favoritos_info]
    
    # # Obtener IDs de películas ya favoritas
    # statement_ids = select(Favorito.id_pelicula).where(Favorito.id_usuario == usuario_id)
    # ids_favoritos = session.exec(statement_ids).all()
    
    # # Buscar películas recomendadas
    # statement_recomendaciones = (
    #     select(Pelicula)
    #     .where(
    #         or_(
    #             col(Pelicula.genero).in_(generos),
    #             col(Pelicula.director).in_(directores)
    #         ),
    #         Pelicula.id.notin_(ids_favoritos)
    #     )
    #     .limit(limit)
    # )
    # recomendaciones = session.exec(statement_recomendaciones).all()
    # return recomendaciones
    pass

