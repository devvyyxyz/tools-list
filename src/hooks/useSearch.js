import { useMemo, useState } from 'react'

export const useSearch = (items = [], keys = []) => {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query) return items
    const lower = query.toLowerCase()
    return items.filter((item) =>
      keys.some((key) => String(item?.[key] || '').toLowerCase().includes(lower)),
    )
  }, [items, keys, query])

  return { query, setQuery, results }
}
