FROM python:3.11-slim

# Establecer directorio de trabajo
WORKDIR /app

# Copiar dependencias primero para aprovechar cache de Docker
COPY requirements.txt ./

# Instalar dependencias
RUN python -m pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY . /app

# Exponer el puerto que usa Uvicorn
EXPOSE 8000

# Comando por defecto
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
