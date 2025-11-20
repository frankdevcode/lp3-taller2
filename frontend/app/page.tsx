import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { MovieCarousel } from "@/components/home/movie-carousel"
import { MovieGrid } from "@/components/home/movie-grid"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <MovieCarousel title="Películas Destacadas" type="popular" />
        <MovieCarousel title="Estrenos Recientes" type="recent" />
        <MovieGrid />
      </div>
      <Footer />
    </main>
  )
}
