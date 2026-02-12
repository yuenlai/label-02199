/**
 * 默认占位图 - 当图片加载失败时显示
 * 使用内联 SVG data URI，无需网络请求
 */

// 民族主题配色
const ETHNIC_COLORS = {
  zhuang: { bg: '#1A535C', text: '#E8F0F1' },
  yao:    { bg: '#6B2D5B', text: '#F5E6F0' },
  miao:   { bg: '#2D4A7A', text: '#E0EAF5' },
  dong:   { bg: '#5C4B1A', text: '#F5F0E0' },
  default:{ bg: '#3D5A6E', text: '#E8F0F1' }
}

const escapeXml = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const createSvgPlaceholder = (width, height, text, bgColor = '#E8F0F1', textColor = '#8fa6ab') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" fill="${bgColor}"/>
    <text x="${width / 2}" y="${height / 2 + 5}" fill="${textColor}" font-size="14" text-anchor="middle" font-family="system-ui, sans-serif">${escapeXml(text)}</text>
  </svg>`
  return 'data:image/svg+xml,' + encodeURIComponent(svg)
}

/**
 * 生成带标题的主题占位图
 * @param {string} title - 显示的标题文字
 * @param {object} options - { width, height, ethnicity }
 */
export const createTitlePlaceholder = (title, { width = 400, height = 300, ethnicity = 'default' } = {}) => {
  const colors = ETHNIC_COLORS[ethnicity] || ETHNIC_COLORS.default
  const safeTitle = escapeXml(title)
  // 自动换行：每行最多 8 个字
  const maxChars = 8
  const lines = []
  for (let i = 0; i < safeTitle.length; i += maxChars) {
    lines.push(safeTitle.slice(i, i + maxChars))
  }
  const fontSize = width >= 400 ? 22 : 16
  const lineHeight = fontSize * 1.5
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2

  const textEls = lines.map((line, i) =>
    `<text x="${width / 2}" y="${startY + i * lineHeight}" fill="${colors.text}" font-size="${fontSize}" font-weight="600" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">${line}</text>`
  ).join('')

  // 装饰线
  const decoY = startY + lines.length * lineHeight + 8
  const deco = `<line x1="${width / 2 - 30}" y1="${decoY}" x2="${width / 2 + 30}" y2="${decoY}" stroke="${colors.text}" stroke-opacity="0.3" stroke-width="2"/>`

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" fill="${colors.bg}"/>
    ${textEls}
    ${deco}
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
