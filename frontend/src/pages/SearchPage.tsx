import { useEffect, useState } from 'react'
import { searchMovies, type Movie } from '../lib/api-client'
import MovieCard from '../components/movies/MovieCard'
import { Search } from 'lucide-react'

export default function SearchPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [titulo, setTitulo] = useState('')
  const [director, setDirector] = useState('')
  const [genero, setGenero] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const results = await searchMovies(titulo || undefined, director || undefined, genero || undefined)
      setMovies(results)
    } catch (err) {
      setError('Error al buscar películas')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Buscar Películas</h1>

        <form onSubmit={handleSearch} className="mb-8 space-y-4 bg-card p-6 rounded-lg border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Título</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Inception"
                className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Director</label>
              <input
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                placeholder="Ej: Christopher Nolan"
                className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Género</label>
              <input
                type="text"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                placeholder="Ej: Sci-Fi"
                className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            {isLoading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive text-destructive mb-8">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="spinner" />
          </div>
        )}

        {!isLoading && movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {!isLoading && movies.length === 0 && (titulo || director || genero) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No se encontraron películas</p>
          </div>
        )}
      </div>
    </main>
  )
}
