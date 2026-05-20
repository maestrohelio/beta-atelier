import { query, pool } from './index.js'
import { readdirSync, statSync, copyFileSync, mkdirSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const IMAGES_SRC = join(__dirname, '../../../../src/assets/images')
const UPLOADS_DST = join(__dirname, '../../uploads')
const API_BASE = 'http://localhost:3001'

mkdirSync(UPLOADS_DST, { recursive: true })

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

function getCategory(filename) {
  const f = filename.toLowerCase()
  if (f.includes('restauro') || f.includes('restore')) return 'restauro'
  if (f.includes('hero')) return 'hero'
  if (f.includes('cadeira') || f.includes('chair')) return 'cadeiras'
  if (f.includes('cortinado') || f.includes('curtain')) return 'cortinados'
  if (f.includes('pulpito') || f.includes('pulpit')) return 'pulpitos'
  if (f.includes('sobre')) return 'sobre'
  if (f.includes('logo') || f.includes('favicon') || f.includes('effect')) return 'sistema'
  return 'geral'
}

function getMimeType(filename) {
  const ext = extname(filename).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  if (ext === '.gif') return 'image/gif'
  return 'image/jpeg'
}

const files = readdirSync(IMAGES_SRC).filter((f) =>
  IMAGE_EXTS.includes(extname(f).toLowerCase()),
)

console.log(`[Seed Media] ${files.length} imagens encontradas.`)

let inserted = 0
let skipped = 0
let failed = 0

for (const file of files) {
  const src = join(IMAGES_SRC, file)
  const dst = join(UPLOADS_DST, file)
  const stats = statSync(src)
  const category = getCategory(file)
  const url = `${API_BASE}/uploads/${file}`

  try {
    copyFileSync(src, dst)

    const { rows: existing } = await query(
      'SELECT id FROM media WHERE filename = $1 LIMIT 1',
      [file],
    )

    if (existing[0]) {
      skipped += 1
      console.log(`[SKIP] ${file} já registada`)
      continue
    }

    await query(
      `INSERT INTO media
         (filename, original_name, mime_type, size_bytes, url, alt_text, category)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        file,
        file,
        getMimeType(file),
        stats.size,
        url,
        file.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''),
        category,
      ],
    )

    inserted += 1
    console.log(`[OK] ${file} -> ${category}`)
  } catch (err) {
    failed += 1
    console.error(`[ERRO] ${file}: ${err.message}`)
  }
}

await pool.end()
console.log(`[Seed Media] Concluído. Inseridas: ${inserted}. Ignoradas: ${skipped}. Erros: ${failed}.`)
