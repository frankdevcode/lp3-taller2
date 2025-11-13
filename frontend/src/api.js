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

const login = async (correo, password) => {
  // Backend expects form-data for OAuth2PasswordRequestForm
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

const fetchPeliculas = async (params) => {
  const resp = await instance.get('/peliculas', { params })
  return resp.data
}

const getPelicula = async (id) => {
  const resp = await instance.get(`/peliculas/${id}`)
  return resp.data
}

const marcarFavorito = async (usuario_id, pelicula_id, token) => {
  setAuthToken(token)
  const resp = await instance.post(`/usuarios/${usuario_id}/favoritos/${pelicula_id}`)
  return resp.data
}

const favoritosPorUsuario = async (usuario_id) => {
  const resp = await instance.get(`/usuarios/${usuario_id}/favoritos`)
  return resp.data
}

export default {
  instance,
  setAuthToken,
  login,
  register,
  fetchPeliculas,
  getPelicula,
  marcarFavorito,
  favoritosPorUsuario,
}
