#!/bin/bash
# Script de verificación - CineStream Frontend

echo "🎬 CineStream - Frontend Verification Script"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_mark() {
    echo -e "${GREEN}✓${NC} $1"
}

error_mark() {
    echo -e "${RED}✗${NC} $1"
}

warning_mark() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Verificaciones
echo "Verificando configuración..."
echo ""

# 1. Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    check_mark "Node.js instalado: $NODE_VERSION"
else
    error_mark "Node.js no encontrado"
    exit 1
fi

# 2. npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    check_mark "npm instalado: $NPM_VERSION"
else
    error_mark "npm no encontrado"
    exit 1
fi

# 3. Frontend dependencies
echo ""
echo "Verificando dependencias del frontend..."
if [ -d "frontend/node_modules" ]; then
    check_mark "node_modules existe"
else
    warning_mark "node_modules no encontrado (ejecutar: npm install)"
fi

# 4. Archivos clave
echo ""
echo "Verificando archivos de configuración..."

FILES=(
    "frontend/vite.config.ts"
    "frontend/tailwind.config.ts"
    "frontend/tsconfig.json"
    "frontend/src/main.tsx"
    "frontend/src/App.tsx"
    "frontend/.env"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        check_mark "$file"
    else
        error_mark "$file no encontrado"
    fi
done

# 5. Build test
echo ""
echo "Probando compilación..."
cd frontend
if npm run build > /dev/null 2>&1; then
    check_mark "Build compilado exitosamente"
    
    # Check dist folder
    if [ -d "dist" ]; then
        SIZE=$(du -sh dist | cut -f1)
        check_mark "Carpeta dist generada ($SIZE)"
    fi
else
    error_mark "Error en la compilación"
    exit 1
fi

# 6. Environment check
echo ""
echo "Verificando variables de entorno..."
if [ -f ".env" ]; then
    if grep -q "VITE_API_BASE" .env; then
        check_mark "VITE_API_BASE configurado"
    else
        warning_mark "VITE_API_BASE no encontrado en .env"
    fi
else
    warning_mark ".env no encontrado (usar .env.example)"
fi

# Summary
echo ""
echo "=============================================="
echo -e "${GREEN}✓ Verificación completada${NC}"
echo ""
echo "Próximos pasos:"
echo "1. npm run dev          - Iniciar servidor de desarrollo"
echo "2. Abrir http://localhost:5173 en el navegador"
echo "3. Verificar que el backend corre en http://localhost:8000"
echo ""
echo "¡Todo listo para usar! 🚀"
