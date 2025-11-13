import React, { useState } from 'react'

export default function Login({ onLogin, api }) {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    try {
      const data = await api.login(correo, password)
      // data: { access_token, token_type }
      const token = data.access_token
      api.setAuthToken(token)
      // Backend token encodes sub=correo; we store user minimal info
      onLogin({ token, user: { correo } })
    } catch (err) {
      setError(err?.response?.data?.detail || 'Error en login')
    }
  }

  return (
    <form className="card auth" onSubmit={submit}>
      <h2>Iniciar sesión</h2>
      {error && <div className="alert">{error}</div>}
      <label>Correo
        <input value={correo} onChange={e => setCorreo(e.target.value)} type="email" required />
      </label>
      <label>Contraseña
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      </label>
      <button className="btn" type="submit">Entrar</button>
    </form>
  )
}
