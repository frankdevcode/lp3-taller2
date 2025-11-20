import { useEffect, useState } from 'react'
import { getMovies, type Movie } from '../lib/api-client'
import MovieCard from '../components/movies/MovieCard'

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true)
        const newMovies = await getMovies(page * 20, 20)
        if (newMovies.length < 20) {
          setHasMore(false)
        }
        if (page === 0) {
          setMovies(newMovies)
        } else {
          setMovies((prev) => [...prev, ...newMovies])
        }
      } catch (error) {
        console.error('Error loading movies:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMovies()
  }, [page])

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Catálogo de Películas</h1>

        {isLoading && page === 0 && (
          <div className="flex justify-center items-center h-64">
            <div className="spinner" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={isLoading}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Cargando...' : 'Cargar Más'}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
