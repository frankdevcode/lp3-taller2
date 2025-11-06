"""
Paquete de routers de la API.
Importa y expone los routers para que `main.py` pueda incluirlos.
"""

from .usuarios import router as usuarios
from .peliculas import router as peliculas
from .favoritos import router as favoritos

__all__ = ["usuarios", "peliculas", "favoritos"]

