# 📍 Guía de Navegación - CineStream

## 🗺️ Mapa de Rutas de la Aplicación

### Rutas Públicas (Sin Autenticación)

#### `/` - Landing Page
- **Descripción**: Página de bienvenida principal
- **Acceso**: Cualquier usuario sin autenticarse
- **Contenido**:
  - Hero section atractivo
  - 6 características destacadas
  - Estadísticas de la plataforma
  - CTA para registrarse o iniciar sesión
  - Footer con información

#### `/login` - Iniciar Sesión
- **Descripción**: Formulario de login
- **Acceso**: Usuarios sin autenticarse
- **Campos**:
  - Email
  - Contraseña
- **Redirección**: Al `/home` después de iniciar sesión

#### `/register` - Registrarse
- **Descripción**: Formulario de registro
- **Acceso**: Usuarios sin autenticarse
- **Campos**:
  - Email
  - Contraseña
  - Confirmación de contraseña
- **Redirección**: Autenticación automática y al `/home`

---

### Rutas Protegidas (Con Autenticación)

#### `/home` - Página Principal
- **Descripción**: Dashboard principal para usuarios autenticados
- **Acceso**: Solo usuarios autenticados
- **Contenido**:
  - Hero section personalizado
  - 3 cards estadísticas
  - 12 películas destacadas
  - 12 estrenos recientes
  - Estados de carga y error
- **Navegación**: Header con acceso a todas las secciones

#### `/search` - Explorar Películas
- **Descripción**: Búsqueda avanzada de películas
- **Acceso**: Solo usuarios autenticados
- **Funcionalidades**:
  - Filtrar por título
  - Filtrar por director
  - Filtrar por género
  - Mostrar resultados en grid
- **Búsqueda**: En tiempo real

#### `/movies` - Catálogo Completo
- **Descripción**: Listado de todas las películas
- **Acceso**: Solo usuarios autenticados
- **Funcionalidades**:
  - Paginación (20 por página)
  - Botón "Cargar Más"
  - Infinite scroll

#### `/favorites` - Películas Favoritas
- **Descripción**: Listado de películas marcadas como favoritas
- **Acceso**: Solo usuarios autenticados
- **Funcionalidades**:
  - Ver solo favoritos propios
  - Botón para eliminar de favoritos

#### `/profile` - Mi Perfil
- **Descripción**: Información y configuración del perfil
- **Acceso**: Solo usuarios autenticados
- **Funcionalidades**:
  - Ver información personal
  - Editar perfil (próximo)
  - Cambiar contraseña (próximo)

#### `/404` - Página No Encontrada
- **Descripción**: Página de error 404
- **Acceso**: Cualquier ruta no definida
- **Contenido**:
  - Icono de error
  - Mensaje descriptivo
  - Link para volver al inicio

---

## 🧭 Flujos de Navegación

### 1. Flujo de Nuevo Usuario

```
Landing Page (/)
    ↓
    [Click "Comenzar Ahora"]
    ↓
Register Page (/register)
    ↓
    [Llenar formulario]
    ↓
    [Click "Registrarse"]
    ↓
Autenticación ✅
    ↓
Home Page (/home) ← Redirige automáticamente
```

### 2. Flujo de Usuario Existente

```
Landing Page (/)
    ↓
    [Click "Tengo Cuenta"]
    ↓
Login Page (/login)
    ↓
    [Ingresar credenciales]
    ↓
    [Click "Iniciar Sesión"]
    ↓
Autenticación ✅
    ↓
Home Page (/home) ← Redirige automáticamente
```

### 3. Flujo de Exploración

```
Home Page (/home)
    ├── [Click Logo] → Home (/home)
    ├── [Click "Inicio"] → Home (/home)
    ├── [Click Icono Buscar] → Search (/search)
    ├── [Click "Explorar"] → Search (/search)
    ├── [Click "Películas"] → Movies (/movies)
    ├── [Click "Favoritos"] → Favorites (/favorites)
    └── [Click Perfil] → Profile (/profile)
```

### 4. Flujo de Logout

```
Home Page (/home)
    ↓
    [Click "Cerrar Sesión"]
    ↓
    [Confirmar logout]
    ↓
Landing Page (/) ← Redirige automáticamente
    ↓
Login disponible nuevamente
```

---

## 📱 Navegación en el Header

### Desktop (Pantallas ≥ 768px)

```
[Logo]  [Inicio] [Explorar] [Películas] [Favoritos]  [🔍] [Nombre Usuario] [👤] [🚪]
```

- **Logo**: Redirige a `/home` (autenticado) o `/` (anónimo)
- **Navegación**: Enlaces rápidos a secciones principales
- **Buscar**: Abre modal/página de búsqueda
- **Perfil**: Dropdown o página de perfil
- **Logout**: Cierra sesión

### Mobile (Pantallas < 768px)

```
[Logo]  [🔍]  [☰]
                ├── Inicio
                ├── Explorar
                ├── Películas
                ├── Favoritos
                ├── ──────────
                ├── Mi Perfil
                └── Cerrar Sesión
```

- **Logo**: Mismo comportamiento que desktop
- **Buscar**: Abre búsqueda
- **Menú**: Hamburguesa desplegable
- **Sub-items**: Clickeables para navegar

---

## 🔑 Atajos de Teclado (Futuros)

| Atajo | Acción |
|-------|--------|
| `/` | Ir a Home |
| `?` | Mostrar búsqueda |
| `Esc` | Cerrar menús |
| `Ctrl+K` | Buscar películas (próximo) |

---

## 🎬 Estructura de Películas

Cada película puede tener:

### Card de Película
```
┌──────────────────┐
│  [POSTER IMAGE]  │
│                  │
│ Título           │
│ Director         │
│ Año              │
│ [❤️ Favorito]    │
└──────────────────┘
```

### Detalles (próximo)
- Sinopsis completa
- Elenco
- Calificaciones
- Reseñas

---

## ⚠️ Manejo de Errores

### Error de Autenticación
```
Usuario intenta acceder a /home sin autenticar
    ↓
Redirige a /login
    ↓
Usuario ve: "Por favor inicia sesión"
```

### Error de Ruta No Encontrada
```
Usuario accede a /invalid-route
    ↓
Redirige a 404 Page
    ↓
Botón para volver a /home
```

### Error de API
```
API no responde / Error de servidor
    ↓
Mensaje: "Error al cargar las películas"
    ↓
Información: "Asegúrate que el servidor corre en localhost:8000"
```

---

## 📊 Estados de Página

### Estados de Carga
- Spinner centrado mientras se cargan datos
- Mensaje: "Cargando..."

### Estados Vacíos
- Ícono de alerta
- Mensaje descriptivo
- Sugerencia de acción

### Estados de Error
- Ícono de error
- Mensaje de error
- Link para reintentar

---

## 🔐 Protección de Rutas

### Sistema de Protección
```tsx
// Si NO está autenticado y accede a /home
→ Redirige a /login

// Si está autenticado y accede a /login
→ Redirige a /home

// Si la ruta no existe
→ Redirige a 404
```

### Token Management
- Token almacenado en `localStorage`
- Se valida automáticamente al cargar la app
- Se usa en todas las peticiones API

---

## 💾 Persistencia

### Lo que se mantiene al recargar
- ✅ Token de autenticación
- ✅ Información del usuario
- ✅ Preferencias (próximo)
- ✅ Favoritos (del servidor)

### Lo que se pierde
- ❌ Carrito de búsqueda (próximo)
- ❌ Caché local (se recarga)

---

## 📞 Soporte de Navegación

Para reportar problemas con la navegación:
1. Verifica que el backend esté corriendo
2. Abre la consola del navegador (F12)
3. Revisa los errores mostrados
4. Intenta recargar la página (Ctrl+R)
5. Limpia cookies si persiste (Ctrl+Shift+Delete)

---

**Última actualización**: 2024
**Versión**: 1.0
**Estado**: ✅ Completo
