// src/services/pexels.js
const PEXELS_KEY = 'HXUq6GnePewGsEH9v7GaeKQAiGo3Ctvq2F3atYnPh9BLaetAIKB6jqNU'
const BASE       = 'https://api.pexels.com/v1'

async function pexelsFetch(path) {
  const res = await fetch(BASE + path, {
    headers: { Authorization: PEXELS_KEY },
  })
  if (!res.ok) throw new Error(`Pexels error: ${res.status}`)
  return res.json()
}

/**
 * Pesquisa fotos no Pexels.
 * @param {string} query   - Termo de pesquisa em ingles
 * @param {object} opts
 * @param {number} opts.perPage  - Numero de resultados (default 15)
 * @param {string} opts.orientation - landscape | portrait | square
 * @param {number} opts.page  - Pagina (default 1)
 */
export async function searchPhotos(query, { perPage = 15, orientation = 'landscape', page = 1 } = {}) {
  const params = new URLSearchParams({
    query,
    per_page:    perPage,
    orientation,
    page,
  })
  const data = await pexelsFetch(`/search?${params}`)
  return data.photos ?? []
}

/**
 * Retorna a URL da foto no formato certo para cada contexto.
 * size: 'original' | 'large2x' | 'large' | 'medium' | 'small' | 'portrait' | 'landscape' | 'tiny'
 */
export function getPhotoUrl(photo, size = 'large2x') {
  return photo?.src?.[size] ?? photo?.src?.large ?? ''
}

// Queries pre-definidas por pagina/secao do site.
export const PEXELS_QUERIES = {
  hero:           'luxury interior design atelier',
  cadeiras:       'luxury upholstered chair artisan',
  cortinados:     'elegant curtains interior design',
  pulpitos:       'church pulpit wood craftsmanship',
  restauro:       'furniture restoration workshop',
  sobre:          'seamstress textile craftsmanship',
  contato:        'elegant workshop studio interior',
  heroMobile:     'luxury fabric texture close up',
}
