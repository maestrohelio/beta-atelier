import { query, pool } from './index.js'

const BASE = 'http://localhost:3001/uploads'

const updates = [
  ['home', 'hero', 'hero_image', 'cadeiras-hero.jpg'],
  ['cadeiras', 'hero', 'hero_image', 'cadeiras-hero.jpg'],
  ['cadeiras', 'intro', 'section_image', 'cadeira-destaque.jpg'],
  ['cortinados', 'hero', 'hero_image', 'galeria-cortinado-01.jpg'],
  ['cortinados', 'intro', 'section_image', 'galeria-cortinado-02.jpg'],
  ['pulpitos', 'hero', 'hero_image', 'galeria-pulpito-01.jpg'],
  ['pulpitos', 'intro', 'section_image', 'pulpito-local-03.jpg'],
  ['restauro', 'hero', 'hero_image', 'restauro-sofa-depois.jpg'],
  ['restauro', 'intro', 'section_image', 'restauro-cadeira-depois-01.jpg'],
  ['sobre', 'hero', 'hero_image', 'cadeira-servico.jpg'],
  ['sobre', 'historia', 'section_image', 'galeria-cadeira-01.jpg'],
]

for (const [pageSlug, sectionSlug, fieldKey, filename] of updates) {
  const imageUrl = `${BASE}/${filename}`

  const { rows: pageRows } = await query(
    'SELECT id FROM pages WHERE slug = $1', [pageSlug],
  )
  if (!pageRows[0]) {
    console.log(`[SKIP] page ${pageSlug} nao encontrada`)
    continue
  }

  const { rows: secRows } = await query(
    'SELECT id, content FROM sections WHERE page_id = $1 AND slug = $2',
    [pageRows[0].id, sectionSlug],
  )
  if (!secRows[0]) {
    console.log(`[SKIP] section ${sectionSlug} nao encontrada`)
    continue
  }

  const content = typeof secRows[0].content === 'string'
    ? JSON.parse(secRows[0].content)
    : (secRows[0].content ?? {})

  content[fieldKey] = imageUrl

  await query(
    'UPDATE sections SET content = $1::jsonb, updated_at = NOW() WHERE id = $2',
    [JSON.stringify(content), secRows[0].id],
  )
  console.log(`[OK] ${pageSlug}/${sectionSlug}.${fieldKey} = ${filename}`)
}

await pool.end()
console.log('[Update] Concluido.')
