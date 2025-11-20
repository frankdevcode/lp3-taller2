import { useState } from 'react'
import { Heart } from 'lucide-react'
import type { Movie } from '../../lib/api-client'
import { useAuth } from '../../lib/auth-context'

interface MovieCardProps {
  movie: Movie
  onFavoriteChange?: () => void
  showFavoriteButton?: boolean
  isFavorite?: boolean
}

export default function MovieCard({
  movie,
  onFavoriteChange,
  showFavoriteButton = true,
  isFavorite = false,
}: MovieCardProps) {
  const { user } = useAuth()
  const [isFav, setIsFav] = useState(isFavorite)
  const [isLoading, setIsLoading] = useState(false)

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) return

    setIsLoading(true)
    try {
      // TODO: Implement actual API call to add/remove favorite
      setIsFav(!isFav)
      onFavoriteChange?.()
    } catch (error) {
      console.error('Error updating favorite:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="group relative movie-card overflow-hidden rounded-lg bg-card hover:scale-105 transition-transform duration-300">
      {/* Poster */}
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-card">
        {movie.portada_url ? (
          <img
            src={movie.portada_url}
            alt={movie.titulo}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <span className="text-3xl">🎬</span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info Section */}
      <div className="p-3 relative z-10">
        <h3 className="font-semibold text-sm text-foreground truncate" title={movie.titulo}>
          {movie.titulo}
        </h3>
        <p className="text-xs text-muted-foreground truncate">{movie.director}</p>
        <div className="flex gap-2 mt-2 text-xs">
          <span className="px-2 py-1 bg-primary/20 text-primary rounded">{movie.año}</span>
          {movie.clasificacion && (
            <span className="px-2 py-1 bg-secondary/20 text-secondary rounded">{movie.clasificacion}</span>
          )}
        </div>
      </div>

      {/* Hover Actions */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-3">
        <p className="text-xs text-center text-foreground line-clamp-3">{movie.descripcion || movie.genero}</p>

        {showFavoriteButton && (
          <button
            onClick={handleFavoriteClick}
            disabled={isLoading}
            className={`p-2 rounded-full transition-all ${
              isFav
                ? 'bg-primary text-primary-foreground'
                : 'bg-white/20 text-white hover:bg-white/40'
            }`}
            aria-label="Agregar a favoritos"
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>
    </div>
  )
}
