import { createContext, useContext, useState, useEffect } from 'react'
import { settingsApi } from '../services/api'

const FALLBACK_CONFIG = {
  siteName: 'Beta Atelier',
  tagline: 'Onde o Design Encontra a Alta Costura',
  phone: '+351 914 888 808',
  phoneTel: 'tel:+351914888808',
  whatsapp: 'https://wa.me/351914888808?text=Olá%2C%20gostaria%20de%20pedir%20um%20orçamento.',
  email: 'elisabetearede67@gmail.com',
  emailLink: 'mailto:elisabetearede67@gmail.com',
  address: 'Rua Viela do Ribeiro, 3750-720, Recardães, Águeda',
  maps: 'https://maps.app.goo.gl/VRfNEGYPSL2VAMjm8',
}

const SiteContext = createContext(null)

export function SiteProvider({ children }) {
  const [config, setConfig] = useState(FALLBACK_CONFIG)
  const [loading, setLoading] = useState(true)
  const [apiOnline, setApiOnline] = useState(false)

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const settings = await settingsApi.getAll()
        if (settings && typeof settings === 'object') {
          setApiOnline(true)
          setConfig({
            siteName: settings.site_name ?? FALLBACK_CONFIG.siteName,
            tagline: settings.site_tagline ?? FALLBACK_CONFIG.tagline,
            phone: settings.contact_phone ?? FALLBACK_CONFIG.phone,
            phoneTel: `tel:${(settings.contact_phone ?? '').replace(/\s/g, '')}`,
            whatsapp: `https://wa.me/${(settings.whatsapp_number ?? '351914888808')}?text=Ol%C3%A1%2C%20gostaria%20de%20pedir%20um%20or%C3%A7amento.`,
            email: settings.contact_email ?? FALLBACK_CONFIG.email,
            emailLink: `mailto:${settings.contact_email ?? FALLBACK_CONFIG.email}`,
            address: settings.contact_address ?? FALLBACK_CONFIG.address,
            maps: settings.contact_maps ?? FALLBACK_CONFIG.maps,
          })
        }
      } catch (err) {
        setApiOnline(false)
        console.info('[SiteContext] API offline, usando fallback:', err?.message ?? err)
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [])

  return (
    <SiteContext.Provider value={{ config, loading, apiOnline }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSiteConfig() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSiteConfig deve ser usado dentro de SiteProvider')
  return ctx
}
