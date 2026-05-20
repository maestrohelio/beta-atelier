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
import heroLocal from '../assets/images/galeria-cortinado-01.jpg'
import introLocal from '../assets/images/galeria-cortinado-02.jpg'
import cortinado01 from '../assets/images/cortinado-01.jpg'
import cortinado02 from '../assets/images/cortinado-02.jpg'
import cortinado03 from '../assets/images/cortinado-03.jpg'
import cortinado04 from '../assets/images/cortinado-04.jpg'
import cortinado05 from '../assets/images/cortinado-05.jpg'
import cortinado06 from '../assets/images/cortinado-06.jpg'
import cortinado07 from '../assets/images/cortinado-07.jpg'
import cortinado08 from '../assets/images/cortinado-08.jpg'
import cortinado09 from '../assets/images/cortinado-09.jpg'
import cortinado10 from '../assets/images/cortinado-10.jpg'
import cortinado11 from '../assets/images/cortinado-11.jpg'
import cortinado12 from '../assets/images/cortinado-12.jpg'
import cortinado13 from '../assets/images/cortinado-13.jpg'
import cortinado14 from '../assets/images/cortinado-14.jpg'
import cortinado15 from '../assets/images/cortinado-15.jpg'

const SITE_CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-12'

const LOCAL_GALLERY = [
  cortinado01,
  cortinado02,
  cortinado03,
  cortinado04,
  cortinado05,
  cortinado06,
  cortinado07,
  cortinado08,
  cortinado09,
  cortinado10,
  cortinado11,
  cortinado12,
  cortinado13,
  cortinado14,
  cortinado15,
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
  const { content } = useSectionContent('cortinados', 'hero', {
    title: 'Cortinados',
    subtitle: 'A moldura perfeita para cada janela, cada luz, cada espaço',
    breadcrumb: 'Principal / Cortinados',
  })

  return (
    <section className="relative h-[65vh] min-h-[420px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${content?.image || heroLocal})`,
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
  const { content } = useSectionContent('cortinados', 'intro', {
    label: 'Cortinados',
    titleLine1: 'Luz e Privacidade',
    titleLine2: 'com Elegância',
    paragraph1:
      'Os cortinados são muito mais do que um acessório decorativo — são o elemento que controla a luz, define a privacidade e enquadra cada divisão. No nosso atelier, cada cortinado é escolhido, cortado e instalado com a precisão de um alfaiate.',
    paragraph2:
      'Trabalhamos com tecidos de qualidade superior, desde o linho natural ao veludo, passando por opções blackout de alto desempenho. O resultado é sempre o mesmo: uma janela que parece ter sido feita exactamente para aquele espaço.',
    cta: 'Pedir Orçamento',
  })

  return (
    <section className="py-[120px] bg-dark">
      <div className={`${SITE_CONTAINER} grid md:grid-cols-5 gap-12 items-center`}>
        <ScrollReveal variant="fadeLeft" className="md:col-span-3">
          <SectionLabel>{content?.label}</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] leading-[1.05] text-offwhite mb-7">
            <span className="block">{content?.titleLine1}</span>
            <span className="block">{content?.titleLine2}</span>
          </h2>

          <p className="text-offwhite/84 leading-8 text-[15px] md:text-[16px] mb-5">{content?.paragraph1}</p>
          <p className="text-offwhite/84 leading-8 text-[15px] md:text-[16px]">{content?.paragraph2}</p>

          <div className="mt-9">
            <Button
              href="https://wa.me/351914888808?text=Olá%2C%20gostaria%20de%20um%20orçamento%20para%20cortinados."
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost-gold"
            >
              {content?.cta}
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeRight" className="md:col-span-2">
          <div className="relative overflow-hidden min-h-[480px] border border-subtle">
            <img src={content?.image || introLocal} alt="Detalhe de cortinado" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function TiposSection() {
  const classicos = usePexels('classic curtains drapes elegant', { perPage: 1, orientation: 'landscape', page: 1 })
  const contemporaneos = usePexels('modern minimalist curtains window', {
    perPage: 1,
    orientation: 'landscape',
    page: 1,
  })
  const blackout = usePexels('blackout curtain bedroom dark', { perPage: 1, orientation: 'landscape', page: 1 })

  const cards = [
    {
      title: 'Cortinados Clássicos',
      text: 'Tecidos pesados, pregas definidas e caimento perfeito. Para salas de estar e quartos que respiram elegância atemporal.',
      image: classicos.photos[0] ? getPhotoUrl(classicos.photos[0], 'large2x') : null,
    },
    {
      title: 'Contemporâneos',
      text: 'Linhas limpas, tecidos leves e funcionais. Para espaços modernos que valorizam a luz natural sem abdicarem da privacidade.',
      image: contemporaneos.photos[0] ? getPhotoUrl(contemporaneos.photos[0], 'large2x') : null,
    },
    {
      title: 'Blackout & Técnico',
      text: 'Isolamento de luz total ou parcial, controlo térmico e acústico. Ideal para quartos, home cinema e espaços de trabalho.',
      image: blackout.photos[0] ? getPhotoUrl(blackout.photos[0], 'large2x') : null,
    },
  ]

  return (
    <section className="py-[120px]" style={{ backgroundColor: 'rgb(15,15,15)' }}>
      <div className={SITE_CONTAINER}>
        <ScrollReveal variant="fadeIn" className="mb-12">
          <SectionLabel>As Nossas Opções</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] leading-[1.05] text-offwhite">
            <span className="block">Para Cada Espaço,</span>
            <span className="block">a Solução Certa</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <ScrollReveal key={card.title} variant="fadeUp" delay={index * 0.1}>
              <article
                className="group h-full"
                style={{
                  backgroundColor: 'rgb(21,21,21)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  transition: 'border 0.3s ease',
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.borderTop = '1px solid rgb(181,172,151)'
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.borderTop = '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <div style={{ aspectRatio: '16 / 9' }} className="overflow-hidden">
                  {card.image ? (
                    <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
                  ) : (
                    <PexelsPlaceholder minHeight={240} />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-[30px] leading-[1] text-offwhite mb-4">{card.title}</h3>
                  <p className="text-offwhite/80 text-[15px] leading-7">{card.text}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function GaleriaSection() {
  const lightbox = useLightbox()
  const pexels = usePexels('curtain interior design elegant home', {
    orientation: 'landscape',
    perPage: 6,
    page: 1,
  })
  const { media: apiMedia, getUrl } = useMediaFromApi('galeria-cortinados', 30)

  const pexelsImages = pexels.photos.map((photo) => getPhotoUrl(photo, 'large2x')).filter(Boolean)
  const apiImages = apiMedia.map((item) => getUrl(item)).filter(Boolean)
  const images = apiImages.length > 0 ? apiImages : [...LOCAL_GALLERY, ...pexelsImages]
  const galleryImages = images
    .filter(Boolean)
    .map((src, index) => ({ src, alt: `Coleção de cortinados ${index + 1}` }))

  return (
    <section className="py-[120px] bg-dark">
      <div className={SITE_CONTAINER}>
        <ScrollReveal variant="fadeIn" className="mb-12">
          <SectionLabel>Trabalhos Realizados</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] text-offwhite">A Nossa Coleção</h2>
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

function CTASection() {
  const { content } = useSectionContent('cortinados', 'cta', {
    title: 'Transforme as Suas Janelas',
    text: 'Os cortinados certos mudam completamente o ambiente de uma divisão. Fale connosco e encontramos juntos a opção ideal para si.',
    buttonPrimary: 'Pedir Orçamento pelo WhatsApp',
    buttonSecondary: 'Contactar por Email',
  })

  return (
    <section className="py-[100px] bg-gold text-dark">
      <ScrollReveal variant="scaleIn" className={`${SITE_CONTAINER} text-center`}>
        <h2 className="text-[34px] md:text-[48px] text-dark mb-5">{content?.title}</h2>
        <p className="text-dark/80 max-w-[620px] mx-auto leading-7 text-[15px] md:text-[16px]">{content?.text}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <motion.a
            href="https://wa.me/351914888808?text=Olá%2C%20gostaria%20de%20tratar%20de%20cortinados%20para%20o%20meu%20espaço."
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
            {content?.buttonPrimary}
          </motion.a>
          <motion.a
            href="mailto:elisabetearede67@gmail.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center px-8 py-3 text-sm uppercase tracking-[2px] font-medium"
            style={{
              backgroundColor: 'transparent',
              color: 'rgb(21,21,21)',
              border: '1px solid rgb(21,21,21)',
            }}
          >
            {content?.buttonSecondary}
          </motion.a>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default function Cortinados() {
  return (
    <div>
      <PageHero />
      <IntroSection />
      <TiposSection />
      <GaleriaSection />
      <CTASection />
    </div>
  )
}
