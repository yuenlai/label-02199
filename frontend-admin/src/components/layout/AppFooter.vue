<template>
  <footer class="app-footer">
    <div class="footer-pattern"></div>
    <div class="footer-content container">
      <div class="footer-grid">
        <!-- 关于平台 -->
        <div class="footer-col footer-about">
          <h3>{{ t('footer.about') }}</h3>
          <p>{{ t('footer.aboutDesc') }}</p>
        </div>
        <!-- 快速链接 -->
        <div class="footer-col">
          <h3>{{ t('footer.links') }}</h3>
          <ul class="footer-links">
            <li v-for="item in quickLinks" :key="item.path">
              <router-link :to="item.path">{{ t(item.label) }}</router-link>
            </li>
          </ul>
        </div>
        <!-- 联系方式 -->
        <div class="footer-col">
          <h3>{{ t('footer.contact') }}</h3>
          <ul class="footer-contact">
            <li><el-icon><Location /></el-icon>{{ t('footer.address') }}</li>
            <li><el-icon><Message /></el-icon>{{ t('footer.email') }}</li>
            <li><el-icon><Phone /></el-icon>{{ t('footer.phone') }}</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>{{ t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Location, Message, Phone } from '@element-plus/icons-vue'

const { t } = useI18n()

const quickLinks = [
  { path: '/', label: 'nav.home' },
  { path: '/resources', label: 'nav.resources' },
  { path: '/virtual-tour', label: 'nav.virtualTour' },
  { path: '/inheritors', label: 'nav.inheritors' },
  { path: '/products', label: 'nav.products' },
  { path: '/community', label: 'nav.community' }
]
</script>

<style lang="scss" scoped>
.app-footer {
  background: #0E3B42;
  color: #B2BEC3;
  margin-top: auto;
}

.footer-pattern {
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    #1A535C 0px, #1A535C 8px,
    #0E3B42 8px, #0E3B42 12px,
    #FF6B6B 12px, #FF6B6B 20px,
    #0E3B42 20px, #0E3B42 24px
  );
}

.footer-content {
  padding-top: 48px;
  padding-bottom: 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.footer-col {
  h3 {
    color: #F7FFF7;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
    position: relative;
    padding-bottom: 10px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 32px;
      height: 2px;
      background: #FF6B6B;
      border-radius: 1px;
    }
  }

  p {
    font-size: 13px;
    line-height: 1.8;
    color: #8fa6ab;
  }
}

.footer-links {
  list-style: none;

  li {
    margin-bottom: 10px;

    a {
      color: #8fa6ab;
      font-size: 13px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: #F7FFF7;
      }
    }
  }
}

.footer-contact {
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-size: 13px;
    color: #8fa6ab;

    .el-icon {
      color: #FF6B6B;
      font-size: 15px;
      flex-shrink: 0;
    }
  }
}

.footer-bottom {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;

  p {
    font-size: 12px;
    color: #5a7a80;
  }
}
</style>
