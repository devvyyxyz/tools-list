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

export const formatTitle = (name) => {
  // Replace hyphens with spaces
  let result = name.replace(/-/g, ' ')
  
  // Insert space before capital letters in camelCase (HelloWorld -> Hello World)
  result = result.replace(/([a-z])([A-Z])/g, '$1 $2')
  
  // Lowercase first letter of each word except first word
  result = result
    .split(' ')
    .map((word, index) => {
      if (index === 0) return word.toLowerCase()
      return word.charAt(0).toLowerCase() + word.slice(1)
    })
    .join(' ')
  
  return result
}
