<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <EthnicIcons name="bronze-drum" :size="120" color="#DFE6E9" />
      <h1>404</h1>
      <p>抱歉，您访问的页面不存在</p>
      <el-button type="primary" size="large" round @click="router.push('/')">
        <el-icon><HomeFilled /></el-icon>
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { HomeFilled } from '@element-plus/icons-vue'
import EthnicIcons from '@/components/icons/EthnicIcons.vue'

const router = useRouter()
</script>

<style lang="scss" scoped>
.not-found-page {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F0F3F5;
}

.not-found-content {
  text-align: center;
  padding: 48px;

  h1 {
    font-size: 72px;
    font-weight: 700;
    color: #1A535C;
    margin: 24px 0 12px;
  }

  p {
    font-size: 16px;
    color: #636E72;
    margin-bottom: 32px;
  }

  .el-button:active {
    transform: scale(0.98);
  }
}
</style>
