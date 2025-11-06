"""Script de inicialización de la base de datos.

Ejecuta el archivo `init_db.sql` contra una base de datos SQLite.
Uso:
    python scripts/init_db.py --db peliculas.db --sql init_db.sql

"""
from pathlib import Path
import sqlite3
import argparse


def init_db(db_path: str = "peliculas.db", sql_path: str = "init_db.sql") -> None:
    sql_file = Path(sql_path)
    if not sql_file.exists():
        raise FileNotFoundError(f"Archivo SQL no encontrado: {sql_file}")

    db_file = Path(db_path)
    db_file.parent.mkdir(parents=True, exist_ok=True)

    sql = sql_file.read_text(encoding="utf-8")
    conn = sqlite3.connect(str(db_file))
    try:
        with conn:
            conn.executescript(sql)
        print(f"Base de datos inicializada en: {db_file}")
    finally:
        conn.close()


def main():
    parser = argparse.ArgumentParser(description="Inicializar la base de datos SQLite con un script SQL")
    parser.add_argument("--db", default="peliculas.db", help="Ruta al archivo de la base de datos SQLite")
    parser.add_argument("--sql", default="init_db.sql", help="Ruta al archivo SQL con la definición y seed")
    args = parser.parse_args()
    init_db(db_path=args.db, sql_path=args.sql)


if __name__ == "__main__":
    main()
