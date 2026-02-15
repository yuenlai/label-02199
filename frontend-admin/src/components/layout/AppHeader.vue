<template>
  <header class="app-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="header-container">
      <!-- Logo -->
      <div class="header-logo" @click="router.push('/')">
        <svg class="logo-icon" viewBox="0 0 40 40" width="36" height="36">
          <circle cx="20" cy="20" r="18" fill="none" stroke="#1A535C" stroke-width="2"/>
          <circle cx="20" cy="20" r="12" fill="none" stroke="#FF6B6B" stroke-width="1.5"/>
          <circle cx="20" cy="20" r="6" fill="#1A535C"/>
          <line x1="20" y1="2" x2="20" y2="8" stroke="#1A535C" stroke-width="1.5"/>
          <line x1="20" y1="32" x2="20" y2="38" stroke="#1A535C" stroke-width="1.5"/>
          <line x1="2" y1="20" x2="8" y2="20" stroke="#1A535C" stroke-width="1.5"/>
          <line x1="32" y1="20" x2="38" y2="20" stroke="#1A535C" stroke-width="1.5"/>
        </svg>
        <div class="logo-text">
          <span class="logo-title">{{ t('nav.siteTitle') }}</span>
          <span class="logo-subtitle">{{ t('nav.siteSubtitle') }}</span>
        </div>
      </div>

      <!-- 桌面导航 -->
      <nav class="header-nav hidden-tablet">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: currentRoute === item.path }"
        >
          <el-icon :size="16"><component :is="item.icon" /></el-icon>
          <span>{{ t(item.label) }}</span>
        </router-link>
      </nav>

      <!-- 右侧操作区 -->
      <div class="header-actions">
        <LanguageSwitcher class="hidden-tablet" />
        <template v-if="userStore.isLoggedIn" class="hidden-tablet">
          <span class="user-name hidden-tablet">{{ userStore.userInfo.name }}</span>
          <el-button class="hidden-tablet" size="small" round @click="handleLogout">
            <el-icon><SwitchButton /></el-icon>
            {{ t('nav.logout') }}
          </el-button>
        </template>
        <el-button v-else class="hidden-tablet" type="primary" size="small" round @click="loginDialogVisible = true">
          <el-icon><User /></el-icon>
          {{ t('nav.login') }}
        </el-button>
        <!-- 移动端/平板菜单按钮 -->
        <el-button class="show-tablet menu-btn" :icon="Operation" text @click="mobileMenuVisible = true" />
      </div>
    </div>

    <!-- 移动端/平板弹出菜单 -->
    <transition name="menu-fade">
      <div v-if="mobileMenuVisible" class="mobile-menu-overlay" @click.self="mobileMenuVisible = false">
        <div class="mobile-menu-panel">
          <div class="mobile-menu-header">
            <span>{{ t('nav.mobileMenu') }}</span>
            <el-button text :icon="Close" @click="mobileMenuVisible = false" />
          </div>
          <div class="mobile-nav">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="mobile-nav-item"
              :class="{ active: currentRoute === item.path }"
              @click="mobileMenuVisible = false"
            >
              <el-icon :size="18"><component :is="item.icon" /></el-icon>
              <span>{{ t(item.label) }}</span>
            </router-link>
          </div>
          <div class="mobile-nav-footer">
            <LanguageSwitcher />
            <template v-if="userStore.isLoggedIn">
              <span class="user-name">{{ userStore.userInfo.name }}</span>
              <el-button size="small" round @click="handleLogout(); mobileMenuVisible = false">
                <el-icon><SwitchButton /></el-icon>
                {{ t('nav.logout') }}
              </el-button>
            </template>
            <el-button v-else type="primary" size="small" round @click="loginDialogVisible = true; mobileMenuVisible = false">
              <el-icon><User /></el-icon>
              {{ t('nav.login') }}
            </el-button>
          </div>
        </div>
      </div>
    </transition>
  </header>

  <!-- 登录弹框 - 通过 Teleport 挂载到 body，避免被 header 的 z-index 影响 -->
  <Teleport to="body">
    <el-dialog v-model="loginDialogVisible" :title="t('login.title')" width="400px" :close-on-click-modal="false" append-to-body :lock-scroll="false">
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-position="top">
        <el-form-item :label="t('login.username')" prop="username">
          <el-input v-model="loginForm.username" :placeholder="t('login.usernamePlaceholder')" :prefix-icon="User" />
        </el-form-item>
        <el-form-item :label="t('login.password')" prop="password">
          <el-input v-model="loginForm.password" type="password" show-password :placeholder="t('login.passwordPlaceholder')" :prefix-icon="Lock" @keyup.enter="handleLogin" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="loginDialogVisible = false">{{ t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="loginLoading" @click="handleLogin">{{ t('nav.login') }}</el-button>
      </template>
    </el-dialog>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { HomeFilled, Grid, View, User, Goods, ChatDotRound, Operation, Close, SwitchButton, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import { useUserStore } from '@/store'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const userStore = useUserStore()

const isScrolled = ref(false)
const mobileMenuVisible = ref(false)
const loginDialogVisible = ref(false)
const loginLoading = ref(false)
const loginFormRef = ref(null)

const loginForm = ref({ username: '', password: '' })
const loginRules = {
  username: [{ required: true, message: () => t('login.usernameRequired'), trigger: 'blur' }],
  password: [{ required: true, message: () => t('login.passwordRequired'), trigger: 'blur' }]
}

const currentRoute = computed(() => route.path)

const navItems = [
  { path: '/', label: 'nav.home', icon: 'HomeFilled' },
  { path: '/resources', label: 'nav.resources', icon: 'Grid' },
  { path: '/virtual-tour', label: 'nav.virtualTour', icon: 'View' },
  { path: '/inheritors', label: 'nav.inheritors', icon: 'User' },
  { path: '/products', label: 'nav.products', icon: 'Goods' },
  { path: '/community', label: 'nav.community', icon: 'ChatDotRound' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const handleLogin = () => {
  loginFormRef.value?.validate((valid) => {
    if (!valid) return
    loginLoading.value = true
    setTimeout(() => {
      const result = userStore.login(loginForm.value.username, loginForm.value.password)
      loginLoading.value = false
      if (result.success) {
        loginDialogVisible.value = false
        loginForm.value = { username: '', password: '' }
        ElMessage.success(t('login.success', { name: userStore.userInfo.name }))
      } else {
        ElMessage.error(t('login.failed'))
      }
    }, 500)
  })
}

const handleLogout = () => {
  userStore.logout()
  ElMessage.success(t('login.logoutSuccess'))
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  transition: box-shadow 0.3s ease, background 0.3s ease;
  border-bottom: 1px solid transparent;

  &.is-scrolled {
    box-shadow: 0 2px 12px rgba(26, 83, 92, 0.08);
    border-bottom-color: #DFE6E9;
  }
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  flex-shrink: 0;

  .logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }

  .logo-title {
    font-size: 16px;
    font-weight: 700;
    color: #1A535C;
  }

  .logo-subtitle {
    font-size: 11px;
    color: #636E72;
  }
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  justify-content: center;

  .nav-item {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 14px;
    color: #636E72;
    text-decoration: none;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: #1A535C;
      background: rgba(26, 83, 92, 0.06);
    }

    &.active,
    &.router-link-exact-active {
      color: #1A535C;
      background: rgba(26, 83, 92, 0.1);
      font-weight: 600;
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.menu-btn {
  font-size: 22px;
  color: #1A535C;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name {
  font-size: 14px;
  color: #1A535C;
  font-weight: 600;
  white-space: nowrap;
}


</style>

<style lang="scss">
/* 登录弹框样式 - 非 scoped，因为 dialog 通过 Teleport 挂载到 body */

/* 弹出菜单 - 遮罩层 */
.mobile-menu-overlay {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2000;
}

/* 弹出菜单 - 面板 */
.mobile-menu-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  max-width: 85vw;
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  background: #fff;
  border-radius: 0 0 0 12px;
  box-shadow: -4px 4px 24px rgba(0, 0, 0, 0.12);
  padding: 12px 0;
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px 12px;
  font-size: 15px;
  font-weight: 600;
  color: #1A535C;
  border-bottom: 1px solid #DFE6E9;
  margin-bottom: 4px;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 8px;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 12px;
  border-radius: 8px;
  font-size: 15px;
  color: #2D3436;
  text-decoration: none;
  transition: background 0.2s;

  &:hover,
  &.active,
  &.router-link-exact-active {
    background: rgba(26, 83, 92, 0.08);
    color: #1A535C;
  }
}

.mobile-nav-footer {
  margin-top: 8px;
  padding: 12px 16px 4px;
  border-top: 1px solid #DFE6E9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

/* 菜单弹出动画 */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.2s ease;
}

.menu-fade-enter-active .mobile-menu-panel,
.menu-fade-leave-active .mobile-menu-panel {
  transition: transform 0.25s ease, opacity 0.2s ease;
}

.menu-fade-enter-from {
  opacity: 0;
}

.menu-fade-enter-from .mobile-menu-panel {
  transform: translateY(-8px);
  opacity: 0;
}

.menu-fade-leave-to {
  opacity: 0;
}

.menu-fade-leave-to .mobile-menu-panel {
  transform: translateY(-8px);
  opacity: 0;
}

/* 响应式：992px 以下收起导航，显示菜单按钮 */
.hidden-tablet {
  @media (max-width: 992px) {
    display: none !important;
  }
}

.show-tablet {
  display: none !important;
  @media (max-width: 992px) {
    display: flex !important;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 16px;
  }

  .logo-subtitle {
    display: none;
  }

  .header-actions {
    gap: 8px;
  }
}
</style>
