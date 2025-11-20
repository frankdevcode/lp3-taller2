# Guía de Instalación - CineStream

## Requisitos Previos

- Node.js 18+ instalado
- npm o yarn como gestor de paquetes
- Backend FastAPI ejecutándose en `http://localhost:8000`

---

## Paso 1: Opción de Instalación

### Opción A: Desde v0.app (Recomendado)

1. Abre la versión generada en v0.app
2. Haz clic en "Download ZIP" en la esquina superior derecha
3. Descomprime el archivo

\`\`\`bash
unzip cinestream.zip
cd cinestream
\`\`\`

### Opción B: Desde GitHub

\`\`\`bash
git clone <repository-url>
cd cinestream
\`\`\`

### Opción C: Con Create Next App

\`\`\`bash
npx create-next-app@latest cinestream --typescript
cd cinestream
\`\`\`

---

## Paso 2: Instalar Dependencias

\`\`\`bash
npm install
# o
yarn install
# o
pnpm install
\`\`\`

**Dependencias principales instaladas:**
- next@16
- react@19
- tailwindcss@4
- typescript
- lucide-react (iconos)

---

## Paso 3: Configurar Variables de Entorno

Crea archivo `.env.local` en la raíz:

\`\`\`env
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
\`\`\`

> **Nota:** Reemplaza `localhost:8000` con la URL de tu backend en producción.

---

## Paso 4: Agregar Componentes shadcn (si necesario)

Si algunos componentes no están presentes, instálalos:

\`\`\`bash
npx shadcn-cli@latest add button
npx shadcn-cli@latest add card
npx shadcn-cli@latest add input
npx shadcn-cli@latest add dropdown-menu
\`\`\`

---

## Paso 5: Ejecutar en Desarrollo

\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en: **http://localhost:3000**

---

## Verificar Instalación

1. Abre http://localhost:3000 en tu navegador
2. Deberías ver la página de inicio de CineStream
3. Intenta hacer login/registro (asegúrate que el backend esté corriendo)
4. Navega por la búsqueda y filtros

---

## Troubleshooting

### Error: "Cannot GET /"
- **Causa:** Servidor no está corriendo
- **Solución:** `npm run dev` desde la carpeta del proyecto

### Error: "API is not responding"
- **Causa:** Backend no está en `http://localhost:8000`
- **Solución:** 
  1. Verifica que FastAPI esté corriendo
  2. Actualiza `NEXT_PUBLIC_API_BASE_URL` en `.env.local`

### Error: "Module not found"
- **Causa:** Dependencias no instaladas
- **Solución:** `npm install` de nuevo

### Estilos no aparecen
- **Causa:** Tailwind no compiló
- **Solución:** Reinicia servidor con `npm run dev`

---

## Estructura de Carpetas Generada

\`\`\`
cinestream/
├── app/
│   ├── (auth)/login/page.tsx
│   ├── (auth)/register/page.tsx
│   ├── movies/[id]/page.tsx
│   ├── search/page.tsx
│   ├── profile/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── error.tsx
│   └── not-found.tsx
├── components/
│   ├── layout/
│   ├── movies/
│   ├── home/
│   ├── search/
│   └── ui/
├── lib/
│   ├── auth-context.tsx
│   ├── api-client.ts
│   └── utils.ts
├── public/
├── .env.local
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
├── package.json
└── README.md
\`\`\`

---

## Desarrollo

### Agregar Nueva Página

\`\`\`bash
# Crea carpeta y archivo
mkdir app/nueva-pagina
echo "export default function Page() { return <div>Nueva</div>; }" > app/nueva-pagina/page.tsx
\`\`\`

### Agregar Nuevo Componente

\`\`\`bash
mkdir components/nueva-seccion
# Crea archivo .tsx
\`\`\`

### Agregar Estilos Globales

Edita `app/globals.css` en la sección `@theme inline`

---

## Desplegar a Producción

### En Vercel (Recomendado)

1. Sube código a GitHub:
\`\`\`bash
git push origin main
\`\`\`

2. Ve a [vercel.com](https://vercel.com)

3. Conecta tu repositorio de GitHub

4. Agrega variable de entorno:
\`\`\`
NEXT_PUBLIC_API_BASE_URL=https://api.tudominio.com
\`\`\`

5. Deploy automático ✅

### En Netlify

\`\`\`bash
npm run build
# Sube carpeta .next a Netlify
\`\`\`

### En Servidor Propio

\`\`\`bash
npm run build
npm start
# Por defecto escucha en :3000
\`\`\`

---

## Próximos Pasos

- [ ] Personaliza colores en `app/globals.css`
- [ ] Agrega más películas en el backend
- [ ] Implementa reproductor de video
- [ ] Configura dominio personalizado
- [ ] Agrega recomendaciones personalizadas
- [ ] Implementa suscripciones con Stripe

---

## Documentación Adicional

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [React 19 Features](https://react.dev)

---

**¿Necesitas ayuda?** Revisa el archivo `ARQUITECTURA.md` para más detalles técnicos.
