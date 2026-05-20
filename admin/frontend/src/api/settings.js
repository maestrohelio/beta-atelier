import api from './client'

export const getSettings = () => api.get('/api/settings')
export const getSettingsGrouped = () => api.get('/api/settings/grouped')
export const updateSetting = (key, value) => api.put(`/api/settings/${key}`, { value })
export const updateSettings = (data) => api.put('/api/settings', data)
export const publishSettings = () => api.post('/api/settings/publish')
