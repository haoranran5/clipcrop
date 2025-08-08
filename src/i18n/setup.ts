
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import zh from './zh.json'
import es from './es.json'

i18n.use(initReactI18next).init({
  resources: { en:{translation:en}, zh:{translation:zh}, es:{translation:es} },
  lng: 'en', fallbackLng: 'en',
})
export default i18n
