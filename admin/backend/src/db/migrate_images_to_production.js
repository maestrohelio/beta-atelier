import { readFileSync, readdirSync } from 'fs'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import FormData from 'form-data'
import fetch from 'node-fetch'

const __dirname = dirname(fileURLToPath(import.meta.url))

const BACKEND_URL = 'https://backend-beta-atelier-production.up.railway.app'
const EMAIL = 'elisabetearede67@gmail.com'
const PASSWORD = 'BetaAtelier2025'
const IMAGES_DIR = join(__dirname, '../../../../src/assets/images')

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp']

function getCategory(filename) {
  const f = filename.toLowerCase()
  if (f.includes('cadeira') || f.includes('chair')) return 'cadeiras'
  if (f.includes('cortinado') || f.includes('curtain')) return 'cortinados'
  if (f.includes('pulpito') || f.includes('pulpit')) return 'pulpitos'
  if (f.includes('restauro') || f.includes('restore')) return 'restauro'
  if (f.includes('hero')) return 'hero'
  if (f.includes('logo') || f.includes('favicon') || f.includes('effect') || f.includes('whatsapp')) return 'sistema'
  return 'geral'
}

function getMimeType(file) {
  const ext = extname(file).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  return 'image/jpeg'
}

async function main() {
  console.log('[Login] A autenticar...')
  const loginRes = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })

  const loginData = await loginRes.json()
  if (!loginRes.ok || !loginData?.token) {
    throw new Error(`Falha no login: ${JSON.stringify(loginData)}`)
  }

  const { token } = loginData
  console.log('[Login] Token obtido.')

  const files = readdirSync(IMAGES_DIR).filter((f) => IMAGE_EXTS.includes(extname(f).toLowerCase()))
  console.log(`[Upload] ${files.length} imagens encontradas.`)

  for (const file of files) {
    const category = getCategory(file)
    if (category === 'sistema') {
      console.log(`[SKIP] ${file} (sistema)`)
      continue
    }

    const filePath = join(IMAGES_DIR, file)
    const form = new FormData()
    form.append('file', readFileSync(filePath), {
      filename: file,
      contentType: getMimeType(file),
    })
    form.append('category', category)
    form.append('alt_text', basename(file, extname(file)).replace(/[-_]/g, ' '))

    try {
      const res = await fetch(`${BACKEND_URL}/api/media/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, ...form.getHeaders() },
        body: form,
      })
      const data = await res.json()
      if (res.ok) console.log(`[OK] ${file} -> ${category}`)
      else console.error(`[ERRO] ${file}: ${JSON.stringify(data)}`)
    } catch (err) {
      console.error(`[ERRO] ${file}: ${err.message}`)
    }
  }
  console.log('[Upload] Concluido.')
}

main().catch((err) => {
  console.error(`[FATAL] ${err.message}`)
  process.exitCode = 1
})
