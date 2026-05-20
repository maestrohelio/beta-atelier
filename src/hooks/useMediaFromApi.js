import { useState, useEffect } from 'react'
import { mediaApi } from '../services/api'

function toList(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.results)) return data.results
  if (Array.isArray(data?.data)) return data.data
  return []
}

export function useMediaFromApi(tag, limit = 10, params = {}) {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    if (!tag) {
      setLoading(false)
      return () => { cancelled = true }
    }

    const load = async () => {
      try {
        const data = await mediaApi.getAll({ limit: limit * 3, ...params })
        const items = toList(data)

        const filtered = tag === '*'
          ? items.slice(0, limit)
          : items
            .filter((m) => (
              m.tag === tag
              || m.category === tag
              || (Array.isArray(m.tags) && m.tags.includes(tag))
              || (typeof m.tags === 'string' && m.tags.includes(tag))
            ))
            .slice(0, limit)

        if (!cancelled) setMedia(filtered)
      } catch {
        if (!cancelled) setMedia([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [tag, limit])

  const getUrl = (item) => item?.file_url ?? item?.url ?? item?.src ?? ''

  return { media, loading, getUrl }
}
