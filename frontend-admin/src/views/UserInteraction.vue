<template>
  <div class="community-page">
    <section class="page-banner">
      <div class="container">
        <h1 class="ethnic-header">{{ t('community.title') }}</h1>
        <p>{{ t('community.subtitle') }}</p>
      </div>
    </section>

    <div class="container community-content">
      <div class="community-layout">
        <!-- 主内容区 -->
        <div class="community-main">
          <!-- Tab切换 -->
          <el-tabs v-model="activeTab" class="community-tabs">
            <el-tab-pane :label="t('community.tabs.discussions')" name="discussions" />
            <el-tab-pane :label="t('community.tabs.shares')" name="shares" />
            <el-tab-pane :label="t('community.tabs.activities')" name="activities" />
          </el-tabs>

          <!-- 发帖区 -->
          <div class="post-form ethnic-card">
            <h3 class="ethnic-title-decoration">{{ t('community.post') }}</h3>
            <el-input v-model="newPost.title" :placeholder="t('community.postTitlePlaceholder')" size="large" class="post-title-input" />
            <el-input
              v-model="newPost.content"
              type="textarea"
              :rows="3"
              :placeholder="t('community.postContentPlaceholder')"
              maxlength="1000"
              show-word-limit
              class="post-content-input"
            />
            <div class="post-actions">
              <el-button type="primary" :loading="posting" @click="submitPost">
                {{ t('community.post') }}
              </el-button>
            </div>
          </div>

          <!-- 帖子列表 -->
          <div class="post-list">
            <div
              v-for="post in filteredPosts"
              :key="post.id"
              class="post-card ethnic-card fade-in-up"
            >
              <div class="post-header">
                <div class="post-author">
                  <el-avatar :size="40" :src="post.avatar">{{ l(post.author).charAt(0) }}</el-avatar>
                  <div class="author-info">
                    <span class="author-name">{{ l(post.author) }}</span>
                    <span class="post-time">{{ post.time }}</span>
                  </div>
                </div>
              </div>
              <h3 class="post-title">{{ l(post.title) }}</h3>
              <p class="post-content">{{ l(post.content) }}</p>
              <div class="post-footer">
                <button class="action-btn" :class="{ liked: post.liked }" @click="toggleLike(post)">
                  <el-icon><Star /></el-icon>
                  <span>{{ post.likes }}</span>
                </button>
                <button class="action-btn" @click="toggleReply(post)">
                  <el-icon><ChatDotRound /></el-icon>
                  <span>{{ post.replies }}</span>
                </button>
                <button class="action-btn" @click="sharePost(post)">
                  <el-icon><Share /></el-icon>
                  <span>{{ t('community.share') }}</span>
                </button>
              </div>

              <!-- 回复区 -->
              <div v-if="post.showReply" class="reply-section">
                <div class="silver-divider"></div>
                <div class="reply-input">
                  <el-input v-model="post.replyText" :placeholder="t('community.replyPlaceholder')" size="default" />
                  <el-button type="primary" size="small" @click="submitReply(post)">{{ t('common.reply') }}</el-button>
                </div>
              </div>
            </div>
          </div>

          <el-empty v-if="!filteredPosts.length" :description="t('common.noPosts')" />
        </div>

        <!-- 侧边栏 -->
        <aside class="community-sidebar hidden-mobile">
          <div class="sidebar-card ethnic-card">
            <h3 class="ethnic-title-decoration">{{ t('community.activeUsers') }}</h3>
            <div class="active-users">
              <div v-for="user in activeUsers" :key="user.name" class="user-item">
                <el-avatar :size="32" :src="user.avatar">{{ user.name[0] }}</el-avatar>
                <div class="user-info">
                  <span class="user-name">{{ user.name }}</span>
                  <span class="user-posts">{{ user.posts }} {{ t('community.postsUnit') }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { Star, ChatDotRound, Share } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { communityPosts } from '@/utils/mockData'
import { communityAvatars } from '@/utils/imageUrls'
import { useLocaleData } from '@/composables/useLocaleData'
import { useUserStore } from '@/store'

const { t } = useI18n()
const { l } = useLocaleData()
const userStore = useUserStore()
const activeTab = ref('discussions')
const posting = ref(false)

const newPost = reactive({ title: '', content: '' })

// 为帖子添加交互状态
const posts = ref(communityPosts.map(p => ({
  ...p,
  liked: false,
  showReply: false,
  replyText: ''
})))

const filteredPosts = computed(() => {
  if (activeTab.value === 'discussions') return posts.value.filter(p => p.type === 'discussions')
  if (activeTab.value === 'shares') return posts.value.filter(p => p.type === 'shares')
  if (activeTab.value === 'activities') return posts.value.filter(p => p.type === 'activities')
  return posts.value
})

const activeUsers = [
  { name: '壮锦爱好者', posts: 28, avatar: communityAvatars['壮锦爱好者'] },
  { name: '侗歌迷', posts: 22, avatar: communityAvatars['侗歌迷'] },
  { name: '非遗小白', posts: 18, avatar: communityAvatars['非遗小白'] },
  { name: '研学带队老师', posts: 15, avatar: communityAvatars['研学带队老师'] },
  { name: '苗银工匠', posts: 12, avatar: communityAvatars['苗银工匠'] }
]

const submitPost = () => {
  if (!newPost.title.trim() || !newPost.content.trim()) {
    ElMessage.warning(t('common.fillRequired'))
    return
  }
  posting.value = true
  setTimeout(() => {
    posts.value.unshift({
      id: Date.now(),
      author: userStore.isLoggedIn ? userStore.userInfo.name : t('common.explorer'),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
      title: newPost.title,
      content: newPost.content,
      likes: 0,
      replies: 0,
      time: new Date().toLocaleString('zh-CN'),
      type: activeTab.value || 'discussions',
      liked: false,
      showReply: false,
      replyText: ''
    })
    newPost.title = ''
    newPost.content = ''
    posting.value = false
    ElMessage.success(t('common.publishSuccess'))
  }, 500)
}

const toggleLike = (post) => {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

const toggleReply = (post) => {
  post.showReply = !post.showReply
}

const submitReply = (post) => {
  if (!post.replyText?.trim()) {
    ElMessage.warning(t('common.enterReply'))
    return
  }
  post.replies += 1
  post.replyText = ''
  post.showReply = false
  ElMessage.success(t('common.replySuccess'))
}

const sharePost = (post) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(`【${post.title}】${post.content.slice(0, 50)}...`)
  }
  ElMessage.success(t('common.copiedToClipboard'))
}
</script>

<style lang="scss" scoped>
.page-banner {
  background: linear-gradient(165deg, #F7FFF7 0%, #E8F5F0 100%);
  padding: 48px 0 32px;
  text-align: center;
  h1 { font-size: 28px; color: #1A535C; font-weight: 700; margin-bottom: 8px; }
  p { color: #636E72; font-size: 15px; }
}

.community-content {
  padding: 32px 0 48px;
}

.community-layout {
  display: flex;
  gap: 24px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
}

.community-main {
  flex: 1;
  min-width: 0;
}

.community-tabs {
  margin-bottom: 20px;
  :deep(.el-tabs__active-bar) { background-color: #1A535C; }
  :deep(.el-tabs__item.is-active) { color: #1A535C; }
}

/* 发帖区 */
.post-form {
  padding: 24px;
  margin-bottom: 20px;

  h3 { font-size: 16px; color: #1A535C; margin-bottom: 16px; }
  .post-title-input { margin-bottom: 12px; }
  .post-content-input { margin-bottom: 12px; }
  .post-actions { display: flex; justify-content: flex-end;
    .el-button:active { transform: scale(0.98); }
  }
}

/* 帖子列表 */
.post-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-card {
  padding: 24px;
}

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.post-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-info {
  display: flex;
  flex-direction: column;
  .author-name { font-size: 14px; font-weight: 600; color: #2D3436; }
  .post-time { font-size: 12px; color: #B2BEC3; }
}

.post-title {
  font-size: 17px;
  color: #2D3436;
  font-weight: 600;
  margin-bottom: 8px;
}

.post-content {
  font-size: 14px;
  color: #636E72;
  line-height: 1.7;
  margin-bottom: 16px;
}

.post-footer {
  display: flex;
  gap: 24px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  color: #B2BEC3;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover { color: #1A535C; background: rgba(26, 83, 92, 0.06); }
  &.liked { color: #FF6B6B; }
  &:active { transform: scale(0.98); }
}

.reply-section {
  margin-top: 12px;
}

.reply-input {
  display: flex;
  gap: 8px;
  margin-top: 12px;

  .el-button:active { transform: scale(0.98); }
}

/* 侧边栏 */
.community-sidebar {
  width: 300px;
  flex-shrink: 0;
}

.sidebar-card {
  padding: 20px;
  margin-bottom: 16px;

  h3 { font-size: 15px; color: #1A535C; margin-bottom: 16px; }
}

.hot-topics {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.topic-item {
  display: flex;
  align-items: center;
  gap: 10px;

  .topic-rank {
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    background: #F0F3F5;
    color: #636E72;

    &.hot { background: #FF6B6B; color: #fff; }
  }

  .topic-text {
    flex: 1;
    font-size: 13px;
    color: #2D3436;
    cursor: pointer;

    &:hover { color: #1A535C; }
  }
}

.active-users {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 10px;

  .user-info {
    display: flex;
    flex-direction: column;
    .user-name { font-size: 13px; color: #2D3436; font-weight: 500; }
    .user-posts { font-size: 11px; color: #B2BEC3; }
  }
}
</style>
