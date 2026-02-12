import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'
import za from './za'

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    zh,
    en,
    za
  }
})

export default i18n
