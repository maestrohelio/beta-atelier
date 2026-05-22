import { useEffect, useMemo, useState } from 'react'
import { getPage, getPages, updateSection } from '../api/content'
import { getSettings, publishSettings } from '../api/settings'
import Toast from '../components/Toast'

const HIDDEN_IMAGE_FIELDS = new Set(['hero_image', 'section_image', 'image', 'photo', 'background', 'bg', 'card_image', 'thumb'])
const FIELD_LABELS = {
  title: 'Título',
  subtitle: 'Subtítulo',
  label: 'Etiqueta / Label',
  text: 'Texto',
  text1: 'Texto 1',
  text2: 'Texto 2',
  cta: 'Botão de Acção',
  cta_primary: 'Botão Principal',
  cta_secondary: 'Botão Secundário',
  hero_image: 'Imagem de Fundo',
  section_image: 'Imagem da Secção',
  step1_title: 'Passo 1 — Título',
  step1_text: 'Passo 1 — Texto',
  step2_title: 'Passo 2 — Título',
  step2_text: 'Passo 2 — Texto',
  step3_title: 'Passo 3 — Título',
  step3_text: 'Passo 3 — Texto',
  step4_title: 'Passo 4 — Título',
  step4_text: 'Passo 4 — Texto',
  stat1_value: 'Estatística 1 — Valor',
  stat1_label: 'Estatística 1 — Label',
  stat2_value: 'Estatística 2 — Valor',
  stat2_label: 'Estatística 2 — Label',
  stat3_value: 'Estatística 3 — Valor',
  stat3_label: 'Estatística 3 — Label',
  horario: 'Horário de Atendimento',
}

const getFieldLabel = (key) => FIELD_LABELS[key] || key
const shouldHideField = (key) => (
  HIDDEN_IMAGE_FIELDS.has(key)
  || key.endsWith('_image')
  || key.endsWith('_img')
  || key.endsWith('_photo')
  || key.endsWith('_bg')
)

export default function Content() {
  const [pages, setPages] = useState([])
  const [selectedSlug, setSelectedSlug] = useState('')
  const [pageData, setPageData] = useState(null)
  const [loadingPages, setLoadingPages] = useState(true)
  const [loadingPage, setLoadingPage] = useState(false)
  const [sectionEdits, setSectionEdits] = useState({})
  const [savingId, setSavingId] = useState(null)
  const [publishing, setPublishing] = useState(false)
  const [lastPublished, setLastPublished] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    let active = true

    getPages()
      .then((res) => {
        if (!active) return
        const list = res.data ?? []
        setPages(list)
        if (list.length) setSelectedSlug(list[0].slug)
      })
      .catch(() => {
        if (!active) return
        setToast({ type: 'error', message: 'Falha ao carregar páginas.' })
      })
      .finally(() => {
        if (active) setLoadingPages(false)
      })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true
    getSettings()
      .then((res) => {
        if (!active) return
        setLastPublished(res.data?.last_published ?? null)
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!selectedSlug) return
    let active = true
    setLoadingPage(true)

    getPage(selectedSlug)
      .then((res) => {
        if (!active) return
        const data = res.data
        setPageData(data)

        const edits = {}
        ;(data.sections ?? []).forEach((section) => {
          const content = typeof section.content === 'object' && section.content ? section.content : {}
          const normalizedContent = Object.entries(content).reduce((acc, [key, value]) => {
            if (value === null || value === undefined) acc[key] = ''
            else acc[key] = String(value)
            return acc
          }, {})

          if (Object.keys(normalizedContent).length === 0) {
            normalizedContent.body = ''
          }

          edits[section.id] = {
            title: section.title ?? '',
            content: normalizedContent,
          }
        })
        setSectionEdits(edits)
      })
      .catch(() => {
        if (!active) return
        setToast({ type: 'error', message: 'Falha ao carregar conteúdo da página.' })
      })
      .finally(() => {
        if (active) setLoadingPage(false)
      })

    return () => {
      active = false
    }
  }, [selectedSlug])

  const sections = useMemo(() => pageData?.sections ?? [], [pageData])

  const handleSectionChange = (sectionId, field, value) => {
    setSectionEdits((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value,
      },
    }))
  }

  const updateFieldValue = (sectionId, key, value) => {
    setSectionEdits((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        content: {
          ...(prev[sectionId]?.content ?? {}),
          [key]: value,
        },
      },
    }))
  }

  const handleSaveSection = async (sectionId) => {
    const edit = sectionEdits[sectionId]
    if (!edit) return

    setSavingId(sectionId)
    try {
      await updateSection(sectionId, {
        title: edit.title,
        content: edit.content ?? {},
      })
      setToast({ type: 'success', message: 'Secção guardada com sucesso.' })
    } catch {
      setToast({ type: 'error', message: 'Erro ao guardar secção.' })
    } finally {
      setSavingId(null)
    }
  }

  const handlePublish = async () => {
    setPublishing(true)
    try {
      const res = await publishSettings()
      setLastPublished(res.data?.timestamp ?? new Date().toISOString())
      setToast({ type: 'success', message: 'Site atualizado com sucesso.' })
    } catch {
      setToast({ type: 'error', message: 'Erro ao publicar alterações.' })
    } finally {
      setPublishing(false)
    }
  }

  return (
    <>
      <div className="content-shell card">
        <aside className="content-pages">
          <h3>Páginas</h3>
          {loadingPages ? (
            <p className="muted">A carregar...</p>
          ) : (
            <div className="content-page-list">
              {pages.map((page) => (
                <button
                  key={page.id}
                  type="button"
                  className={`page-pill ${selectedSlug === page.slug ? 'active' : ''}`}
                  onClick={() => setSelectedSlug(page.slug)}
                >
                  {page.title}
                </button>
              ))}
            </div>
          )}
        </aside>

        <section className="content-editor">
          {loadingPage ? (
            <p>A carregar conteúdo...</p>
          ) : sections.length === 0 ? (
            <div className="empty-state">
              Esta página ainda não tem secções configuradas.
              <br />
              Os textos estão a ser servidos pelo site diretamente.
            </div>
          ) : (
            sections.map((section) => {
              const edit = sectionEdits[section.id] ?? {
                title: '',
                content: { body: '' },
              }
              const contentEntries = Object.entries(edit.content ?? {}).filter(([key]) => !shouldHideField(key))

              return (
                <article key={section.id} className="card section-card">
                  <h4>{section.slug}</h4>

                  <div className="field-group">
                    <label>Título da Secção</label>
                    <input
                      value={edit.title}
                      onChange={(event) => handleSectionChange(section.id, 'title', event.target.value)}
                    />
                  </div>

                  {contentEntries.map(([key, value]) => {
                    const shouldUseTextarea = String(value).includes('\n') || String(value).length > 120
                    return (
                      <div key={`${section.id}-${key}`} className="field-group">
                        <label>{getFieldLabel(key)}</label>
                        {shouldUseTextarea ? (
                          <textarea
                            rows={5}
                            value={value}
                            onChange={(event) => updateFieldValue(section.id, key, event.target.value)}
                          />
                        ) : (
                          <input
                            value={value}
                            onChange={(event) => updateFieldValue(section.id, key, event.target.value)}
                          />
                        )}
                      </div>
                    )
                  })}

                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => handleSaveSection(section.id)}
                    disabled={savingId === section.id}
                  >
                    {savingId === section.id ? 'A guardar...' : 'Guardar'}
                  </button>
                </article>
              )
            })
          )}
        </section>
      </div>

      <div className="settings-actions">
        <button type="button" className="btn-ghost btn-publish" onClick={handlePublish} disabled={publishing}>
          {publishing ? 'A publicar...' : 'Publicar Alterações no Site'}
        </button>
      </div>
      <p className="publish-meta">
        Última publicação: {lastPublished ? new Date(lastPublished).toLocaleString('pt-PT') : 'Ainda não publicada'}
      </p>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  )
}
