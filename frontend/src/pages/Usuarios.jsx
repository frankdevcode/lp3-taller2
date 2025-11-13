import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Usuarios({ api }) {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ nombre: '', correo: '' })
  const [editingId, setEditingId] = useState(null)
  const [skip, setSkip] = useState(0)
  const limit = 10

  useEffect(() => {
    loadUsuarios()
  }, [skip])

  const loadUsuarios = async () => {
    try {
      setLoading(true)
      const data = await api.fetchUsuarios({ skip, limit })
      setUsuarios(data)
    } catch (err) {
      toast.error('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await api.updateUsuario(editingId, formData)
        toast.success('Usuario actualizado')
      } else {
        await api.createUsuario({ ...formData, password: 'temp123456' })
        toast.success('Usuario creado')
      }
      setFormData({ nombre: '', correo: '' })
      setEditingId(null)
      setShowForm(false)
      loadUsuarios()
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Error al guardar')
    }
  }

  const handleEdit = (usuario) => {
    setFormData({ nombre: usuario.nombre, correo: usuario.correo })
    setEditingId(usuario.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro?')) {
      try {
        await api.deleteUsuario(id)
        toast.success('Usuario eliminado')
        loadUsuarios()
      } catch (err) {
        toast.error('Error al eliminar')
      }
    }
  }

  if (loading && usuarios.length === 0) return <div className="loading">Cargando...</div>

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestionar Usuarios</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Nuevo Usuario'}
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <h2>{editingId ? 'Editar' : 'Nuevo'} Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Correo</label>
              <input
                type="email"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Actualizar' : 'Crear'}
            </button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{new Date(u.fecha_registro).toLocaleDateString()}</td>
                <td className="actions">
                  <button className="btn btn-sm" onClick={() => handleEdit(u)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>Anterior</button>
        <button onClick={() => setSkip(skip + limit)}>Siguiente</button>
      </div>
    </div>
  )
}
