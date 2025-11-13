import React, { useState } from 'react'

export default function Register({ api }) {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.register(correo, password)
      setMessage('Cuenta creada. Ahora inicia sesión.')
    } catch (err) {
      setMessage(err?.response?.data?.detail || 'Error al registrar')
    }
  }

  return (
    <form className="card auth" onSubmit={submit}>
      <h2>Crear cuenta</h2>
      {message && <div className="alert">{message}</div>}
      <label>Correo
        <input value={correo} onChange={e => setCorreo(e.target.value)} type="email" required />
      </label>
      <label>Contraseña
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      </label>
      <button className="btn" type="submit">Registrarse</button>
    </form>
  )
}
