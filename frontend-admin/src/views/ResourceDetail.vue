<template>
  <div class="detail-page" v-if="resource">
    <!-- 面包屑 -->
    <div class="container breadcrumb-wrap">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/resources' }">{{ t('nav.resources') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ l(resource.title) }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container detail-layout">
      <!-- 左侧主内容 -->
      <div class="detail-main fade-in-up">
        <!-- 封面 -->
        <div class="detail-cover">
          <img :src="resource.cover" :alt="l(resource.title)" @error="handleImgError" />
          <!-- 织锦纹理进度条装饰 -->
          <div class="ethnic-progress-bar"><div class="ethnic-progress-fill"></div></div>
        </div>

        <!-- 基本信息 -->
        <div class="detail-header ethnic-border">
          <h1>{{ l(resource.title) }}</h1>
          <div class="detail-meta">
            <span :class="['ethnic-tag', `ethnic-tag--${resource.ethnicity}`]">{{ ethnicLabel }}</span>
            <span class="meta-item"><el-icon><Location /></el-icon>{{ l(resource.region) }}</span>
            <span class="meta-item"><el-icon><Collection /></el-icon>{{ typeLabel }}</span>
          </div>
          <div class="detail-tags">
            <el-tag v-for="tag in l(resource.tags)" :key="tag" effect="plain" round>{{ tag }}</el-tag>
          </div>
        </div>

        <!-- 文化背景 -->
        <div class="detail-section">
          <h2 class="ethnic-title-decoration">{{ t('detail.background') }}</h2>
          <p>{{ l(resource.background) }}</p>
        </div>

        <!-- 历史渊源 -->
        <div class="detail-section">
          <h2 class="ethnic-title-decoration">{{ t('detail.history') }}</h2>
          <p>{{ l(resource.history) }}</p>
        </div>

        <!-- 传承现状 -->
        <div class="detail-section">
          <h2 class="ethnic-title-decoration">{{ t('detail.status') }}</h2>
          <p>{{ l(resource.status) }}</p>
        </div>

        <!-- 评论区 -->
        <div class="detail-section comment-section">
          <h2 class="ethnic-title-decoration">{{ t('detail.comments') }}</h2>
          <div class="comment-input">
            <el-input
              v-model="commentText"
              type="textarea"
              :rows="3"
              :placeholder="t('detail.commentPlaceholder')"
              maxlength="500"
              show-word-limit
            />
            <el-button type="primary" :disabled="!commentText.trim()" @click="submitComment" class="comment-btn">
              {{ t('detail.submitComment') }}
            </el-button>
          </div>
          <div v-if="comments.length" class="comment-list">
            <div v-for="c in comments" :key="c.id" class="comment-item fade-in-up">
              <div class="comment-avatar">
                <el-avatar :size="36">{{ c.author[0] }}</el-avatar>
              </div>
              <div class="comment-body">
                <div class="comment-head">
                  <span class="comment-author">{{ c.author }}</span>
                  <span class="comment-time">{{ c.time }}</span>
                </div>
                <p class="comment-content">{{ c.content }}</p>
              </div>
            </div>
          </div>
          <el-empty v-else :description="t('detail.noComments')" :image-size="80" />
        </div>
      </div>

      <!-- 右侧边栏 -->
      <aside class="detail-sidebar">
        <!-- 操作按钮 -->
        <div class="sidebar-card">
          <div class="action-buttons">
            <el-button :type="isFav ? 'danger' : 'default'" round @click="toggleFav">
              <el-icon><Star /></el-icon>
              {{ isFav ? t('detail.favorited') : t('detail.favorite') }}
            </el-button>
            <el-button round @click="handleShare">
              <el-icon><Share /></el-icon>
              {{ t('detail.share') }}
            </el-button>
          </div>
        </div>

        <!-- 相关资源 -->
        <div class="sidebar-card">
          <h3 class="ethnic-title-decoration">{{ t('detail.related') }}</h3>
          <div class="related-list">
            <div
              v-for="item in relatedResources"
              :key="item.id"
              class="related-item"
              @click="router.push(`/resources/${item.id}`)"
            >
              <img :src="item.cover" :alt="l(item.title)" @error="handleImgError" />
              <div class="related-info">
                <h4 class="text-ellipsis">{{ l(item.title) }}</h4>
                <span :class="['ethnic-tag', `ethnic-tag--${item.ethnicity}`]" style="font-size:11px">
                  {{ getEthnicLabel(item.ethnicity) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
  <div v-else class="container" style="padding:80px 0;text-align:center">
    <el-empty :description="t('detail.resourceNotFound')" />
    <el-button type="primary" @click="router.push('/resources')">{{ t('detail.backToResources') }}</el-button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Location, Collection, Star, Share } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { culturalResources } from '@/utils/mockData'
import { ETHNICITIES, RESOURCE_TYPES } from '@/utils/constants'
import { useUserStore } from '@/store'
import { useLocaleData } from '@/composables/useLocaleData'
import { onImgError, DEFAULT_COVER } from '@/utils/defaultImage'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { l } = useLocaleData()
const userStore = useUserStore()

const resource = computed(() => {
  const id = Number(route.params.id)
  return culturalResources.find(r => r.id === id)
})

const ethnicLabel = computed(() => {
  const found = ETHNICITIES.find(e => e.value === resource.value?.ethnicity)
  return found ? t(found.labelKey) : ''
})
const typeLabel = computed(() => {
  const found = RESOURCE_TYPES.find(rt => rt.value === resource.value?.type)
  return found ? t(found.labelKey) : ''
})
const getEthnicLabel = (val) => {
  const found = ETHNICITIES.find(e => e.value === val)
  return found ? t(found.labelKey) : val
}

const relatedResources = computed(() => {
  if (!resource.value) return []
  return culturalResources
    .filter(r => r.id !== resource.value.id && (r.ethnicity === resource.value.ethnicity || r.type === resource.value.type))
    .slice(0, 4)
})

const isFav = computed(() => userStore.isFavorited(resource.value?.id))
const toggleFav = () => {
  userStore.toggleFavorite(resource.value.id)
  ElMessage.success(isFav.value ? t('detail.favorited') : t('detail.unfavorited'))
}

const handleShare = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href)
  }
  ElMessage.success(t('detail.linkCopied'))
}

const commentText = ref('')
const comments = ref([
  { id: 1, author: '文化探索者', content: '非常珍贵的文化遗产，希望能得到更好的保护和传承！', time: '2025-02-10 10:30' },
  { id: 2, author: '民族学研究生', content: '论文正好用到这个资料，平台做得很详细，感谢！', time: '2025-02-09 16:20' }
])

const submitComment = () => {
  if (!commentText.value.trim()) return
  comments.value.unshift({
    id: Date.now(),
    author: '文化探索者',
    content: commentText.value,
    time: new Date().toLocaleString('zh-CN')
  })
  commentText.value = ''
  ElMessage.success(t('detail.commentSuccess'))
}

const handleImgError = (e) => onImgError(e, DEFAULT_COVER)
</script>

<style lang="scss" scoped>
.breadcrumb-wrap {
  padding: 20px 0 16px;
}

.detail-layout {
  display: flex;
  gap: 32px;
  padding-bottom: 48px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
}

.detail-main {
  flex: 1;
  min-width: 0;
}

.detail-cover {
  border-radius: 12px;
  overflow: hidden;
  background: #F0F3F5;
  margin-bottom: 24px;

  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
}

.detail-header {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(26, 83, 92, 0.08);

  h1 {
    font-size: 24px;
    color: #2D3436;
    margin-bottom: 12px;
  }

  .detail-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #636E72;
  }

  .detail-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    .el-tag {
      --el-tag-border-color: #DFE6E9;
      --el-tag-text-color: #636E72;
    }
  }
}

.detail-section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(26, 83, 92, 0.08);

  h2 {
    font-size: 18px;
    color: #1A535C;
    margin-bottom: 16px;
  }

  p {
    font-size: 15px;
    color: #2D3436;
    line-height: 1.8;
  }
}

/* 评论区 */
.comment-input {
  margin-bottom: 24px;

  .comment-btn {
    margin-top: 12px;

    &:active {
      transform: scale(0.98);
    }
  }
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #F7FFF7;
  border-radius: 8px;
}

.comment-body {
  flex: 1;

  .comment-head {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }

  .comment-author {
    font-size: 14px;
    font-weight: 600;
    color: #1A535C;
  }

  .comment-time {
    font-size: 12px;
    color: #B2BEC3;
  }

  .comment-content {
    font-size: 14px;
    color: #2D3436;
    line-height: 1.6;
  }
}

/* 侧边栏 */
.detail-sidebar {
  width: 320px;
  flex-shrink: 0;

  @media (max-width: 992px) {
    width: 100%;
  }
}

.sidebar-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(26, 83, 92, 0.08);

  h3 {
    font-size: 16px;
    color: #1A535C;
    margin-bottom: 16px;
  }
}

.action-buttons {
  display: flex;
  gap: 12px;

  .el-button {
    flex: 1;

    &:active {
      transform: scale(0.98);
    }
  }
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.related-item {
  display: flex;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #F7FFF7;
  }

  img {
    width: 72px;
    height: 54px;
    border-radius: 6px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .related-info {
    flex: 1;
    min-width: 0;

    h4 {
      font-size: 14px;
      color: #2D3436;
      margin-bottom: 4px;
    }
  }
}
</style>
