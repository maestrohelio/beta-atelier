// src/routes/auth.js
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query } from '../db/index.js'

const router = Router()

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e password obrigatorios' })
    }

    const { rows } = await query(
      'SELECT * FROM admin_users WHERE email = $1',
      [email.toLowerCase()],
    )
    const user = rows[0]

    if (!user) {
      return res.status(401).json({ error: 'Credenciais invalidas' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ error: 'Credenciais invalidas' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' },
    )

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
  } catch (err) {
    console.error('[Auth] Login erro:', err.message)
    res.status(500).json({ error: 'Erro interno' })
  }
})

// GET /api/auth/me
router.get('/me', async (req, res) => {
  const header = req.headers.authorization ?? ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Nao autenticado' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    res.json({ user: payload })
  } catch {
    res.status(401).json({ error: 'Token invalido' })
  }
})

export default router
