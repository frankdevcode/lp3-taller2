"""
Router de Películas.
Endpoints para gestionar películas en la plataforma.
"""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session, select, or_, col
from typing import List, Optional

from app.database import get_session
from app.models import Pelicula
router = APIRouter(prefix="/peliculas", tags=["peliculas"])


@router.post("/", response_model=PeliculaRead, status_code=status.HTTP_201_CREATED)
def create_pelicula(pelicula: PeliculaCreate, session: Session = Depends(get_session)):
    # Evitar duplicados por título y año
    statement = select(Pelicula).where(
        Pelicula.titulo == pelicula.titulo,
        Pelicula.año == pelicula.año
    )
    existing = session.exec(statement).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Ya existe una película con ese título y año")

    db_pelicula = Pelicula.from_orm(pelicula)
    session.add(db_pelicula)
    session.commit()
    session.refresh(db_pelicula)
    return db_pelicula


@router.get("/", response_model=List[PeliculaRead])
def read_peliculas(
    skip: int = 0,
    limit: int = 100,
    buscar: Optional[str] = Query(None, description="Buscar en título o director"),
    genero: Optional[str] = Query(None, description="Filtrar por género"),
    año: Optional[int] = Query(None, description="Filtrar por año"),
    session: Session = Depends(get_session)
):
    query = select(Pelicula)
    if buscar:
        query = query.where(
            or_(col(Pelicula.titulo).ilike(f"%{buscar}%"), col(Pelicula.director).ilike(f"%{buscar}%"))
        )
    if genero:
        query = query.where(Pelicula.genero == genero)
    if año:
        query = query.where(Pelicula.año == año)
    query = query.offset(skip).limit(limit)
    peliculas = session.exec(query).all()
    return peliculas


@router.get("/{pelicula_id}", response_model=PeliculaRead)
def read_pelicula(pelicula_id: int, session: Session = Depends(get_session)):
    pelicula = session.get(Pelicula, pelicula_id)
    if not pelicula:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Película no encontrada")
    return pelicula


@router.patch("/{pelicula_id}", response_model=PeliculaRead)
def update_pelicula(pelicula_id: int, pelicula: PeliculaUpdate, session: Session = Depends(get_session)):
    db_pelicula = session.get(Pelicula, pelicula_id)
    if not db_pelicula:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Película no encontrada")
    data = pelicula.model_dump(exclude_unset=True)
    for key, value in data.items():
        setattr(db_pelicula, key, value)
    session.add(db_pelicula)
    session.commit()
    session.refresh(db_pelicula)
    return db_pelicula


@router.delete("/{pelicula_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_pelicula(pelicula_id: int, session: Session = Depends(get_session)):
    pelicula = session.get(Pelicula, pelicula_id)
    if not pelicula:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Película no encontrada")
    session.delete(pelicula)
    session.commit()
    return None


@router.get("/buscar/", response_model=List[PeliculaRead])
def buscar_peliculas(
    titulo: Optional[str] = Query(None),
    director: Optional[str] = Query(None),
    genero: Optional[str] = Query(None),
    año: Optional[int] = Query(None),
    año_min: Optional[int] = Query(None),
    año_max: Optional[int] = Query(None),
    session: Session = Depends(get_session)
):
    statement = select(Pelicula)
    if titulo:
        statement = statement.where(col(Pelicula.titulo).ilike(f"%{titulo}%"))
    if director:
        statement = statement.where(col(Pelicula.director).ilike(f"%{director}%"))
    if genero:
        statement = statement.where(Pelicula.genero.ilike(f"%{genero}%"))
    if año:
        statement = statement.where(Pelicula.año == año)
    if año_min:
        statement = statement.where(Pelicula.año >= año_min)
    if año_max:
        statement = statement.where(Pelicula.año <= año_max)
    peliculas = session.exec(statement).all()
    return peliculas

