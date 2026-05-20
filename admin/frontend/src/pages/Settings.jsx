import { useEffect, useMemo, useState } from 'react'
import { getSettings, getSettingsGrouped, publishSettings, updateSettings } from '../api/settings'
import Toast from '../components/Toast'

const GROUP_TITLES = {
  geral: 'Informações Gerais',
  contacto: 'Dados de Contacto',
  email: 'Configurações de Email',
}

export default function Settings() {
  const [grouped, setGrouped] = useState({})
  const [values, setValues] = useState({})
  const [initialValues, setInitialValues] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [lastPublished, setLastPublished] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    let active = true

    Promise.all([getSettingsGrouped(), getSettings()])
      .then(([groupedRes, settingsRes]) => {
        if (!active) return
        const data = groupedRes.data ?? {}
        setGrouped(data)

        const map = {}
        Object.values(data).flat().forEach((item) => {
          map[item.key] = item.value ?? ''
        })

        setValues(map)
        setInitialValues(map)
        setLastPublished(settingsRes.data?.last_published ?? null)
      })
      .catch(() => {
        if (!active) return
        setToast({ type: 'error', message: 'Falha ao carregar configurações.' })
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const dirtyKeys = useMemo(
    () => Object.keys(values).filter((key) => values[key] !== initialValues[key]),
    [values, initialValues],
  )

  const handleSave = async () => {
    if (!dirtyKeys.length) {
      setToast({ type: 'success', message: 'Sem alterações para guardar.' })
      return
    }

    setSaving(true)
    try {
      const payload = dirtyKeys.reduce((acc, key) => {
        acc[key] = values[key]
        return acc
      }, {})

      await updateSettings(payload)
      setInitialValues({ ...values })
      setToast({ type: 'success', message: 'Configurações guardadas com sucesso' })
    } catch {
      setToast({ type: 'error', message: 'Erro ao guardar configurações.' })
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    setPublishing(true)
    try {
      const res = await publishSettings()
      setLastPublished(res.data?.timestamp ?? new Date().toISOString())
      setToast({ type: 'success', message: 'Alterações publicadas. O site está atualizado.' })
    } catch {
      setToast({ type: 'error', message: 'Erro ao publicar alterações.' })
    } finally {
      setPublishing(false)
    }
  }

  if (loading) {
    return <div className="card">A carregar configurações...</div>
  }

  return (
    <>
      <div className="settings-grid">
        {Object.entries(grouped).map(([group, items]) => (
          <section key={group} className="card">
            <h3>{GROUP_TITLES[group] ?? group}</h3>
            <div className="field-stack">
              {items.map((item) => {
                const isDirty = values[item.key] !== initialValues[item.key]
                return (
                  <div key={item.id} className="field-group">
                    <label htmlFor={`field-${item.key}`}>{item.label ?? item.key}</label>
                    {item.type === 'textarea' ? (
                      <textarea
                        id={`field-${item.key}`}
                        rows={4}
                        value={values[item.key] ?? ''}
                        onChange={(event) => setValues((prev) => ({ ...prev, [item.key]: event.target.value }))}
                        className={isDirty ? 'input-dirty' : ''}
                      />
                    ) : (
                      <input
                        id={`field-${item.key}`}
                        type={item.type === 'email' ? 'email' : item.type === 'url' ? 'url' : 'text'}
                        value={values[item.key] ?? ''}
                        onChange={(event) => setValues((prev) => ({ ...prev, [item.key]: event.target.value }))}
                        className={isDirty ? 'input-dirty' : ''}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="settings-actions">
        <button type="button" className="btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'A guardar...' : 'Guardar Alterações'}
        </button>
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
