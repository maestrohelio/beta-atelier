import { useEffect } from 'react'

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  return (
    <div className={`toast toast-${toast.type ?? 'success'}`}>
      <span>{toast.message}</span>
      <button type="button" className="toast-close" onClick={onClose}>×</button>
    </div>
  )
}
