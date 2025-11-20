"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MovieCard } from "@/components/movies/movie-card"
import { SearchForm } from "@/components/search/search-form"
import { FilterPanel } from "@/components/search/filter-panel"
import { Loader } from "@/components/ui/loader"
import { type Movie, searchMovies, getMovies, getGenres } from "@/lib/api-client"
import { Button } from "@/components/ui/button"

export default function SearchPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [genres, setGenres] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    director: "",
  })

  // Load genres on mount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await getGenres()
        setGenres(data)
      } catch (error) {
        console.error("Error loading genres:", error)
      }
    }
    loadGenres()
  }, [])

  // Initial load - get all movies
  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true)
      try {
        const data = await getMovies(0, 24)
        setMovies(data)
      } catch (error) {
        console.error("Error loading movies:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadMovies()
  }, [])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setIsLoading(true)
    try {
      const data = await searchMovies(
        query || undefined,
        filters.director || undefined,
        filters.genre || undefined,
        filters.year ? Number.parseInt(filters.year) : undefined,
      )
      setMovies(data)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    // Trigger search with new filters
    setIsLoading(true)
    searchMovies(
      searchQuery || undefined,
      newFilters.director || undefined,
      newFilters.genre || undefined,
      newFilters.year ? Number.parseInt(newFilters.year) : undefined,
    )
      .then((data) => setMovies(data))
      .catch((error) => console.error("Filter error:", error))
      .finally(() => setIsLoading(false))
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setFilters({ genre: "", year: "", director: "" })
    setIsLoading(true)
    getMovies(0, 24)
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsLoading(false))
  }

  const hasActiveFilters = searchQuery || filters.genre || filters.year || filters.director

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explorar Películas</h1>
          <p className="text-muted-foreground mb-8">Busca y filtra miles de películas por género, año y director</p>
          <SearchForm onSearch={handleSearch} />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <FilterPanel genres={genres} filters={filters} onFilterChange={handleFilterChange} />
            {hasActiveFilters && (
              <Button variant="ghost" onClick={handleClearFilters} className="w-full mt-6">
                Limpiar Filtros
              </Button>
            )}
          </div>

          {/* Main Content - Movies */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <Loader />
            ) : movies.length > 0 ? (
              <div>
                <p className="text-muted-foreground mb-6">
                  Se encontraron {movies.length} película{movies.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-2">No se encontraron películas</p>
                <p className="text-sm text-muted-foreground">Intenta con otros criterios de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
