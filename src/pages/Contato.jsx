import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'
import SectionLabel from '../components/ui/SectionLabel'
import GoldDivider from '../components/ui/GoldDivider'
import { useSiteConfig } from '../context/SiteContext'
import { usePexels } from '../hooks/usePexels'
import { useSectionContent } from '../hooks/useSectionContent'

const SITE_CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-12'

const FALLBACK_CONTACT = {
  phone: '+351 914 888 808',
  phoneTel: 'tel:+351914888808',
  whatsapp: 'https://wa.me/351914888808?text=Olá%2C%20vim%20pela%20página%20de%20contacto%20do%20site.',
  whatsappNow: 'https://wa.me/351914888808?text=Olá%2C%20vim%20pela%20página%20de%20contacto%20e%20gostaria%20de%20falar%20convosco.',
  whatsappCta: 'https://wa.me/351914888808?text=Olá%2C%20quero%20falar%20com%20a%20Beta%20Atelier.',
  email: 'elisabetearede67@gmail.com',
  emailLink: 'mailto:elisabetearede67@gmail.com',
  address: 'Rua Viela do Ribeiro, 3750-720, Recardães, Águeda',
  maps: 'https://maps.app.goo.gl/VRfNEGYPSL2VAMjm8',
}

const inputStyle = {
  backgroundColor: 'rgb(30,30,30)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'rgb(255,255,255)',
  borderRadius: '4px',
  padding: '14px 16px',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '14px',
  transition: 'border-color 0.3s ease',
  width: '100%',
  display: 'block',
  marginBottom: '16px',
  outline: 'none',
}

function PexelsPlaceholder({ minHeight = 260, className = '' }) {
  return (
    <motion.div
      className={className}
      style={{ minHeight, backgroundColor: 'rgb(30,30,30)' }}
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function PageHero() {
  const heroPexels = usePexels('elegant studio interior warm', {
    perPage: 1,
    orientation: 'landscape',
    page: 1,
  })
  const { content } = useSectionContent('contato', 'hero', {
    title: 'Contacto',
    subtitle: 'Estamos prontos para ouvir o seu projecto',
    breadcrumb: 'Principal / Contacto',
  })

  const heroImage = content?.hero_image || content?.image || (heroPexels.photos[0]
    ? heroPexels.getUrl(heroPexels.photos[0], 'large2x')
    : null)

  return (
    <section className="relative h-[50vh] min-h-[340px] overflow-hidden">
      {heroImage ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ) : (
        <PexelsPlaceholder className="absolute inset-0 w-full h-full" minHeight={340} />
      )}

      <div className="absolute inset-0 bg-black/60" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`${SITE_CONTAINER} relative z-10 h-full flex items-center justify-center text-center`}
        style={{ paddingTop: '80px' }}
      >
        <div>
          <p className="text-[12px] uppercase tracking-[2px] text-white/70 mb-4">{content?.breadcrumb}</p>
          <h1 className="text-[42px] md:text-[58px] leading-[1.02] text-offwhite">{content?.title}</h1>
          <p className="mt-4 text-offwhite/82">{content?.subtitle}</p>
          <GoldDivider className="max-w-[220px] mx-auto mt-8" />
        </div>
      </motion.div>
    </section>
  )
}

function ContactGridSection() {
  const { config } = useSiteConfig()
  const contact = { ...FALLBACK_CONTACT, ...(config ?? {}) }

  const [form, setForm] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    if (!form.nome || !form.email || !form.assunto || !form.mensagem) {
      setError('Preencha todos os campos obrigatórios.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_ADMIN_API_BASE ?? 'http://localhost:3001'}/api/email/send`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: form.nome,
            email: form.email,
            assunto: form.assunto,
            mensagem: form.mensagem,
          }),
        },
      )

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Erro ao enviar mensagem. Tente novamente.')
        return
      }

      setSuccess(true)
      setForm({
        nome: '',
        email: '',
        assunto: '',
        mensagem: '',
      })
    } catch {
      setError('Erro de ligação ao servidor. Verifique a sua ligação e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-[100px] bg-dark">
      <div className={`${SITE_CONTAINER} grid md:grid-cols-[11fr_9fr] gap-10 md:gap-14 items-start`}>
        <ScrollReveal variant="fadeUp">
          <SectionLabel>Envie uma Mensagem</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] leading-[1.06] text-offwhite mb-8">Fale Connosco</h2>

          <form onSubmit={onSubmit} noValidate>
            <input
              type="text"
              name="nome"
              required
              value={form.nome}
              onChange={onChange}
              placeholder="O seu nome"
              style={inputStyle}
              onFocus={(event) => { event.currentTarget.style.borderColor = 'rgb(181,172,151)' }}
              onBlur={(event) => { event.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />

            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={onChange}
              placeholder="O seu email"
              style={inputStyle}
              onFocus={(event) => { event.currentTarget.style.borderColor = 'rgb(181,172,151)' }}
              onBlur={(event) => { event.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />

            <input
              type="text"
              name="assunto"
              required
              value={form.assunto}
              onChange={onChange}
              placeholder="Ex: Orçamento para cadeiras"
              style={inputStyle}
              onFocus={(event) => { event.currentTarget.style.borderColor = 'rgb(181,172,151)' }}
              onBlur={(event) => { event.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />

            <textarea
              name="mensagem"
              required
              value={form.mensagem}
              onChange={onChange}
              placeholder="Descreva o seu projecto ou pedido..."
              style={{ ...inputStyle, minHeight: '140px', resize: 'vertical', marginBottom: '20px' }}
              onFocus={(event) => { event.currentTarget.style.borderColor = 'rgb(181,172,151)' }}
              onBlur={(event) => { event.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
              style={{ opacity: loading ? 0.7 : 1, pointerEvents: loading ? 'none' : 'auto' }}
            >
              {loading ? 'A enviar...' : 'Enviar Mensagem'}
            </button>

            {success && (
              <p className="mt-4 text-[14px]" style={{ color: 'rgb(181,172,151)' }}>
                Mensagem enviada com sucesso! Entraremos em contacto brevemente.
              </p>
            )}

            {error && (
              <p className="mt-4 text-[14px]" style={{ color: 'rgb(184,134,11)' }}>
                {error}
              </p>
            )}
          </form>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.1}>
          <SectionLabel>Informações de Contacto</SectionLabel>

          <div className="mt-6 p-7 md:p-8 border border-subtle bg-black/25 space-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-[2px] text-gold mb-2">Morada</p>
              <p className="text-offwhite/84 leading-7">{contact.address}</p>
              <a
                href={contact.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-gold text-[13px] hover:text-offwhite transition-colors"
              >
                Ver no mapa
              </a>
            </div>

            <GoldDivider />

            <div>
              <p className="text-[11px] uppercase tracking-[2px] text-gold mb-2">Telefone</p>
              <a href={contact.phoneTel} className="text-offwhite/84 hover:text-gold transition-colors block">
                {contact.phone}
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-gold text-[13px] hover:text-offwhite transition-colors"
              >
                Enviar mensagem pelo WhatsApp
              </a>
            </div>

            <GoldDivider />

            <div>
              <p className="text-[11px] uppercase tracking-[2px] text-gold mb-2">Email</p>
              <a href={contact.emailLink} className="text-offwhite/84 hover:text-gold transition-colors">
                {contact.email}
              </a>
            </div>

            <GoldDivider />

            <div>
              <p className="text-[11px] uppercase tracking-[2px] text-gold mb-2">Atendimento</p>
              <p className="text-offwhite/84 leading-7">Segunda a Sexta: 9h00 - 18h00</p>
              <p className="text-offwhite/84 leading-7">Sábado: 9h00 - 13h00</p>
            </div>

            <div className="pt-2">
              <a
                href={contact.whatsappNow}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: 'inline-block' }}
              >
                Falar pelo WhatsApp Agora
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function MapaSection() {
  return (
    <section className="bg-dark">
      <div className={`${SITE_CONTAINER} pt-[90px] pb-8 text-center`}>
        <ScrollReveal variant="fadeUp">
          <SectionLabel>Como Chegar</SectionLabel>
          <GoldDivider className="max-w-[200px] mx-auto" />
        </ScrollReveal>
      </div>

      <ScrollReveal variant="fadeIn">
        <iframe
          title="Mapa Beta Atelier"
          src="https://maps.google.com/maps?q=Rua+Viela+do+Ribeiro,+3750-720,+Recard%C3%A3es,+%C3%81gueda&output=embed&z=15"
          style={{
            width: '100%',
            height: '480px',
            border: 'none',
            display: 'block',
            filter: 'grayscale(30%) contrast(1.05)',
          }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </ScrollReveal>
    </section>
  )
}

function CTASection() {
  const { config } = useSiteConfig()
  const { content } = useSectionContent('contato', 'cta', {
    title: 'Prefere uma Resposta Imediata?',
    text: 'Chame-nos ou envie uma mensagem pelo WhatsApp. Respondemos rapidamente.',
  })
  const contact = { ...FALLBACK_CONTACT, ...(config ?? {}) }

  return (
    <section className="py-[110px] bg-gold text-dark">
      <ScrollReveal variant="scaleIn" className={`${SITE_CONTAINER} text-center`}>
        <h2 className="text-[38px] md:text-[56px] leading-[1.04] mb-6">{content?.title}</h2>
        <p className="max-w-[700px] mx-auto text-dark/82 text-[16px] leading-8">{content?.text}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <motion.a
            href={contact.phoneTel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center px-8 py-3 text-sm uppercase tracking-[2px] font-medium"
            style={{
              backgroundColor: 'rgb(21,21,21)',
              color: 'rgb(255,255,255)',
              border: '1px solid rgb(21,21,21)',
            }}
          >
            Ligar Agora
          </motion.a>

          <motion.a
            href={contact.whatsappCta}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center px-8 py-3 text-sm uppercase tracking-[2px] font-medium"
            style={{
              backgroundColor: 'transparent',
              color: 'rgb(21,21,21)',
              border: '1px solid rgb(21,21,21)',
            }}
          >
            WhatsApp
          </motion.a>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default function Contato() {
  return (
    <div>
      <PageHero />
      <ContactGridSection />
      <MapaSection />
      <CTASection />
    </div>
  )
}
