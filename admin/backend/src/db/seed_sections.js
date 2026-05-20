import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { pool, query } from './index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function seedSections() {
  const sql = readFileSync(join(__dirname, 'migrations/002_sections_seed.sql'), 'utf8')
  await query(sql)
  console.log('[Seed] Seccoes inseridas com sucesso.')
  await pool.end()
}

seedSections().catch(async (err) => {
  console.error('[Seed] Erro:', err.message)
  await pool.end()
  process.exit(1)
})
