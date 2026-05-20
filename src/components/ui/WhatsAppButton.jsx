// src/components/ui/WhatsAppButton.jsx
import { motion } from 'framer-motion'
import whatsappIcon from '../../assets/images/icon-whatsapp.png'

const WA_LINK = 'https://wa.me/351914888808?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20pedir%20um%20or%C3%A7amento.'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar pelo WhatsApp"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '28px',
        zIndex: 9999,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 0 0 rgba(37,211,102,0.4)',
      }}
      animate={{
        boxShadow: [
          '0 0 0 0px rgba(37,211,102,0.5)',
          '0 0 0 8px rgba(37,211,102,0.15)',
          '0 0 0 0px rgba(37,211,102,0)',
        ],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={whatsappIcon}
        alt=""
        aria-hidden="true"
        style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
      />
    </motion.a>
  )
}
