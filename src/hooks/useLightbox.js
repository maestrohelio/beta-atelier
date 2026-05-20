import { useState, useCallback } from 'react'

export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const open = useCallback((index) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])
  const prev = useCallback(() => setCurrentIndex((index) => Math.max(0, index - 1)), [])
  const next = useCallback((max) => setCurrentIndex((index) => Math.min(max - 1, index + 1)), [])

  return { isOpen, currentIndex, open, close, prev, next }
}
