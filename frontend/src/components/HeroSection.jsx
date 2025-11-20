import { useState, useEffect } from 'react'
import api from '../api'
import '../styles/hero.css'

// SVG Icons as inline components
const AlertCircle = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const Play = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const Info = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

export default function HeroSection() {
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        console.log('[HeroSection] Fetching featured movie...')
        // Obtener películas populares, tomar la primera
        const movies = await api.getTopPeliculasPopulares(1)
        console.log('[HeroSection] Featured movies fetched:', movies)
        
        if (movies && movies.length > 0) {
          setFeaturedMovie(movies[0])
        } else {
          setError('No hay películas disponibles')
        }
      } catch (error) {
        console.error('[HeroSection] Error fetching featured movie:', error)
        const errorMessage = error instanceof Error ? error.message : 'Error al cargar películas'
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  if (error && !featuredMovie) {
    return (
      <div className="hero-error">
        <div className="hero-error-content">
          <AlertCircle className="hero-error-icon" />
          <h2 className="hero-error-title">No se pudo cargar el contenido</h2>
          <p className="hero-error-message">{error}</p>
          <p className="hero-error-hint">
            Asegúrate de que tu servidor backend esté corriendo en:{' '}
            <code className="hero-error-code">
              {import.meta.env.VITE_API_BASE || 'http://localhost:8000/api'}
            </code>
          </p>
        </div>
      </div>
    )
  }

  if (isLoading || !featuredMovie) {
    return <div className="hero-loading" />
  }

  return (
    <div className="hero-container">
      {/* Background Image or Gradient */}
      <div 
        className="hero-background"
        style={{
          backgroundImage: featuredMovie.portada_url 
            ? `url(${featuredMovie.portada_url})`
            : 'linear-gradient(135deg, #e50914 0%, #831010 100%)'
        }}
      />

      {/* Overlay Gradient */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <div className="hero-text-section">
          <h1 className="hero-title">{featuredMovie.titulo}</h1>
          <p className="hero-description">
            {featuredMovie.sinopsis || `Dirigida por ${featuredMovie.director} • ${featuredMovie.año}`}
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">
              <Play size={20} />
              Ver Ahora
            </button>
            <button className="btn btn-secondary">
              <Info size={20} />
              Más Información
            </button>
          </div>
          
          {/* Movie Info */}
          <div className="hero-info">
            <span className="hero-info-item">
              <strong>Director:</strong> {featuredMovie.director}
            </span>
            <span className="hero-info-item">
              <strong>Año:</strong> {featuredMovie.año}
            </span>
            <span className="hero-info-item">
              <strong>Género:</strong> {featuredMovie.genero}
            </span>
            <span className="hero-info-item">
              <strong>Clasificación:</strong> {featuredMovie.clasificacion}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
