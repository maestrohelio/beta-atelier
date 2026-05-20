// src/routes/content.js
import { Router } from 'express'
import { query } from '../db/index.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/content/pages — publico
router.get('/pages', async (_req, res) => {
  try {
    const { rows } = await query(
      'SELECT * FROM pages WHERE is_active = true ORDER BY id',
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/content/pages/:slug — publico
router.get('/pages/:slug', async (req, res) => {
  try {
    const { rows: pageRows } = await query(
      'SELECT * FROM pages WHERE slug = $1 AND is_active = true',
      [req.params.slug],
    )
    if (!pageRows[0]) return res.status(404).json({ error: 'Pagina nao encontrada' })

    const { rows: sectionRows } = await query(
      `SELECT * FROM sections
       WHERE page_id = $1 AND is_active = true
       ORDER BY order_num`,
      [pageRows[0].id],
    )

    res.json({ ...pageRows[0], sections: sectionRows })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/content/sections/:id — protegido
router.put('/sections/:id', requireAuth, async (req, res) => {
  try {
    const { title, content } = req.body
    const { rows } = await query(
      `UPDATE sections
       SET title = COALESCE($1, title),
           content = COALESCE($2, content),
           updated_at = NOW()
       WHERE id = $3 RETURNING *`,
      [title, content ? JSON.stringify(content) : null, req.params.id],
    )
    if (!rows[0]) return res.status(404).json({ error: 'Seccao nao encontrada' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/content/sections — protegido (criar seccao)
router.post('/sections', requireAuth, async (req, res) => {
  try {
    const { page_id, slug, title, content, order_num } = req.body
    const { rows } = await query(
      `INSERT INTO sections (page_id, slug, title, content, order_num)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [page_id, slug, title, content ?? {}, order_num ?? 0],
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
