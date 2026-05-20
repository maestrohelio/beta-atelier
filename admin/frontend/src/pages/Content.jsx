import { useEffect, useMemo, useState } from 'react'
import { getPage, getPages, updateSection } from '../api/content'
import { getSettings, publishSettings } from '../api/settings'
import MediaPickerModal from '../components/MediaPickerModal'
import Toast from '../components/Toast'

const IMAGE_KEYS = ['image', 'photo', 'background', 'bg', 'hero_image', 'card_image', 'thumb']

const isImageField = (key) => (
  IMAGE_KEYS.includes(key)
  || key.endsWith('_image')
  || key.endsWith('_img')
  || key.endsWith('_photo')
  || key.endsWith('_bg')
)

const isHttpUrl = (value) => typeof value === 'string' && /^https?:\/\//i.test(value)

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
  const [pickerField, setPickerField] = useState(null)
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
              const contentEntries = Object.entries(edit.content ?? {})

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
                        <label>{`content.${key}`}</label>

                        {isImageField(key) ? (
                          <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 8 }}>
                              Imagem atual:
                            </p>

                            {isHttpUrl(value) ? (
                              <img
                                src={value}
                                alt="Imagem atual"
                                style={{
                                  maxHeight: 120,
                                  maxWidth: '100%',
                                  objectFit: 'cover',
                                  borderRadius: 4,
                                  border: '1px solid var(--border)',
                                  display: 'block',
                                  marginBottom: 8,
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  height: 80,
                                  background: 'var(--bg-secondary)',
                                  borderRadius: 4,
                                  border: '1px solid var(--border)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'var(--text-muted)',
                                  fontSize: 12,
                                  padding: '0 10px',
                                  textAlign: 'center',
                                  marginBottom: 8,
                                }}
                              >
                                {value || 'Sem imagem'}
                              </div>
                            )}

                            <button
                              type="button"
                              className="btn-ghost"
                              style={{ fontSize: 12, padding: '6px 14px' }}
                              onClick={() => setPickerField({ sectionId: section.id, fieldKey: key })}
                            >
                              Substituir Imagem
                            </button>
                          </div>
                        ) : shouldUseTextarea ? (
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

      {pickerField && (
        <MediaPickerModal
          onClose={() => setPickerField(null)}
          onSelect={(mediaItem) => {
            updateFieldValue(pickerField.sectionId, pickerField.fieldKey, mediaItem.url)
            setPickerField(null)
          }}
        />
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  )
}
