// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useSiteConfig } from '../../context/SiteContext'
import logoSrc from '../../assets/images/logo-beta-atelier.png'
import logoEffectIdea from '../../assets/images/logo-effect-idea-dark.png'

const NAV_LINKS = [
  { label: 'Principal',  to: ROUTES.HOME },
  { label: 'Sobre Nós',  to: ROUTES.SOBRE },
  { label: 'Cadeiras',   to: ROUTES.CADEIRAS },
  { label: 'Cortinados', to: ROUTES.CORTINADOS },
  { label: 'Púlpitos',   to: ROUTES.PULPITOS },
  { label: 'Restauro',   to: ROUTES.RESTAURO },
  { label: 'Contacto',   to: ROUTES.CONTATO },
]

const linkStyle = {
  color: 'rgb(146,146,146)',
  textDecoration: 'none',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '13px',
  lineHeight: '24px',
  transition: 'color 0.3s',
}

export default function Footer() {
  const { config } = useSiteConfig()
  const year = new Date().getFullYear()

  if (!config) return null

  return (
    <footer style={{ backgroundColor: 'rgb(2,2,2)', paddingTop: '80px' }}>
      {/* Grid principal */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 48px 64px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '48px',
      }}>

        {/* Col 1 — Marca */}
        <div>
          <img src={logoSrc} alt="Beta Atelier" style={{ height: '52px', width: 'auto', marginBottom: '20px' }} />
          <p style={{ color: 'rgb(146,146,146)', fontSize: '13px', lineHeight: '22px', fontFamily: 'Montserrat, sans-serif', maxWidth: '240px' }}>
            Artesanato de excelência em estofos e cortinados. Criamos espaços com identidade, sofisticação e durabilidade.
          </p>
        </div>

        {/* Col 2 — Links rápidos */}
        <div>
          <p style={{ color: 'rgb(181,172,151)', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
            Navegação
          </p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = 'rgb(181,172,151)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgb(146,146,146)'}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Col 3 — Contacto */}
        <div>
          <p style={{ color: 'rgb(181,172,151)', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
            Contacto
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href={config.maps}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'rgb(181,172,151)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgb(146,146,146)'}
            >
              {config.address}
            </a>
            <a
              href={config.phoneTel}
              style={linkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'rgb(181,172,151)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgb(146,146,146)'}
            >
              {config.phone}
            </a>
            <a
              href={config.emailLink}
              style={linkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'rgb(181,172,151)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgb(146,146,146)'}
            >
              {config.email}
            </a>
          </div>
        </div>
      </div>

      {/* Linha divisoria */}
      <div style={{ borderTop: '1px solid rgba(181,172,151,0.12)', margin: '0 48px' }} />

      {/* Rodape legal */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 48px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
      }}>
        <p style={{ color: 'rgb(80,80,80)', fontSize: '12px', fontFamily: 'Montserrat, sans-serif' }}>
          Beta Atelier © {year}. Todos os direitos reservados.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link to={ROUTES.PRIVACIDADE} style={{ ...linkStyle, fontSize: '12px', color: 'rgb(80,80,80)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgb(181,172,151)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgb(80,80,80)'}
          >Política de Privacidade</Link>
          <Link to={ROUTES.TERMOS} style={{ ...linkStyle, fontSize: '12px', color: 'rgb(80,80,80)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgb(181,172,151)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgb(80,80,80)'}
          >Termos de Uso</Link>
        </div>
      </div>

      {/* Assinatura Effect Idea */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        padding: '20px 48px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{ color: 'rgb(60,60,60)', fontSize: '12px', fontFamily: 'Montserrat, sans-serif' }}>
          Feito com ❤️ por
        </span>
        <a
          href="https://site.effectidea.com/#portfolio"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img
            src={logoEffectIdea}
            alt="Effect Idea"
            style={{ height: '20px', width: 'auto', opacity: 0.5, transition: 'opacity 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
          />
        </a>
      </div>
    </footer>
  )
}
