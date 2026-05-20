import { useState, useEffect } from 'react'
import { X, Upload } from 'lucide-react'
import { getMedia } from '../api/media'

export default function MediaPickerModal({ onSelect, onClose }) {
  const [media, setMedia] = useState([])
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getMedia({ limit: 100 })
      .then((res) => {
        if (!active) return
        setMedia(Array.isArray(res.data) ? res.data : [])
      })
      .catch((err) => {
        console.error('[MediaPickerModal]', err)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    const onEsc = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onEsc)
    return () => {
      active = false
      window.removeEventListener('keydown', onEsc)
    }
  }, [onClose])

  const filtered = media.filter((item) => {
    const q = search.toLowerCase()
    return (
      item.original_name?.toLowerCase().includes(q)
      || item.category?.toLowerCase().includes(q)
      || item.alt_text?.toLowerCase().includes(q)
    )
  })

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          width: '800px',
          maxWidth: '95vw',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '16px' }}>
            Seleccionar Imagem
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
            type="button"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'grid', gap: '10px' }}>
          <input
            type="text"
            placeholder="Pesquisar imagens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ margin: 0 }}
          />

          <button
            type="button"
            className="btn-ghost"
            onClick={() => window.open('/admin/media', '_blank', 'noopener,noreferrer')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifySelf: 'start' }}
          >
            <Upload size={14} />
            Carregar Nova Imagem
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '20px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '12px',
            alignContent: 'start',
          }}
        >
          {loading && <p style={{ color: 'var(--text-muted)' }}>A carregar...</p>}
          {!loading && filtered.length === 0 && (
            <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1' }}>
              Nenhuma imagem encontrada. Carregue imagens na secção Media.
            </p>
          )}
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              type="button"
              style={{
                cursor: 'pointer',
                border: selected?.id === item.id
                  ? '2px solid var(--gold)'
                  : '2px solid transparent',
                borderRadius: '4px',
                overflow: 'hidden',
                aspectRatio: '1',
                background: 'var(--bg-secondary)',
                padding: 0,
              }}
              aria-label={`Selecionar ${item.original_name ?? `imagem-${item.id}`}`}
            >
              <img
                src={item.url}
                alt={item.alt_text ?? item.original_name ?? ''}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>

        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
          }}
        >
          <button className="btn-ghost" onClick={onClose} type="button">Cancelar</button>
          <button
            className="btn-primary"
            disabled={!selected}
            onClick={() => selected && onSelect(selected)}
            type="button"
            style={{ opacity: selected ? 1 : 0.4 }}
          >
            Usar esta Imagem
          </button>
        </div>
      </div>
    </div>
  )
}
