// src/routes/media.js
import { Router } from 'express'
import { query } from '../db/index.js'
import { requireAuth } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'
import path from 'path'
import { unlink } from 'fs/promises'
import jwt from 'jsonwebtoken'

const router = Router()
const BASE_URL = () => `http://localhost:${process.env.PORT ?? 3001}`

// GET /api/media
router.get('/', async (req, res) => {
  try {
    const { category, limit = 50, offset = 0 } = req.query
    const token = (req.headers.authorization ?? '').replace('Bearer ', '')

    let isAdmin = false
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET)
        isAdmin = true
      } catch {}
    }

    const conditions = []
    const args = []

    // Nao-admins nunca veem imagens de sistema
    if (!isAdmin) {
      conditions.push(`category != 'sistema'`)
    }

    if (category && category !== 'all') {
      args.push(category)
      conditions.push(`category = $${args.length}`)
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

    args.push(parseInt(limit), parseInt(offset))
    const sql = `SELECT * FROM media ${where}
                 ORDER BY created_at DESC
                 LIMIT $${args.length - 1} OFFSET $${args.length}`

    const { rows } = await query(sql, args)
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/media/upload — protegido
router.post('/upload', requireAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Nenhum ficheiro enviado' })

    const url = `${BASE_URL()}/uploads/${req.file.filename}`
    const { rows } = await query(
      `INSERT INTO media
         (filename, original_name, mime_type, size_bytes, url, alt_text, category, tags)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        req.file.filename,
        req.file.originalname,
        req.file.mimetype,
        req.file.size,
        url,
        req.body.alt_text ?? '',
        req.body.category ?? 'geral',
        req.body.tags ? req.body.tags.split(',').map((t) => t.trim()) : [],
      ],
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/media/:id — protegido
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { rows } = await query(
      'DELETE FROM media WHERE id = $1 RETURNING *',
      [req.params.id],
    )
    if (!rows[0]) return res.status(404).json({ error: 'Media nao encontrada' })

    const filePath = path.join(process.env.UPLOAD_DIR ?? './uploads', rows[0].filename)
    await unlink(filePath).catch(() => {})

    res.json({ deleted: true, id: req.params.id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
