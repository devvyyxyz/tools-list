export const formatNumber = (value) => {
  if (value === null || value === undefined) return '—'
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(value)
}

export const formatDate = (value) => {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
