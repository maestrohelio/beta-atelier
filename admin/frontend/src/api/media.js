import api from './client'

export const getMedia = (params) => api.get('/api/media', { params })
export const uploadMedia = (formData) => api.post('/api/media/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
})
export const deleteMedia = (id) => api.delete(`/api/media/${id}`)
