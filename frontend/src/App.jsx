import React, { useEffect, useState } from 'react'
import api from './api'
import Header from './components/Header'
import Movies from './pages/Movies'
import Login from './pages/Login'
import Register from './pages/Register'
import Favorites from './pages/Favorites'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  const handleLogin = ({ token, user }) => {
    setToken(token)
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const handleLogout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <div className="app-root">
      <Header user={user} onLogout={handleLogout} />
      <main className="container">
        {!token ? (
          <div className="auth-forms">
            <Login onLogin={handleLogin} api={api} />
            <Register api={api} />
          </div>
        ) : (
          <>
            <Movies api={api} token={token} user={user} />
            <Favorites api={api} token={token} user={user} />
          </>
        )}
      </main>
    </div>
  )
}
