import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function PublicLayout({ user, onLogout }) {
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            🎬 MovieFlix
          </Link>
          <nav className="nav-public">
            {!user ? (
              <div className="auth-buttons">
                <Link to="/login" className="btn-login">
                  Iniciar sesión
                </Link>
                <Link to="/register" className="btn-register">
                  Registrarse
                </Link>
              </div>
            ) : (
              <div className="user-info">
                <span className="user-email">{user.correo}</span>
                <button onClick={onLogout} className="btn-logout">
                  Cerrar sesión
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
