import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 测试账号
const TEST_ACCOUNTS = [
  { username: 'admin', password: 'admin123', name: '管理员' },
  { username: 'user', password: 'user123', name: '文化探索者' }
]

// 用户状态管理
export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const userInfo = ref({
    id: 0,
    name: '',
    avatar: '',
    favorites: [],
    comments: []
  })

  const favorites = computed(() => userInfo.value.favorites)

  function login(username, password) {
    const account = TEST_ACCOUNTS.find(
      a => a.username === username && a.password === password
    )
    if (account) {
      isLoggedIn.value = true
      userInfo.value.id = Date.now()
      userInfo.value.name = account.name
      return { success: true }
    }
    return { success: false }
  }

  function logout() {
    isLoggedIn.value = false
    userInfo.value = { id: 0, name: '', avatar: '', favorites: [], comments: [] }
  }

  function toggleFavorite(resourceId) {
    const idx = userInfo.value.favorites.indexOf(resourceId)
    if (idx > -1) {
      userInfo.value.favorites.splice(idx, 1)
    } else {
      userInfo.value.favorites.push(resourceId)
    }
  }

  function isFavorited(resourceId) {
    return userInfo.value.favorites.includes(resourceId)
  }

  function addComment(comment) {
    userInfo.value.comments.push({
      ...comment,
      id: Date.now(),
      time: new Date().toLocaleString('zh-CN')
    })
  }

  return { isLoggedIn, userInfo, favorites, login, logout, toggleFavorite, isFavorited, addComment }
})

// 资源状态管理
export const useResourceStore = defineStore('resource', () => {
  const currentFilter = ref({
    keyword: '',
    ethnicity: '',
    type: '',
    region: ''
  })

  const loading = ref(false)

  function setFilter(filter) {
    Object.assign(currentFilter.value, filter)
  }

  function resetFilter() {
    currentFilter.value = {
      keyword: '',
      ethnicity: '',
      type: '',
      region: ''
    }
  }

  return { currentFilter, loading, setFilter, resetFilter }
})

// 全局 UI 状态
export const useAppStore = defineStore('app', () => {
  const language = ref('zh')
  const isMobile = ref(false)
  const sidebarCollapsed = ref(false)

  function setLanguage(lang) {
    language.value = lang
  }

  function setMobile(val) {
    isMobile.value = val
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  return { language, isMobile, sidebarCollapsed, setLanguage, setMobile, toggleSidebar }
})
