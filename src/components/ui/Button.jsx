// src/components/ui/Button.jsx
import { motion } from 'framer-motion'

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  target,
  rel,
}) {
  const baseStyle = {
    display: 'inline-block',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 500,
    fontSize: '12px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '14px 36px',
    borderRadius: 0,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease-in-out',
  }

  const styles = {
    primary: {
      ...baseStyle,
      backgroundColor: 'rgb(181,172,151)',
      color: 'rgb(21,21,21)',
      border: '1px solid rgb(181,172,151)',
    },
    ghost: {
      ...baseStyle,
      backgroundColor: 'transparent',
      color: 'rgb(255,255,255)',
      border: '1px solid rgba(255,255,255,0.3)',
    },
    'ghost-gold': {
      ...baseStyle,
      backgroundColor: 'transparent',
      color: 'rgb(181,172,151)',
      border: '1px solid rgb(181,172,151)',
    },
  }

  const hoverStyles = {
    primary:     { backgroundColor: 'transparent', color: 'rgb(181,172,151)' },
    ghost:       { borderColor: 'rgb(181,172,151)', color: 'rgb(181,172,151)' },
    'ghost-gold':{ backgroundColor: 'rgb(181,172,151)', color: 'rgb(21,21,21)' },
  }

  const props = {
    style: styles[variant] ?? styles.primary,
    whileHover: hoverStyles[variant] ?? hoverStyles.primary,
    whileTap: { scale: 0.97 },
    transition: { duration: 0.3 },
    className,
  }

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...props}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button onClick={onClick} {...props}>
      {children}
    </motion.button>
  )
}
