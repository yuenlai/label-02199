import { useI18n } from 'vue-i18n'

/**
 * 从多语言字段对象中取当前语言的值
 * 字段格式: { zh: '中文', en: 'English', za: 'Vahcuengh' }
 * 如果字段是普通字符串则直接返回
 */
export function useLocaleData() {
  const { locale } = useI18n()

  const l = (field) => {
    if (!field) return ''
    if (typeof field === 'string') return field
    return field[locale.value] || field.zh || ''
  }

  /**
   * 将整个对象的多语言字段解析为当前语言
   */
  const localizeItem = (item) => {
    if (!item) return item
    const result = { ...item }
    for (const key of Object.keys(result)) {
      const val = result[key]
      if (val && typeof val === 'object' && !Array.isArray(val) && ('zh' in val || 'en' in val)) {
        result[key] = l(val)
      }
    }
    return result
  }

  return { l, localizeItem, locale }
}
