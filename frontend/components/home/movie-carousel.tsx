"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { type Movie, getTopMovies, getRecentMovies } from "@/lib/api-client"
import { MovieCard } from "@/components/movies/movie-card"
import { Loader } from "@/components/ui/loader"
import { useRef } from "react"

interface MovieCarouselProps {
  title: string
  type: "popular" | "recent"
}

export function MovieCarousel({ title, type }: MovieCarouselProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = type === "popular" ? await getTopMovies(12) : await getRecentMovies(12)
        setMovies(data)
      } catch (error) {
        console.error(`Error fetching ${type} movies:`, error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [type])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="relative">
        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 snap-start">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:translate-x-0 z-10 p-2 bg-primary/80 hover:bg-primary rounded-full transition-colors opacity-0 hover:opacity-100 md:opacity-100"
          aria-label="Scroll izquierda"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-0 z-10 p-2 bg-primary/80 hover:bg-primary rounded-full transition-colors opacity-0 hover:opacity-100 md:opacity-100"
          aria-label="Scroll derecha"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
