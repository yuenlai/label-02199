import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './styles/global.scss'
import './styles/animations.scss'
import './styles/ethnic-patterns.scss'

const app = createApp(App)

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(ElementPlus)

// 移除首屏加载动画
router.isReady().then(() => {
  const loader = document.getElementById('app-loading')
  if (loader) {
    loader.classList.add('fade-out')
    setTimeout(() => loader.remove(), 500)
  }
})

app.mount('#app')
