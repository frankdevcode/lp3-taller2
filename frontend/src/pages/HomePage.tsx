import { useEffect, useState } from 'react'
import { Play, TrendingUp, Clock, Film as FilmIcon, Search, Heart, User } from 'lucide-react'
import { getTopMovies, getRecentMovies, type Movie } from '../lib/api-client'
import MovieCard from '../components/movies/MovieCard'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth-context'

export default function HomePage() {
  const { user } = useAuth()
  const [topMovies, setTopMovies] = useState<Movie[]>([])
  const [recentMovies, setRecentMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const [top, recent] = await Promise.all([getTopMovies(12), getRecentMovies(12)])
        setTopMovies(top)
        setRecentMovies(recent)
      } catch (err) {
        console.error('Error loading movies:', err)
        setError('Error al cargar las películas')
      } finally {
        setIsLoading(false)
      }
    }

    loadMovies()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full h-96 md:h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-slide-in">
            <h1 className="text-4xl md:text-7xl font-bold text-foreground mb-4">
              Bienvenido a <span className="text-gradient">CineStream</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Descubre, valora y organiza tus películas favoritas. La plataforma perfecta para amantes del cine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/search"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-glow"
              >
                <Play className="w-5 h-5 mr-2" />
                Explorar Películas
              </Link>
              <Link
                to="/movies"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all"
              >
                <FilmIcon className="w-5 h-5 mr-2" />
                Ver Catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-colors">
            <TrendingUp className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1">Películas Populares</h3>
            <p className="text-sm text-muted-foreground">Descubre lo más visto</p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border hover:border-secondary transition-colors">
            <Clock className="w-8 h-8 text-secondary mb-3" />
            <h3 className="font-semibold text-foreground mb-1">Últimos Estrenos</h3>
            <p className="text-sm text-muted-foreground">Las películas más recientes</p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-colors">
            <Film className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1">Tu Biblioteca</h3>
            <p className="text-sm text-muted-foreground">Gestiona tus favoritos</p>
          </div>
        </div>
      </section>

      {/* Top Movies Section */}
      {!isLoading && !error && topMovies.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Películas Destacadas</h2>
            <Link
              to="/search"
              className="text-primary hover:underline text-sm font-semibold transition-colors"
            >
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Movies Section */}
      {!isLoading && !error && recentMovies.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Estrenos Recientes</h2>
            <Link
              to="/search"
              className="text-primary hover:underline text-sm font-semibold transition-colors"
            >
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {/* Loading State */}
      {isLoading && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="spinner" />
          </div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="p-6 rounded-lg bg-destructive/10 border border-destructive text-center">
            <p className="text-destructive font-semibold mb-2">{error}</p>
            <p className="text-sm text-muted-foreground">
              Asegúrate de que tu servidor backend esté corriendo en http://localhost:8000
            </p>
          </div>
        </section>
      )}
    </main>
  )
}
