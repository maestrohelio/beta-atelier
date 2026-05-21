// server.js
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
import { pool, query } from './src/db/index.js'
import authRoutes from './src/routes/auth.js'
import settingsRoutes from './src/routes/settings.js'
import contentRoutes from './src/routes/content.js'
import mediaRoutes from './src/routes/media.js'
import emailRoutes from './src/routes/email.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT ?? 3001

const allowedOrigins = (process.env.CORS_ORIGIN ?? '').split(',').map((o) => o.trim())
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true)
    else callback(new Error('CORS nao permitido'))
  },
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve as imagens uploaded estaticamente
const uploadDir = path.resolve(__dirname, process.env.UPLOAD_DIR ?? './uploads')
app.use('/uploads', express.static(uploadDir))

// Rotas
app.use('/api/auth', authRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/media', mediaRoutes)
app.use('/api/email', emailRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Inicializacao
async function init() {
  try {
    await pool.query('SELECT 1')
    console.log('[DB] PostgreSQL conectado.')

    // Executa a migration automaticamente
    const { readFileSync } = await import('fs')
    const { fileURLToPath } = await import('url')
    const { dirname, join } = await import('path')
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const migrationSQL = readFileSync(
      join(__dirname, 'src/db/migrations/001_initial.sql'),
      'utf8'
    )
    await pool.query(migrationSQL)
    console.log('[DB] Migration executada.')

    // Resto do codigo init() existente continua aqui...

    // Cria o utilizador admin se nao existir
    const { rows } = await query(
      'SELECT id FROM admin_users WHERE email = $1',
      [process.env.ADMIN_EMAIL],
    )
    if (!rows[0]) {
      const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
      await query(
        'INSERT INTO admin_users (email, password, name) VALUES ($1, $2, $3)',
        [process.env.ADMIN_EMAIL, hash, 'Administrador'],
      )
      console.log(`[Init] Utilizador admin criado: ${process.env.ADMIN_EMAIL}`)
    }

    app.listen(PORT, () => {
      console.log(`[Server] Beta Atelier Admin API a correr em http://localhost:${PORT}`)
      console.log(`[Server] Health check: http://localhost:${PORT}/api/health`)
    })
  } catch (err) {
    console.error('[Init] Erro ao iniciar:', err.message)
    process.exit(1)
  }
}

init()
