<template>
  <el-dropdown trigger="click" @command="handleSwitch">
    <span class="lang-trigger">
      <el-icon :size="16"><GlobeFilled /></el-icon>
      <span class="lang-label">{{ currentLabel }}</span>
      <el-icon :size="12"><ArrowDown /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="lang in languages"
          :key="lang.value"
          :command="lang.value"
          :class="{ 'is-active': locale === lang.value }"
        >
          <span class="lang-flag">{{ lang.flag }}</span>
          {{ lang.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDown } from '@element-plus/icons-vue'
import { LANGUAGES } from '@/utils/constants'

// 简单的 Globe 图标替代
const GlobeFilled = {
  template: `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/><path fill="currentColor" d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm215.5 263.8c-3.2-10.5-7.8-20.5-13.7-30-5.8-9.3-12.9-17.8-21-25.5 39.5 20.2 72 50.7 94.2 88.2-17.8-13.2-37.5-24-58.5-32.7zm-430.9 0c-21.1 8.7-40.7 19.4-58.5 32.7 22.2-37.5 54.7-68 94.2-88.2-8.1 7.7-15.2 16.2-21 25.5-5.9 9.5-10.5 19.5-13.7 30zM512 195c22 0 43.4 3.5 63.6 10.1-11.6 8.9-22 19.3-31.1 31-9.6-2.7-19.6-4.4-29.9-5.1-2-.1-4-.2-6-.2s-4 .1-6 .2c-10.3.7-20.3 2.4-29.9 5.1-9.1-11.7-19.5-22.1-31.1-31 20.2-6.5 41.6-10.1 63.4-10.1z"/></svg>`
}

const { locale } = useI18n()

const languages = LANGUAGES

const currentLabel = computed(() => {
  return languages.find(l => l.value === locale.value)?.label || '中文'
})

const handleSwitch = (lang) => {
  locale.value = lang
}
</script>

<style lang="scss" scoped>
.lang-trigger {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: #636E72;
  font-size: 13px;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    color: #1A535C;
    background: rgba(26, 83, 92, 0.06);
  }
}

.lang-label {
  @media (max-width: 768px) {
    display: inline;
  }
}

.lang-flag {
  margin-right: 4px;
}

:deep(.is-active) {
  color: #1A535C;
  font-weight: 600;
}
</style>
