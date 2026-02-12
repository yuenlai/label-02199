/**
 * 默认占位图 - 当图片加载失败时显示
 * 使用内联 SVG data URI，无需网络请求
 */

const createSvgPlaceholder = (width, height, text, bgColor = '#E8F0F1', textColor = '#8fa6ab') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" fill="${bgColor}"/>
    <text x="${width / 2}" y="${height / 2 + 5}" fill="${textColor}" font-size="14" text-anchor="middle" font-family="system-ui, sans-serif">${text}</text>
  </svg>`
  return 'data:image/svg+xml,' + encodeURIComponent(svg)
}

// 预生成各尺寸的默认图
export const DEFAULT_COVER = createSvgPlaceholder(400, 300, '暂无图片')
export const DEFAULT_AVATAR = createSvgPlaceholder(200, 200, '暂无头像')
export const DEFAULT_PRODUCT = createSvgPlaceholder(400, 400, '暂无图片')
export const DEFAULT_SCENE = createSvgPlaceholder(640, 360, '暂无图片')
export const DEFAULT_WORK = createSvgPlaceholder(300, 200, '暂无图片')

/**
 * 通用图片错误处理函数
 * 防止 error 事件循环：标记已处理的元素
 */
export const onImgError = (e, fallback = DEFAULT_COVER) => {
  const img = e.target
  if (img.dataset.fallback) return // 已经设置过 fallback，不再重复
  img.dataset.fallback = '1'
  img.src = fallback
}
