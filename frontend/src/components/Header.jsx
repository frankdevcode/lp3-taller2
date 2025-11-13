import React from 'react'

export default function Header({ user, onLogout }) {
  return (
    <header className="site-header">
      <div className="brand">CineLab</div>
      <div className="header-actions">
        {user ? (
          <>
            <span className="user">{user.correo}</span>
            <button className="btn btn-ghost" onClick={onLogout}>Cerrar sesión</button>
          </>
        ) : (
          <span className="tagline">Bienvenido — Inicia sesión o crea una cuenta</span>
        )}
      </div>
    </header>
  )
}
