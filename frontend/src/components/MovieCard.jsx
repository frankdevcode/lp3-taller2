import React from 'react'

export default function MovieCard({ movie, onFavorite }) {
  return (
    <div className="movie-card">
      <div className="poster" style={{ backgroundImage: `url(${movie.poster || 'https://via.placeholder.com/300x450?text=Poster'})` }} />
      <div className="movie-info">
        <h3>{movie.titulo}</h3>
        <p className="meta">{movie.genero} • {movie.año}</p>
        <div className="actions">
          <button className="btn" onClick={() => onFavorite(movie.id)}>Favorito</button>
        </div>
      </div>
    </div>
  )
}
