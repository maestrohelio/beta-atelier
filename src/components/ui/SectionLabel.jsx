// src/components/ui/SectionLabel.jsx
export default function SectionLabel({ children, light = false }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="block h-px w-10 flex-shrink-0"
        style={{ backgroundColor: 'rgb(181,172,151)' }}
      />
      <span
        className="font-sans font-medium uppercase tracking-widest"
        style={{
          fontSize: '11px',
          letterSpacing: '2px',
          color: light ? 'rgb(105,99,110)' : 'rgb(181,172,151)',
        }}
      >
        {children}
      </span>
    </div>
  )
}
