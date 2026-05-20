import { useEffect, useMemo, useState } from 'react'
import { deleteMedia, getMedia, uploadMedia } from '../api/media'
import Toast from '../components/Toast'
import ImageUploader from '../components/ImageUploader'

function formatSize(bytes) {
  if (!bytes && bytes !== 0) return '-'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export default function Media() {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showUploader, setShowUploader] = useState(false)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadCategory, setUploadCategory] = useState('geral')
  const [altText, setAltText] = useState('')
  const [progress, setProgress] = useState(0)
  const [toast, setToast] = useState(null)

  const loadMedia = async () => {
    setLoading(true)
    try {
      const res = await getMedia({
        limit: 5000,
        category: selectedCategory === 'all' ? undefined : selectedCategory,
      })
      setMedia(Array.isArray(res.data) ? res.data : [])
    } catch {
      setToast({ type: 'error', message: 'Falha ao carregar média.' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMedia()
  }, [selectedCategory])

  const searchedMedia = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return media
    return media.filter((item) =>
      String(item.original_name ?? item.filename ?? '').toLowerCase().includes(term),
    )
  }, [media, search])

  const displayMedia = useMemo(() => {
    if (selectedCategory === 'all') {
      return searchedMedia.filter((item) => item.category !== 'sistema')
    }
    return searchedMedia
  }, [searchedMedia, selectedCategory])

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Tem a certeza que deseja eliminar esta imagem?')
    if (!confirmed) return

    try {
      await deleteMedia(id)
      setToast({ type: 'success', message: 'Imagem eliminada com sucesso.' })
      await loadMedia()
    } catch {
      setToast({ type: 'error', message: 'Erro ao eliminar imagem.' })
    }
  }

  const handleUpload = async () => {
    if (!files.length) return

    setUploading(true)
    setProgress(0)

    try {
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('category', uploadCategory)
        formData.append('alt_text', altText)

        await uploadMedia(formData)
        setProgress(Math.round(((index + 1) / files.length) * 100))
      }

      setToast({ type: 'success', message: 'Upload concluído com sucesso.' })
      setFiles([])
      setAltText('')
      setUploadCategory('geral')
      setShowUploader(false)
      await loadMedia()
    } catch {
      setToast({ type: 'error', message: 'Erro ao enviar imagem.' })
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  return (
    <>
      <div className="card media-toolbar">
        <div className="media-filters">
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
            <option value="all">Todas as categorias</option>
            <option value="geral">Geral</option>
            <option value="hero">Hero</option>
            <option value="cadeiras">Cadeiras</option>
            <option value="cortinados">Cortinados</option>
            <option value="pulpitos">Púlpitos</option>
            <option value="restauro">Restauro</option>
            <option value="sobre">Sobre Nós</option>
          </select>
        </div>

        <button type="button" className="btn-primary" onClick={() => setShowUploader(true)}>
          Carregar Imagem
        </button>
      </div>

      {loading ? (
        <div className="card">A carregar média...</div>
      ) : (
        <div className="media-grid">
          {displayMedia.map((item) => (
            <article key={item.id} className="card media-card">
              <div className="media-thumb-wrap">
                <img src={item.url} alt={item.alt_text || item.original_name || item.filename} className="media-thumb" />
              </div>

              <div className="media-meta">
                <strong title={item.original_name}>{item.original_name ?? item.filename}</strong>
                <span>Categoria: {item.category ?? 'geral'}</span>
                <span>Tamanho: {formatSize(item.size_bytes)}</span>
              </div>

              <button type="button" className="btn-danger" onClick={() => handleDelete(item.id)}>
                Eliminar
              </button>
            </article>
          ))}

          {!displayMedia.length && (
            <div className="card empty-state">Nenhuma imagem encontrada.</div>
          )}
        </div>
      )}

      {showUploader && (
        <ImageUploader
          files={files}
          onFilesChange={setFiles}
          onRemoveFile={(index) => setFiles((prev) => prev.filter((_, i) => i !== index))}
          onUpload={handleUpload}
          uploading={uploading}
          category={uploadCategory}
          setCategory={setUploadCategory}
          altText={altText}
          setAltText={setAltText}
          progress={progress}
          onClose={() => {
            if (!uploading) setShowUploader(false)
          }}
        />
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  )
}
