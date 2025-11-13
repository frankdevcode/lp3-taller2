#!/usr/bin/env python
"""Script para poblar la base de datos con datos iniciales"""

import sys
sys.path.insert(0, 'c:\\lp3-taller2')

from sqlmodel import Session
from app.models import Usuario, Pelicula, Favorito
from app.database import engine, create_db_and_tables
from app.security import get_password_hash

# Crear tablas
create_db_and_tables()

with Session(engine) as session:
    # Verificar si ya hay datos
    usuarios_count = session.query(Usuario).count()
    if usuarios_count > 0:
        print("La base de datos ya contiene datos. No se insertarán datos duplicados.")
        sys.exit(0)
    
    print("Insertando usuarios...")
    usuarios = [
        Usuario(correo="admin@cinelab.com", contraseña_hash=get_password_hash("admin123")),
        Usuario(correo="usuario1@cinelab.com", contraseña_hash=get_password_hash("pass123")),
        Usuario(correo="usuario2@cinelab.com", contraseña_hash=get_password_hash("pass123")),
    ]
    session.add_all(usuarios)
    session.commit()
    
    print("Insertando películas...")
    peliculas = [
        Pelicula(
            titulo="El Padrino",
            director="Francis Ford Coppola",
            genero="Drama",
            año=1972,
            duracion=175,
            clasificacion="R",
            sinopsis="La historia de la familia mafiosa más poderosa de Nueva York."
        ),
        Pelicula(
            titulo="Inception",
            director="Christopher Nolan",
            genero="Ciencia Ficción",
            año=2010,
            duracion=148,
            clasificacion="PG-13",
            sinopsis="Un ladrón que roba secretos corporativos a través de la tecnología de sueños compartidos."
        ),
        Pelicula(
            titulo="Forrest Gump",
            director="Robert Zemeckis",
            genero="Drama",
            año=1994,
            duracion=142,
            clasificacion="PG",
            sinopsis="La vida de Forrest Gump, un hombre con un bajo coeficiente intelectual que logra cosas extraordinarias."
        ),
        Pelicula(
            titulo="Interstellar",
            director="Christopher Nolan",
            genero="Ciencia Ficción",
            año=2014,
            duracion=169,
            clasificacion="PG-13",
            sinopsis="Un equipo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad."
        ),
        Pelicula(
            titulo="Avatar",
            director="James Cameron",
            genero="Ciencia Ficción",
            año=2009,
            duracion=162,
            clasificacion="PG-13",
            sinopsis="Un soldado paralítico es enviado a un planeta alienígena con un cuerpo avatar."
        ),
        Pelicula(
            titulo="Titanic",
            director="James Cameron",
            genero="Romance",
            año=1997,
            duracion=194,
            clasificacion="PG-13",
            sinopsis="La historia del romance entre dos pasajeros de diferentes clases sociales en el Titanic."
        ),
        Pelicula(
            titulo="Pulp Fiction",
            director="Quentin Tarantino",
            genero="Crimen",
            año=1994,
            duracion=154,
            clasificacion="R",
            sinopsis="Historias entrelazadas de criminales, gansters, boxeadores y sus esposas."
        ),
        Pelicula(
            titulo="Gladiador",
            director="Ridley Scott",
            genero="Acción",
            año=2000,
            duracion=155,
            clasificacion="R",
            sinopsis="Un general romano falsamente acusado es vendido como esclavo y se convierte en gladiador."
        ),
        Pelicula(
            titulo="Matrix",
            director="The Wachowskis",
            genero="Ciencia Ficción",
            año=1999,
            duracion=136,
            clasificacion="R",
            sinopsis="Un hacker descubre que su realidad es una simulación creada por máquinas inteligentes."
        ),
        Pelicula(
            titulo="Toy Story",
            director="John Lasseter",
            genero="Animación",
            año=1995,
            duracion=81,
            clasificacion="G",
            sinopsis="Los juguetes cobran vida cuando no hay humanos cerca y deben rescindir sus diferencias."
        ),
        Pelicula(
            titulo="El Señor de los Anillos: La Comunidad del Anillo",
            director="Peter Jackson",
            genero="Fantasía",
            año=2001,
            duracion=178,
            clasificacion="PG-13",
            sinopsis="Un hobbit debe destruir un anillo mágico malévolo en una épica aventura."
        ),
        Pelicula(
            titulo="Jurassic Park",
            director="Steven Spielberg",
            genero="Aventura",
            año=1993,
            duracion=127,
            clasificacion="PG-13",
            sinopsis="Un parque temático de dinosaurios clonados sale de control."
        ),
        Pelicula(
            titulo="The Dark Knight",
            director="Christopher Nolan",
            genero="Acción",
            año=2008,
            duracion=152,
            clasificacion="PG-13",
            sinopsis="Batman enfrenta el Joker, un criminal psicópata que quiere crear caos en Gotham."
        ),
        Pelicula(
            titulo="Atrápame si puedes",
            director="Steven Spielberg",
            genero="Thriller",
            año=2002,
            duracion=141,
            clasificacion="PG-13",
            sinopsis="Un agente del FBI persigue a un estafador de cheques."
        ),
        Pelicula(
            titulo="Piratas del Caribe: La Maldición de la Perla Negra",
            director="Gore Verbinski",
            genero="Aventura",
            año=2003,
            duracion=143,
            clasificacion="PG-13",
            sinopsis="Un pirata excéntrico se ve envuelto en una aventura de tesoros y maldiciones."
        ),
        Pelicula(
            titulo="El Gran Gatsby",
            director="Baz Luhrmann",
            genero="Romance",
            año=2013,
            duracion=143,
            clasificacion="PG-13",
            sinopsis="La historia del misterioso millonario Jay Gatsby y su obsesión por su antiguo amor."
        ),
    ]
    session.add_all(peliculas)
    session.commit()
    
    print("Insertando favoritos...")
    favoritos = [
        Favorito(id_usuario=1, id_pelicula=1),
        Favorito(id_usuario=1, id_pelicula=2),
        Favorito(id_usuario=1, id_pelicula=3),
        Favorito(id_usuario=2, id_pelicula=2),
        Favorito(id_usuario=2, id_pelicula=4),
        Favorito(id_usuario=2, id_pelicula=5),
        Favorito(id_usuario=3, id_pelicula=1),
        Favorito(id_usuario=3, id_pelicula=6),
        Favorito(id_usuario=3, id_pelicula=7),
    ]
    session.add_all(favoritos)
    session.commit()
    
    print("✅ Datos insertados exitosamente!")
    print(f"  - {len(usuarios)} usuarios")
    print(f"  - {len(peliculas)} películas")
    print(f"  - {len(favoritos)} favoritos")
