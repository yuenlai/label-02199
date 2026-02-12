/**
 * 动画组合函数 - Vue 3 Composables
 * 使用 IntersectionObserver 实现元素进入视口时的淡入动画
 */

import { onMounted, onUnmounted, nextTick } from 'vue'

/**
 * 滚动揭示动画 - 元素进入视口时添加 is-visible class
 * @param {Object} options - 配置项
 * @param {number} options.threshold - 可见比例阈值 (0-1)，默认 0.1
 * @param {string} options.rootMargin - 根边距，默认 '0px 0px -50px 0px'（提前触发）
 * @returns {{ observe: (el: Element | Element[] | Ref) => void }}
 */
export function useScrollAnimation(options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options
  let observer = null
  const observedElements = new Set()

  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
        observedElements.delete(entry.target)
      }
    })
  }

  const observe = (el) => {
    if (!el) return
    const resolveElement = (target) => {
      if (!target) return null
      if (target instanceof Element) return target
      if (target?.$el instanceof Element) return target.$el
      if (target?.value instanceof Element) return target.value
      return null
    }
    const elements = Array.isArray(el) ? el : [el]
    elements.forEach((element) => {
      const domEl = resolveElement(element)
      if (domEl && !observedElements.has(domEl)) {
        observedElements.add(domEl)
        observer?.observe(domEl)
      }
    })
  }

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin
    })
    nextTick(() => {
      observedElements.forEach((domEl) => observer?.observe(domEl))
    })
  })

  onUnmounted(() => {
    observedElements.forEach((domEl) => observer?.unobserve(domEl))
    observedElements.clear()
    observer?.disconnect()
    observer = null
  })

  return { observe }
}
