// src/hooks/usePexels.js
import { useState, useEffect } from 'react'
import { searchPhotos, getPhotoUrl } from '../services/pexels'

export function usePexels(query, opts = {}) {
  const [photos,  setPhotos]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!query) return
    let cancelled = false

    setLoading(true)
    searchPhotos(query, opts)
      .then(data => { if (!cancelled) setPhotos(data) })
      .catch(err => { if (!cancelled) setError(err.message) })
      .finally(()  => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [query]) // opts intencionalmente excluido para evitar loops

  const getUrl = (photo, size) => getPhotoUrl(photo, size)

  return { photos, loading, error, getUrl }
}
