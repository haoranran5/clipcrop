
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import './i18n/setup'

createRoot(document.getElementById('root')!).render(<App />)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(console.error))
}
