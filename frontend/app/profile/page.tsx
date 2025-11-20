"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Loader } from "@/components/ui/loader"
import { Button } from "@/components/ui/button"
import { type Movie, getUserFavorites } from "@/lib/api-client"
import { MovieCard } from "@/components/movies/movie-card"
import { User, Heart, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading, logout, token } = useAuth()
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, authLoading, router])

  // Load favorites
  useEffect(() => {
    if (user && isAuthenticated) {
      const loadFavorites = async () => {
        try {
          const data = await getUserFavorites(user.id)
          setFavorites(data)
        } catch (error) {
          console.error("Error loading favorites:", error)
        } finally {
          setIsLoading(false)
        }
      }
      loadFavorites()
    }
  }, [user, isAuthenticated])

  if (authLoading || isLoading) {
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

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-primary-hover rounded-lg p-8 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{user.nombre_usuario || "Mi Perfil"}</h1>
                <p className="text-white/80">{user.correo}</p>
              </div>
            </div>
            <Button onClick={logout} className="bg-background text-primary hover:bg-background/90 gap-2">
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-2">Películas Favoritas</p>
            <p className="text-4xl font-bold">{favorites.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-2">Última Actividad</p>
            <p className="text-lg font-semibold">Hoy</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-2">Miembro Desde</p>
            <p className="text-lg font-semibold">{user.id ? "Activo" : "N/A"}</p>
          </div>
        </div>

        {/* Favorites Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Heart className="w-8 h-8 text-primary" />
            Mis Películas Favoritas
          </h2>

          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorited={true}
                  onFavoriteToggle={(movieId) => {
                    // Remove from favorites
                    setFavorites((prev) => prev.filter((m) => m.id !== movieId))
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card border border-border rounded-lg">
              <Heart className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sin películas favoritas</h3>
              <p className="text-muted-foreground mb-6">Comienza a agregar películas a tu lista de favoritos</p>
              <Button asChild className="bg-primary hover:bg-primary-hover text-white">
                <a href="/search">Explorar Películas</a>
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
