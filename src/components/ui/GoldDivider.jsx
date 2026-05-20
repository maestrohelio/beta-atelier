// src/components/ui/GoldDivider.jsx
export default function GoldDivider({ className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="block h-px flex-1" style={{ backgroundColor: 'rgba(181,172,151,0.2)' }} />
      <span className="block w-1.5 h-1.5 rotate-45" style={{ backgroundColor: 'rgb(181,172,151)' }} />
      <span className="block h-px flex-1" style={{ backgroundColor: 'rgba(181,172,151,0.2)' }} />
    </div>
  )
}
