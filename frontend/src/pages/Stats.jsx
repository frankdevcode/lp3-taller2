import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Pie, Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function Stats({ api }) {
  const [stats, setStats] = useState(null)
  const [topPeliculas, setTopPeliculas] = useState([])
  const [peliculasRecientes, setPeliculasRecientes] = useState([])
  const [usuariosActivos, setUsuariosActivos] = useState([])
  const [generos, setGeneros] = useState({})
  const [clasificaciones, setClasificaciones] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarEstadisticas()
  }, [])

  const cargarEstadisticas = async () => {
    try {
      setLoading(true)
      const [statsData, generoData, clasifData, topPeli, pelisRecientes, usuariosAct] = await Promise.all([
        api.getResumenEstadisticas(),
        api.getPeliculasPorGenero(),
        api.getPeliculasPorClasificacion(),
        api.getTopPeliculasPopulares(10),
        api.getPeliculasRecientes(10),
        api.getUsuariosMasActivos(10),
      ])

      setStats(statsData)
      setGeneros(generoData)
      setClasificaciones(clasifData)
      setTopPeliculas(topPeli)
      setPeliculasRecientes(pelisRecientes)
      setUsuariosActivos(usuariosAct)
    } catch (err) {
      toast.error('Error al cargar estadísticas')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Cargando estadísticas...</div>

  // Datos para gráficos
  const generoLabels = Object.keys(generos)
  const generoValues = Object.values(generos)

  const clasifLabels = Object.keys(clasificaciones)
  const clasifValues = Object.values(clasificaciones)

  const topPeliculasLabels = topPeliculas.map(p => p.titulo)
  const topPeliculasValues = topPeliculas.map(p => p.favoritos)

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: { color: '#e6eef6', font: { size: 12 } },
      },
      title: {
        display: true,
        color: '#e6eef6',
      },
    },
  }

  const generoChartData = {
    labels: generoLabels,
    datasets: [
      {
        label: 'Cantidad de películas',
        data: generoValues,
        backgroundColor: [
          '#e50914',
          '#ff6b6b',
          '#ff8c8c',
          '#ffa0a0',
          '#ffb3b3',
          '#ffc6c6',
        ],
        borderColor: '#0b0f14',
        borderWidth: 2,
      },
    ],
  }

  const clasifChartData = {
    labels: clasifLabels,
    datasets: [
      {
        label: 'Cantidad de películas',
        data: clasifValues,
        backgroundColor: ['#e50914', '#b80710', '#8a050a', '#5c0408'],
        borderColor: '#0b0f14',
        borderWidth: 2,
      },
    ],
  }

  const topPeliculasChartData = {
    labels: topPeliculasLabels,
    datasets: [
      {
        label: 'Favoritos',
        data: topPeliculasValues,
        borderColor: '#e50914',
        backgroundColor: 'rgba(229, 9, 20, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  }

  return (
    <div className="stats-page">
      <div className="stats-header">
        <h1>📊 Estadísticas y Reportes</h1>
        <button onClick={cargarEstadisticas} className="btn-refresh">
          🔄 Actualizar
        </button>
      </div>

      {/* Resumen General */}
      <section className="resumen-section">
        <h2>Resumen General</h2>
        <div className="stats-grid">
          <div className="stat-card-large">
            <div className="stat-icon">👥</div>
            <h3>Usuarios</h3>
            <p className="stat-number">{stats?.total_usuarios || 0}</p>
            <small>Registrados</small>
          </div>
          <div className="stat-card-large">
            <div className="stat-icon">🎬</div>
            <h3>Películas</h3>
            <p className="stat-number">{stats?.total_peliculas || 0}</p>
            <small>En catálogo</small>
          </div>
          <div className="stat-card-large">
            <div className="stat-icon">⭐</div>
            <h3>Favoritos</h3>
            <p className="stat-number">{stats?.total_favoritos || 0}</p>
            <small>Marcados</small>
          </div>
          <div className="stat-card-large">
            <div className="stat-icon">🏆</div>
            <h3>Más Popular</h3>
            <p className="stat-title">{stats?.pelicula_mas_popular?.titulo || 'N/A'}</p>
            <small>{stats?.pelicula_mas_popular?.favoritos || 0} ⭐</small>
          </div>
        </div>
      </section>

      {/* Gráficos */}
      <section className="charts-section">
        <div className="chart-container">
          <h3>Películas por Género</h3>
          {generoLabels.length > 0 ? (
            <Pie data={generoChartData} options={chartOptions} />
          ) : (
            <p className="no-data">Sin datos</p>
          )}
        </div>

        <div className="chart-container">
          <h3>Películas por Clasificación</h3>
          {clasifLabels.length > 0 ? (
            <Pie data={clasifChartData} options={chartOptions} />
          ) : (
            <p className="no-data">Sin datos</p>
          )}
        </div>
      </section>

      {/* Top Películas Populares */}
      <section className="top-section">
        <div className="chart-container">
          <h3>Top 10 Películas Más Populares</h3>
          {topPeliculasLabels.length > 0 ? (
            <Bar data={topPeliculasChartData} options={chartOptions} />
          ) : (
            <p className="no-data">Sin datos</p>
          )}
        </div>
      </section>

      {/* Tablas de Datos */}
      <div className="tables-grid">
        {/* Películas Recientes */}
        <section className="table-section">
          <h3>📽️ Películas Recientes</h3>
          {peliculasRecientes.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Director</th>
                  <th>Año</th>
                  <th>Género</th>
                </tr>
              </thead>
              <tbody>
                {peliculasRecientes.map((p) => (
                  <tr key={p.id}>
                    <td>{p.titulo}</td>
                    <td>{p.director}</td>
                    <td>{p.año}</td>
                    <td>{p.genero}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">Sin películas recientes</p>
          )}
        </section>

        {/* Usuarios Más Activos */}
        <section className="table-section">
          <h3>🌟 Usuarios Más Activos</h3>
          {usuariosActivos.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Favoritos</th>
                </tr>
              </thead>
              <tbody>
                {usuariosActivos.map((u, idx) => (
                  <tr key={u.id}>
                    <td>{u.correo}</td>
                    <td className="favoritos-count">{u.favoritos_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">Sin usuarios activos</p>
          )}
        </section>
      </div>
    </div>
  )
}
