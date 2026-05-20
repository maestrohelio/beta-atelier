import { useRef, useState } from 'react'

export default function ImageUploader({
  files,
  onFilesChange,
  onRemoveFile,
  onUpload,
  uploading,
  category,
  setCategory,
  altText,
  setAltText,
  progress,
  onClose,
}) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handlePick = (incoming) => {
    if (!incoming?.length) return
    const list = Array.from(incoming).filter((file) => file.type.startsWith('image/'))
    onFilesChange([...files, ...list])
  }

  const openPicker = () => inputRef.current?.click()

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>Carregar Imagem</h3>
          <button type="button" className="icon-btn" onClick={onClose}>×</button>
        </div>

        <div
          className={`uploader-zone ${dragging ? 'is-dragging' : ''}`}
          onClick={openPicker}
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragging(false)
            handlePick(event.dataTransfer.files)
          }}
        >
          <p>Arraste as imagens aqui ou clique para seleccionar</p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(event) => handlePick(event.target.files)}
            hidden
          />
        </div>

        {files.length > 0 && (
          <div className="upload-preview-grid">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="upload-preview-item">
                <img src={URL.createObjectURL(file)} alt={file.name} />
                <button type="button" className="preview-remove" onClick={() => onRemoveFile(index)}>×</button>
                <small title={file.name}>{file.name}</small>
              </div>
            ))}
          </div>
        )}

        <div className="form-grid">
          <div>
            <label htmlFor="media-category">Categoria</label>
            <select id="media-category" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="geral">Geral</option>
              <option value="hero">Hero</option>
              <option value="cadeiras">Cadeiras</option>
              <option value="cortinados">Cortinados</option>
              <option value="pulpitos">Púlpitos</option>
              <option value="restauro">Restauro</option>
              <option value="sobre">Sobre Nós</option>
            </select>
          </div>

          <div>
            <label htmlFor="media-alt">Texto alternativo</label>
            <input
              id="media-alt"
              type="text"
              placeholder="Ex: Cadeira restaurada em veludo"
              value={altText}
              onChange={(event) => setAltText(event.target.value)}
            />
          </div>
        </div>

        {uploading && (
          <div className="upload-progress">
            <div style={{ width: `${progress}%` }} />
          </div>
        )}

        <div className="modal-actions">
          <button type="button" className="btn-ghost" onClick={onClose} disabled={uploading}>Cancelar</button>
          <button type="button" className="btn-primary" onClick={onUpload} disabled={uploading || files.length === 0}>
            {uploading ? 'A enviar...' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  )
}
