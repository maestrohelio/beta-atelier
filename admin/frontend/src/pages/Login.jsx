import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { user, signin } = useAuth()

  const [email, setEmail] = useState('admin@betaatelier.com')
  const [password, setPassword] = useState('BetaAtelier2025')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) navigate('/admin/dashboard', { replace: true })
  }, [user, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await login(email, password)
      signin(res.data.token, res.data.user)
      navigate('/admin/dashboard')
    } catch {
      setError('Email ou password incorrectos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-shell">
      <section className="login-hero">
        <div>
          <h1>Beta Atelier</h1>
          <p>Painel de gestão de conteúdo, configurações e média.</p>
        </div>
      </section>

      <section className="login-form-wrap">
        <form className="login-form card" onSubmit={handleSubmit}>
          <h2>Entrar no Painel</h2>
          <p>Use as credenciais de administrador para continuar.</p>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <div className="error-text">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'A validar...' : 'Entrar'}
          </button>
        </form>
      </section>
    </div>
  )
}
