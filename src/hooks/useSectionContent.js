import { useState, useEffect } from 'react'
import { contentApi } from '../services/api'

function normalizeContent(data = {}, fallback = {}) {
  const next = { ...data }

  if (!next.image && typeof next.hero_image === 'string' && next.hero_image.trim()) {
    next.image = next.hero_image
  }
  if (!next.image && typeof next.section_image === 'string' && next.section_image.trim()) {
    next.image = next.section_image
  }

  if (!next.titleLines && next.title) {
    const lines = String(next.title).split('\n').map((line) => line.trim()).filter(Boolean)
    if (lines.length > 0) next.titleLines = lines
  }

  if (!next.titleLine1 && next.titleLines?.[0]) next.titleLine1 = next.titleLines[0]
  if (!next.titleLine2 && next.titleLines?.[1]) next.titleLine2 = next.titleLines[1]
  if (!next.titleLine3 && next.titleLines?.[2]) next.titleLine3 = next.titleLines[2]

  if (!next.paragraph1 && typeof next.text1 === 'string') next.paragraph1 = next.text1
  if (!next.paragraph2 && typeof next.text2 === 'string') next.paragraph2 = next.text2
  if (!next.paragraph1 && typeof next.text === 'string') next.paragraph1 = next.text

  if (!next.cta && typeof next.cta_primary === 'string') next.cta = next.cta_primary
  if (!next.buttonPrimary && typeof next.cta_primary === 'string') next.buttonPrimary = next.cta_primary
  if (!next.buttonSecondary && typeof next.cta_secondary === 'string') next.buttonSecondary = next.cta_secondary

  if (!next.breadcrumb && fallback?.breadcrumb) next.breadcrumb = fallback.breadcrumb

  return next
}

export function useSectionContent(pageSlug, sectionSlug, fallback = {}) {
  const [content, setContent] = useState(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!pageSlug || !sectionSlug) {
      setLoading(false)
      return
    }

    let cancelled = false

    const load = async () => {
      try {
        const sections = await contentApi.getSections(pageSlug)
        const section = sections.find((s) => s.slug === sectionSlug)

        if (section?.content && !cancelled) {
          const data = typeof section.content === 'string'
            ? JSON.parse(section.content)
            : section.content

          const normalized = normalizeContent(data, fallback)
          setContent((prev) => ({ ...prev, ...normalized }))
        }
      } catch (err) {
        console.info(`[useSectionContent] ${pageSlug}/${sectionSlug} offline:`, err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [pageSlug, sectionSlug])

  return { content, loading }
}
