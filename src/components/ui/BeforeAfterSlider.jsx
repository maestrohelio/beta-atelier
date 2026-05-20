import { useCallback, useRef, useState } from 'react'

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Antes',
  afterAlt = 'Depois',
  aspectRatio = '4 / 3',
}) {
  const containerRef = useRef(null)
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)

  const setFromClientX = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.max(6, Math.min(94, next)))
  }, [])

  const startDrag = (clientX) => {
    setDragging(true)
    setFromClientX(clientX)
  }

  const moveDrag = (clientX) => {
    if (!dragging) return
    setFromClientX(clientX)
  }

  const stopDrag = () => setDragging(false)

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none touch-none"
      style={{ border: '1px solid rgba(181,172,151,0.2)', aspectRatio }}
      onPointerDown={(event) => startDrag(event.clientX)}
      onPointerMove={(event) => moveDrag(event.clientX)}
      onPointerUp={stopDrag}
      onPointerLeave={stopDrag}
      onPointerCancel={stopDrag}
      onTouchStart={(event) => {
        const touch = event.touches[0]
        if (!touch) return
        startDrag(touch.clientX)
      }}
      onTouchMove={(event) => {
        const touch = event.touches[0]
        if (!touch) return
        moveDrag(touch.clientX)
      }}
      onTouchEnd={stopDrag}
      onTouchCancel={stopDrag}
    >
      <img src={beforeSrc} alt={beforeAlt} className="absolute inset-0 h-full w-full object-cover" />

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={afterSrc} alt={afterAlt} className="h-full w-full object-cover" />
      </div>

      <div
        className="absolute top-0 bottom-0"
        style={{
          left: `${position}%`,
          width: '1px',
          backgroundColor: 'rgb(181,172,151)',
          boxShadow: '0 0 0 1px rgba(181,172,151,0.08)',
        }}
      />

      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full flex items-center justify-center"
        style={{
          left: `${position}%`,
          backgroundColor: 'rgba(21,21,21,0.9)',
          border: '1px solid rgba(181,172,151,0.55)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        }}
      >
        <span className="text-gold text-sm tracking-[2px]">↔</span>
      </div>

      <div className="absolute top-3 left-3 px-2 py-1 text-[10px] uppercase tracking-[2px] font-sans bg-black/60 text-gold">
        {afterAlt}
      </div>
      <div className="absolute top-3 right-3 px-2 py-1 text-[10px] uppercase tracking-[2px] font-sans bg-black/60 text-gold">
        {beforeAlt}
      </div>
    </div>
  )
}
