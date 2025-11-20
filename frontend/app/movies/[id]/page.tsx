"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { type Movie, getMovieById } from "@/lib/api-client"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Loader } from "@/components/ui/loader"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Play, Heart, Share2, Info } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function MovieDetailsPage() {
  const params = useParams()
  const movieId = params.id as string
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(movieId)
        setMovie(data)
      } catch (error) {
        console.error("Error fetching movie:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovie()
  }, [movieId])

  const handleFavorite = () => {
    if (isAuthenticated && user) {
      setIsFavorited(!isFavorited)
      // TODO: Implement favorite API call
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="py-20">
          <Loader />
        </div>
        <Footer />
      </main>
    )
  }

  if (!movie) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Película no encontrada</h1>
          <p className="text-muted-foreground">Lo sentimos, no pudimos encontrar esta película.</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="relative w-full h-96 md:h-screen overflow-hidden">
        {movie.portada_url && (
          <Image src={movie.portada_url || "/placeholder.svg"} alt={movie.titulo} fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex items-end md:items-center px-4 sm:px-6 lg:px-8 py-8 md:py-0">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{movie.titulo}</h1>
            <div className="flex flex-wrap gap-4 mb-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <span className="bg-primary px-3 py-1 rounded font-semibold">{movie.clasificacion || "N/A"}</span>
              </div>
              <div className="text-muted-foreground">{movie.año}</div>
              <div className="text-muted-foreground">{movie.genero}</div>
            </div>
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl line-clamp-3 text-pretty">
              {movie.descripcion || `Dirigida por ${movie.director}`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white w-full sm:w-auto">
                <Play className="w-5 h-5 mr-2" />
                Ver Ahora
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleFavorite}
                disabled={!isAuthenticated}
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto bg-transparent"
              >
                <Heart className="w-5 h-5 mr-2" fill={isFavorited ? "currentColor" : "none"} />
                {isFavorited ? "En Favoritos" : "Agregar a Favoritos"}
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 w-full sm:w-auto">
                <Share2 className="w-5 h-5 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Detalles</h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex justify-between pb-4 border-b border-border">
                  <span>Director</span>
                  <span className="text-foreground font-semibold">{movie.director}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-border">
                  <span>Género</span>
                  <span className="text-foreground font-semibold">{movie.genero}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-border">
                  <span>Año</span>
                  <span className="text-foreground font-semibold">{movie.año}</span>
                </div>
                <div className="flex justify-between">
                  <span>Clasificación</span>
                  <span className="text-foreground font-semibold">{movie.clasificacion || "N/A"}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.descripcion ||
                  "No hay descripción disponible para esta película. Disfruta viendo esta obra maestra del cine."}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-20 space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Información
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Director</p>
                    <p className="font-semibold">{movie.director}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Género</p>
                    <p className="font-semibold">{movie.genero}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Año de Lanzamiento</p>
                    <p className="font-semibold">{movie.año}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
