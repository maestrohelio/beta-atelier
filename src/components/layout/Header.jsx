// src/components/layout/Header.jsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ROUTES } from '../../constants/routes'
import logoSrc from '../../assets/images/logo-beta-atelier.png'

const NAV_LINKS = [
  { label: 'Principal',   to: ROUTES.HOME },
  { label: 'Sobre Nós',   to: ROUTES.SOBRE },
  { label: 'Cadeiras',    to: ROUTES.CADEIRAS },
  { label: 'Cortinados',  to: ROUTES.CORTINADOS },
  { label: 'Púlpitos',    to: ROUTES.PULPITOS },
  { label: 'Restauro',    to: ROUTES.RESTAURO },
  { label: 'Contacto',    to: ROUTES.CONTATO },
]

export default function Header() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const { pathname }                    = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 48px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
          backgroundColor: scrolled ? 'rgba(2,2,2,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(181,172,151,0.15)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link to={ROUTES.HOME} style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logoSrc}
            alt="Beta Atelier"
            style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Nav Desktop */}
        <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = pathname === to
            return (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 500,
                  fontSize: '13px',
                  letterSpacing: '1px',
                  textDecoration: 'none',
                  color: isActive ? 'rgb(181,172,151)' : 'rgb(255,255,255)',
                  position: 'relative',
                  paddingBottom: '4px',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgb(181,172,151)'}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = 'rgb(255,255,255)'
                }}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      backgroundColor: 'rgb(181,172,151)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Hambúrguer Mobile */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Abrir menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            flexDirection: 'column',
            gap: '5px',
            padding: '8px',
          }}
          className="mobile-menu-btn"
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                backgroundColor: 'rgb(255,255,255)',
              }}
              animate={
                menuOpen
                  ? i === 0 ? { rotate: 45, y: 6.5 }
                  : i === 1 ? { opacity: 0 }
                  : { rotate: -45, y: -6.5 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.25 }}
            />
          ))}
        </button>
      </motion.header>

      {/* Menu Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              zIndex: 999,
              backgroundColor: 'rgba(2,2,2,0.97)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(181,172,151,0.15)',
              padding: '32px 48px 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {NAV_LINKS.map(({ label, to }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <Link
                  to={to}
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '28px',
                    fontWeight: 400,
                    color: pathname === to ? 'rgb(181,172,151)' : 'rgb(255,255,255)',
                    textDecoration: 'none',
                    letterSpacing: '1px',
                    display: 'block',
                    transition: 'color 0.3s',
                  }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
