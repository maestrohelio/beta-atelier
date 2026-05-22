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

router.post('/run-seeds', requireAuth, async (_req, res) => {
  try {
    const { readFileSync } = await import('fs')
    const { fileURLToPath } = await import('url')
    const { dirname, join } = await import('path')
    const __dirname = dirname(fileURLToPath(import.meta.url))

    const sql002 = readFileSync(
      join(__dirname, '../db/migrations/002_sections_seed.sql'), 'utf8',
    )
    await query(sql002)

    res.json({ success: true, message: 'Seeds executados com sucesso.' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/fix-media-urls', requireAuth, async (req, res) => {
  try {
    const OLD_BASE = 'http://localhost:3001'
    const NEW_BASE = req.body.newBase || 'https://api.betaatelier.com'

    const { rows } = await query(
      'SELECT id, url FROM media WHERE url LIKE $1',
      [`${OLD_BASE}%`],
    )

    let count = 0
    for (const row of rows) {
      const newUrl = row.url.replace(OLD_BASE, NEW_BASE)
      await query('UPDATE media SET url = $1 WHERE id = $2', [newUrl, row.id])
      count++
    }

    res.json({ success: true, updated: count })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/restore-image-fields', requireAuth, async (req, res) => {
  try {
    const BASE = 'https://api.betaatelier.com/uploads'

    const imageUpdates = [
      { pageSlug: 'home', sectionSlug: 'hero', updates: { hero_image: 'cadeiras-hero.jpg' } },
      { pageSlug: 'home', sectionSlug: 'intro', updates: { section_image: 'galeria-cadeira-01.jpg' } },
      { pageSlug: 'cadeiras', sectionSlug: 'hero', updates: { hero_image: 'cadeiras-hero.jpg' } },
      { pageSlug: 'cadeiras', sectionSlug: 'intro', updates: { section_image: 'cadeira-destaque.jpg' } },
      { pageSlug: 'cortinados', sectionSlug: 'hero', updates: { hero_image: 'galeria-cortinado-01.jpg' } },
      { pageSlug: 'cortinados', sectionSlug: 'intro', updates: { section_image: 'galeria-cortinado-02.jpg' } },
      { pageSlug: 'pulpitos', sectionSlug: 'hero', updates: { hero_image: 'galeria-pulpito-01.jpg' } },
      { pageSlug: 'pulpitos', sectionSlug: 'intro', updates: { section_image: 'pulpito-local-03.jpg' } },
      { pageSlug: 'restauro', sectionSlug: 'hero', updates: { hero_image: 'restauro-sofa-depois.jpg' } },
      { pageSlug: 'restauro', sectionSlug: 'intro', updates: { section_image: 'restauro-cadeira-depois-01.jpg' } },
      { pageSlug: 'sobre', sectionSlug: 'hero', updates: { hero_image: 'cadeira-servico.jpg' } },
      { pageSlug: 'sobre', sectionSlug: 'historia', updates: { section_image: 'galeria-cadeira-01.jpg' } },
      { pageSlug: 'contato', sectionSlug: 'hero', updates: { hero_image: 'cadeira-servico.jpg' } },
    ]

    let count = 0
    for (const { pageSlug, sectionSlug, updates } of imageUpdates) {
      const { rows: pageRows } = await query(
        'SELECT id FROM pages WHERE slug = $1', [pageSlug],
      )
      if (!pageRows[0]) continue

      const { rows: secRows } = await query(
        'SELECT id, content FROM sections WHERE page_id = $1 AND slug = $2',
        [pageRows[0].id, sectionSlug],
      )
      if (!secRows[0]) continue

      const content = typeof secRows[0].content === 'string'
        ? JSON.parse(secRows[0].content)
        : { ...secRows[0].content }

      for (const [field, file] of Object.entries(updates)) {
        content[field] = `${BASE}/${file}`
      }

      await query(
        'UPDATE sections SET content = $1 WHERE id = $2',
        [JSON.stringify(content), secRows[0].id],
      )
      count++
    }

    res.json({ success: true, updated: count })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
