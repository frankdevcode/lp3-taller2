import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import MovieCard from '../components/MovieCard'

export default function Peliculas({ api, user }) {
  const [peliculas, setPeliculas] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    titulo: '',
    director: '',
    genero: '',
    duracion: 0,
    año: new Date().getFullYear(),
    clasificacion: 'PG',
    sinopsis: '',
  })
  const [editingId, setEditingId] = useState(null)
  const [skip, setSkip] = useState(0)
  const limit = 12
  const [favorites, setFavorites] = useState([])
  
  // Filtros avanzados
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    titulo: '',
    director: '',
    genero: '',
    clasificacion: '',
    año: '',
  })
  const [generos, setGeneros] = useState([])
  const [clasificaciones, setClasificaciones] = useState([])
  const [directores, setDirectores] = useState([])

  useEffect(() => {
    cargarDatos()
  }, [skip, filters])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      
      // Cargar opciones de filtros si es primera vez (no bloquea si falla)
      if (generos.length === 0) {
        try {
          const [gens, clasifs, dirs] = await Promise.all([
            api.getGeneros().catch(() => []),
            api.getClasificaciones().catch(() => []),
            api.getDirectores().catch(() => []),
          ])
          setGeneros(gens || [])
          setClasificaciones(clasifs || [])
          setDirectores(dirs || [])
        } catch (filterErr) {
          console.warn('Error cargando opciones de filtros:', filterErr)
          // Continuar sin filtros
        }
      }
      
      // Cargar películas con filtros
      const params = { skip, limit }
      if (filters.titulo) params.titulo = filters.titulo
      if (filters.director) params.director = filters.director
      if (filters.genero) params.genero = filters.genero
      if (filters.clasificacion) params.clasificacion = filters.clasificacion
      if (filters.año) params.año = filters.año

      const data = await api.searchPeliculas(params)
      setPeliculas(data || [])
      
      // Cargar favoritos solo si está autenticado
      if (user?.id) {
        try {
          const favs = await api.favoritosPorUsuario(user.id)
          setFavorites(favs.map(f => f.id_pelicula))
        } catch (favErr) {
          console.warn('Error cargando favoritos:', favErr)
        }
      }
    } catch (err) {
      console.error('Error en cargarDatos:', err)
      toast.error('Error al cargar películas')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
    setSkip(0)
  }

  const resetFilters = () => {
    setFilters({ titulo: '', director: '', genero: '', clasificacion: '', año: '' })
    setSkip(0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await api.updatePelicula(editingId, formData)
        toast.success('Película actualizada')
      } else {
        await api.createPelicula(formData)
        toast.success('Película creada')
      }
      resetForm()
      cargarDatos()
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Error al guardar')
    }
  }

  const resetForm = () => {
    setFormData({
      titulo: '',
      director: '',
      genero: '',
      duracion: 0,
      año: new Date().getFullYear(),
      clasificacion: 'PG',
      sinopsis: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (pelicula) => {
    setFormData(pelicula)
    setEditingId(pelicula.id)
    setShowForm(true)
    setShowFilters(false)
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro?')) {
      try {
        await api.deletePelicula(id)
        toast.success('Película eliminada')
        cargarDatos()
      } catch (err) {
        toast.error('Error al eliminar')
      }
    }
  }

  const handleToggleFavorite = async (pelicula_id) => {
    try {
      if (favorites.includes(pelicula_id)) {
        const favs = await api.favoritosPorUsuario(user.id)
        const favId = favs.find(f => f.id_pelicula === pelicula_id)?.id
        if (favId) await api.eliminarFavorito(favId)
        toast.success('Removido de favoritos')
        setFavorites(favorites.filter(f => f !== pelicula_id))
      } else {
        await api.marcarFavorito(user.id, pelicula_id)
        toast.success('Agregado a favoritos')
        setFavorites([...favorites, pelicula_id])
      }
    } catch (err) {
      toast.error('Error al actualizar favorito')
    }
  }

  if (loading && peliculas.length === 0) return <div className="loading">Cargando películas...</div>

  return (
    <div className="peliculas-page">
      <div className="page-header">
        <h1>🎬 Catálogo de Películas</h1>
        {user && (
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Nueva Película'}
          </button>
        )}
      </div>

      {/* Filtros Avanzados */}
      <div className="filters-section">
        <div className="filters-header">
          <button className="btn-toggle-filters" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? '▼' : '▶'} 🔍 Filtros Avanzados
          </button>
          {(filters.titulo || filters.director || filters.genero || filters.clasificacion || filters.año) && (
            <button className="btn-reset-filters" onClick={resetFilters}>
              Limpiar filtros
            </button>
          )}
        </div>

        {showFilters && (
          <div className="filters-grid">
            <div className="filter-group">
              <label>Título</label>
              <input
                type="text"
                name="titulo"
                value={filters.titulo}
                onChange={handleFilterChange}
                placeholder="Buscar por título..."
              />
            </div>

            <div className="filter-group">
              <label>Director</label>
              {directores.length > 0 ? (
                <select name="director" value={filters.director} onChange={handleFilterChange}>
                  <option value="">Todos los directores</option>
                  {directores.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              ) : (
                <input type="text" name="director" value={filters.director} onChange={handleFilterChange} placeholder="Buscar director..." />
              )}
            </div>

            <div className="filter-group">
              <label>Género</label>
              {generos.length > 0 ? (
                <select name="genero" value={filters.genero} onChange={handleFilterChange}>
                  <option value="">Todos los géneros</option>
                  {generos.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              ) : (
                <input type="text" name="genero" value={filters.genero} onChange={handleFilterChange} placeholder="Buscar género..." />
              )}
            </div>

            <div className="filter-group">
              <label>Clasificación</label>
              <select name="clasificacion" value={filters.clasificacion} onChange={handleFilterChange}>
                <option value="">Todas las clasificaciones</option>
                {clasificaciones.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Año</label>
              <input
                type="number"
                name="año"
                value={filters.año}
                onChange={handleFilterChange}
                placeholder="Ej: 2024"
              />
            </div>
          </div>
        )}
      </div>

      {/* Formulario Nueva Película */}
      {showForm && user && (
        <div className="card form-card">
          <h2>{editingId ? '✏️ Editar' : '➕ Nueva'} Película</h2>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Título *</label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Director *</label>
              <input
                type="text"
                value={formData.director}
                onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Género *</label>
              <input
                type="text"
                value={formData.genero}
                onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Año *</label>
              <input
                type="number"
                min="1900"
                max={new Date().getFullYear() + 5}
                value={formData.año}
                onChange={(e) => setFormData({ ...formData, año: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label>Duración (min) *</label>
              <input
                type="number"
                min="1"
                value={formData.duracion}
                onChange={(e) => setFormData({ ...formData, duracion: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label>Clasificación *</label>
              <select
                value={formData.clasificacion}
                onChange={(e) => setFormData({ ...formData, clasificacion: e.target.value })}
              >
                <option>G</option>
                <option>PG</option>
                <option>PG-13</option>
                <option>R</option>
              </select>
            </div>
            <div className="form-group full">
              <label>Sinopsis *</label>
              <textarea
                value={formData.sinopsis}
                onChange={(e) => setFormData({ ...formData, sinopsis: e.target.value })}
                required
                rows="4"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Actualizar' : 'Crear'} Película
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Resultados */}
      <div className="results-info">
        <p>{peliculas.length} película{peliculas.length !== 1 ? 's' : ''} encontrada{peliculas.length !== 1 ? 's' : ''}</p>
      </div>

      {peliculas.length > 0 ? (
        <>
          <div className="movies-grid">
            {peliculas.map((p) => (
              <div key={p.id} className="movie-item">
                <MovieCard
                  movie={p}
                  isFavorite={favorites.includes(p.id)}
                  onFavorite={() => handleToggleFavorite(p.id)}
                  onEdit={() => handleEdit(p)}
                  onDelete={() => handleDelete(p.id)}
                />
              </div>
            ))}
          </div>

          <div className="pagination">
            <button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))} className="btn">
              ← Anterior
            </button>
            <span className="pagination-info">Página {Math.floor(skip / limit) + 1}</span>
            <button onClick={() => setSkip(skip + limit)} className="btn">
              Siguiente →
            </button>
          </div>
        </>
      ) : (
        <div className="no-results">
          <p>No se encontraron películas con los filtros especificados.</p>
          <button className="btn" onClick={resetFilters}>Limpiar filtros</button>
        </div>
      )}
    </div>
  )
}
