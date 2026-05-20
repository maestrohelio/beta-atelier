import { motion } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'
import SectionLabel from '../components/ui/SectionLabel'
import GoldDivider from '../components/ui/GoldDivider'
import Button from '../components/ui/Button'
import Lightbox from '../components/ui/Lightbox'
import { usePexels } from '../hooks/usePexels'
import { useLightbox } from '../hooks/useLightbox'
import { useSiteConfig } from '../context/SiteContext'
import { useSectionContent } from '../hooks/useSectionContent'
import { useMediaFromApi } from '../hooks/useMediaFromApi'
import cadeiraDestaque from '../assets/images/cadeira-destaque.jpg'
import cadeiraServico from '../assets/images/cadeira-servico.jpg'
import cortinadoServico from '../assets/images/cortinado-servico.jpg'
import pulpitoLocal from '../assets/images/pulpito-local-03.jpg'

const SITE_CONTAINER = 'max-w-[1200px] mx-auto px-6 md:px-12'

const FALLBACK_CONTACT = {
  phone: '+351 914 888 808',
  phoneTel: 'tel:+351914888808',
  email: 'elisabetearede67@gmail.com',
  emailLink: 'mailto:elisabetearede67@gmail.com',
  address: 'Rua Viela do Ribeiro, 3750-720, Recardães, Águeda',
  maps: 'https://maps.app.goo.gl/VRfNEGYPSL2VAMjm8',
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
  const heroPexels = usePexels('seamstress workshop artisan textile', {
    perPage: 1,
    orientation: 'landscape',
    page: 1,
  })
  const { content } = useSectionContent('sobre', 'hero', {
    title: 'Sobre Nós',
    subtitle: 'Uma história feita de tecidos, dedicação e amor pelo detalhe',
    breadcrumb: 'Principal / Sobre Nós',
  })

  const heroImage = content?.image || (heroPexels.photos[0]
    ? heroPexels.getUrl(heroPexels.photos[0], 'large2x')
    : cadeiraServico)

  return (
    <section className="relative h-[65vh] min-h-[420px] overflow-hidden">
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
        <PexelsPlaceholder className="absolute inset-0 w-full h-full" minHeight={420} />
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
          <h1 className="text-[44px] md:text-[60px] leading-[1.02] text-offwhite">{content?.title}</h1>
          <p className="mt-4 text-offwhite/82">{content?.subtitle}</p>
          <GoldDivider className="max-w-[220px] mx-auto mt-8" />
        </div>
      </motion.div>
    </section>
  )
}

function HistoriaSection() {
  const historiaPexels = usePexels('upholstery workshop hands fabric', {
    perPage: 1,
    orientation: 'portrait',
    page: 1,
  })
  const { content } = useSectionContent('sobre', 'historia', {
    label: 'A Nossa História',
    titleLine1: 'Nascemos da Paixão',
    titleLine2: 'pelo Artesanato',
    paragraph1:
      'A Beta Atelier nasceu da convicção de que o artesanato de qualidade não tem substituto. Com mais de 15 anos de experiência em estofos e cortinados, construímos uma reputação assente na honestidade, na qualidade dos materiais e num serviço que coloca o cliente no centro de cada decisão.',
    paragraph2:
      'Estamos localizados em Recardães, Águeda, e trabalhamos para clientes particulares e empresas em toda a região. Cada projecto é único e recebe a atenção total que merece, do primeiro contacto ao acabamento final.',
  })

  const historyImage = content?.image || cadeiraDestaque || (historiaPexels.photos[0]
    ? historiaPexels.getUrl(historiaPexels.photos[0], 'large2x')
    : null)

  return (
    <section className="py-[120px] bg-dark">
      <div className={`${SITE_CONTAINER} grid md:grid-cols-[9fr_11fr] gap-10 md:gap-14 items-center`}>
        <ScrollReveal variant="fadeLeft">
          {historyImage ? (
            <div className="relative overflow-hidden min-h-[500px] border border-subtle">
              <img
                src={historyImage}
                alt="Detalhes do trabalho artesanal"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ) : (
            <PexelsPlaceholder minHeight={500} />
          )}
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

function ValoresSection() {
  const valores = [
    {
      title: 'Qualidade Sem Compromisso',
      text: 'Usamos apenas materiais que escolheríamos para as nossas próprias casas. A qualidade não é opcional - é a nossa assinatura.',
    },
    {
      title: 'Atendimento Personalizado',
      text: 'Cada cliente tem necessidades únicas. Ouvimos, aconselhamos e adaptamos cada solução ao espaço, ao gosto e ao orçamento disponível.',
    },
    {
      title: 'Compromisso com o Prazo',
      text: 'Respeitamos o seu tempo. Os prazos acordados são cumpridos e qualquer alteração é comunicada com antecedência.',
    },
  ]

  return (
    <section className="py-[120px]" style={{ backgroundColor: 'rgb(15,15,15)' }}>
      <div className={SITE_CONTAINER}>
        <ScrollReveal variant="fadeIn" className="mb-12">
          <SectionLabel>Os Nossos Valores</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] text-offwhite">O Que nos Define</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {valores.map((item, index) => (
            <ScrollReveal key={item.title} variant="fadeUp" delay={index * 0.12}>
              <article className="h-full p-7 border border-subtle bg-black/25">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full mb-5"
                  style={{
                    backgroundColor: 'rgba(181,172,151,0.15)',
                    color: 'rgb(181,172,151)',
                    border: '1px solid rgba(181,172,151,0.35)',
                  }}
                >
                  {index + 1}
                </span>
                <h3 className="font-sans text-[13px] uppercase tracking-[2px] text-offwhite mb-4">{item.title}</h3>
                <p className="text-offwhite/80 text-[15px] leading-7">{item.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FotosAtelierSection() {
  const lightbox = useLightbox()
  const atelierPexels = usePexels('upholstery studio workshop tools', {
    perPage: 4,
    orientation: 'landscape',
    page: 1,
  })
  const { media: apiMedia, getUrl } = useMediaFromApi('galeria-atelier', 8)

  const localPhotos = [cadeiraServico, cadeiraDestaque, cortinadoServico, pulpitoLocal]
  const pexelsPhotos = atelierPexels.photos.map((photo) => atelierPexels.getUrl(photo, 'large2x')).filter(Boolean)
  const apiPhotos = apiMedia.map((item) => getUrl(item)).filter(Boolean)

  const photos = (apiPhotos.length > 0 ? apiPhotos : [...localPhotos, ...pexelsPhotos]).slice(0, 4)
  const galleryImages = photos
    .filter(Boolean)
    .map((src, index) => ({ src, alt: `Atelier Beta Atelier ${index + 1}` }))

  return (
    <section className="py-[120px] bg-dark">
      <div className={SITE_CONTAINER}>
        <ScrollReveal variant="fadeIn" className="mb-12">
          <SectionLabel>O Nosso Espaço</SectionLabel>
          <h2 className="text-[36px] md:text-[54px] text-offwhite">O Atelier</h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {galleryImages.map((photo, index) => (
            <ScrollReveal key={`${photo.src}-${index}`} variant="fadeUp" delay={index * 0.08}>
              <div
                className="group relative overflow-hidden min-h-[220px] md:min-h-[280px] cursor-pointer"
                onClick={() => lightbox.open(index)}
              >
                {photo ? (
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                  />
                ) : (
                  <PexelsPlaceholder className="absolute inset-0 h-full w-full" minHeight={260} />
                )}
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
      </div>
    </section>
  )
}

function LocalizacaoSection() {
  const { config } = useSiteConfig()
  const contact = { ...FALLBACK_CONTACT, ...(config ?? {}) }

  return (
    <section className="py-[120px] bg-offwhite">
      <div className={`${SITE_CONTAINER} grid md:grid-cols-2 gap-10 md:gap-14 items-start`}>
        <ScrollReveal variant="fadeLeft">
          <SectionLabel light>Onde Estamos</SectionLabel>
          <h2 className="text-[36px] md:text-[52px] leading-[1.05] text-dark mb-6">Visite-nos</h2>
          <p className="text-dark/78 text-[16px] leading-8 max-w-[520px]">
            Estamos em Recardães, Águeda, prontos para recebê-lo e mostrar-lhe o nosso trabalho.
          </p>

          <div className="mt-8">
            <Button href={contact.maps} target="_blank" rel="noopener noreferrer">
              Como Chegar
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeRight">
          <div className="space-y-5 p-7 md:p-8 border border-[rgba(21,21,21,0.12)] bg-white/40">
            <div>
              <p className="text-[11px] uppercase tracking-[2px] text-taupe mb-2">Morada</p>
              <a
                href={contact.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark/85 leading-7 hover:text-dark transition-colors"
              >
                {contact.address}
              </a>
            </div>

            <GoldDivider />

            <div>
              <p className="text-[11px] uppercase tracking-[2px] text-taupe mb-2">Telefone</p>
              <a href={contact.phoneTel} className="text-dark/85 hover:text-dark transition-colors">
                {contact.phone}
              </a>
            </div>

            <GoldDivider />

            <div>
              <p className="text-[11px] uppercase tracking-[2px] text-taupe mb-2">Email</p>
              <a href={contact.emailLink} className="text-dark/85 hover:text-dark transition-colors">
                {contact.email}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default function Sobre() {
  return (
    <div>
      <PageHero />
      <HistoriaSection />
      <ValoresSection />
      <FotosAtelierSection />
      <LocalizacaoSection />
    </div>
  )
}
