// src/db/index.js
import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pg

export const pool = new Pool({
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  database: process.env.DB_NAME ?? 'beta_atelier_admin',
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '',
})

pool.on('error', (err) => {
  console.error('[DB] Erro inesperado no pool:', err.message)
})

export async function query(text, params) {
  const start = Date.now()
  const res = await pool.query(text, params)
  const dur = Date.now() - start
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DB] ${dur}ms — ${text.slice(0, 60)}`)
  }
  return res
}
