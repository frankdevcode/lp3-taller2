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
  const [searchQuery, setSearchQuery] = useState('')
  const [skip, setSkip] = useState(0)
  const limit = 12
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    loadPeliculas()
    loadFavorites()
  }, [skip])

  const loadPeliculas = async () => {
    try {
      setLoading(true)
      const data = await api.fetchPeliculas({ skip, limit })
      setPeliculas(data)
    } catch (err) {
      toast.error('Error al cargar películas')
    } finally {
      setLoading(false)
    }
  }

  const loadFavorites = async () => {
    try {
      const favs = await api.favoritosPorUsuario(user.id)
      setFavorites(favs.map(f => f.id_pelicula))
    } catch (err) {
      console.error(err)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const data = await api.searchPeliculas({ titulo: searchQuery })
      setPeliculas(data)
    } catch (err) {
      toast.error('Error en búsqueda')
    } finally {
      setLoading(false)
    }
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
      loadPeliculas()
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
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro?')) {
      try {
        await api.deletePelicula(id)
        toast.success('Película eliminada')
        loadPeliculas()
      } catch (err) {
        toast.error('Error al eliminar')
      }
    }
  }

  const handleToggleFavorite = async (pelicula_id) => {
    try {
      if (favorites.includes(pelicula_id)) {
        const fav = await api.favoritosPorUsuario(user.id)
        const favId = fav.find(f => f.id_pelicula === pelicula_id)?.id
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

  if (loading && peliculas.length === 0) return <div className="loading">Cargando...</div>

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Catálogo de Películas</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Nueva Película'}
        </button>
      </div>

      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título..."
          />
          <button type="submit" className="btn">Buscar</button>
        </form>
      </div>

      {showForm && (
        <div className="card form-card">
          <h2>{editingId ? 'Editar' : 'Nueva'} Película</h2>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Director</label>
              <input
                type="text"
                value={formData.director}
                onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Género</label>
              <input
                type="text"
                value={formData.genero}
                onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Año</label>
              <input
                type="number"
                value={formData.año}
                onChange={(e) => setFormData({ ...formData, año: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label>Duración (min)</label>
              <input
                type="number"
                value={formData.duracion}
                onChange={(e) => setFormData({ ...formData, duracion: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label>Clasificación</label>
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
              <label>Sinopsis</label>
              <textarea
                value={formData.sinopsis}
                onChange={(e) => setFormData({ ...formData, sinopsis: e.target.value })}
                required
                rows="4"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Actualizar' : 'Crear'}
            </button>
          </form>
        </div>
      )}

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
        <button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>Anterior</button>
        <button onClick={() => setSkip(skip + limit)}>Siguiente</button>
      </div>
    </div>
  )
}
