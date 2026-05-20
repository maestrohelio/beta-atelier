// src/hooks/useCountUp.js
import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

export function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  const frameRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const isFloat = !Number.isInteger(target)

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = eased * target
      setCount(isFloat ? parseFloat(value.toFixed(1)) : Math.round(value))
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [inView, target, duration])

  return [ref, count]
}
