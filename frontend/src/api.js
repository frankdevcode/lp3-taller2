import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api'

const instance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

const setAuthToken = (token) => {
  if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete instance.defaults.headers.common['Authorization']
}

// AUTH
const login = async (correo, password) => {
  const data = new URLSearchParams()
  data.append('username', correo)
  data.append('password', password)
  const resp = await instance.post('/auth/login', data, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  return resp.data
}

const register = async (correo, password) => {
  const resp = await instance.post('/auth/register', { correo, password })
  return resp.data
}

const getCurrentUser = async (token) => {
  setAuthToken(token)
  const resp = await instance.get('/auth/me')
  return resp.data
}

// USUARIOS
const fetchUsuarios = async (params = {}) => {
  const resp = await instance.get('/usuarios', { params })
  return resp.data
}

const getUsuario = async (id) => {
  const resp = await instance.get(`/usuarios/${id}`)
  return resp.data
}

const createUsuario = async (usuario) => {
  const resp = await instance.post('/usuarios', usuario)
  return resp.data
}

const updateUsuario = async (id, usuario) => {
  const resp = await instance.patch(`/usuarios/${id}`, usuario)
  return resp.data
}

const deleteUsuario = async (id) => {
  const resp = await instance.delete(`/usuarios/${id}`)
  return resp.data
}

// PELICULAS
const fetchPeliculas = async (params = {}) => {
  const resp = await instance.get('/peliculas', { params })
  return resp.data
}

const getPelicula = async (id) => {
  const resp = await instance.get(`/peliculas/${id}`)
  return resp.data
}

const createPelicula = async (pelicula) => {
  const resp = await instance.post('/peliculas', pelicula)
  return resp.data
}

const updatePelicula = async (id, pelicula) => {
  const resp = await instance.patch(`/peliculas/${id}`, pelicula)
  return resp.data
}

const deletePelicula = async (id) => {
  const resp = await instance.delete(`/peliculas/${id}`)
  return resp.data
}

const searchPeliculas = async (params = {}) => {
  const resp = await instance.get('/peliculas/buscar', { params })
  return resp.data
}

// FAVORITOS
const marcarFavorito = async (usuario_id, pelicula_id) => {
  const resp = await instance.post(`/usuarios/${usuario_id}/favoritos/${pelicula_id}`)
  return resp.data
}

const favoritosPorUsuario = async (usuario_id) => {
  const resp = await instance.get(`/usuarios/${usuario_id}/favoritos`)
  return resp.data
}

const eliminarFavorito = async (favorito_id) => {
  const resp = await instance.delete(`/favoritos/${favorito_id}`)
  return resp.data
}

export default {
  instance,
  setAuthToken,
  login,
  register,
  getCurrentUser,
  fetchUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  fetchPeliculas,
  getPelicula,
  createPelicula,
  updatePelicula,
  deletePelicula,
  searchPeliculas,
  marcarFavorito,
  favoritosPorUsuario,
  eliminarFavorito,
}
