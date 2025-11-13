import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Home({ api }) {
  const [stats, setStats] = useState({ usuarios: 0, peliculas: 0, favoritos: 0, peliMasPopular: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const usuarios = await api.fetchUsuarios({ limit: 1 })
      const peliculas = await api.fetchPeliculas({ limit: 1 })
      setStats({
        usuarios: usuarios.length > 0 ? usuarios[0] : { nombre: 'N/A' },
        peliculas: peliculas.length > 0 ? peliculas[0] : { titulo: 'N/A' },
        favoritos: 0,
      })
    } catch (err) {
      toast.error('Error al cargar estadísticas')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Cargando...</div>

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Bienvenido a CineLab</h1>
        <p>La plataforma para gestionar y descubrir tus películas favoritas</p>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <h3>Películas</h3>
          <p className="stat-value">0</p>
          <small>Total en catálogo</small>
        </div>
        <div className="stat-card">
          <h3>Usuarios</h3>
          <p className="stat-value">0</p>
          <small>Registrados</small>
        </div>
        <div className="stat-card">
          <h3>Favoritos</h3>
          <p className="stat-value">0</p>
          <small>Marcados</small>
        </div>
      </section>

      <section className="featured-section">
        <h2>Explorar</h2>
        <div className="featured-grid">
          <a href="/peliculas" className="featured-card">
            <div className="featured-icon">🎬</div>
            <h3>Catálogo de Películas</h3>
            <p>Explora nuestro catálogo completo</p>
          </a>
          <a href="/usuarios" className="featured-card">
            <div className="featured-icon">👥</div>
            <h3>Gestionar Usuarios</h3>
            <p>Administra tus usuarios</p>
          </a>
          <a href="/favoritos" className="featured-card">
            <div className="featured-icon">⭐</div>
            <h3>Mis Favoritos</h3>
            <p>Accede a tus películas favoritas</p>
          </a>
          <a href="/estadisticas" className="featured-card">
            <div className="featured-icon">📊</div>
            <h3>Estadísticas</h3>
            <p>Visualiza datos y reportes</p>
          </a>
        </div>
      </section>
    </div>
  )
}
