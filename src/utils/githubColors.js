export const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Ruby: '#701516',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  PHP: '#4F5D95',
}

export const getLanguageColor = (language) => {
  return languageColors[language] || '#94a3b8'
}
