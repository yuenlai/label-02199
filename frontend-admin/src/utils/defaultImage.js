/**
 * 默认占位图 & 图片生成工具
 * 使用内联 SVG data URI，无需网络请求
 */

// 民族主题配色
const ETHNIC_COLORS = {
  zhuang: { bg: '#1A535C', accent: '#4ECDC4', text: '#E8F0F1' },
  yao:    { bg: '#6B2D5B', accent: '#D4789C', text: '#F5E6F0' },
  miao:   { bg: '#2D4A7A', accent: '#5B9BD5', text: '#E0EAF5' },
  dong:   { bg: '#5C4B1A', accent: '#C5A100', text: '#F5F0E0' },
  default:{ bg: '#3D5A6E', accent: '#6BA3B7', text: '#E8F0F1' }
}

const escapeXml = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// 民族纹样 SVG 图案（简化版）
const ETHNIC_PATTERNS = {
  zhuang: (w, h, color) => `
    <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M0 20h40M20 0v40" stroke="${color}" stroke-opacity="0.15" stroke-width="1" fill="none"/>
      <rect x="10" y="10" width="20" height="20" rx="2" fill="none" stroke="${color}" stroke-opacity="0.12" stroke-width="1.5"/>
      <circle cx="20" cy="20" r="4" fill="${color}" fill-opacity="0.1"/>
    </pattern>
    <rect width="${w}" height="${h}" fill="url(#p)"/>`,
  yao: (w, h, color) => `
    <pattern id="p" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M0 15L15 0L30 15L15 30Z" fill="none" stroke="${color}" stroke-opacity="0.12" stroke-width="1"/>
      <circle cx="15" cy="15" r="3" fill="${color}" fill-opacity="0.1"/>
    </pattern>
    <rect width="${w}" height="${h}" fill="url(#p)"/>`,
  miao: (w, h, color) => `
    <pattern id="p" width="36" height="36" patternUnits="userSpaceOnUse">
      <circle cx="18" cy="18" r="12" fill="none" stroke="${color}" stroke-opacity="0.1" stroke-width="1"/>
      <circle cx="18" cy="18" r="6" fill="none" stroke="${color}" stroke-opacity="0.12" stroke-width="1.5"/>
      <circle cx="18" cy="18" r="2" fill="${color}" fill-opacity="0.12"/>
    </pattern>
    <rect width="${w}" height="${h}" fill="url(#p)"/>`,
  dong: (w, h, color) => `
    <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M20 5L35 20L20 35L5 20Z" fill="none" stroke="${color}" stroke-opacity="0.12" stroke-width="1"/>
      <path d="M20 12L28 20L20 28L12 20Z" fill="none" stroke="${color}" stroke-opacity="0.1" stroke-width="1"/>
    </pattern>
    <rect width="${w}" height="${h}" fill="url(#p)"/>`,
  default: (w, h, color) => `
    <pattern id="p" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="16" cy="16" r="8" fill="none" stroke="${color}" stroke-opacity="0.1" stroke-width="1"/>
    </pattern>
    <rect width="${w}" height="${h}" fill="url(#p)"/>`
}

// 图标 SVG 路径（用于不同类型的占位图）
const ICONS = {
  person: (cx, cy, size, color) => {
    const s = size
    return `<circle cx="${cx}" cy="${cy - s * 0.15}" r="${s * 0.28}" fill="${color}" fill-opacity="0.25"/>
      <ellipse cx="${cx}" cy="${cy + s * 0.35}" rx="${s * 0.4}" ry="${s * 0.22}" fill="${color}" fill-opacity="0.2"/>`
  },
  image: (cx, cy, size, color) => {
    const s = size * 0.5
    return `<rect x="${cx - s}" y="${cy - s * 0.7}" width="${s * 2}" height="${s * 1.4}" rx="4" fill="${color}" fill-opacity="0.15" stroke="${color}" stroke-opacity="0.2" stroke-width="1.5"/>
      <circle cx="${cx - s * 0.35}" cy="${cy - s * 0.2}" r="${s * 0.2}" fill="${color}" fill-opacity="0.2"/>
      <path d="M${cx - s} ${cy + s * 0.4}L${cx - s * 0.3} ${cy}L${cx + s * 0.2} ${cy + s * 0.25}L${cx + s} ${cy - s * 0.1}V${cy + s * 0.7}H${cx - s}Z" fill="${color}" fill-opacity="0.12"/>`
  },
  product: (cx, cy, size, color) => {
    const s = size * 0.45
    return `<rect x="${cx - s}" y="${cy - s * 0.5}" width="${s * 2}" height="${s * 1.5}" rx="6" fill="${color}" fill-opacity="0.12" stroke="${color}" stroke-opacity="0.2" stroke-width="1.5"/>
      <path d="M${cx - s * 0.5} ${cy - s * 0.5}L${cx - s * 0.3} ${cy - s}L${cx + s * 0.3} ${cy - s}L${cx + s * 0.5} ${cy - s * 0.5}" fill="none" stroke="${color}" stroke-opacity="0.2" stroke-width="1.5"/>
      <line x1="${cx}" y1="${cy - s}" x2="${cx}" y2="${cy - s * 0.5}" stroke="${color}" stroke-opacity="0.15" stroke-width="1"/>`
  },
  scene: (cx, cy, size, color) => {
    const s = size * 0.5
    return `<path d="M${cx - s} ${cy + s * 0.5}L${cx - s * 0.4} ${cy - s * 0.3}L${cx} ${cy + s * 0.1}L${cx + s * 0.3} ${cy - s * 0.5}L${cx + s} ${cy + s * 0.5}Z" fill="${color}" fill-opacity="0.15"/>
      <circle cx="${cx + s * 0.5}" cy="${cy - s * 0.4}" r="${s * 0.18}" fill="${color}" fill-opacity="0.2"/>`
  }
}

const createSvgPlaceholder = (width, height, text, bgColor = '#E8F0F1', textColor = '#8fa6ab') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" fill="${bgColor}"/>
    <text x="${width / 2}" y="${height / 2 + 5}" fill="${textColor}" font-size="14" text-anchor="middle" font-family="system-ui, sans-serif">${escapeXml(text)}</text>
  </svg>`
  return 'data:image/svg+xml,' + encodeURIComponent(svg)
}

/**
 * 生成带标题和视觉元素的主题占位图
 */
export const createTitlePlaceholder = (title, { width = 400, height = 300, ethnicity = 'default', type = 'image' } = {}) => {
  const colors = ETHNIC_COLORS[ethnicity] || ETHNIC_COLORS.default
  const safeTitle = escapeXml(title)
  const maxChars = 8
  const lines = []
  for (let i = 0; i < safeTitle.length; i += maxChars) {
    lines.push(safeTitle.slice(i, i + maxChars))
  }
  const fontSize = width >= 400 ? 20 : 14
  const lineHeight = fontSize * 1.4

  // 图标在上方，文字在下方
  const iconSize = Math.min(width, height) * 0.35
  const iconCy = height * 0.38
  const textStartY = height * 0.62

  const iconFn = ICONS[type] || ICONS.image
  const iconSvg = iconFn(width / 2, iconCy, iconSize, colors.text)

  const patternFn = ETHNIC_PATTERNS[ethnicity] || ETHNIC_PATTERNS.default
  const patternSvg = patternFn(width, height, colors.text)

  const textEls = lines.map((line, i) =>
    `<text x="${width / 2}" y="${textStartY + i * lineHeight}" fill="${colors.text}" font-size="${fontSize}" font-weight="600" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" opacity="0.9">${line}</text>`
  ).join('')

  // 底部装饰线
  const decoY = textStartY + lines.length * lineHeight + 6
  const deco = `<line x1="${width / 2 - 24}" y1="${decoY}" x2="${width / 2 + 24}" y2="${decoY}" stroke="${colors.text}" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round"/>`

  // 顶部渐变装饰条
  const topBar = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${colors.accent}" stop-opacity="0.6"/>
    <stop offset="50%" stop-color="${colors.text}" stop-opacity="0.3"/>
    <stop offset="100%" stop-color="${colors.accent}" stop-opacity="0.6"/>
  </linearGradient></defs>
  <rect width="${width}" height="3" fill="url(#g)"/>`

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" fill="${colors.bg}"/>
    ${patternSvg}
    ${topBar}
    ${iconSvg}
    ${textEls}
    ${deco}
  </svg>`
  return 'data:image/svg+xml,' + encodeURIComponent(svg)
}

/**
 * 生成头像占位图（带人物图标）
 */
export const createAvatarPlaceholder = (name, { size = 200, ethnicity = 'default' } = {}) => {
  const colors = ETHNIC_COLORS[ethnicity] || ETHNIC_COLORS.default
  const safeName = escapeXml(name)
  const initial = safeName.charAt(0)
  const patternFn = ETHNIC_PATTERNS[ethnicity] || ETHNIC_PATTERNS.default
  const patternSvg = patternFn(size, size, colors.text)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" fill="${colors.bg}"/>
    ${patternSvg}
    ${ICONS.person(size / 2, size * 0.4, size * 0.5, colors.text)}
    <text x="${size / 2}" y="${size * 0.88}" fill="${colors.text}" font-size="${size * 0.13}" font-weight="600" text-anchor="middle" font-family="system-ui, sans-serif" opacity="0.8">${initial}</text>
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
  if (img.dataset.fallback) return
  img.dataset.fallback = '1'
  img.src = fallback
}
