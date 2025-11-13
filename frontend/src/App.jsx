import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from './api'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Usuarios from './pages/Usuarios'
import Peliculas from './pages/Peliculas'
import Favoritos from './pages/Favoritos'
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

  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer position="bottom-right" theme="dark" />
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home api={api} />} />
          <Route path="/usuarios" element={<Usuarios api={api} />} />
          <Route path="/peliculas" element={<Peliculas api={api} user={user} />} />
          <Route path="/favoritos" element={<Favoritos api={api} user={user} />} />
          <Route path="/estadisticas" element={<Stats api={api} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
      <ToastContainer position="bottom-right" theme="dark" />
    </BrowserRouter>
  )
}
