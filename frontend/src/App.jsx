import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from './api'
import Layout from './components/Layout'
import PublicLayout from './components/PublicLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Usuarios from './pages/Usuarios'
import Peliculas from './pages/Peliculas'
import Favoritos from './pages/Favorites'
import Stats from './pages/Stats'
import './styles.css'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))
  const [loading, setLoading] = useState(!!token)

  useEffect(() => {
    if (token && !user) {
      api.getCurrentUser(token)
        .then(u => {
          setUser(u)
          localStorage.setItem('user', JSON.stringify(u))
        })
        .catch(() => {
          setToken(null)
          localStorage.removeItem('token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  const handleLogin = async (correo, password) => {
    const data = await api.login(correo, password)
    setToken(data.access_token)
    api.setAuthToken(data.access_token)
    const user = await api.getCurrentUser(data.access_token)
    setUser(user)
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const handleRegister = async (correo, password) => {
    await api.register(correo, password)
  }

  const handleLogout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas (con PublicLayout para mostrar Home con botones Auth) */}
        <Route element={<PublicLayout user={user} onLogout={handleLogout} onAuthClick={() => {}} />}>
          <Route path="/" element={<Home api={api} user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
        </Route>

        {/* Rutas protegidas (requieren autenticación) */}
        {token ? (
          <Route element={<Layout user={user} onLogout={handleLogout} />}>
            <Route path="/peliculas" element={<Peliculas api={api} user={user} />} />
            <Route path="/usuarios" element={<Usuarios api={api} />} />
            <Route path="/favoritos" element={<Favoritos api={api} user={user} />} />
            <Route path="/estadisticas" element={<Stats api={api} />} />
          </Route>
        ) : null}

        {/* Redirecciones */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </BrowserRouter>
  )
}
