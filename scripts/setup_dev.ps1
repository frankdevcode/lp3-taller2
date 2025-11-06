# PowerShell script to setup development environment on Windows
# Usage: Open PowerShell as administrator (or normal) and run: .\scripts\setup_dev.ps1

param()

Write-Host "Creating virtual environment .venv..."
python -m venv .venv

Write-Host "Activating virtual environment and installing dependencies..."
# Activate and install
. .\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt

Write-Host "Initializing database (creates peliculas.db)..."
# Initialize DB using script if available
python -m scripts.init_db --db peliculas.db --sql init_db.sql

Write-Host "Running tests to verify setup..."
python -m pytest -q

Write-Host "Setup complete. To run the app: .venv\Scripts\python.exe -m uvicorn main:app --reload"
