import React from 'react'

export default function MovieCard({ movie, isFavorite, onFavorite, onEdit, onDelete }) {
  return (
    <div className="movie-card">
      <div className="poster" style={{ backgroundImage: `url(${movie.poster || 'https://via.placeholder.com/300x450?text=' + encodeURIComponent(movie.titulo)})` }}>
        <div className="poster-overlay">
          {isFavorite && <span className="favorite-badge">★</span>}
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.titulo}</h3>
        <p className="director">{movie.director}</p>
        <p className="meta">{movie.genero} • {movie.año} • {movie.clasificacion}</p>
        <p className="duracion">{movie.duracion} minutos</p>
        <div className="actions">
          <button
            className={`btn btn-sm ${isFavorite ? 'btn-active' : ''}`}
            onClick={onFavorite}
            title={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
          >
            {isFavorite ? '★ Favorito' : '☆ Agregar'}
          </button>
          {onEdit && (
            <button className="btn btn-sm btn-edit" onClick={onEdit}>
              Editar
            </button>
          )}
          {onDelete && (
            <button className="btn btn-sm btn-danger" onClick={onDelete}>
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
