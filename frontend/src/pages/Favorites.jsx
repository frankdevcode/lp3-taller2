import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Favoritos({ api, user }) {
  const [favoritos, setFavoritos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFavoritos()
  }, [user])

  const loadFavoritos = async () => {
    try {
      setLoading(true)
      const data = await api.favoritosPorUsuario(user.id)
      setFavoritos(data)
    } catch (err) {
      toast.error('Error al cargar favoritos')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (favorito_id) => {
    if (confirm('¿Remover de favoritos?')) {
      try {
        await api.eliminarFavorito(favorito_id)
        toast.success('Removido de favoritos')
        loadFavoritos()
      } catch (err) {
        toast.error('Error al remover')
      }
    }
  }

  if (loading) return <div className="loading">Cargando...</div>

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Mis Favoritos</h1>
        <span className="counter">{favoritos.length}</span>
      </div>

      {favoritos.length === 0 ? (
        <div className="empty-state">
          <h2>Sin favoritos aún</h2>
          <p>Marca películas como favoritas para que aparezcan aquí</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Película</th>
                <th>Fecha</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {favoritos.map((f) => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>Película #{f.id_pelicula}</td>
                  <td>{new Date(f.fecha_marcado).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => handleRemove(f.id)}>
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
