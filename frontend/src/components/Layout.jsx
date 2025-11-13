import React from 'react'
import { Link } from 'react-router-dom'

export default function Layout({ user, onLogout, children }) {
  return (
    <div className="app-root">
      <header className="site-header">
        <div className="header-left">
          <Link to="/" className="brand">CineLab</Link>
        </div>
        <nav className="navbar">
          <Link to="/">Inicio</Link>
          <Link to="/peliculas">Películas</Link>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/estadisticas">Estadísticas</Link>
        </nav>
        <div className="header-right">
          <span className="user-name">{user?.correo}</span>
          <button className="btn btn-ghost" onClick={onLogout}>Cerrar sesión</button>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}
