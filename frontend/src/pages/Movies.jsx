import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'

export default function Movies({ api, token, user }) {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const data = await api.fetchPeliculas()
    setMovies(data)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    const data = await api.fetchPeliculas({ buscar: query })
    setMovies(data)
  }

  const handleFavorite = async (pelicula_id) => {
    try {
      await api.marcarFavorito(user.id, pelicula_id, token)
      alert('Marcada como favorita')
    } catch (err) {
      alert(err?.response?.data?.detail || 'Error al marcar favorito')
    }
  }

  return (
    <section className="movies-section">
      <div className="movies-header">
        <h2>Explorar Películas</h2>
        <form onSubmit={handleSearch} className="search">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar título o director" />
          <button className="btn" type="submit">Buscar</button>
        </form>
      </div>
      <div className="movies-grid">
        {movies.map(m => (
          <MovieCard key={m.id} movie={m} onFavorite={handleFavorite} />
        ))}
      </div>
    </section>
  )
}
