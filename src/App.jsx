import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { ROUTES } from './constants/routes'

const Home = lazy(() => import('./pages/Home'))
const Cadeiras = lazy(() => import('./pages/Cadeiras'))
const Cortinados = lazy(() => import('./pages/Cortinados'))
const Pulpitos = lazy(() => import('./pages/Pulpitos'))
const Restauro = lazy(() => import('./pages/Restauro'))
const Sobre = lazy(() => import('./pages/Sobre'))
const Contato = lazy(() => import('./pages/Contato'))
const PrivacidadePolicy = lazy(() => import('./pages/PrivacidadePolicy'))
const TermosUso = lazy(() => import('./pages/TermosUso'))

const PageLoader = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgb(21,21,21)',
  }}>
    <div style={{
      width: 40,
      height: 40,
      border: '1px solid rgba(181,172,151,0.3)',
      borderTop: '1px solid rgb(181,172,151)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
  </div>
)

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.CADEIRAS} element={<Cadeiras />} />
          <Route path={ROUTES.CORTINADOS} element={<Cortinados />} />
          <Route path={ROUTES.PULPITOS} element={<Pulpitos />} />
          <Route path={ROUTES.RESTAURO} element={<Restauro />} />
          <Route path={ROUTES.SOBRE} element={<Sobre />} />
          <Route path={ROUTES.CONTATO} element={<Contato />} />
          <Route path={ROUTES.PRIVACIDADE} element={<PrivacidadePolicy />} />
          <Route path={ROUTES.TERMOS} element={<TermosUso />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
