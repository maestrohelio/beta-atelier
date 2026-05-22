import { useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Settings,
  FileText,
  Image,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Configurações', path: '/admin/settings', icon: Settings },
  { label: 'Conteúdo', path: '/admin/content', icon: FileText },
  { label: 'Média', path: '/admin/media', icon: Image },
]

const TITLE_MAP = {
  '/admin/dashboard': 'Dashboard',
  '/admin/settings': 'Configurações do Site',
  '/admin/content': 'Gestão de Conteúdo',
  '/admin/media': 'Gestão de Imagens',
}

export default function Layout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, signout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://site-beta-atelier-production.up.railway.app'

  const title = useMemo(() => TITLE_MAP[pathname] ?? 'Painel Administrativo', [pathname])

  const handleSignout = () => {
    signout()
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div>
          <div className="brand-logo-block">
            <img
              src="/logo-beta-atelier.png"
              alt="Beta Atelier"
              style={{
                height: '40px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                marginBottom: '6px',
              }}
            />
            <p style={{
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              margin: 0,
            }}
            >
              Painel Admin
            </p>
          </div>

          <div className="gold-separator" />

          <nav className="sidebar-nav">
            {navItems.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={16} strokeWidth={1.5} />
                <span className="sidebar-label">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <span>{user?.name ?? 'Administrador'}</span>
            <small>{user?.email}</small>
          </div>
          <button type="button" className="btn-ghost" onClick={handleSignout}>Sair</button>
        </div>
      </aside>

      {sidebarOpen && <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />}

      <section className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-left">
            <button type="button" className="menu-btn" onClick={() => setSidebarOpen((open) => !open)}>
              <span className="menu-btn-bars" />
              <span className="menu-btn-bars" />
              <span className="menu-btn-bars" />
            </button>
            <h2>{title}</h2>
          </div>

          <div className="topbar-right">
            <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Ver Site
            </a>
            <div className="avatar">
              {(user?.name?.[0] ?? 'A').toUpperCase()}
            </div>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </section>
    </div>
  )
}
