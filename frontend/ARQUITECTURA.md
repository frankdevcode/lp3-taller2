# CineStream - Arquitectura del Frontend

## Descripción General

CineStream es una aplicación de streaming de películas moderna, elegante y minimalista, construida con **Next.js 16**, **React 19** y **Tailwind CSS v4**. La aplicación consume endpoints de una API REST backend implementada en FastAPI.

---

## Stack Tecnológico

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **UI:** shadcn/ui + Tailwind CSS v4
- **Estado:** SWR para data fetching + Context API para autenticación
- **Autenticación:** JWT Token (almacenado en localStorage)
- **API Client:** Fetch API nativa con wrapper personalizado

---

## Estructura de Carpetas

\`\`\`
src/
├── app/
│   ├── layout.tsx                    # Layout root con metadata y providers
│   ├── globals.css                   # Tokens de diseño y estilos globales
│   ├── page.tsx                      # Página de inicio
│   ├── (auth)/
│   │   ├── login/page.tsx            # Página de login
│   │   └── register/page.tsx         # Página de registro
│   ├── movies/
│   │   └── [id]/page.tsx             # Página de detalles de película
│   ├── search/
│   │   └── page.tsx                  # Página de búsqueda y filtros
│   ├── profile/
│   │   └── page.tsx                  # Perfil de usuario
│   ├── error.tsx                     # Página de error
│   └── not-found.tsx                 # Página 404
│
├── components/
│   ├── ui/                           # Componentes shadcn base
│   │   ├── button.tsx
│   │   ├── loader.tsx
│   │   └── ... otros componentes
│   │
│   ├── layout/
│   │   ├── header.tsx                # Navegación superior
│   │   └── footer.tsx                # Pie de página
│   │
│   ├── movies/
│   │   ├── movie-card.tsx            # Tarjeta individual de película
│   │   ├── movie-grid.tsx            # Grid de películas
│   │   └── movie-carousel.tsx        # Carrusel de películas
│   │
│   ├── home/
│   │   ├── hero-section.tsx          # Sección hero destacada
│   │   ├── movie-carousel.tsx        # Carruseles de películas
│   │   └── movie-grid.tsx            # Grid de todas las películas
│   │
│   └── search/
│       ├── search-form.tsx           # Formulario de búsqueda
│       └── filter-panel.tsx          # Panel de filtros
│
├── lib/
│   ├── auth-context.tsx              # Context de autenticación con JWT
│   ├── api-client.ts                 # Cliente API centralizado
│   └── utils.ts                      # Funciones utilitarias
│
└── types/
    └── index.ts                      # TypeScript interfaces globales
\`\`\`

---

## Paleta de Colores

### Tokens de Diseño

| Token | Valor | Uso |
|-------|-------|-----|
| `--background` | `#0a0a0a` | Fondo principal (negro profundo) |
| `--foreground` | `#ffffff` | Texto principal |
| `--card` | `#1a1a1a` | Fondo de tarjetas |
| `--card-hover` | `#2d2d2d` | Hover en tarjetas |
| `--primary` | `#dc2626` | Botones, acciones, acentos (rojo Netflix) |
| `--primary-hover` | `#b91c1c` | Hover en botones primarios |
| `--secondary` | `#6366f1` | Acciones secundarias (índigo) |
| `--muted` | `#a0a0a0` | Texto secundario |
| `--border` | `#333333` | Bordes |

### Tipografía

- **Heading Font:** Geist (Sans-serif moderna)
- **Body Font:** Geist (misma para minimalismo)
- **Tamaños:** 12px → 48px según Tailwind scale

---

## Componentes Principales

### Layout
- **Header:** Navegación responsiva con logo, menú y cuenta de usuario
- **Footer:** Enlaces, información legal y redes sociales

### Películas
- **MovieCard:** Tarjeta con hover effects, botón de favoritos y información
- **MovieCarousel:** Carrusel horizontal con scroll smooth y botones de navegación
- **MovieGrid:** Grid responsivo de películas con paginación

### Autenticación
- **LoginForm:** Formulario de login con validación y manejo de errores
- **RegisterForm:** Formulario de registro con confirmación de contraseña
- **AuthContext:** Context global para estado de usuario y token JWT

### Búsqueda
- **SearchForm:** Búsqueda con campo de entrada y autoclear
- **FilterPanel:** Filtros por género, año y director

---

## Endpoints Integrados

### Autenticación
\`\`\`
POST   /auth/register          # Registrar usuario
POST   /auth/login             # Login (form-data)
GET    /auth/me                # Obtener usuario actual
\`\`\`

### Películas
\`\`\`
GET    /peliculas              # Listar películas (skip, limit, filtros)
GET    /peliculas/{id}         # Obtener película por ID
GET    /peliculas/buscar       # Búsqueda avanzada
\`\`\`

### Favoritos
\`\`\`
POST   /usuarios/{id}/favoritos/{movie_id}     # Agregar favorito
DELETE /favoritos/{favorito_id}                # Eliminar favorito
GET    /usuarios/{id}/favoritos                # Obtener favoritos
\`\`\`

### Estadísticas
\`\`\`
GET    /estadisticas/resumen               # Resumen general
GET    /estadisticas/generos               # Lista de géneros
GET    /estadisticas/peliculas/top-populares    # Top películas
GET    /estadisticas/peliculas/recientes       # Películas recientes
\`\`\`

---

## Flujo de Autenticación

1. **Registro:** Usuario completa formulario → POST `/auth/register` → Auto-login
2. **Login:** Credenciales → POST `/auth/login` → Recibe `access_token`
3. **Almacenamiento:** Token guardado en `localStorage`
4. **Validación:** GET `/auth/me` al cargar la app
5. **Requests:** Token enviado en header `Authorization: Bearer <token>`
6. **Logout:** Limpia token y contexto

---

## Gestión de Estado

### Context API (Autenticación)
\`\`\`typescript
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (correo: string, password: string) => Promise<void>;
  register: (correo: string, password: string) => Promise<void>;
  logout: () => void;
}
\`\`\`

### Datos de Películas
- Fetching con `useEffect` + setState en componentes
- Datos cacheados localmente en estado
- Paginación manejada manualmente

---

## Buenas Prácticas Implementadas

✅ **Performance:**
- Lazy loading de imágenes con Next.js Image
- Componentes memoizados donde corresponde
- Carrusel con scroll smooth nativo
- Paginación server-side

✅ **Accesibilidad:**
- Semántica HTML correcta (header, main, footer)
- ARIA labels en botones interactivos
- Contraste de colores WCAG AA+
- Navegación por teclado

✅ **Seguridad:**
- JWT para autenticación
- Headers de autorización en requests protegidos
- Validación en cliente (formularios)
- Manejo seguro de tokens en localStorage

✅ **UX/UI:**
- Dark mode por defecto
- Transiciones suaves (200ms)
- Estados de loading y error
- Hover effects y feedback visual
- Responsive mobile-first

✅ **Código:**
- TypeScript strict mode
- Componentes pequeños y reutilizables
- API client centralizado
- Manejo de errores consistente
- Código comentado donde es necesario

---

## Escalabilidad Futura

### Mejoras Sugeridas
1. **State Management:** Implementar Zustand o Redux para estado más complejo
2. **Caché:** SWR para data fetching automático y sincronización
3. **Pruebas:** Jest + React Testing Library
4. **CI/CD:** GitHub Actions para testing y deploy a Vercel
5. **Monitoring:** Sentry para error tracking
6. **Analytics:** Google Analytics o Mixpanel
7. **Video Player:** Implementar reproductor real (HLS, DASH)
8. **Recomendaciones:** ML-powered recommendations basadas en favoritos

---

## Variables de Entorno

\`\`\`env
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
\`\`\`

---

## Instrucciones de Instalación

### Opción 1: CLI de shadcn
\`\`\`bash
npx shadcn-cli@latest init -d
npx shadcn-cli@latest add button
npx shadcn-cli@latest add card
# ... más componentes
\`\`\`

### Opción 2: Clonar desde GitHub
\`\`\`bash
git clone <repo-url>
cd cinestream
npm install
npm run dev
\`\`\`

### Opción 3: Descargar ZIP
1. Descarga el proyecto desde v0.app
2. Descomprime y abre en tu editor
3. Ejecuta `npm install` y `npm run dev`

---

## Scripts Disponibles

\`\`\`bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
npm start            # Inicia servidor de producción
npm run lint         # Valida código con ESLint
\`\`\`

---

## Deployment

### Vercel (Recomendado)
\`\`\`bash
npm install -g vercel
vercel
# Sigue los pasos interactivos
\`\`\`

### Configuración Vercel
1. Conecta repositorio GitHub
2. Agrega variable de entorno `NEXT_PUBLIC_API_BASE_URL`
3. Deploy automático en cada push

---

## Soporte y Contribuciones

Para reportar bugs o sugerir mejoras, abre un issue en el repositorio.

---

**Versión:** 1.0.0  
**Última actualización:** 2025-11-19
