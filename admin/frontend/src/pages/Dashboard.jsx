import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'
import { getMedia } from '../api/media'
import { getSettings } from '../api/settings'

export default function Dashboard() {
  const navigate = useNavigate()

  const [apiStatus, setApiStatus] = useState('A verificar...')
  const [apiOnline, setApiOnline] = useState(false)
  const [mediaCount, setMediaCount] = useState(0)
  const [settings, setSettings] = useState({})

  useEffect(() => {
    let active = true

    Promise.all([
      api.get('/api/health'),
      getMedia({ limit: 5000 }),
      getSettings(),
    ])
      .then(([healthRes, mediaRes, settingsRes]) => {
        if (!active) return
        setApiOnline(healthRes.data?.status === 'ok')
        setApiStatus(healthRes.data?.status === 'ok' ? 'Online' : 'Offline')
        setMediaCount(Array.isArray(mediaRes.data) ? mediaRes.data.length : 0)
        setSettings(settingsRes.data ?? {})
      })
      .catch(() => {
        if (!active) return
        setApiOnline(false)
        setApiStatus('Offline')
      })

    return () => {
      active = false
    }
  }, [])

  const stats = useMemo(() => ([
    { label: 'PÁGINAS', value: 7, description: 'páginas do site ativas', status: 'neutral' },
    { label: 'CONFIGURAÇÕES', value: 8, description: 'parâmetros configurados', status: 'neutral' },
    { label: 'IMAGENS', value: mediaCount, description: 'ficheiros na biblioteca', status: 'neutral' },
    {
      label: 'ESTADO API',
      value: apiStatus,
      description: 'backend em localhost:3001',
      status: apiOnline ? 'online' : 'offline',
    },
  ]), [apiStatus, apiOnline, mediaCount])

  return (
    <div className="dashboard-grid">
      <section className="stats-grid">
        {stats.map((stat) => (
          <article key={stat.label} className={`card stat-card ${stat.status === 'offline' ? 'is-offline' : ''} ${stat.status === 'online' ? 'is-online' : ''}`}>
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-value ${stat.status === 'online' ? 'online' : stat.status === 'offline' ? 'error' : ''}`}>
              {stat.value}
            </div>
            <p className="stat-description">{stat.description}</p>
          </article>
        ))}
      </section>

      <section className="card system-status-card">
        <h3>Estado do Sistema</h3>
        <div className="system-status-list">
          <div className="system-status-item">
            <div>
              <p className="system-status-title">Site React</p>
              <p className="system-status-note">http://localhost:5174</p>
            </div>
            <span className="status-badge success">Activo</span>
          </div>

          <div className="system-status-item">
            <div>
              <p className="system-status-title">Backend API</p>
              <p className="system-status-note">http://localhost:3001/api/health</p>
            </div>
            <span className={`status-badge ${apiOnline ? 'success' : 'error'}`}>{apiOnline ? 'Online' : 'Offline'}</span>
          </div>

          <div className="system-status-item no-border">
            <div>
              <p className="system-status-title">Base de Dados</p>
              <p className="system-status-note">ligada ao backend local</p>
            </div>
            <span className={`status-badge ${apiOnline ? 'success' : 'error'}`}>{apiOnline ? 'Conectada' : 'Indisponível'}</span>
          </div>
        </div>
      </section>

      <section className="dashboard-columns">
        <article className="card">
          <h3>Acesso Rápido</h3>
          <p className="muted">Atalhos para as áreas principais do painel.</p>
          <div className="quick-actions">
            <button type="button" className="quick-action-btn" onClick={() => navigate('/admin/settings')}>
              Editar Configurações
            </button>
            <button type="button" className="quick-action-btn" onClick={() => navigate('/admin/content')}>
              Editar Conteúdo
            </button>
            <button type="button" className="quick-action-btn" onClick={() => navigate('/admin/media')}>
              Gerir Imagens
            </button>
          </div>
        </article>

        <article className="card">
          <h3>Informações do Site</h3>
          <div className="info-list">
            <div><strong>Nome:</strong> {settings.site_name ?? '-'}</div>
            <div><strong>Telefone:</strong> {settings.contact_phone ?? '-'}</div>
            <div><strong>Email:</strong> {settings.contact_email ?? '-'}</div>
            <div><strong>Morada:</strong> {settings.contact_address ?? '-'}</div>
          </div>
        </article>
      </section>
    </div>
  )
}
