// src/db/migrate.js
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { pool } from './index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function migrate() {
  console.log('[Migrate] A executar migration inicial...')
  const sql = readFileSync(
    join(__dirname, 'migrations/001_initial.sql'),
    'utf8',
  )
  await pool.query(sql)
  console.log('[Migrate] Concluido com sucesso.')
  await pool.end()
}

migrate().catch((err) => {
  console.error('[Migrate] Erro:', err.message)
  process.exit(1)
})
