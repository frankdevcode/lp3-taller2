import React, { useEffect, useState } from 'react'

export default function Favorites({ api, token, user }) {
  const [favs, setFavs] = useState([])

  useEffect(() => {
    if (user?.id) load()
  }, [user])

  const load = async () => {
    try {
      const data = await api.favoritosPorUsuario(user.id)
      setFavs(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="favorites-section">
      <h2>Tus Favoritos</h2>
      <div className="favorites-list">
        {favs.length === 0 && <div className="muted">No hay favoritos aún.</div>}
        {favs.map(f => (
          <div key={f.id} className="fav-item">ID Película: {f.id_pelicula}</div>
        ))}
      </div>
    </section>
  )
}
