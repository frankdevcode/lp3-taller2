import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from './api'
import Home from './pages/Home'
import './styles.css'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Inicializar token si existe
    const token = localStorage.getItem('token')
    if (token) {
      api.setAuthToken(token)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </BrowserRouter>
  )
}
