const BASE_URL = import.meta.env.VITE_ADMIN_API_BASE ?? 'http://localhost:3001'

async function request(method, path, body = null, params = {}, options = {}) {
  const url = new URL(BASE_URL + path)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value))
    }
  })

  const headers = { ...(options.headers ?? {}) }
  const fetchOptions = {
    method,
    headers,
  }

  if (body !== null && body !== undefined) {
    if (body instanceof FormData) {
      fetchOptions.body = body
    } else {
      fetchOptions.body = JSON.stringify(body)
      fetchOptions.headers['Content-Type'] = fetchOptions.headers['Content-Type'] ?? 'application/json'
    }
  }

  const res = await fetch(url.toString(), fetchOptions)

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail ?? err.error ?? `HTTP ${res.status}`)
  }

  if (res.status === 204) return null

  const contentType = res.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    return res.json()
  }

  return res.text()
}

export const settingsApi = {
  getAll: () => request('GET', '/api/settings'),
}

export const contentApi = {
  getPages: () => request('GET', '/api/content/pages'),
  getPage: (slug) => request('GET', `/api/content/pages/${slug}`),
  getSections: (slug) => request('GET', `/api/content/pages/${slug}`).then((data) => data.sections ?? []),
  updateSection: (id, data) => request('PUT', `/api/content/sections/${id}`, data),
}

export const mediaApi = {
  getAll: (params = {}) => request('GET', '/api/media', null, params),
  list: (params = {}) => request('GET', '/api/media', null, params),
  create: (data) => request('POST', '/api/media/upload', data),
  upload: (data) => request('POST', '/api/media/upload', data),
  remove: (id) => request('DELETE', `/api/media/${id}`),
}

// Backward-compatible aliases
export const sitesApi = {
  getAll: () => request('GET', '/api/settings').then((settings) => [{
    name: settings.site_name,
    tagline: settings.site_tagline,
    phone: settings.contact_phone,
    email: settings.contact_email,
    address: settings.contact_address,
    maps: settings.contact_maps,
    whatsapp_number: settings.whatsapp_number,
  }]),
  list: () => request('GET', '/api/settings').then((settings) => [{
    id: 1,
    slug: 'beta-atelier',
    name: settings.site_name,
    tagline: settings.site_tagline,
    phone: settings.contact_phone,
    email: settings.contact_email,
    address: settings.contact_address,
    maps: settings.contact_maps,
    whatsapp_number: settings.whatsapp_number,
  }]),
}

export const pagesApi = {
  list: () => contentApi.getPages(),
  getById: (slug) => contentApi.getPage(slug),
}

export const sectionsApi = {
  getAll: async () => {
    const pages = await contentApi.getPages()
    const pagesList = Array.isArray(pages) ? pages : []
    const fullPages = await Promise.all(
      pagesList.map((page) => contentApi.getPage(page.slug).catch(() => null)),
    )
    return fullPages.flatMap((page) => page?.sections ?? [])
  },
  list: async () => {
    return sectionsApi.getAll()
  },
  getById: async (id) => {
    const sections = await sectionsApi.getAll()
    return sections.find((section) => String(section.id) === String(id)) ?? null
  },
  update: (id, data) => contentApi.updateSection(id, data),
  partialUpdate: (id, data) => contentApi.updateSection(id, data),
}

// Kept for compatibility with previous imports not used by the public site.
export const authApi = {}
export const clientsApi = {}
export const usersApi = {}

export const configApi = {
  getSiteConfig: () => settingsApi.getAll(),
}

export {
  request,
  BASE_URL,
}
