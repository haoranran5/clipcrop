import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from '../App'
import i18n from '../i18n/setup'

const LanguageRouter: React.FC = () => {
  // 检测用户语言偏好
  const detectLanguage = (): string => {
    const path = window.location.pathname
    if (path.startsWith('/zh')) return 'zh'
    if (path.startsWith('/en')) return 'en'
    if (path.startsWith('/es')) return 'es'
    
    // 从浏览器语言检测
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('zh')) return 'zh'
    if (browserLang.startsWith('es')) return 'es'
    return 'en' // 默认英语
  }

  // 设置语言并重定向
  const setLanguageAndRedirect = (lang: string) => {
    i18n.changeLanguage(lang)
    const currentPath = window.location.pathname
    const newPath = `/${lang}${currentPath === '/' ? '' : currentPath}`
    if (currentPath !== newPath) {
      window.history.replaceState(null, '', newPath)
    }
  }

  React.useEffect(() => {
    const lang = detectLanguage()
    setLanguageAndRedirect(lang)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/zh/*" element={<App />} />
        <Route path="/en/*" element={<App />} />
        <Route path="/es/*" element={<App />} />
        <Route path="/*" element={<Navigate to={`/${detectLanguage()}`} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default LanguageRouter
