# 💻 GUÍA DE IMPLEMENTACIÓN - COMPONENTES MEJORADOS

> Archivos listos para copiar/pegar y implementar en el proyecto

---

## 📁 ESTRUCTURA DE ARCHIVOS A CREAR/MODIFICAR

```
frontend/src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx (MODIFICAR)
│   │   ├── Footer.tsx (MODIFICAR)
│   │   └── SectionHeader.tsx (CREAR)
│   ├── sections/
│   │   ├── Hero.tsx (CREAR)
│   │   ├── StatsSection.tsx (CREAR)
│   │   ├── MoviesSection.tsx (CREAR)
│   │   ├── RecommendationsSection.tsx (CREAR)
│   │   └── NewsletterSection.tsx (CREAR)
│   ├── ui/
│   │   ├── button.tsx (MEJORAR)
│   │   └── card.tsx (MEJORAR)
│   └── movies/
│       └── MovieCard.tsx (MEJORAR)
├── pages/
│   └── HomePage.tsx (REFACTORIZAR)
├── hooks/
│   └── use-scroll-animation.ts (CREAR)
└── styles/
    └── animations.css (MEJORAR)
```

---

## 1️⃣ NUEVO: `components/sections/Hero.tsx`

```tsx
import { useAuth } from '../../lib/auth-context'
import { Play, TrendingUp, Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

interface HeroProps {
  onExploreClick?: () => void
  onPersonalizedClick?: () => void
}

export default function Hero({ onExploreClick, onPersonalizedClick }: HeroProps) {
  const { user } = useAuth()
  const userName = user?.nombre_usuario?.split(' ')[0] || 'Amigo'

  return (
    <section className="relative w-full h-[500px] md:h-screen bg-gradient-to-br from-primary/30 via-background to-secondary/20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Overlay mejorado */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full animate-fade-in">
          {/* Etiqueta pequeña */}
          <p className="text-sm uppercase tracking-widest text-primary mb-4 font-semibold inline-block">
            🎬 Bienvenido de vuelta
          </p>

          {/* Título principal */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Descubre tu próxima{' '}
            <span className="text-gradient">película favorita</span>
          </h1>

          {/* Descripción */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
            Accede a millones de títulos, deja tus calificaciones y construye tu biblioteca 
            personal. Hola, {userName}, ¿qué te gustaría ver hoy?
          </p>

          {/* Grid de CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {/* CTA 1: Primario */}
            <Link
              to="/search?filter=continue"
              onClick={onExploreClick}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-3">
                <Play className="w-5 h-5 fill-white" />
                Continuar Viendo
              </span>
            </Link>

            {/* CTA 2: Recomendadas */}
            <Link
              to="/search?filter=personalized"
              onClick={onPersonalizedClick}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300"
            >
              <TrendingUp className="w-5 h-5" />
              Para Ti
            </Link>

            {/* CTA 3: Tendencias */}
            <Link
              to="/search?sort=trending"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary/20 border border-secondary text-secondary rounded-lg font-semibold hover:bg-secondary/30 transition-all duration-300"
            >
              <span>🔥</span>
              Tendencias
            </Link>

            {/* CTA 4: Top Rated */}
            <Link
              to="/search?sort=rating"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-muted text-muted-foreground rounded-lg font-semibold hover:border-foreground hover:text-foreground transition-all duration-300"
            >
              <Star className="w-5 h-5" />
              Top Valoradas
            </Link>
          </div>

          {/* Subtexto debajo */}
          <p className="text-sm text-muted-foreground mt-8">
            <span className="text-primary font-semibold">12.5K+</span> películas disponibles • 
            <span className="text-primary font-semibold"> 950M+</span> calificaciones
          </p>
        </div>
      </div>
    </section>
  )
}
```

---

## 2️⃣ NUEVO: `components/sections/StatsSection.tsx`

```tsx
import { TrendingUp, Heart, Globe, Zap } from 'lucide-react'

interface Stat {
  icon: React.ReactNode
  number: string
  label: string
  description: string
  color: 'primary' | 'secondary'
}

export default function StatsSection() {
  const stats: Stat[] = [
    {
      icon: <TrendingUp className="w-10 h-10" />,
      number: '12.5K+',
      label: 'Películas',
      description: 'Catálogo actualizado diariamente',
      color: 'primary',
    },
    {
      icon: <Heart className="w-10 h-10" />,
      number: '950M+',
      label: 'Calificaciones',
      description: 'Comunidad global activa',
      color: 'secondary',
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      {/* Cards principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-8 md:p-10 rounded-2xl transition-all duration-300 hover:shadow-lg border
              ${stat.color === 'primary'
                ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 hover:border-primary/50'
                : 'bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30 hover:border-secondary/50'
              }`}
          >
            <div className={stat.color === 'primary' ? 'text-primary' : 'text-secondary'}>
              {stat.icon}
            </div>
            <h3 className="text-5xl md:text-6xl font-bold text-foreground mb-2 mt-4">
              {stat.number}
            </h3>
            <p className="text-lg font-semibold text-foreground mb-1">
              {stat.label}
            </p>
            <p className="text-sm text-muted-foreground">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Banner inspiracional */}
      <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary/15 via-secondary/15 to-primary/15 border border-primary/20 text-center hover:border-primary/40 transition-colors">
        <p className="text-sm uppercase tracking-widest text-primary mb-3 font-semibold">
          🌍 ALCANCE GLOBAL
        </p>
        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Disponible en 50+ Países
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Tu plataforma de películas favorita, accesible desde cualquier rincón del mundo. 
          Encuentra películas en tu idioma y comparte experiencias con millones de usuarios cinéfilos.
        </p>
      </div>
    </section>
  )
}
```

---

## 3️⃣ NUEVO: `components/sections/MoviesSection.tsx`

```tsx
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import MovieCard from '../movies/MovieCard'
import { Movie } from '../../lib/api-client'

interface MoviesSectionProps {
  title: string
  subtitle?: string
  emoji?: string
  movies: Movie[]
  isLoading?: boolean
  viewAllLink?: string
  backgroundVariant?: 'light' | 'dark'
  onViewAll?: () => void
}

export default function MoviesSection({
  title,
  subtitle,
  emoji = '✨',
  movies,
  isLoading,
  viewAllLink = '/search',
  backgroundVariant = 'dark',
  onViewAll,
}: MoviesSectionProps) {
  return (
    <section className={`py-24 md:py-32 transition-colors
      ${backgroundVariant === 'light' ? 'bg-card/30' : 'bg-transparent'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header mejorado */}
        <div className="flex items-start justify-between mb-12 gap-8">
          <div className="flex-1">
            {emoji && (
              <p className="text-sm uppercase tracking-widest text-primary mb-3 font-semibold inline-block">
                {emoji} FEATURED
              </p>
            )}
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Ver todas - Desktop */}
          <Link
            to={viewAllLink}
            onClick={onViewAll}
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-lg whitespace-nowrap"
          >
            Ver Todas
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid de películas */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner" />
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <div key={movie.id} className="animate-fade-in">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>

            {/* Ver todas - Mobile */}
            <div className="flex md:hidden justify-center mt-10">
              <Link
                to={viewAllLink}
                onClick={onViewAll}
                className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all"
              >
                Ver Todas las Películas
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No hay películas disponibles en este momento.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
```

---

## 4️⃣ NUEVO: `components/sections/RecommendationsSection.tsx`

```tsx
import { Bell } from 'lucide-react'
import { Movie } from '../../lib/api-client'
import MovieCard from '../movies/MovieCard'

interface RecommendationsSectionProps {
  movies: Movie[]
  genres: string[]
  isLoading?: boolean
  onNotificationClick?: () => void
}

export default function RecommendationsSection({
  movies,
  genres,
  isLoading,
  onNotificationClick,
}: RecommendationsSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      {/* Header centrado */}
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-secondary mb-3 font-semibold inline-block">
          ⭐ SOLO PARA TI
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          Recomendaciones Personalizadas
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Películas seleccionadas especialmente según tu historial de visualización 
          y tus géneros favoritos.
        </p>
      </div>

      {/* Géneros activos */}
      {genres.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {genres.map((genre) => (
            <span
              key={genre}
              className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold hover:bg-primary/30 transition-colors"
            >
              {genre}
            </span>
          ))}
        </div>
      )}

      {/* Grid de películas recomendadas */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner" />
        </div>
      ) : movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-16">
            {movies.map((movie) => (
              <div key={movie.id} className="animate-fade-in">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          {/* CTA para notificaciones */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border border-primary/30 rounded-2xl p-8 md:p-12 text-center hover:border-primary/50 transition-colors">
            <div className="mb-4 flex justify-center">
              <div className="p-3 bg-primary/20 rounded-full">
                <Bell className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              No te pierdas ninguna recomendación
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-lg">
              Activa las notificaciones y recibe alertas sobre nuevas películas 
              en tus géneros favoritos.
            </p>
            <button
              onClick={onNotificationClick}
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-lg"
            >
              Activar Notificaciones
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Mira películas para obtener recomendaciones personalizadas.
          </p>
        </div>
      )}
    </section>
  )
}
```

---

## 5️⃣ NUEVO: `components/sections/NewsletterSection.tsx`

```tsx
import { Mail, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email) {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('error')
    }
  }

  return (
    <section className="bg-card/50 border-y border-border py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-primary/20 rounded-full mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Recibe las Mejores Películas
          </h2>
          <p className="text-muted-foreground text-lg">
            Suscribete a nuestro newsletter y recibe recomendaciones semanales 
            directamente en tu correo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            {status === 'loading' ? (
              <div className="w-4 h-4 border-2 border-white border-t-primary rounded-full animate-spin" />
            ) : (
              <>
                Suscribirse
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Status messages */}
        {status === 'success' && (
          <p className="text-center text-primary mt-4 text-sm font-medium">
            ✅ ¡Suscripción exitosa! Revisa tu correo.
          </p>
        )}
        {status === 'error' && (
          <p className="text-center text-destructive mt-4 text-sm font-medium">
            ❌ Por favor ingresa un correo válido.
          </p>
        )}

        <p className="text-center text-muted-foreground text-xs mt-6">
          No compartimos tu correo. Puedes desuscribirte en cualquier momento.
        </p>
      </div>
    </section>
  )
}
```

---

## 6️⃣ NUEVO: `components/layout/SectionHeader.tsx`

```tsx
import { ReactNode } from 'react'

interface SectionHeaderProps {
  emoji?: string
  label: string
  title: string
  subtitle?: string
  action?: ReactNode
  centered?: boolean
}

export default function SectionHeader({
  emoji,
  label,
  title,
  subtitle,
  action,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <div className={`${centered ? 'flex justify-center' : ''} mb-3`}>
        {emoji || label ? (
          <p className="text-sm uppercase tracking-widest text-primary font-semibold inline-block">
            {emoji ? `${emoji} ` : ''}{label}
          </p>
        ) : null}
      </div>

      <div className={`flex items-start justify-between gap-8 ${centered ? 'flex-col items-center' : ''}`}>
        <div className={centered ? 'text-center' : ''}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className={`text-muted-foreground text-lg leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
              {subtitle}
            </p>
          )}
        </div>

        {action && <div className="hidden md:block flex-shrink-0">{action}</div>}
      </div>

      {action && <div className="block md:hidden mt-6 flex justify-center">{action}</div>}
    </div>
  )
}
```

---

## 7️⃣ MEJORADO: `components/movies/MovieCard.tsx`

```tsx
import { Heart, Star, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Movie } from '../../lib/api-client'
import { useState } from 'react'

interface MovieCardProps {
  movie: Movie
  onFavoriteToggle?: (movieId: number, isFavorite: boolean) => void
}

export default function MovieCard({ movie, onFavoriteToggle }: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
    onFavoriteToggle?.(movie.id, !isFavorite)
  }

  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-glow cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full h-48 overflow-hidden bg-card/50">
          <img
            src={movie.poster || 'https://via.placeholder.com/300x400?text=No+Poster'}
            alt={movie.titulo}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-16 h-16 text-primary fill-primary drop-shadow-lg" />
            </div>
          </div>

          {/* Badge */}
          {movie.año && (
            <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
              {movie.año}
            </div>
          )}
        </div>

        {/* Info Container */}
        <div className="p-4 flex flex-col flex-1">
          <h4 className="font-semibold text-foreground truncate mb-1 group-hover:text-primary transition-colors text-sm">
            {movie.titulo}
          </h4>
          <p className="text-xs text-muted-foreground truncate mb-3 flex-1">
            {movie.director || 'Director desconocido'}
          </p>

          {/* Rating & Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium text-foreground">
                {movie.calificacion || 'N/A'}
              </span>
            </div>
            <button
              onClick={handleFavoriteClick}
              className={`p-1.5 rounded-lg transition-all duration-200
                ${isFavorite
                  ? 'bg-destructive/20 text-destructive'
                  : 'bg-transparent text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
```

---

## 8️⃣ REFACTORIZADO: `pages/HomePage.tsx`

```tsx
import { useEffect, useState } from 'react'
import { getTopMovies, getRecentMovies, type Movie } from '../lib/api-client'
import Hero from '../components/sections/Hero'
import StatsSection from '../components/sections/StatsSection'
import MoviesSection from '../components/sections/MoviesSection'
import RecommendationsSection from '../components/sections/RecommendationsSection'
import NewsletterSection from '../components/sections/NewsletterSection'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()
  const [topMovies, setTopMovies] = useState<Movie[]>([])
  const [recentMovies, setRecentMovies] = useState<Movie[]>([])
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const [top, recent] = await Promise.all([
          getTopMovies(20),
          getRecentMovies(20),
        ])
        setTopMovies(top.slice(0, 15))
        setRecentMovies(recent.slice(0, 15))
        // Para recomendaciones, usar los últimos 15 de top
        setRecommendedMovies(top.slice(5, 20))
      } catch (err) {
        console.error('Error loading movies:', err)
        setError('Error al cargar las películas. Asegúrate de que el servidor esté funcionando.')
      } finally {
        setIsLoading(false)
      }
    }

    loadMovies()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero
        onExploreClick={() => navigate('/search')}
        onPersonalizedClick={() => navigate('/search?filter=personalized')}
      />

      {/* Stats Section */}
      <StatsSection />

      {/* Top Movies Section */}
      {!error && (
        <>
          <MoviesSection
            emoji="✨"
            title="Películas que Debes Ver"
            subtitle="Las mejores películas seleccionadas por nuestra comunidad de cinéfilos."
            movies={topMovies}
            isLoading={isLoading}
            viewAllLink="/search"
            backgroundVariant="light"
            onViewAll={() => navigate('/search')}
          />

          {/* Recent Movies Section */}
          <MoviesSection
            emoji="🆕"
            title="Estrenos Recientes"
            subtitle="Las películas más nuevas en nuestro catálogo."
            movies={recentMovies}
            isLoading={isLoading}
            viewAllLink="/search?sort=recent"
            backgroundVariant="dark"
            onViewAll={() => navigate('/search?sort=recent')}
          />

          {/* Recommendations Section */}
          <RecommendationsSection
            movies={recommendedMovies}
            genres={['Acción', 'Drama', 'Sci-Fi']}
            isLoading={isLoading}
            onNotificationClick={() => {
              console.log('Notifications enabled')
              // Implementar lógica de notificaciones
            }}
          />

          {/* Newsletter Section */}
          <NewsletterSection />
        </>
      )}

      {/* Error State */}
      {error && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="p-8 rounded-xl bg-destructive/10 border border-destructive/30 text-center">
            <p className="text-destructive font-semibold mb-2 text-lg">{error}</p>
            <p className="text-sm text-muted-foreground">
              Verifica que http://localhost:8000 esté corriendo
            </p>
          </div>
        </section>
      )}
    </main>
  )
}
```

---

## 9️⃣ ACTUALIZAR: `index.css`

Añade al final:

```css
/* Enhanced animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 10px 15px -3px rgba(255, 107, 53, 0.3);
  }
  50% {
    box-shadow: 0 10px 25px -5px rgba(255, 107, 53, 0.6);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

.shadow-glow {
  box-shadow: 0 10px 15px -3px rgba(255, 107, 53, 0.4);
}

.shadow-glow:hover {
  box-shadow: 0 20px 25px -5px rgba(255, 107, 53, 0.6);
}

/* Additional utility classes */
.text-gradient {
  background: linear-gradient(135deg, #ff6b35 0%, #004e89 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Improved focus states */
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid #ff6b35;
  outline-offset: 2px;
}
```

---

## 🎯 PASO A PASO DE IMPLEMENTACIÓN

### 1. Preparación (5 min)
```bash
# En frontend/src/components/
mkdir sections
```

### 2. Crear componentes (30 min)
- Copiar `Hero.tsx` → `components/sections/`
- Copiar `StatsSection.tsx` → `components/sections/`
- Copiar `MoviesSection.tsx` → `components/sections/`
- Copiar `RecommendationsSection.tsx` → `components/sections/`
- Copiar `NewsletterSection.tsx` → `components/sections/`
- Copiar `SectionHeader.tsx` → `components/layout/`

### 3. Actualizar componentes (15 min)
- Actualizar `MovieCard.tsx` con las mejoras
- Actualizar `index.css` con nuevas animaciones

### 4. Refactorizar HomePage (10 min)
- Reemplazar `HomePage.tsx` con la versión mejorada

### 5. Testing (15 min)
- Probar en navegador
- Verificar responsive design
- Verificar animaciones

### 6. Deploy (5 min)
```bash
npm run build
```

---

**Tiempo total estimado: 1 hora** ⏱️

¡Listo para implementar! 🚀

