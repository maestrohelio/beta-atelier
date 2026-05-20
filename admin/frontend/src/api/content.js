import api from './client'

export const getPages = () => api.get('/api/content/pages')
export const getPage = (slug) => api.get(`/api/content/pages/${slug}`)
export const updateSection = (id, data) => api.put(`/api/content/sections/${id}`, data)
