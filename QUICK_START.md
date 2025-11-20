# 🚀 Guía Rápida de Inicio - CineStream

## ⚡ Inicio en 5 minutos

### 1. Backend
```bash
# En la raíz del proyecto
pip install -r requirements.txt
python main.py
```
Backend estará en: `http://localhost:8000`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend estará en: `http://localhost:5173`

---

## 📋 Stack Tecnológico

### Backend
- **FastAPI** - API moderna
- **SQLModel** - ORM/Validación
- **JWT** - Autenticación

### Frontend
- **React 18** - UI
- **Vite** - Build tool
- **React Router v6** - Rutas
- **TypeScript** - Tipos
- **Tailwind CSS** - Estilos

---

## 🎨 Características Principales

### ✅ Autenticación
- Login/Registro
- Rutas protegidas
- JWT tokens

### ✅ Películas
- Listar con paginación
- Búsqueda avanzada
- CRUD completo

### ✅ Favoritos
- Marcar/desmarcar
- Lista de favoritos

### ✅ Diseño
- Netflix-style
- Totalmente responsivo
- Tema oscuro

---

## 🔐 Variables de Entorno

### Frontend (`frontend/.env`)
```
VITE_API_BASE=http://localhost:8000/api
```

### Backend (`.env`)
```
DATABASE_URL=sqlite:///./database.db
SECRET_KEY=tu_clave_secreta
```

---

## 📊 Estructura

```
.
├── app/                # Backend FastAPI
├── frontend/           # React + Vite
│   ├── src/
│   │   ├── components/ # Componentes
│   │   ├── pages/      # Páginas
│   │   └── lib/        # Utilidades
│   └── vite.config.ts
├── main.py             # Backend entry
└── requirements.txt
```

---

## 🧪 Testing

### Crear cuenta
1. Ir a http://localhost:5173/register
2. Crear nueva cuenta
3. Login automático

### Buscar películas
1. Ir a "Explorar"
2. Buscar por título/director/género

### Favoritos
1. Desde cualquier película
2. Hacer click en el corazón
3. Ver en "Mis Favoritos"

---

## 📦 Build

### Frontend
```bash
cd frontend
npm run build
# Output en: dist/
```

### Docker
```bash
docker-compose up
```

---

## 🛠️ Troubleshooting

| Problema | Solución |
|----------|----------|
| CORS Error | Verificar `VITE_API_BASE` |
| Port ocupado | Cambiar puerto en config |
| npm install error | `npm cache clean --force` |
| Backend no responde | Verificar puerto 8000 |

---

## 📚 Documentación

- **API Swagger**: http://localhost:8000/docs
- **Validación Report**: `VALIDATION_REPORT.md`
- **Frontend Guide**: `frontend/README.md`

---

## 🎯 Próximos Pasos

- [ ] Agregar más filtros de búsqueda
- [ ] Sistema de recomendaciones
- [ ] Integrar gráficos
- [ ] Tests E2E
- [ ] Deploy a producción

---

**¡Listo para usar!** 🎉
