import { motion } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'
import SectionLabel from '../components/ui/SectionLabel'
import GoldDivider from '../components/ui/GoldDivider'
import Button from '../components/ui/Button'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider'
import Lightbox from '../components/ui/Lightbox'
import { usePexels } from '../hooks/usePexels'
import { useLightbox } from '../hooks/useLightbox'
import { getPhotoUrl } from '../services/pexels'
import { useSectionContent } from '../hooks/useSectionContent'
import { useMediaFromApi } from '../hooks/useMediaFromApi'
import restauroSofaAntes from '../assets/images/restauro-sofa-antes.jpg'
import restauroSofaDepois from '../assets/images/restauro-sofa-depois.jpg'
import restauroCadeiraAntes from '../assets/images/restauro-cadeira-antes.jpg'
import restauroCadeiraDepois01 from '../assets/images/restauro-cadeira-depois-01.jpg'
import restauroCadeiraDepois02 from '../assets/images/restauro-cadeira-depois-02.jpg'

const SITE_CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-12'

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Avaliação da Peça',
    text: 'Analisamos o estado estrutural e estético da peça, identificamos o que pode ser recuperado e o que precisa de substituição.',
  },
  {
    number: '02',
    title: 'Proposta e Orçamento',
    text: 'Apresentamos uma proposta detalhada com opções de materiais, prazo e custo. Sem surpresas.',
  },
  {
    number: '03',
    title: 'Desmontagem e Restauro',
    text: 'A peça é desmontada, a estrutura é consolidada, os materiais são renovados e o novo estofo é aplicado.',
  },
  {
    number: '04',
    title: 'Entrega Impecável',
    text: 'A peça regressa ao seu espaço renovada, com o mesmo carácter de sempre e uma nova vida pela frente.',
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
  const { content } = useSectionContent('restauro', 'hero', {
    title: 'Restauro',
    subtitle: 'Devolvemos a vida ao que o tempo foi apagando',
    breadcrumb: 'Principal / Restauro',
  })

  return (
    <section className="relative h-[65vh] min-h-[420px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${content?.image || restauroSofaDepois})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/65" />

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
  const { content } = useSectionContent('restauro', 'intro', {
    label: 'O Que Fazemos',
    titleLine1: 'Restaurar é um Acto',
    titleLine2: 'de Respeito',
    paragraph1:
      'Restaurar uma peça de mobiliário é muito mais do que repará-la. É reconhecer o valor do que foi feito com cuidado no passado e dar-lhe as condições para continuar a contar a sua história. Na Beta Atelier, cada restauro começa por uma avaliação honesta da peça e termina com um resultado que surpreende.',
    paragraph2:
      'Trabalhamos com sofás, cadeiras, poltronas e mobiliário litúrgico. Seja uma peça de família com valor sentimental ou um conjunto que precisa de ser renovado para um espaço comercial, o nosso processo garante qualidade, durabilidade e fidelidade à identidade original da peça.',
  })

  return (
    <section className="py-[120px] bg-dark">
      <div className={`${SITE_CONTAINER} grid md:grid-cols-[11fr_9fr] gap-10 md:gap-14 items-center`}>
        <ScrollReveal variant="fadeLeft">
          <SectionLabel>{content?.label}</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] leading-[1.05] text-offwhite mb-7">
            <span className="block">{content?.titleLine1}</span>
            <span className="block">{content?.titleLine2}</span>
          </h2>

          <p className="text-offwhite/84 leading-8 text-[15px] md:text-[16px] mb-5">{content?.paragraph1}</p>
          <p className="text-offwhite/84 leading-8 text-[15px] md:text-[16px]">{content?.paragraph2}</p>
        </ScrollReveal>

        <ScrollReveal variant="fadeRight">
          <div className="relative overflow-hidden min-h-[480px] border border-subtle">
            <img
              src={content?.image || restauroCadeiraDepois01}
              alt="Cadeira restaurada"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function SliderSection() {
  const { content } = useSectionContent('restauro', 'slider', {
    title: 'Veja a Diferença',
    subtitle: 'Arraste para comparar o antes e o depois',
    beforeImage: restauroSofaAntes,
    afterImage: restauroSofaDepois,
  })

  return (
    <section className="py-[120px]" style={{ backgroundColor: 'rgb(15,15,15)' }}>
      <div className={SITE_CONTAINER}>
        <ScrollReveal variant="fadeIn" className="text-center mb-10">
          <SectionLabel>Transformação</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] text-offwhite mb-4">{content?.title}</h2>
          <p className="text-offwhite/75">{content?.subtitle}</p>
        </ScrollReveal>

        <ScrollReveal variant="scaleIn">
          <div className="max-w-[900px] mx-auto">
            <BeforeAfterSlider
              beforeSrc={content?.beforeImage || restauroSofaAntes}
              afterSrc={content?.afterImage || restauroSofaDepois}
              beforeAlt="Sofá antes do restauro"
              afterAlt="Sofá depois do restauro"
              aspectRatio="16 / 9"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function GaleriaPairsSection() {
  const lightbox = useLightbox()
  const pexelsAntes = usePexels('old armchair worn fabric', {
    perPage: 1,
    orientation: 'landscape',
    page: 1,
  })
  const { media: restauroMedia, getUrl } = useMediaFromApi('galeria-restauro', 8)

  const beforeContext = pexelsAntes.photos[0]
    ? getPhotoUrl(pexelsAntes.photos[0], 'large2x')
    : restauroCadeiraAntes

  const apiImages = restauroMedia.map((item) => getUrl(item)).filter(Boolean)

  const pairs = apiImages.length >= 4
    ? [
      {
        before: apiImages[0],
        after: apiImages[1],
        legend: 'Restauro de peça com recuperação estrutural e novo estofo',
      },
      {
        before: apiImages[2],
        after: apiImages[3],
        legend: 'Renovação completa com acabamento de alta durabilidade',
      },
    ]
    : [
      {
        before: restauroCadeiraAntes,
        after: restauroCadeiraDepois01,
        legend: 'Cadeira de sala — renovação completa do estofo',
      },
      {
        before: beforeContext,
        after: restauroCadeiraDepois02,
        legend: 'Cadeira clássica — novo acabamento com reforço estrutural',
      },
    ]

  const galleryImages = pairs.flatMap((pair, index) => ([
    { src: pair.before, alt: `Antes do restauro ${index + 1}` },
    { src: pair.after, alt: `Depois do restauro ${index + 1}` },
  ]))

  return (
    <section className="py-[120px] bg-dark">
      <div className={SITE_CONTAINER}>
        <ScrollReveal variant="fadeIn" className="mb-12">
          <SectionLabel>Mais Trabalhos</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] text-offwhite">Cada Peça com a sua História</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {pairs.map((pair, index) => (
            <ScrollReveal key={`${pair.after}-${index}`} variant="fadeUp" delay={index * 0.15}>
              <article className="p-5 md:p-6 border border-subtle bg-black/20">
                <div className="flex items-center justify-center gap-3 mb-4 text-[11px] uppercase tracking-[2px] text-gold">
                  <span>Antes</span>
                  <span className="text-[12px]">→</span>
                  <span>Depois</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="relative overflow-hidden cursor-pointer"
                    style={{ aspectRatio: '4 / 5' }}
                    onClick={() => lightbox.open(index * 2)}
                  >
                    {pair.before ? (
                      <img src={pair.before} alt="Antes do restauro" className="h-full w-full object-cover" />
                    ) : (
                      <PexelsPlaceholder minHeight={280} />
                    )}
                  </div>
                  <div
                    className="relative overflow-hidden cursor-pointer"
                    style={{ aspectRatio: '4 / 5' }}
                    onClick={() => lightbox.open((index * 2) + 1)}
                  >
                    <img src={pair.after} alt="Depois do restauro" className="h-full w-full object-cover" />
                  </div>
                </div>

                <p className="mt-4 text-offwhite/78 text-[14px] leading-6">{pair.legend}</p>
              </article>
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
          <SectionLabel light>Como Funciona</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] leading-[1.05] text-dark">O Nosso Processo de Restauro</h2>
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
  const { content } = useSectionContent('restauro', 'cta', {
    title: 'Tem uma Peça para Restaurar?',
    text: 'Envie-nos uma foto e descrição da peça. Avaliamos e respondemos com uma proposta sem compromisso.',
    buttonPrimary: 'Enviar Foto pelo WhatsApp',
    buttonSecondary: 'Enviar Email com Fotos',
  })

  return (
    <section className="py-[100px] bg-dark">
      <ScrollReveal variant="scaleIn" className={`${SITE_CONTAINER} text-center`}>
        <h2 className="text-[34px] md:text-[48px] text-offwhite mb-5">{content?.title}</h2>
        <p className="text-offwhite/80 max-w-[700px] mx-auto leading-7 text-[15px] md:text-[16px]">{content?.text}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            href="https://wa.me/351914888808?text=Olá%2C%20tenho%20uma%20peça%20para%20restaurar.%20Posso%20enviar%20fotos%20para%20avaliação%3F"
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

export default function Restauro() {
  return (
    <div>
      <PageHero />
      <IntroSection />
      <SliderSection />
      <GaleriaPairsSection />
      <ProcessoSection />
      <CTASection />
    </div>
  )
}
