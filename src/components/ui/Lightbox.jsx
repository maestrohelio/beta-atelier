import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const current = images[currentIndex]

  const handleKey = useCallback((event) => {
    if (event.key === 'Escape') onClose()
    if (event.key === 'ArrowLeft' && currentIndex > 0) onPrev()
    if (event.key === 'ArrowRight' && currentIndex < images.length - 1) onNext()
  }, [currentIndex, images.length, onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (!current) return null

  const imageSrc = typeof current === 'string' ? current : current.src
  const imageAlt = typeof current === 'string' ? '' : (current.alt ?? '')

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: 'rgba(0,0,0,0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
          style={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: -32,
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '12px',
              letterSpacing: '2px',
            }}
          >
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>

        <button
          type="button"
          aria-label="Fechar galeria"
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 24,
            right: 28,
            background: 'none',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgb(255,255,255)',
            width: 44,
            height: 44,
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.3s',
          }}
          onMouseEnter={(event) => { event.currentTarget.style.borderColor = 'rgb(181,172,151)' }}
          onMouseLeave={(event) => { event.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
        >
          ×
        </button>

        {currentIndex > 0 && (
          <button
            type="button"
            aria-label="Imagem anterior"
            onClick={(event) => { event.stopPropagation(); onPrev() }}
            style={{
              position: 'fixed',
              left: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(181,172,151,0.3)',
              color: 'rgb(181,172,151)',
              width: 48,
              height: 48,
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(event) => { event.currentTarget.style.background = 'rgba(181,172,151,0.2)' }}
            onMouseLeave={(event) => { event.currentTarget.style.background = 'rgba(0,0,0,0.5)' }}
          >
            ←
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            type="button"
            aria-label="Próxima imagem"
            onClick={(event) => { event.stopPropagation(); onNext() }}
            style={{
              position: 'fixed',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(181,172,151,0.3)',
              color: 'rgb(181,172,151)',
              width: 48,
              height: 48,
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(event) => { event.currentTarget.style.background = 'rgba(181,172,151,0.2)' }}
            onMouseLeave={(event) => { event.currentTarget.style.background = 'rgba(0,0,0,0.5)' }}
          >
            →
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
