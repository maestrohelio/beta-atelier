import { useMemo, useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import ScrollReveal from '../components/ui/ScrollReveal'
import SectionLabel from '../components/ui/SectionLabel'
import GoldDivider from '../components/ui/GoldDivider'
import Button from '../components/ui/Button'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider'
import Lightbox from '../components/ui/Lightbox'
import { usePexels } from '../hooks/usePexels'
import { useCountUp } from '../hooks/useCountUp'
import { useSectionContent } from '../hooks/useSectionContent'
import { useMediaFromApi } from '../hooks/useMediaFromApi'
import { useLightbox } from '../hooks/useLightbox'
import { useSiteConfig } from '../context/SiteContext'
import { useApi } from '../hooks/useApi'
import { PEXELS_QUERIES } from '../services/pexels'
import { contentApi } from '../services/api'
import { ROUTES } from '../constants/routes'
import cadeirasHero from '../assets/images/cadeiras-hero.jpg'
import cadeiraDestaque from '../assets/images/cadeira-destaque.jpg'
import cadeiraServico from '../assets/images/cadeira-servico.jpg'
import cortinadoServico from '../assets/images/cortinado-servico.jpg'
import pulpitoLocal from '../assets/images/pulpito-local-03.jpg'
import restauroServico from '../assets/images/restauro-sofa-depois.jpg'
import galeriaCadeira01 from '../assets/images/galeria-cadeira-01.jpg'
import galeriaCadeira02 from '../assets/images/galeria-cadeira-02.jpg'
import galeriaCadeira03 from '../assets/images/galeria-cadeira-03.jpg'
import galeriaCadeiraEscritorio01 from '../assets/images/galeria-cadeira-escritorio-01.jpg'
import galeriaCadeiraEscritorio02 from '../assets/images/galeria-cadeira-escritorio-02.jpg'
import galeriaCortinado01 from '../assets/images/galeria-cortinado-01.jpg'
import galeriaCortinado02 from '../assets/images/galeria-cortinado-02.jpg'
import galeriaPulpito01 from '../assets/images/galeria-pulpito-01.jpg'
import restauroSofaAntes from '../assets/images/restauro-sofa-antes.jpg'
import restauroSofaDepois from '../assets/images/restauro-sofa-depois.jpg'
import restauroCadeiraAntes from '../assets/images/restauro-cadeira-antes.jpg'
import restauroCadeiraDepois01 from '../assets/images/restauro-cadeira-depois-01.jpg'
import restauroCadeiraDepois02 from '../assets/images/restauro-cadeira-depois-02.jpg'

const SITE_PADDING = 'px-6 md:px-12'
const SITE_CONTAINER = `max-w-[1200px] mx-auto ${SITE_PADDING}`
const ADMIN_IMAGE_BASE = import.meta.env.VITE_ADMIN_API_BASE ?? 'http://localhost:3001'

const FALLBACK_CONTACT = {
  phone: '+351 914 888 808',
  phoneTel: 'tel:+351914888808',
  whatsapp: 'https://wa.me/351914888808?text=Ol%C3%A1%2C%20gostaria%20de%20pedir%20um%20or%C3%A7amento%20para%20o%20meu%20projecto.',
  email: 'elisabetearede67@gmail.com',
  emailLink: 'mailto:elisabetearede67@gmail.com',
  address: 'Rua Viela do Ribeiro, 3750-720, Recardães, Águeda',
  maps: 'https://maps.app.goo.gl/VRfNEGYPSL2VAMjm8',
}

const LOCAL_IMAGES = {
  hero: cadeirasHero,
  destaqueCadeiras: cadeiraDestaque,
  servicos: {
    cadeiras: cadeiraServico,
    cortinados: cortinadoServico,
    pulpitosFallback: pulpitoLocal,
    restauro: restauroServico,
  },
  galeria: [
    galeriaCadeira01,
    galeriaCadeira02,
    galeriaCadeira03,
    galeriaCadeiraEscritorio01,
    galeriaCadeiraEscritorio02,
    galeriaCortinado01,
    galeriaCortinado02,
    galeriaPulpito01,
  ],
  restauro: {
    sliderBefore: restauroSofaAntes,
    sliderAfter: restauroSofaDepois,
    pairBefore: restauroCadeiraAntes,
    pairAfter01: restauroCadeiraDepois01,
    pairAfter02: restauroCadeiraDepois02,
  },
}

const FALLBACK_HOME_CONTENT = {
  hero: {
    label: 'Atelier de Estofos & Cortinados',
    titleLines: ['Onde o Design', 'Encontra a', 'Alta Costura'],
    subtitle:
      'Criamos cadeiras, sofás e cortinados que transformam espaços comuns em ambientes de carácter único. Cada peça, uma obra de artesanato.',
    ctaPrimary: { label: 'Ver os Nossos Trabalhos', href: ROUTES.CADEIRAS },
    ctaSecondary: {
      label: 'Pedir Orçamento',
      href: 'https://wa.me/351914888808?text=Ol%C3%A1%2C%20gostaria%20de%20pedir%20um%20or%C3%A7amento%20para%20o%20meu%20projecto.',
    },
    image: LOCAL_IMAGES.hero,
  },
  intro: {
    label: 'O Nosso Atelier',
    titleLines: ['Artesanato que Resiste', 'ao Tempo'],
    paragraphs: [
      'Na Beta Atelier, cada peça nasce de um processo artesanal rigoroso. Trabalhamos com os melhores tecidos e materiais, escolhidos a dedo para garantir estética e durabilidade que atravessam gerações.',
      'Da primeira consulta ao acabamento final, acompanhamos cada detalhe do vosso projecto. O resultado? Espaços com personalidade, conforto e uma qualidade que se vê — e se sente.',
    ],
    cta: { label: 'Conhecer o Atelier', href: ROUTES.SOBRE },
    metrics: [
      { target: 15, prefix: '+', suffix: '', title: '+15 Anos', label: 'de Experiência' },
      { target: 500, prefix: '+', suffix: '', title: '+500 Peças', label: 'Entregues' },
      { target: 100, prefix: '', suffix: '%', title: '100%', label: 'Feito à Mão' },
    ],
  },
  servicos: {
    label: 'Serviços',
    title: 'Especialidades do Atelier',
    cards: [
      {
        key: 'cadeiras',
        title: 'Cadeiras',
        description:
          'Estofos artesanais que unem forma e função. Cada cadeira é concebida para ser a peça central do seu espaço.',
        link: ROUTES.CADEIRAS,
        image: LOCAL_IMAGES.servicos.cadeiras,
      },
      {
        key: 'cortinados',
        title: 'Cortinados',
        description:
          'Do clássico ao contemporâneo, os nossos cortinados são escolhidos e instalados com a precisão de um alfaiate.',
        link: ROUTES.CORTINADOS,
        image: LOCAL_IMAGES.servicos.cortinados,
      },
      {
        key: 'pulpitos',
        title: 'Púlpitos',
        description:
          'Trabalho especializado em estofos para espaços litúrgicos, com o respeito e a qualidade que cada ambiente merece.',
        link: ROUTES.PULPITOS,
        image: LOCAL_IMAGES.servicos.pulpitosFallback,
      },
      {
        key: 'restauro',
        title: 'Restauro',
        description:
          'Damos nova vida a peças com história. O restauro é um acto de respeito pelo passado e investimento no futuro.',
        link: ROUTES.RESTAURO,
        image: LOCAL_IMAGES.servicos.restauro,
      },
    ],
  },
  destaqueCadeiras: {
    label: 'As Nossas Cadeiras',
    titleLines: ['Cada Detalhe,', 'Uma Assinatura'],
    text:
      'As nossas cadeiras são muito mais do que mobiliário. São o resultado de horas de trabalho artesanal, seleção criteriosa de tecidos e uma atenção ao detalhe que poucos ateliers conseguem oferecer. Seja para renovar uma peça de família ou mobilar um espaço de raiz, criamos cadeiras que contam a vossa história.',
    cta: { label: 'Ver Coleção', href: ROUTES.CADEIRAS },
    image: LOCAL_IMAGES.destaqueCadeiras,
  },
  galeria: {
    label: 'O Nosso Trabalho',
    subtitle: 'Uma seleção das peças que saem do nosso atelier',
    cta: { label: 'Ver Todos os Trabalhos', href: ROUTES.CADEIRAS },
    images: LOCAL_IMAGES.galeria,
  },
  restauro: {
    label: 'Restauro',
    titleLines: ['Porque as Melhores', 'Historias Merecem', 'um Novo Capitulo'],
    text:
      'Restaurar uma peça é mais do que repará-la. É honrar a sua história, preservar a sua essência e devolver-lhe a dignidade que o tempo foi apagando. No nosso atelier, cada restauro é tratado com a mesma seriedade de uma peça nova.',
    cta: { label: 'Conhecer o Restauro', href: ROUTES.RESTAURO },
    sliderBefore: LOCAL_IMAGES.restauro.sliderBefore,
    sliderAfter: LOCAL_IMAGES.restauro.sliderAfter,
    pairBefore: LOCAL_IMAGES.restauro.pairBefore,
    pairAfter01: LOCAL_IMAGES.restauro.pairAfter01,
    pairAfter02: LOCAL_IMAGES.restauro.pairAfter02,
  },
  depoimento: {
    quote:
      'A qualidade não é um acidente. É sempre o resultado de um esforço inteligente, de materiais escolhidos com critério e de mãos que sabem o que fazem.',
    author: '— Beta Atelier, Recardaes',
  },
  ctaFinal: {
    label: 'Pronto para comecar?',
    titleLines: ['O Seu Projecto Merece', 'o Melhor Acabamento'],
    text:
      'Fale connosco hoje. Descrevemos as suas necessidades, apresentamos opções e criamos a peça perfeita para o seu espaço. Sem compromisso, com toda a atenção que merece.',
    whatsappLabel: 'Pedir Orçamento pelo WhatsApp',
    emailLabel: 'Enviar Email',
  },
}

function normalizeKey(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/_/g, ' ')
    .toLowerCase()
    .trim()
}

function toList(payload) {
  if (!payload) return []
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.data)) return payload.data
  return []
}

function resolveImageValue(value) {
  if (!value) return null

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return null
    if (/^https?:\/\//i.test(trimmed)) return trimmed

    if (trimmed.startsWith('/src/assets/') || trimmed.startsWith('/assets/')) return trimmed

    const hasImageExtension = /\.(png|jpe?g|webp|avif|gif|svg)(\?.*)?$/i.test(trimmed)
    const shouldUseAdminBase = (
      trimmed.startsWith('/media/')
      || trimmed.startsWith('media/')
      || trimmed.startsWith('/storage/')
      || trimmed.startsWith('storage/')
      || hasImageExtension
    )

    if (!shouldUseAdminBase) return null

    const normalizedPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
    return `${ADMIN_IMAGE_BASE}${normalizedPath}`
  }

  if (typeof value === 'object') {
    return resolveImageValue(value.url ?? value.src ?? value.file_url ?? value.image)
  }

  return null
}

function findSection(sections, keys = []) {
  const normalizedKeys = keys.map(normalizeKey)

  return sections.find((section) => {
    const tokens = [section?.name, section?.slug, section?.type, section?.key]
      .filter(Boolean)
      .map(normalizeKey)

    return normalizedKeys.some((key) =>
      tokens.some((token) => token === key || token.includes(key) || key.includes(token)),
    )
  })
}

function pickValue(section, keys, fallback) {
  if (!section) return fallback
  const data = typeof section.data === 'object' && section.data ? section.data : {}

  for (const key of keys) {
    const value = data[key] ?? section[key]
    if (value !== undefined && value !== null && value !== '') return value
  }

  return fallback
}

function pickArray(section, keys, fallback = []) {
  const value = pickValue(section, keys, null)
  if (!value) return fallback
  if (Array.isArray(value)) return value
  return fallback
}

async function fetchHomeCms(siteSlug, siteId) {
  try {
    const page = await contentApi.getPage('home')
    return {
      page,
      sections: toList(page?.sections),
      siteId: siteId || null,
    }
  } catch {
    return null
  }
}

function buildHomeContent(cmsData) {
  const sections = toList(cmsData?.sections)

  const heroSection = findSection(sections, ['hero'])
  const introSection = findSection(sections, ['intro', 'proposta de valor', 'atelier'])
  const servicosSection = findSection(sections, ['servicos', 'services'])
  const destaqueCadeirasSection = findSection(sections, ['destaque cadeiras', 'cadeiras destaque'])
  const galeriaSection = findSection(sections, ['galeria', 'mosaico', 'portfolio'])
  const restauroSection = findSection(sections, ['restauro'])
  const depoimentoSection = findSection(sections, ['depoimento', 'citacao', 'quote'])
  const ctaSection = findSection(sections, ['cta final', 'call to action'])

  const heroTitle = pickValue(heroSection, ['title_lines', 'title', 'headline'], FALLBACK_HOME_CONTENT.hero.titleLines)
  const introTitle = pickValue(introSection, ['title_lines', 'title', 'headline'], FALLBACK_HOME_CONTENT.intro.titleLines)
  const destaqueTitle = pickValue(destaqueCadeirasSection, ['title_lines', 'title', 'headline'], FALLBACK_HOME_CONTENT.destaqueCadeiras.titleLines)
  const restauroTitle = pickValue(restauroSection, ['title_lines', 'title', 'headline'], FALLBACK_HOME_CONTENT.restauro.titleLines)
  const ctaTitle = pickValue(ctaSection, ['title_lines', 'title', 'headline'], FALLBACK_HOME_CONTENT.ctaFinal.titleLines)

  const mappedCards = pickArray(servicosSection, ['cards', 'items'], FALLBACK_HOME_CONTENT.servicos.cards).map((card, index) => {
    const fallbackCard = FALLBACK_HOME_CONTENT.servicos.cards[index] ?? FALLBACK_HOME_CONTENT.servicos.cards[0]
    return {
      ...fallbackCard,
      ...card,
      image: resolveImageValue(card?.image ?? card?.src) ?? fallbackCard.image,
    }
  })

  const galleryFromCms = pickArray(galeriaSection, ['images', 'gallery', 'items'], [])
    .map((img) => resolveImageValue(img?.url ?? img?.src ?? img))
    .filter(Boolean)

  const quoteText = pickValue(depoimentoSection, ['quote', 'text', 'description'], FALLBACK_HOME_CONTENT.depoimento.quote)

  return {
    hero: {
      ...FALLBACK_HOME_CONTENT.hero,
      label: pickValue(heroSection, ['label', 'kicker'], FALLBACK_HOME_CONTENT.hero.label),
      titleLines: Array.isArray(heroTitle) ? heroTitle : String(heroTitle).split('\n').filter(Boolean),
      subtitle: pickValue(heroSection, ['subtitle', 'description'], FALLBACK_HOME_CONTENT.hero.subtitle),
      image: resolveImageValue(pickValue(heroSection, ['image', 'background_image'], null)) ?? FALLBACK_HOME_CONTENT.hero.image,
    },
    intro: {
      ...FALLBACK_HOME_CONTENT.intro,
      label: pickValue(introSection, ['label', 'kicker'], FALLBACK_HOME_CONTENT.intro.label),
      titleLines: Array.isArray(introTitle) ? introTitle : String(introTitle).split('\n').filter(Boolean),
      paragraphs: pickArray(introSection, ['paragraphs', 'content', 'texts'], FALLBACK_HOME_CONTENT.intro.paragraphs),
      metrics: pickArray(introSection, ['metrics', 'numbers', 'stats'], FALLBACK_HOME_CONTENT.intro.metrics),
    },
    servicos: {
      ...FALLBACK_HOME_CONTENT.servicos,
      label: pickValue(servicosSection, ['label', 'kicker'], FALLBACK_HOME_CONTENT.servicos.label),
      title: pickValue(servicosSection, ['title', 'headline'], FALLBACK_HOME_CONTENT.servicos.title),
      cards: mappedCards.length ? mappedCards : FALLBACK_HOME_CONTENT.servicos.cards,
    },
    destaqueCadeiras: {
      ...FALLBACK_HOME_CONTENT.destaqueCadeiras,
      label: pickValue(destaqueCadeirasSection, ['label', 'kicker'], FALLBACK_HOME_CONTENT.destaqueCadeiras.label),
      titleLines: Array.isArray(destaqueTitle) ? destaqueTitle : String(destaqueTitle).split('\n').filter(Boolean),
      text: pickValue(destaqueCadeirasSection, ['text', 'description'], FALLBACK_HOME_CONTENT.destaqueCadeiras.text),
      image: resolveImageValue(pickValue(destaqueCadeirasSection, ['image', 'photo'], null)) ?? FALLBACK_HOME_CONTENT.destaqueCadeiras.image,
    },
    galeria: {
      ...FALLBACK_HOME_CONTENT.galeria,
      label: pickValue(galeriaSection, ['label', 'title'], FALLBACK_HOME_CONTENT.galeria.label),
      subtitle: pickValue(galeriaSection, ['subtitle', 'description'], FALLBACK_HOME_CONTENT.galeria.subtitle),
      images: galleryFromCms.length ? galleryFromCms : FALLBACK_HOME_CONTENT.galeria.images,
    },
    restauro: {
      ...FALLBACK_HOME_CONTENT.restauro,
      label: pickValue(restauroSection, ['label', 'kicker'], FALLBACK_HOME_CONTENT.restauro.label),
      titleLines: Array.isArray(restauroTitle) ? restauroTitle : String(restauroTitle).split('\n').filter(Boolean),
      text: pickValue(restauroSection, ['text', 'description'], FALLBACK_HOME_CONTENT.restauro.text),
      sliderBefore:
        resolveImageValue(pickValue(restauroSection, ['before_image', 'before'], null)) ??
        FALLBACK_HOME_CONTENT.restauro.sliderBefore,
      sliderAfter:
        resolveImageValue(pickValue(restauroSection, ['after_image', 'after'], null)) ??
        FALLBACK_HOME_CONTENT.restauro.sliderAfter,
    },
    depoimento: {
      ...FALLBACK_HOME_CONTENT.depoimento,
      quote: quoteText,
      author: pickValue(depoimentoSection, ['author', 'signature'], FALLBACK_HOME_CONTENT.depoimento.author),
    },
    ctaFinal: {
      ...FALLBACK_HOME_CONTENT.ctaFinal,
      label: pickValue(ctaSection, ['label', 'kicker'], FALLBACK_HOME_CONTENT.ctaFinal.label),
      titleLines: Array.isArray(ctaTitle) ? ctaTitle : String(ctaTitle).split('\n').filter(Boolean),
      text: pickValue(ctaSection, ['text', 'description'], FALLBACK_HOME_CONTENT.ctaFinal.text),
    },
  }
}

function PexelsPlaceholder({ className = '', minHeight = 280 }) {
  return (
    <motion.div
      className={className}
      style={{ minHeight, backgroundColor: 'rgb(30,30,30)' }}
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function AnimatedMetric({ metric }) {
  const [ref, count] = useCountUp(Number(metric?.target ?? 0), 1800)

  return (
    <div ref={ref} className="border border-subtle p-5 bg-black/20">
      <div className="font-serif text-[32px] leading-none text-gold mb-2">
        {metric?.prefix ?? ''}
        {count}
        {metric?.suffix ?? ''}
      </div>
      <p className="font-sans text-xs uppercase tracking-[2px] text-muted">{metric?.label}</p>
    </div>
  )
}

function HeroSection({ content }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const backgroundPosition = useMotionTemplate`center ${backgroundY}`

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${content.image})`,
          backgroundSize: 'cover',
          backgroundPosition,
          willChange: 'transform',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(21,21,21,0.95) 100%)',
        }}
      />

      <div className={`${SITE_CONTAINER} relative z-10 h-full flex items-center`}>
        <div className="max-w-[680px] md:-translate-x-3 pt-14">
          <motion.p
            className="font-sans text-[11px] uppercase tracking-[2.5px] text-gold mb-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {content.label}
          </motion.p>

          <motion.span
            className="block h-px bg-gold mb-8"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="space-y-1 mb-8">
            {content.titleLines.map((line, index) => (
              <div key={`${line}-${index}`} className="overflow-hidden">
                <motion.h1
                  className="text-[42px] leading-[1.03] md:text-[68px] md:leading-[0.98] text-offwhite"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.35 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          <motion.p
            className="text-[15px] md:text-[17px] text-offwhite/90 leading-7 max-w-[620px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
          >
            <Button href={content.ctaPrimary.href}>{content.ctaPrimary.label}</Button>
            <Button href={content.ctaSecondary.href} variant="ghost" target="_blank" rel="noopener noreferrer">
              {content.ctaSecondary.label}
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <span className="text-[10px] uppercase tracking-[2px] text-white/70">Scroll</span>
        <span className="text-gold text-xl leading-none">↓</span>
      </motion.div>
    </section>
  )
}

function IntroSection({ content, pexelsState }) {
  const introPhoto = pexelsState.photos[0]
  const introImage = introPhoto ? pexelsState.getUrl(introPhoto, 'portrait') : ''

  return (
    <section className="py-[120px] bg-dark">
      <div className={`${SITE_CONTAINER} grid md:grid-cols-2 gap-12 md:gap-20 items-center`}>
        <ScrollReveal variant="fadeLeft">
          <SectionLabel>{content.label}</SectionLabel>
          <h2 className="text-[38px] leading-[1.08] md:text-[56px] md:leading-[1.02] text-offwhite mb-7">
            {content.titleLines.map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {line}
              </span>
            ))}
          </h2>

          <div className="space-y-5 text-offwhite/85 leading-8 text-[15px] md:text-[16px]">
            {content.paragraphs.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-9">
            <Button href={content.cta.href} variant="ghost-gold">
              {content.cta.label}
            </Button>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {content.metrics.map((metric) => (
              <AnimatedMetric key={metric.title} metric={metric} />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeRight" className="h-full">
          {introImage ? (
            <div className="relative overflow-hidden h-full min-h-[520px]">
              <img
                src={introImage}
                alt="Textura de tecido de luxo"
                className="w-full h-full object-cover"
                style={{ border: '1px solid rgba(181,172,151,0.2)' }}
              />
            </div>
          ) : (
            <PexelsPlaceholder className="h-full" minHeight={520} />
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}

function ServicosSection({ content, pulpitoPexels }) {
  const cadeirasPexels = usePexels('upholstered armchair luxury', {
    perPage: 1,
    orientation: 'landscape',
    page: 1,
  })
  const cortinadosPexels = usePexels('elegant curtains window interior', {
    perPage: 1,
    orientation: 'landscape',
    page: 1,
  })
  const restauroPexels = usePexels('furniture restoration before after', {
    perPage: 1,
    orientation: 'landscape',
    page: 1,
  })

  const pulpitoPexelsImage = pulpitoPexels.photos[0]
    ? pulpitoPexels.getUrl(pulpitoPexels.photos[0], 'large2x')
    : null
  const cadeirasPexelsImage = cadeirasPexels.photos[0]
    ? cadeirasPexels.getUrl(cadeirasPexels.photos[0], 'large2x')
    : null
  const cortinadosPexelsImage = cortinadosPexels.photos[0]
    ? cortinadosPexels.getUrl(cortinadosPexels.photos[0], 'large2x')
    : null
  const restauroPexelsImage = restauroPexels.photos[0]
    ? restauroPexels.getUrl(restauroPexels.photos[0], 'large2x')
    : null

  const imageFallbackByKey = {
    cadeiras: LOCAL_IMAGES.servicos.cadeiras,
    cortinados: LOCAL_IMAGES.servicos.cortinados,
    pulpitos: pulpitoPexelsImage ?? LOCAL_IMAGES.servicos.pulpitosFallback,
    restauro: LOCAL_IMAGES.servicos.restauro,
  }

  const imagePexelsByKey = {
    cadeiras: cadeirasPexelsImage,
    cortinados: cortinadosPexelsImage,
    pulpitos: pulpitoPexelsImage,
    restauro: restauroPexelsImage,
  }

  const cards = content.cards.map((card) => {
    const key = normalizeKey(card.key)
    const safeImage = resolveImageValue(card.image)
    const fallbackImage = imageFallbackByKey[key] || imagePexelsByKey[key] || null
    const primaryImage = safeImage || imagePexelsByKey[key] || fallbackImage || null

    return {
      ...card,
      image: primaryImage,
      fallbackImage,
    }
  })

  return (
    <section className="py-[120px]" style={{ backgroundColor: 'rgb(15,15,15)' }}>
      <div className={SITE_CONTAINER}>
        <ScrollReveal variant="fadeIn" className="mb-12">
          <SectionLabel>{content.label}</SectionLabel>
          <h2 className="text-[36px] md:text-[52px] text-offwhite">{content.title}</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <ScrollReveal key={card.key} variant="fadeUp" delay={index * 0.1}>
              <Link
                to={card.link}
                className="group relative block overflow-hidden min-h-[340px]"
                style={{ border: '1px solid rgba(181,172,151,0.18)' }}
              >
                <div className="absolute inset-0" style={{ backgroundColor: 'rgb(40,40,40)' }} />
                {card.image && (
                  <div
                    className="absolute inset-0 transition-all duration-500 ease-in-out group-hover:scale-[1.08]"
                    style={{
                      backgroundImage:
                        card.fallbackImage && card.image !== card.fallbackImage
                          ? `url(${card.image}), url(${card.fallbackImage})`
                          : `url(${card.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                )}

                <div className="absolute inset-0 transition-all duration-300 bg-black/55 group-hover:bg-black/42" />

                <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end">
                  <h3 className="text-[36px] leading-[1] text-offwhite mb-4">{card.title}</h3>
                  <p className="text-offwhite/90 text-[15px] leading-7 max-w-[420px]">{card.description}</p>
                  <motion.span
                    className="mt-6 inline-flex items-center gap-3 text-gold text-xs uppercase tracking-[2px] font-medium"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25 }}
                  >
                    Saber mais
                    <span className="text-base">→</span>
                  </motion.span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function DestaqueCadeirasSection({ content }) {
  const [imageRef, imageInView] = useInView({ triggerOnce: true, threshold: 0.25 })

  return (
    <section className="py-[120px] bg-offwhite">
      <div className={`${SITE_CONTAINER} grid md:grid-cols-5 gap-10 md:gap-14 items-center`}>
        <div ref={imageRef} className="relative md:col-span-3 overflow-hidden min-h-[420px] md:min-h-[560px]">
          <img src={content.image} alt="Cadeira artesanal" className="absolute inset-0 w-full h-full object-cover" />
          <motion.div
            className="absolute inset-y-0 right-0 bg-gold"
            initial={{ width: '100%' }}
            animate={imageInView ? { width: '0%' } : { width: '100%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          />
        </div>

        <ScrollReveal variant="fadeUp" className="md:col-span-2">
          <SectionLabel light>{content.label}</SectionLabel>
          <h2 className="text-dark text-[38px] md:text-[56px] leading-[1.04] mb-7">
            {content.titleLines.map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="text-dark/80 text-[15px] md:text-[16px] leading-8">{content.text}</p>

          <div className="mt-10">
            <Button href={content.cta.href}>{content.cta.label}</Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function GaleriaPreviewSection({ content }) {
  const lightbox = useLightbox()
  const galleryImages = (content.images ?? [])
    .filter(Boolean)
    .map((src, index) => ({
      src,
      alt: `Trabalho Beta Atelier ${index + 1}`,
    }))

  const mosaic = [
    { src: galleryImages[0]?.src, index: 0, className: 'md:col-span-2 md:row-span-2 min-h-[460px]' },
    { src: galleryImages[1]?.src, index: 1, className: 'md:col-span-1 md:row-span-1 min-h-[220px]' },
    { src: galleryImages[2]?.src, index: 2, className: 'md:col-span-1 md:row-span-1 min-h-[220px]' },
    { src: galleryImages[3]?.src, index: 3, className: 'md:col-span-1 md:row-span-2 min-h-[460px]' },
    { src: galleryImages[4]?.src, index: 4, className: 'md:col-span-2 md:row-span-1 min-h-[220px]' },
    { src: galleryImages[5]?.src, index: 5, className: 'md:col-span-1 md:row-span-1 min-h-[220px]' },
    { src: galleryImages[6]?.src, index: 6, className: 'md:col-span-1 md:row-span-1 min-h-[220px]' },
    { src: galleryImages[7]?.src, index: 7, className: 'md:col-span-1 md:row-span-1 min-h-[220px]' },
  ]

  return (
    <section className="py-[120px] bg-dark">
      <div className={SITE_CONTAINER}>
        <ScrollReveal variant="fadeIn" className="text-center mb-12 md:mb-14">
          <h2 className="text-[38px] md:text-[56px] text-offwhite mb-3">{content.label}</h2>
          <p className="text-offwhite/75 max-w-[640px] mx-auto">{content.subtitle}</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-4 gap-4 auto-rows-[220px]">
          {mosaic.filter((item) => item.src).map((item, index) => (
            <ScrollReveal key={`${item.src}-${index}`} variant="fadeUp" delay={index * 0.05} className={item.className}>
              <div
                className="group relative overflow-hidden h-full cursor-pointer"
                onClick={() => lightbox.open(item.index)}
              >
                <img
                  src={item.src}
                  alt={`Trabalho Beta Atelier ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-[rgba(181,172,151,0.15)] transition-all duration-400 ease-in-out" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {lightbox.isOpen && (
          <Lightbox
            images={galleryImages}
            currentIndex={lightbox.currentIndex}
            onClose={lightbox.close}
            onPrev={lightbox.prev}
            onNext={() => lightbox.next(galleryImages.length)}
          />
        )}

        <ScrollReveal variant="fadeUp" className="mt-12 text-center">
          <Button href={content.cta.href} variant="ghost-gold">
            {content.cta.label}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}

function RestauroSection({ content }) {
  return (
    <section className="py-[120px]" style={{ backgroundColor: 'rgb(15,15,15)' }}>
      <div className={`${SITE_CONTAINER} grid md:grid-cols-2 gap-12 items-start`}>
        <ScrollReveal variant="fadeLeft">
          <SectionLabel>{content.label}</SectionLabel>
          <h2 className="text-[38px] md:text-[56px] leading-[1.04] mb-7 text-offwhite">
            {content.titleLines.map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="text-offwhite/84 text-[15px] md:text-[16px] leading-8 mb-10">{content.text}</p>
          <Button href={content.cta.href} variant="ghost-gold">
            {content.cta.label}
          </Button>
        </ScrollReveal>

        <ScrollReveal variant="fadeRight">
          <BeforeAfterSlider beforeSrc={content.sliderBefore} afterSrc={content.sliderAfter} />
          <p className="mt-4 text-[12px] uppercase tracking-[2px] text-muted">Arraste a linha para comparar o resultado do restauro.</p>
        </ScrollReveal>
      </div>

      <div className={`${SITE_CONTAINER} mt-12 grid md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch`}>
        <ScrollReveal variant="fadeUp">
          <div className="relative overflow-hidden min-h-[260px] border border-subtle">
            <img src={content.pairBefore} alt="Restauro cadeira antes" className="absolute inset-0 w-full h-full object-cover" />
            <span className="absolute top-3 left-3 px-2 py-1 text-[10px] uppercase tracking-[2px] bg-black/60 text-gold">Antes</span>
          </div>
        </ScrollReveal>

        <div className="hidden md:block w-px bg-[rgba(181,172,151,0.25)]" />

        <ScrollReveal variant="fadeUp" delay={0.08}>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative overflow-hidden min-h-[260px] border border-subtle">
              <img src={content.pairAfter01} alt="Restauro cadeira depois 1" className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute top-3 left-3 px-2 py-1 text-[10px] uppercase tracking-[2px] bg-black/60 text-gold">Depois</span>
            </div>
            <div className="relative overflow-hidden min-h-[260px] border border-subtle">
              <img src={content.pairAfter02} alt="Restauro cadeira depois 2" className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute top-3 left-3 px-2 py-1 text-[10px] uppercase tracking-[2px] bg-black/60 text-gold">Depois</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function DepoimentoSection({ content, pexelsState }) {
  const quoteImage = pexelsState.photos[0] ? pexelsState.getUrl(pexelsState.photos[0], 'large2x') : ''

  return (
    <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden">
      {quoteImage ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${quoteImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ) : (
        <PexelsPlaceholder className="absolute inset-0 w-full h-full" minHeight={420} />
      )}

      <div className="absolute inset-0 bg-black/80" />

      <ScrollReveal variant="scaleIn" className={`${SITE_CONTAINER} relative z-10 text-center`}>
        <p className="text-[68px] leading-none text-gold mb-4">“</p>
        <p className="max-w-[860px] mx-auto text-[20px] md:text-[29px] leading-[1.4] text-offwhite font-serif">
          {content.quote}
        </p>
        <p className="mt-6 text-[13px] tracking-[2px] uppercase text-muted">{content.author}</p>
        <GoldDivider className="max-w-[240px] mx-auto mt-8" />
      </ScrollReveal>
    </section>
  )
}

function CTAFinalSection({ content, contact }) {
  return (
    <section className="py-[110px] bg-gold text-dark">
      <ScrollReveal variant="scaleIn" className={`${SITE_CONTAINER} text-center`}>
        <p className="font-sans text-[12px] uppercase tracking-[2px] text-taupe mb-4">{content.label}</p>
        <h2 className="text-[38px] md:text-[56px] leading-[1.04] mb-7 text-dark">
          {content.titleLines.map((line, index) => (
            <span key={`${line}-${index}`} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="max-w-[760px] mx-auto text-[16px] leading-8 text-dark/80">{content.text}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <motion.a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center px-8 py-3 text-sm uppercase tracking-[2px] font-medium"
            style={{
              backgroundColor: 'rgb(21,21,21)',
              color: 'rgb(255,255,255)',
              border: '1px solid rgb(21,21,21)',
            }}
          >
            {content.whatsappLabel}
          </motion.a>

          <motion.a
            href={contact.emailLink}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center px-8 py-3 text-sm uppercase tracking-[2px] font-medium"
            style={{
              backgroundColor: 'transparent',
              color: 'rgb(21,21,21)',
              border: '1px solid rgb(21,21,21)',
            }}
          >
            {content.emailLabel}
          </motion.a>
        </div>

        <div className="mt-8 space-y-2 text-[14px] text-dark/80">
          <p>
            <a href={contact.phoneTel} className="underline decoration-transparent hover:decoration-current transition-all">
              {contact.phone}
            </a>
          </p>
          <p>
            <a
              href={contact.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-transparent hover:decoration-current transition-all"
            >
              {contact.address}
            </a>
          </p>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default function Home() {
  const { config } = useSiteConfig()
  const siteSlug = import.meta.env.VITE_SITE_SLUG ?? 'beta-atelier'
  const siteId = import.meta.env.VITE_SITE_ID ?? ''

  const { data: cmsData } = useApi(() => fetchHomeCms(siteSlug, siteId), [siteSlug, siteId])

  const introPexels = usePexels(PEXELS_QUERIES.heroMobile, {
    perPage: 1,
    orientation: 'portrait',
    page: 1,
  })

  const pulpitoPexels = usePexels(PEXELS_QUERIES.pulpitos, {
    perPage: 1,
    orientation: 'landscape',
    page: 1,
  })

  const depoimentoPexels = usePexels('elegant interior design studio warm light', {
    perPage: 1,
    orientation: 'landscape',
    page: 1,
  })

  const { content: heroSection } = useSectionContent('home', 'hero', {})
  const { media: homeGalleryMedia, getUrl: getApiMediaUrl } = useMediaFromApi('galeria-home', 12)

  const content = useMemo(() => {
    const base = buildHomeContent(cmsData)
    const next = {
      ...base,
      hero: { ...base.hero },
      galeria: { ...base.galeria },
    }

    if (heroSection?.title) {
      next.hero.titleLines = String(heroSection.title).split('\n')
    }
    if (heroSection?.subtitle) {
      next.hero.subtitle = heroSection.subtitle
    }
    if (heroSection?.label) {
      next.hero.label = heroSection.label
    }
    const heroApiImage = resolveImageValue(heroSection?.hero_image ?? heroSection?.image)
    if (heroApiImage) {
      next.hero.image = heroApiImage
    }

    const apiImages = homeGalleryMedia.map((item) => getApiMediaUrl(item)).filter(Boolean)
    if (apiImages.length > 0) {
      next.galeria.images = apiImages
    }

    return next
  }, [cmsData, heroSection, homeGalleryMedia, getApiMediaUrl])

  const contact = {
    ...FALLBACK_CONTACT,
    ...(config ?? {}),
    whatsapp:
      config?.whatsapp ??
      'https://wa.me/351914888808?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.',
  }

  return (
    <div>
      <HeroSection content={content.hero} />
      <IntroSection content={content.intro} pexelsState={introPexels} />
      <ServicosSection content={content.servicos} pulpitoPexels={pulpitoPexels} />
      <DestaqueCadeirasSection content={content.destaqueCadeiras} />
      <GaleriaPreviewSection content={content.galeria} />
      <RestauroSection content={content.restauro} />
      <DepoimentoSection content={content.depoimento} pexelsState={depoimentoPexels} />
      <CTAFinalSection content={content.ctaFinal} contact={contact} />
    </div>
  )
}
