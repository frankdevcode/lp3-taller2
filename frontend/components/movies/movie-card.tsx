"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useState } from "react"
import type { Movie } from "@/lib/api-client"
import { addFavoriteMovie } from "@/lib/api-client"
import { useAuth } from "@/lib/auth-context"

interface MovieCardProps {
  movie: Movie
  onFavoriteToggle?: (movieId: string, isFavorited: boolean) => void
  isFavorited?: boolean
}

export function MovieCard({ movie, onFavoriteToggle, isFavorited = false }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [localFavorited, setLocalFavorited] = useState(isFavorited)
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated, user, token } = useAuth()

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isAuthenticated || !user || !token) {
      return
    }

    setIsLoading(true)
    try {
      const newState = !localFavorited

      if (newState) {
        await addFavoriteMovie(user.id, movie.id, token)
      } else {
        // For deletion, we would need the favorito ID from the API
        // This is a simplified version - in production you'd track the favorito ID
        // You can enhance this with better state management
      }

      setLocalFavorited(newState)
      onFavoriteToggle?.(movie.id, newState)
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Link href={`/movies/${movie.id}`}>
      <div
        className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-elevated cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative w-full aspect-video bg-card-hover overflow-hidden">
          {movie.portada_url ? (
            <Image
              src={movie.portada_url || "/placeholder.svg"}
              alt={movie.titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="text-sm">Sin imagen</span>
            </div>
          )}

          {/* Overlay on Hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4">
              <h3 className="font-bold text-white mb-2 line-clamp-2">{movie.titulo}</h3>
              <p className="text-xs text-muted-foreground mb-3">{movie.director}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-xs bg-primary px-2 py-1 rounded">{movie.clasificacion || "N/A"}</span>
                </div>
                <span className="text-xs text-muted-foreground">{movie.año}</span>
              </div>
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          disabled={isLoading || !isAuthenticated}
          className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-primary rounded-full transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
          aria-label={localFavorited ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart
            className="w-5 h-5"
            fill={localFavorited ? "currentColor" : "none"}
            color={localFavorited ? "#dc2626" : "#ffffff"}
          />
        </button>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2 mb-1">{movie.titulo}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{movie.genero}</p>
        </div>
      </div>
    </Link>
  )
}
