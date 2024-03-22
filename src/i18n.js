import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ar from './locales/ar.json'

function loadLocaleMessages() {
  const locales = [{ EN: en }, { AR: ar }]
  const messages = {}
  locales.forEach(lang => {
    const key = Object.keys(lang)
    messages[key] = lang[key] 
  })
  return messages
}

const savedLocale = localStorage.getItem('locale') || 'EN'; // Default to 'en' if no language preference is set

export default createI18n({
  locale: savedLocale,
  fallbackLocale: 'EN',
  messages: loadLocaleMessages()
})