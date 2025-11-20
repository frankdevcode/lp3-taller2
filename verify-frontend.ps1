# Script de verificación - CineStream Frontend (Windows PowerShell)
# Uso: .\verify-frontend.ps1

Write-Host "🎬 CineStream - Frontend Verification Script" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

function Check-Mark($message) {
    Write-Host "✓ $message" -ForegroundColor Green
}

function Error-Mark($message) {
    Write-Host "✗ $message" -ForegroundColor Red
}

function Warning-Mark($message) {
    Write-Host "⚠ $message" -ForegroundColor Yellow
}

# Verificaciones
Write-Host "Verificando configuración..." -ForegroundColor Cyan
Write-Host ""

# 1. Node.js
try {
    $nodeVersion = node -v
    Check-Mark "Node.js instalado: $nodeVersion"
} catch {
    Error-Mark "Node.js no encontrado"
    exit 1
}

# 2. npm
try {
    $npmVersion = npm -v
    Check-Mark "npm instalado: $npmVersion"
} catch {
    Error-Mark "npm no encontrado"
    exit 1
}

# 3. Frontend dependencies
Write-Host ""
Write-Host "Verificando dependencias del frontend..." -ForegroundColor Cyan

if (Test-Path "frontend/node_modules") {
    Check-Mark "node_modules existe"
} else {
    Warning-Mark "node_modules no encontrado (ejecutar: npm install)"
}

# 4. Archivos clave
Write-Host ""
Write-Host "Verificando archivos de configuración..." -ForegroundColor Cyan

$files = @(
    "frontend/vite.config.ts",
    "frontend/tailwind.config.ts",
    "frontend/tsconfig.json",
    "frontend/src/main.tsx",
    "frontend/src/App.tsx",
    "frontend/.env"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Check-Mark $file
    } else {
        Error-Mark "$file no encontrado"
    }
}

# 5. Build test
Write-Host ""
Write-Host "Probando compilación..." -ForegroundColor Cyan

Push-Location frontend

$buildOutput = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Check-Mark "Build compilado exitosamente"
    
    # Check dist folder
    if (Test-Path "dist") {
        $distSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum
        $distSizeMB = [math]::Round($distSize / 1MB, 2)
        Check-Mark "Carpeta dist generada ($distSizeMB MB)"
    }
} else {
    Error-Mark "Error en la compilación"
    Pop-Location
    exit 1
}

# 6. Environment check
Write-Host ""
Write-Host "Verificando variables de entorno..." -ForegroundColor Cyan

if (Test-Path ".env") {
    $envContent = Get-Content ".env"
    if ($envContent -match "VITE_API_BASE") {
        Check-Mark "VITE_API_BASE configurado"
    } else {
        Warning-Mark "VITE_API_BASE no encontrado en .env"
    }
} else {
    Warning-Mark ".env no encontrado (usar .env.example)"
}

Pop-Location

# Summary
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "✓ Verificación completada" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. npm run dev          - Iniciar servidor de desarrollo" -ForegroundColor White
Write-Host "2. Abrir http://localhost:5173 en el navegador" -ForegroundColor White
Write-Host "3. Verificar que el backend corre en http://localhost:8000" -ForegroundColor White
Write-Host ""
Write-Host "¡Todo listo para usar! 🚀" -ForegroundColor Green
