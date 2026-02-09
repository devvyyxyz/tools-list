const Preloader = ({ label = 'Loading repositories…' }) => {
  return (
    <div className="preloader-backdrop" role="status" aria-live="polite">
      <div className="preloader-card">
        <span className="spinner" aria-hidden="true" />
        <p className="text-sm font-semibold text-white/80">{label}</p>
      </div>
    </div>
  )
}

export default Preloader
