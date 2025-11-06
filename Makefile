# Makefile: objetivos comunes para el desarrollo
# Nota: en Windows puedes usar `make` desde WSL o instalar una utilidad make.

.PHONY: help init-db run test lint docker-build docker-up

help:
	@echo "Makefile targets:"
	@echo "  init-db      - inicializar la base de datos desde scripts/init_db.py"
	@echo "  run          - ejecutar la API (uvicorn)"
	@echo "  test         - ejecutar pytest"
	@echo "  lint         - ejecutar ruff"
	@echo "  docker-build - construir imagen Docker"
	@echo "  docker-up    - levantar servicios con docker-compose"

init-db:
	@python -m scripts.init_db

run:
	@uvicorn main:app --reload --port 8000

test:
	@pytest -q

lint:
	@ruff check .

docker-build:
	@docker build -t lp3-taller2:latest .

docker-up:
	@docker-compose up --build
