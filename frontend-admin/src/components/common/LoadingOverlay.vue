<template>
  <transition name="toast-fade">
    <div v-if="visible" class="loading-overlay" :class="{ 'is-toast': mode === 'toast' }">
      <div v-if="mode === 'full'" class="loading-spinner">
        <svg class="spinner-icon" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#1A535C" stroke-width="3" stroke-dasharray="80, 200" stroke-linecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
          </circle>
        </svg>
        <p class="loading-text">{{ text }}</p>
      </div>
      <div v-else-if="mode === 'toast'" class="toast-content">
        <el-icon :size="20" color="#4ECDC4"><CircleCheckFilled /></el-icon>
        <span>{{ text }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { CircleCheckFilled } from '@element-plus/icons-vue'

defineProps({
  visible: { type: Boolean, default: false },
  text: { type: String, default: '加载中...' },
  mode: { type: String, default: 'full', validator: v => ['full', 'toast'].includes(v) }
})
</script>

<style lang="scss" scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  background: rgba(247, 255, 247, 0.9);

  &.is-toast {
    background: transparent;
    pointer-events: none;
    align-items: flex-start;
    justify-content: center;
    padding-top: 100px;
  }
}

.loading-spinner {
  text-align: center;

  .spinner-icon {
    width: 48px;
    height: 48px;
  }

  .loading-text {
    margin-top: 16px;
    color: #1A535C;
    font-size: 14px;
  }
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  font-size: 14px;
  color: #2D3436;
  pointer-events: auto;
}

/* 淡入淡出动画 */
.toast-fade-enter-active {
  animation: toastIn 0.3s ease;
}

.toast-fade-leave-active {
  animation: toastOut 0.3s ease;
}

@keyframes toastIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes toastOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
}
</style>
