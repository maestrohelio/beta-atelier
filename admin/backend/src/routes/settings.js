// src/routes/settings.js
import { Router } from 'express'
import { query } from '../db/index.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/settings — publico (o site le isto)
router.get('/', async (_req, res) => {
  try {
    const { rows } = await query('SELECT key, value, type FROM site_settings ORDER BY group_name, id')
    const settings = {}
    rows.forEach((r) => {
      settings[r.key] = r.value
    })
    res.json(settings)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/settings/grouped — para o painel admin
router.get('/grouped', requireAuth, async (_req, res) => {
  try {
    const { rows } = await query(
      'SELECT * FROM site_settings ORDER BY group_name, id',
    )
    const grouped = {}
    rows.forEach((r) => {
      if (!grouped[r.group_name]) grouped[r.group_name] = []
      grouped[r.group_name].push(r)
    })
    res.json(grouped)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/settings/:key — protegido
router.put('/:key', requireAuth, async (req, res) => {
  try {
    const { key } = req.params
    const { value } = req.body
    const { rows } = await query(
      `UPDATE site_settings SET value = $1, updated_at = NOW()
       WHERE key = $2 RETURNING *`,
      [value, key],
    )
    if (!rows[0]) return res.status(404).json({ error: 'Configuracao nao encontrada' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/settings — actualizar multiplos de uma vez
router.put('/', requireAuth, async (req, res) => {
  try {
    const updates = req.body
    const results = []
    for (const [key, value] of Object.entries(updates)) {
      const { rows } = await query(
        `UPDATE site_settings SET value = $1, updated_at = NOW()
         WHERE key = $2 RETURNING key, value`,
        [value, key],
      )
      if (rows[0]) results.push(rows[0])
    }
    res.json({ updated: results.length, settings: results })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/settings/publish — regista a data da ultima publicacao
router.post('/publish', requireAuth, async (_req, res) => {
  try {
    const timestamp = new Date().toISOString()
    await query(
      `INSERT INTO site_settings (key, value, label, group_name)
       VALUES ('last_published', $1, 'Ultima Publicacao', 'sistema')
       ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = NOW()`,
      [timestamp],
    )
    res.json({ published: true, timestamp })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
