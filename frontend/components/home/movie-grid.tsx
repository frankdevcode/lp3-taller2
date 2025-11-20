"use client"

import { useEffect, useState } from "react"
import { type Movie, getMovies } from "@/lib/api-client"
import { MovieCard } from "@/components/movies/movie-card"
import { Button } from "@/components/ui/button"

export function MovieGrid() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const loadMore = async (pageNum: number) => {
    try {
      setIsLoading(true)
      const newMovies = await getMovies(pageNum * 20, 20)
      if (newMovies.length < 20) {
        setHasMore(false)
      }
      setMovies((prev) => (pageNum === 0 ? newMovies : [...prev, ...newMovies]))
    } catch (error) {
      console.error("Error fetching movies:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadMore(0)
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Todas las Películas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button
            onClick={() => {
              const nextPage = page + 1
              setPage(nextPage)
              loadMore(nextPage)
            }}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Cargando..." : "Cargar Más"}
          </Button>
        </div>
      )}
    </div>
  )
}
