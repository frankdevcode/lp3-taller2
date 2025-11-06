"""
Módulo de utilidades para la aplicación.
Contiene funciones auxiliares utilizadas en diferentes partes de la aplicación.
"""
import re
from datetime import datetime

def validar_correo(correo):
    """
    Valida que un correo electrónico tenga un formato válido.
    
    Args:
        correo (str): Correo electrónico a validar
        
    Returns:
        bool: True si el correo es válido, False en caso contrario
    """
    # Expresión regular básica para validar correos
    patron = r"^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$"
    return bool(re.match(patron, correo))

def formatear_duracion(minutos):
    """
    Convierte una duración en minutos a formato hh:mm
    
    Args:
        minutos (int): Duración en minutos
        
    Returns:
        str: Duración formateada como hh:mm
    """
    if minutos is None:
        return "00:00"
    try:
        minutos = int(minutos)
    except (TypeError, ValueError):
        return "00:00"
    horas = minutos // 60
    mins = minutos % 60
    return f"{horas:02d}:{mins:02d}"

def generar_slug(texto):
    """
    Genera un slug a partir de un texto.
    Un slug es una versión de texto amigable para URLs.
    
    Args:
        texto (str): Texto a convertir en slug
        
    Returns:
        str: Slug generado
    """
    if not texto:
        return ""
    slug = texto.lower()
    # reemplazar espacios y guiones por guiones simples
    slug = re.sub(r"[\s_]+", "-", slug)
    # eliminar caracteres no alfanuméricos ni guiones
    slug = re.sub(r"[^a-z0-9-]", "", slug)
    # reemplazar múltiples guiones
    slug = re.sub(r"-+", "-", slug)
    # trim
    slug = slug.strip("-")
    return slug

def obtener_año_actual():
    """
    Obtiene el año actual.
    
    Returns:
        int: Año actual
    """
    return datetime.utcnow().year

def validar_año(año):
    """
    Valida que un año sea válido (no futuro y no muy antiguo).
    
    Args:
        año (int): Año a validar
        
    Returns:
        bool: True si el año es válido, False en caso contrario
    """
    año_actual = obtener_año_actual()
    return 1900 <= año <= año_actual

