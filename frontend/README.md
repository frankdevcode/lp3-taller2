# CineStream Frontend

Frontend moderno y elegante para la plataforma de películas CineStream, construido con React + Vite.

## 🚀 Características

- **React 18** con Hooks y Context API
- **Vite** para desarrollo rápido y builds optimizados
- **React Router v6** para navegación moderna
- **Tailwind CSS** para estilos modernos y responsivos
- **TypeScript** para seguridad de tipos
- **Tema oscuro profesional** inspirado en Netflix
- **Componentes reutilizables** y bien estructurados
- **Autenticación con JWT** integrada
- **API integrada** con el backend FastAPI
- **Diseño responsivo** (mobile, tablet, desktop)

## 📋 Requisitos

- Node.js 16+ (recomendado 18 o superior)
- npm o yarn

## ⚙️ Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu configuración local
```

## 🏃 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### Variables de Entorno

```env
VITE_API_BASE=http://localhost:8000/api
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Barra de navegación
│   │   ├── Footer.tsx         # Pie de página
│   │   └── Layout.tsx         # Layout principal
│   ├── movies/
│   │   └── MovieCard.tsx      # Tarjeta de película
│   └── ...
├── pages/
│   ├── HomePage.tsx           # Página de inicio
│   ├── LoginPage.tsx          # Login
│   ├── RegisterPage.tsx       # Registro
│   ├── SearchPage.tsx         # Búsqueda de películas
│   ├── ProfilePage.tsx        # Perfil del usuario
│   ├── MoviesPage.tsx         # Catálogo de películas
│   ├── FavoritesPage.tsx      # Películas favoritas
│   └── NotFoundPage.tsx       # Página 404
├── lib/
│   ├── api-client.ts          # Cliente API
│   └── auth-context.tsx       # Contexto de autenticación
├── App.tsx                    # Componente raíz con rutas
├── main.tsx                   # Entrada de la aplicación
└── index.css                  # Estilos globales
```

## 🎨 Diseño

El diseño sigue una estructura moderna y elegante:

- **Tema oscuro profesional** (inspirado en Netflix)
- **Colores consistentes**: Primario (Rojo/Naranja), Secundario (Azul)
- **Tipografía clara** y legible
- **Espaciado consistente** siguiendo un sistema de grid
- **Animaciones suaves** para mejor UX
- **Componentes accesibles** con atributos ARIA

## 🔐 Autenticación

- Sistema de login/registro
- Tokens JWT almacenados en localStorage
- Context API para gestión del estado de autenticación
- Rutas protegidas que requieren autenticación

## 📝 Páginas Principales

### 🏠 Página de Inicio
- Hero section atractivo
- Películas destacadas
- Estrenos recientes
- Estadísticas de contenido

### 🔍 Búsqueda
- Búsqueda por título
- Filtro por director
- Filtro por género
- Resultados dinámicos

### 🎬 Catálogo
- Grid de películas paginado
- Carga infinita con "Cargar Más"
- Información detallada de cada película
- Botón de favoritos

### ❤️ Favoritos
- Lista de películas marcadas como favoritas
- Gestión fácil de favoritos

## 🛠️ Construcción para Producción

```bash
# Build
npm run build

# El output estará en /dist
```

## 📦 Dependencias Principales

- `react` - Librería de UI
- `react-dom` - Renderización en DOM
- `react-router-dom` - Enrutamiento
- `axios` - Cliente HTTP (opcional, usamos fetch)
- `lucide-react` - Iconos
- `tailwindcss` - Framework de CSS
- `typescript` - Seguridad de tipos
- `vite` - Build tool

## 🚀 Performance

- Tree-shaking automático
- Code splitting por rutas
- Lazy loading de componentes
- Optimizaciones de Vite
- Assets optimizados

## 🔧 Configuración

### Tailwind CSS
- Configurado en `tailwind.config.ts`
- Sistema de colores personalizado
- Temas oscuros soportados

### TypeScript
- Configurado en `tsconfig.json`
- Strict mode habilitado
- JSX Automatic Runtime

### Vite
- Configurado en `vite.config.ts`
- Path alias para imports (`@/*`)
- Proxy API para desarrollo

## 📱 Responsividad

El diseño es totalmente responsivo:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🐛 Desarrollo

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

## 📚 API Integration

El cliente API está centralizado en `src/lib/api-client.ts` con funciones para:
- Autenticación (login, register, me)
- Películas (get, search, create, update, delete)
- Favoritos (get, add, delete)
- Estadísticas (top, recent, by genre)
- Usuarios (get, create, update, delete)

## 🤝 Contribuir

1. Crear una rama para tu feature
2. Hacer commits descriptivos
3. Push a la rama
4. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 📞 Soporte

Para soporte, crear un issue en el repositorio.

---

**Hecho con ❤️ para amantes del cine**
