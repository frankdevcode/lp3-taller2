import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Stats({ api }) {
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalPeliculas: 0,
    totalFavoritos: 0,
    generosCount: {},
    clasificacionesCount: {},
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      // Load usuarios
      const usuarios = await api.fetchUsuarios({ limit: 1000 })
      // Load películas
      const peliculas = await api.fetchPeliculas({ limit: 1000 })

      // Count by género and clasificación
      const generosCount = {}
      const clasificacionesCount = {}
      peliculas.forEach((p) => {
        generosCount[p.genero] = (generosCount[p.genero] || 0) + 1
        clasificacionesCount[p.clasificacion] = (clasificacionesCount[p.clasificacion] || 0) + 1
      })

      setStats({
        totalUsuarios: usuarios.length,
        totalPeliculas: peliculas.length,
        totalFavoritos: 0,
        generosCount,
        clasificacionesCount,
        peliculas,
      })
    } catch (err) {
      toast.error('Error al cargar estadísticas')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Cargando...</div>

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Estadísticas y Reportes</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Usuarios</h3>
          <p className="stat-value">{stats.totalUsuarios}</p>
        </div>
        <div className="stat-card">
          <h3>Total Películas</h3>
          <p className="stat-value">{stats.totalPeliculas}</p>
        </div>
        <div className="stat-card">
          <h3>Géneros</h3>
          <p className="stat-value">{Object.keys(stats.generosCount).length}</p>
        </div>
        <div className="stat-card">
          <h3>Clasificaciones</h3>
          <p className="stat-value">{Object.keys(stats.clasificacionesCount).length}</p>
        </div>
      </div>

      <section className="stats-section">
        <h2>Películas por Género</h2>
        <div className="stats-table">
          {Object.entries(stats.generosCount).map(([genre, count]) => (
            <div key={genre} className="stat-row">
              <span className="stat-label">{genre}</span>
              <div className="stat-bar">
                <div className="bar" style={{ width: `${(count / stats.totalPeliculas) * 100}%` }}></div>
              </div>
              <span className="stat-num">{count}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <h2>Películas por Clasificación</h2>
        <div className="stats-table">
          {Object.entries(stats.clasificacionesCount).map(([clasificacion, count]) => (
            <div key={clasificacion} className="stat-row">
              <span className="stat-label">{clasificacion}</span>
              <div className="stat-bar">
                <div className="bar" style={{ width: `${(count / stats.totalPeliculas) * 100}%` }}></div>
              </div>
              <span className="stat-num">{count}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <h2>Películas Recientes</h2>
        <div className="movies-list">
          {stats.peliculas &&
            stats.peliculas.slice(0, 5).map((p) => (
              <div key={p.id} className="movie-row">
                <h4>{p.titulo}</h4>
                <p>{p.director} • {p.año} • {p.duracion}m</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
