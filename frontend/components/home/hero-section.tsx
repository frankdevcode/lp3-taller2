"use client"

import { Button } from "@/components/ui/button"
import { Play, Info, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { type Movie, getTopMovies } from "@/lib/api-client"
import Image from "next/image"

export function HeroSection() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        console.log("[v0] Fetching featured movie...")
        const movies = await getTopMovies(1)
        console.log("[v0] Featured movies fetched:", movies)
        if (movies.length > 0) {
          setFeaturedMovie(movies[0])
        } else {
          setError("No hay películas disponibles")
        }
      } catch (error) {
        console.error("[v0] Error fetching featured movie:", error)
        const errorMessage = error instanceof Error ? error.message : "Error al cargar películas"
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  if (error && !featuredMovie) {
    return (
      <div className="relative w-full h-96 md:h-screen bg-gradient-to-r from-card to-card-hover flex items-center justify-center">
        <div className="text-center px-4">
          <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">No se pudo cargar el contenido</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Asegúrate de que tu servidor backend esté corriendo en:{" "}
            <code className="bg-card px-2 py-1 rounded">
              {process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}
            </code>
          </p>
        </div>
      </div>
    )
  }

  if (isLoading || !featuredMovie) {
    return <div className="relative w-full h-96 md:h-screen bg-gradient-to-r from-card to-card-hover" />
  }

  return (
    <div className="relative w-full h-96 md:h-screen overflow-hidden">
      {/* Background Image */}
      {featuredMovie.portada_url && (
        <Image
          src={featuredMovie.portada_url || "/placeholder.svg"}
          alt={featuredMovie.titulo}
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-end md:items-center px-4 sm:px-6 lg:px-8 py-8 md:py-0">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 text-balance">{featuredMovie.titulo}</h1>
          <p className="text-base md:text-lg text-gray-300 mb-6 line-clamp-3 text-pretty">
            {featuredMovie.descripcion || `Dirigida por ${featuredMovie.director} • ${featuredMovie.año}`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-white w-full sm:w-auto">
              <Play className="w-5 h-5 mr-2" />
              Ver Ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 w-full sm:w-auto bg-transparent"
            >
              <Info className="w-5 h-5 mr-2" />
              Más Información
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
