import { motion } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'
import SectionLabel from '../components/ui/SectionLabel'
import GoldDivider from '../components/ui/GoldDivider'
import Button from '../components/ui/Button'
import Lightbox from '../components/ui/Lightbox'
import { usePexels } from '../hooks/usePexels'
import { useLightbox } from '../hooks/useLightbox'
import { getPhotoUrl } from '../services/pexels'
import { useSectionContent } from '../hooks/useSectionContent'
import { useMediaFromApi } from '../hooks/useMediaFromApi'
import cadeirasHero from '../assets/images/cadeiras-hero.jpg'
import cadeira01 from '../assets/images/cadeira-01.jpg'
import cadeira02 from '../assets/images/cadeira-02.jpg'
import cadeira03 from '../assets/images/cadeira-03.jpg'
import cadeira04 from '../assets/images/cadeira-04.jpg'
import cadeira05 from '../assets/images/cadeira-05.jpg'
import cadeira06 from '../assets/images/cadeira-06.jpg'
import cadeira07 from '../assets/images/cadeira-07.jpg'
import cadeira08 from '../assets/images/cadeira-08.jpg'
import cadeira09 from '../assets/images/cadeira-09.jpg'
import cadeira11 from '../assets/images/cadeira-11.jpg'
import cadeira12 from '../assets/images/cadeira-12.jpg'
import cadeira13 from '../assets/images/cadeira-13.jpg'
import cadeira14 from '../assets/images/cadeira-14.jpg'
import cadeira15 from '../assets/images/cadeira-15.jpg'
import cadeira16 from '../assets/images/cadeira-16.jpg'
import cadeira17 from '../assets/images/cadeira-17.jpg'
import cadeira18 from '../assets/images/cadeira-18.jpg'
import cadeira19 from '../assets/images/cadeira-19.jpg'
import cadeira20 from '../assets/images/cadeira-20.jpg'
import cadeira21 from '../assets/images/cadeira-21.jpg'
import cadeira22 from '../assets/images/cadeira-22.jpg'
import cadeira23 from '../assets/images/cadeira-23.jpg'
import cadeira24 from '../assets/images/cadeira-24.jpg'
import cadeiraEscritorio01 from '../assets/images/cadeira-escritorio-01.jpg'
import cadeiraEscritorio02 from '../assets/images/cadeira-escritorio-02.jpg'
import cadeiraEscritorio03 from '../assets/images/cadeira-escritorio-03.jpg'
import cadeiraEscritorio04 from '../assets/images/cadeira-escritorio-04.jpg'
import cadeiraEscritorio05 from '../assets/images/cadeira-escritorio-05.jpg'
import cadeiraEscritorio06 from '../assets/images/cadeira-escritorio-06.jpg'
import cadeiraEscritorio07 from '../assets/images/cadeira-escritorio-07.jpg'
import cadeiraEscritorio08 from '../assets/images/cadeira-escritorio-08.jpg'
import cadeiraEscritorio09 from '../assets/images/cadeira-escritorio-09.jpg'
import cadeiraEscritorio10 from '../assets/images/cadeira-escritorio-10.jpg'
import cadeiraEscritorio11 from '../assets/images/cadeira-escritorio-11.jpg'

const SITE_CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-12'

const LOCAL_CADEIRAS = [
  cadeira01,
  cadeira02,
  cadeira03,
  cadeira04,
  cadeira05,
  cadeira06,
  cadeira07,
  cadeira08,
  cadeira09,
  cadeira11,
  cadeira12,
  cadeira13,
  cadeira14,
  cadeira15,
  cadeira16,
  cadeira17,
  cadeira18,
  cadeira19,
  cadeira20,
  cadeira21,
  cadeira22,
  cadeira23,
  cadeira24,
  cadeiraEscritorio01,
  cadeiraEscritorio02,
  cadeiraEscritorio03,
  cadeiraEscritorio04,
  cadeiraEscritorio05,
  cadeiraEscritorio06,
  cadeiraEscritorio07,
  cadeiraEscritorio08,
  cadeiraEscritorio09,
  cadeiraEscritorio10,
  cadeiraEscritorio11,
]

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Consulta Inicial',
    text: 'Ouvimos as suas necessidades, vemos o espaço e discutimos materiais, cores e estilo.',
  },
  {
    number: '02',
    title: 'Seleção de Materiais',
    text: 'Apresentamos opções de tecidos, cores e acabamentos adequados ao seu projecto e orçamento.',
  },
  {
    number: '03',
    title: 'Produção Artesanal',
    text: 'Cada peça é trabalhada manualmente no nosso atelier, com rigor e atenção a cada detalhe.',
  },
  {
    number: '04',
    title: 'Entrega e Instalação',
    text: 'A peça é entregue e instalada no seu espaço, exactamente como imaginou.',
  },
]

function PexelsPlaceholder({ minHeight = 280 }) {
  return (
    <motion.div
      style={{ minHeight, backgroundColor: 'rgb(30,30,30)' }}
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function PageHero() {
  const { content } = useSectionContent('cadeiras', 'hero', {
    title: 'Cadeiras',
    subtitle: 'Artesanato que se sente ao primeiro toque',
    breadcrumb: 'Principal / Cadeiras',
  })

  return (
    <section className="relative h-[65vh] min-h-[420px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${content?.image || cadeirasHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
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
          <h1 className="text-[44px] md:text-[60px] leading-[1.02] text-offwhite">{content?.title}</h1>
          <p className="mt-4 text-offwhite/80">{content?.subtitle}</p>
          <GoldDivider className="max-w-[220px] mx-auto mt-8" />
        </div>
      </motion.div>
    </section>
  )
}

function IntroSection() {
  const { content } = useSectionContent('cadeiras', 'intro', {
    label: 'O Nosso Trabalho',
    titleLine1: 'Estofos Que Definem',
    titleLine2: 'o Seu Espaço',
    paragraph1:
      'Cada cadeira que sai do nosso atelier é o resultado de um processo cuidadoso: escolha do tecido, preparação da estrutura, estofo e acabamento final. Trabalhamos com materiais de primeira qualidade selecionados de acordo com o uso, o espaço e o gosto de cada cliente.',
    paragraph2:
      'Seja uma cadeira de sala clássica, uma peça de escritório de alto padrão ou um conjunto para sala de jantar, o nosso processo garante que cada detalhe corresponde ao que imaginou - ou supera essa visão.',
  })

  return (
    <section className="py-[120px] bg-dark">
      <div className={SITE_CONTAINER}>
        <ScrollReveal variant="fadeUp" className="mb-12">
          <SectionLabel>{content?.label}</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] leading-[1.05] text-offwhite">
            <span className="block">{content?.titleLine1}</span>
            <span className="block">{content?.titleLine2}</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <ScrollReveal variant="fadeUp" delay={0}>
            <p className="text-offwhite/85 leading-8 text-[15px] md:text-[16px]">{content?.paragraph1}</p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.15}>
            <p className="text-offwhite/85 leading-8 text-[15px] md:text-[16px]">{content?.paragraph2}</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function GaleriaSection() {
  const lightbox = useLightbox()
  const pexels = usePexels('upholstered chair luxury fabric', {
    orientation: 'portrait',
    perPage: 4,
    page: 1,
  })
  const { media: apiMedia, getUrl } = useMediaFromApi('galeria-cadeiras', 40)

  const pexelsImages = pexels.photos.map((photo) => getPhotoUrl(photo, 'large2x')).filter(Boolean)
  const apiImages = apiMedia.map((item) => getUrl(item)).filter(Boolean)
  const images = apiImages.length > 0 ? apiImages : [...LOCAL_CADEIRAS, ...pexelsImages]
  const galleryImages = images
    .filter(Boolean)
    .map((src, index) => ({ src, alt: `Portfólio de cadeiras ${index + 1}` }))

  return (
    <section className="py-[120px]" style={{ backgroundColor: 'rgb(15,15,15)' }}>
      <div className={SITE_CONTAINER}>
        <ScrollReveal variant="fadeIn" className="mb-12">
          <SectionLabel>Portfólio</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] text-offwhite">Cada Peça, Uma História</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {galleryImages.map((image, index) => (
            <ScrollReveal key={`${image.src}-${index}`} variant="fadeUp" delay={index * 0.08}>
              <div
                className="group relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: '4 / 5' }}
                onClick={() => lightbox.open(index)}
              >
                {image ? (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-400 ease-in-out group-hover:scale-[1.06]"
                  />
                ) : (
                  <PexelsPlaceholder minHeight={340} />
                )}
                <div className="absolute inset-0 bg-transparent group-hover:bg-[rgba(181,172,151,0.12)] transition-all duration-400 ease-in-out" />
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
      </div>
    </section>
  )
}

function ProcessoSection() {
  return (
    <section className="py-[120px] bg-offwhite">
      <div className={SITE_CONTAINER}>
        <ScrollReveal variant="fadeIn" className="mb-14">
          <SectionLabel light>Como Trabalhamos</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] leading-[1.05] text-dark">
            <span className="block">Do Projecto ao Acabamento</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          <div className="hidden md:block absolute top-[64px] left-[7%] right-[7%] h-px bg-[rgba(181,172,151,0.3)]" />

          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <ScrollReveal key={step.number} variant="fadeUp" delay={index * 0.1}>
                <article style={{ position: 'relative', paddingTop: 16, overflow: 'visible' }}>
                  <span
                    style={{
                      color: 'rgb(181,172,151)',
                      opacity: 0.25,
                      fontSize: '80px',
                      fontFamily: '"Cormorant Garamond", serif',
                      lineHeight: 1,
                      position: 'absolute',
                      top: '-10px',
                      left: 0,
                      zIndex: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    {step.number}
                  </span>
                  <p
                    style={{
                      color: 'rgb(21,21,21)',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      position: 'relative',
                      zIndex: 1,
                      marginTop: 56,
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    style={{
                      color: 'rgb(80,80,80)',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '14px',
                      lineHeight: 1.7,
                      position: 'relative',
                      zIndex: 1,
                      marginTop: 12,
                    }}
                  >
                    {step.text}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const { content } = useSectionContent('cadeiras', 'cta', {
    title: 'Pronto para Renovar as suas Cadeiras?',
    text: 'Conte-nos o seu projecto. Respondemos em menos de 24 horas com opções e disponibilidade.',
    buttonPrimary: 'Pedir Orçamento',
    buttonSecondary: 'Enviar Email',
  })

  return (
    <section className="py-[100px] bg-dark">
      <ScrollReveal variant="scaleIn" className={`${SITE_CONTAINER} text-center`}>
        <h2 className="text-[34px] md:text-[48px] text-offwhite mb-5">{content?.title}</h2>
        <p className="text-offwhite/80 max-w-[620px] mx-auto leading-7 text-[15px] md:text-[16px]">{content?.text}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            href="https://wa.me/351914888808?text=Olá%2C%20tenho%20interesse%20em%20estofar%20cadeiras.%20Podem%20dar-me%20um%20orçamento%3F"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content?.buttonPrimary}
          </Button>
          <Button href="mailto:elisabetearede67@gmail.com" variant="ghost">
            {content?.buttonSecondary}
          </Button>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default function Cadeiras() {
  return (
    <div>
      <PageHero />
      <IntroSection />
      <GaleriaSection />
      <ProcessoSection />
      <CTASection />
    </div>
  )
}
