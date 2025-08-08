import React from 'react'

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem('clipcrop_theme')
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('clipcrop_theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <button 
      className="theme-toggle" 
      onClick={() => setIsDark(!isDark)}
      title={isDark ? '切换到浅色模式' : '切换到深色模式'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
