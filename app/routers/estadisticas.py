"""
Router de Estadísticas.
Endpoints para obtener estadísticas y reportes de la plataforma.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select, func, desc
from typing import List, Dict, Any
from collections import defaultdict

from app.database import get_session
from app.models import Pelicula, Usuario, Favorito
from app.schemas import PeliculaRead, UsuarioRead

router = APIRouter(prefix="/estadisticas", tags=["estadisticas"])


@router.get("/resumen", response_model=Dict[str, Any])
def obtener_resumen(session: Session = Depends(get_session)):
    """Obtiene resumen general de la plataforma"""
    total_usuarios = session.query(Usuario).count()
    total_peliculas = session.query(Pelicula).count()
    total_favoritos = session.query(Favorito).count()
    
    # Película más popular (más favoritos)
    pelicula_popular = session.query(
        Pelicula.id,
        Pelicula.titulo,
        func.count(Favorito.id).label('count_favoritos')
    ).outerjoin(Favorito).group_by(Pelicula.id).order_by(desc('count_favoritos')).first()
    
    pelicula_mas_popular = None
    if pelicula_popular:
        pelicula_mas_popular = {
            "id": pelicula_popular[0],
            "titulo": pelicula_popular[1],
            "favoritos": pelicula_popular[2] or 0
        }
    
    return {
        "total_usuarios": total_usuarios,
        "total_peliculas": total_peliculas,
        "total_favoritos": total_favoritos,
        "pelicula_mas_popular": pelicula_mas_popular
    }


@router.get("/peliculas/por-genero", response_model=Dict[str, int])
def peliculas_por_genero(session: Session = Depends(get_session)):
    """Distribución de películas por género"""
    query = session.query(
        Pelicula.genero,
        func.count(Pelicula.id).label('cantidad')
    ).group_by(Pelicula.genero).all()
    
    resultado = {item[0]: item[1] for item in query if item[0]}
    return resultado


@router.get("/peliculas/por-clasificacion", response_model=Dict[str, int])
def peliculas_por_clasificacion(session: Session = Depends(get_session)):
    """Distribución de películas por clasificación (G, PG, PG-13, R)"""
    query = session.query(
        Pelicula.clasificacion,
        func.count(Pelicula.id).label('cantidad')
    ).group_by(Pelicula.clasificacion).all()
    
    resultado = {item[0]: item[1] for item in query if item[0]}
    return resultado


@router.get("/peliculas/top-populares", response_model=List[Dict[str, Any]])
def top_peliculas_populares(limit: int = 10, session: Session = Depends(get_session)):
    """Top películas más populares (por cantidad de favoritos)"""
    query = session.query(
        Pelicula.id,
        Pelicula.titulo,
        Pelicula.director,
        Pelicula.año,
        func.count(Favorito.id).label('count_favoritos')
    ).outerjoin(Favorito).group_by(Pelicula.id).order_by(desc('count_favoritos')).limit(limit).all()
    
    resultado = [
        {
            "id": item[0],
            "titulo": item[1],
            "director": item[2],
            "año": item[3],
            "favoritos": item[4] or 0
        }
        for item in query
    ]
    return resultado


@router.get("/peliculas/recientes", response_model=List[Dict[str, Any]])
def peliculas_recientes(limit: int = 10, session: Session = Depends(get_session)):
    """Películas agregadas recientemente"""
    query = session.query(
        Pelicula.id,
        Pelicula.titulo,
        Pelicula.director,
        Pelicula.año,
        Pelicula.genero
    ).order_by(desc(Pelicula.id)).limit(limit).all()
    
    resultado = [
        {
            "id": item[0],
            "titulo": item[1],
            "director": item[2],
            "año": item[3],
            "genero": item[4]
        }
        for item in query
    ]
    return resultado


@router.get("/usuarios/mas-activos", response_model=List[Dict[str, Any]])
def usuarios_mas_activos(limit: int = 10, session: Session = Depends(get_session)):
    """Usuarios más activos (con más favoritos marcados)"""
    query = session.query(
        Usuario.id,
        Usuario.correo,
        func.count(Favorito.id).label('count_favoritos')
    ).outerjoin(Favorito).group_by(Usuario.id).order_by(desc('count_favoritos')).limit(limit).all()
    
    resultado = [
        {
            "id": item[0],
            "correo": item[1],
            "favoritos_count": item[2] or 0
        }
        for item in query
    ]
    return resultado


@router.get("/generos", response_model=List[str])
def obtener_generos(session: Session = Depends(get_session)):
    """Lista de géneros únicos disponibles"""
    query = session.query(Pelicula.genero).distinct().filter(Pelicula.genero != None).all()
    return [item[0] for item in query]


@router.get("/clasificaciones", response_model=List[str])
def obtener_clasificaciones(session: Session = Depends(get_session)):
    """Lista de clasificaciones únicas disponibles"""
    query = session.query(Pelicula.clasificacion).distinct().filter(Pelicula.clasificacion != None).all()
    return [item[0] for item in query]


@router.get("/directors", response_model=List[str])
def obtener_directores(session: Session = Depends(get_session)):
    """Lista de directores únicos disponibles"""
    query = session.query(Pelicula.director).distinct().filter(Pelicula.director != None).all()
    return [item[0] for item in query]
