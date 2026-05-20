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
import heroLocal from '../assets/images/galeria-pulpito-01.jpg'
import introLocal from '../assets/images/pulpito-local-03.jpg'
import pulpito01 from '../assets/images/pulpito-01.jpg'
import pulpito02 from '../assets/images/pulpito-02.jpg'
import pulpito03 from '../assets/images/pulpito-03.jpg'

const SITE_CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-12'

const LOCAL_GALLERY = [pulpito01, pulpito02, pulpito03]

const DIFFERENTIALS = [
  {
    title: 'Experiência em Espaços Sagrados',
    text: 'Conhecemos as especificidades dos espaços litúrgicos e respeitamos a sua identidade em cada intervenção.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3V21M3 12H21" stroke="rgb(181,172,151)" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Materiais de Alta Durabilidade',
    text: 'Selecionamos tecidos resistentes ao uso continuado, fáceis de limpar e com estética adequada ao ambiente.',
    icon: (
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          border: '1.7px solid rgb(181,172,151)',
        }}
      />
    ),
  },
  {
    title: 'Acompanhamento Total do Projecto',
    text: 'Da visita ao espaço até à instalação final, estamos presentes em cada etapa.',
    icon: (
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: 'rgba(181,172,151,0.22)',
          border: '1.7px solid rgb(181,172,151)',
        }}
      />
    ),
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
  const { content } = useSectionContent('pulpitos', 'hero', {
    title: 'Púlpitos',
    subtitle: 'Dignidade e qualidade para os espaços que elevam o espírito',
    breadcrumb: 'Principal / Púlpitos',
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
  const { content } = useSectionContent('pulpitos', 'intro', {
    label: 'Trabalho Especializado',
    titleLine1: 'O Respeito pelo Espaço',
    titleLine2: 'Sagrado em Cada Detalhe',
    paragraph1:
      'O trabalho em espaços litúrgicos exige sensibilidade, experiência e um profundo respeito pela função e pela estética de cada ambiente. Na Beta Atelier, temos a experiência e os materiais adequados para estofar e renovar púlpitos, bancos de igreja e mobiliário litúrgico com a dignidade que merecem.',
    paragraph2:
      'Cada projecto litúrgico é tratado com uma abordagem personalizada: avaliamos o espaço, a história da peça e as necessidades da comunidade antes de propor qualquer intervenção. O resultado deve honrar o passado e servir o presente.',
  })

  return (
    <section className="py-[120px] bg-dark">
      <div className={`${SITE_CONTAINER} grid md:grid-cols-[9fr_11fr] gap-10 md:gap-14 items-center`}>
        <ScrollReveal variant="fadeLeft">
          <div className="relative overflow-hidden min-h-[500px] border border-subtle">
            <img src={content?.image || introLocal} alt="Trabalho em púlpito" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeRight">
          <SectionLabel>{content?.label}</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] leading-[1.05] text-offwhite mb-7">
            <span className="block">{content?.titleLine1}</span>
            <span className="block">{content?.titleLine2}</span>
          </h2>

          <p className="text-offwhite/84 leading-8 text-[15px] md:text-[16px] mb-5">{content?.paragraph1}</p>
          <p className="text-offwhite/84 leading-8 text-[15px] md:text-[16px]">{content?.paragraph2}</p>
        </ScrollReveal>
      </div>
    </section>
  )
}

function GaleriaSection() {
  const lightbox = useLightbox()
  const pexels = usePexels('church interior altar wood', {
    orientation: 'landscape',
    perPage: 6,
    page: 1,
  })
  const { media: apiMedia, getUrl } = useMediaFromApi('galeria-pulpitos', 24)

  const pexelsImages = pexels.photos.map((photo) => getPhotoUrl(photo, 'large2x')).filter(Boolean)
  const apiImages = apiMedia.map((item) => getUrl(item)).filter(Boolean)
  const images = apiImages.length > 0 ? apiImages : [...LOCAL_GALLERY, ...pexelsImages]
  const galleryImages = images
    .filter(Boolean)
    .map((src, index) => ({ src, alt: `Portfólio litúrgico ${index + 1}` }))

  return (
    <section className="py-[120px]" style={{ backgroundColor: 'rgb(15,15,15)' }}>
      <div className={SITE_CONTAINER}>
        <ScrollReveal variant="fadeIn" className="mb-12">
          <SectionLabel>Trabalhos em Espaços Litúrgicos</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] text-offwhite">A Nossa Experiência</h2>
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

function DiferenciaisSection() {
  return (
    <section className="py-[120px] bg-offwhite">
      <div className={SITE_CONTAINER}>
        <ScrollReveal variant="fadeIn" className="mb-12">
          <SectionLabel light>Porque Escolher a Beta Atelier</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] leading-[1.05] text-dark">
            <span className="block">Especialização que</span>
            <span className="block">Faz a Diferença</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {DIFFERENTIALS.map((item, index) => (
            <ScrollReveal key={item.title} variant="fadeUp" delay={index * 0.1}>
              <article
                className="h-full p-8"
                style={{
                  borderTop: '2px solid rgb(181,172,151)',
                  backgroundColor: 'transparent',
                }}
              >
                <div className="mb-5" style={{ color: 'rgb(181,172,151)' }}>{item.icon}</div>
                <h3
                  style={{
                    color: 'rgb(21,21,21)',
                    fontSize: '13px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginBottom: 16,
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: 'rgb(80,80,80)', fontSize: '15px', lineHeight: 1.7 }}>{item.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const { content } = useSectionContent('pulpitos', 'cta', {
    title: 'Tem um Projecto Litúrgico?',
    text: 'Contacte-nos para uma visita ao espaço sem compromisso. Avaliamos, propomos e executamos com o respeito que cada ambiente merece.',
    buttonPrimary: 'Solicitar Visita',
    buttonSecondary: 'Enviar Email',
  })

  return (
    <section className="py-[100px] bg-dark">
      <ScrollReveal variant="scaleIn" className={`${SITE_CONTAINER} text-center`}>
        <h2 className="text-[34px] md:text-[48px] text-offwhite mb-5">{content?.title}</h2>
        <p className="text-offwhite/80 max-w-[700px] mx-auto leading-7 text-[15px] md:text-[16px]">{content?.text}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            href="https://wa.me/351914888808?text=Olá%2C%20tenho%20um%20projecto%20litúrgico%20e%20gostaria%20de%20uma%20visita%20ao%20espaço."
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

export default function Pulpitos() {
  return (
    <div>
      <PageHero />
      <IntroSection />
      <GaleriaSection />
      <DiferenciaisSection />
      <CTASection />
    </div>
  )
}
