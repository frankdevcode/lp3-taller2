import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Home({ api, user }) {
  const [stats, setStats] = useState({ total_usuarios: 0, total_peliculas: 0, total_favoritos: 0, pelicula_mas_popular: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await api.getResumenEstadisticas()
      setStats(data)
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
          <p className="stat-value">{stats.total_peliculas}</p>
          <small>Total en catálogo</small>
        </div>
        <div className="stat-card">
          <h3>Usuarios</h3>
          <p className="stat-value">{stats.total_usuarios}</p>
          <small>Registrados</small>
        </div>
        <div className="stat-card">
          <h3>Favoritos</h3>
          <p className="stat-value">{stats.total_favoritos}</p>
          <small>Marcados</small>
        </div>
        {stats.pelicula_mas_popular && (
          <div className="stat-card">
            <h3>🏆 Más Popular</h3>
            <p className="stat-value-text">{stats.pelicula_mas_popular.titulo}</p>
            <small>{stats.pelicula_mas_popular.favoritos} ⭐</small>
          </div>
        )}
      </section>

      <section className="featured-section">
        <h2>Explorar</h2>
        <div className="featured-grid">
          <a href="/peliculas" className="featured-card">
            <div className="featured-icon">🎬</div>
            <h3>Catálogo de Películas</h3>
            <p>Explora nuestro catálogo completo</p>
          </a>
          {user && (
            <>
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
            </>
          )}
        </div>
      </section>
    </div>
  )
}
