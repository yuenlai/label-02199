<template>
  <div class="home-page">
    <!-- Hero Banner -->
    <section class="hero-section">
      <div class="hero-bg">
        <div class="hero-pattern"></div>
      </div>
      <div class="hero-content container">
        <div class="hero-text fade-in-up">
          <h1>
            <span class="hero-title-main">{{ t('home.banner.title') }}</span>
            <span class="hero-title-sub">{{ t('home.banner.subtitle') }}</span>
          </h1>
          <p class="hero-desc">{{ t('home.banner.desc') }}</p>
          <div class="hero-actions">
            <el-button type="primary" size="large" round @click="router.push('/resources')">
              <el-icon><Search /></el-icon>
              {{ t('home.banner.explore') }}
            </el-button>
            <el-button size="large" round class="btn-outline-hero" @click="router.push('/virtual-tour')">
              <el-icon><View /></el-icon>
              {{ t('home.banner.tour') }}
            </el-button>
          </div>
        </div>
        <div class="hero-illustration fade-in-right">
          <EthnicIcons name="bronze-drum" :size="180" color="#1A535C" />
        </div>
      </div>
      <!-- 数据统计 -->
      <div class="hero-stats container">
        <div v-for="(item, key) in statsDisplay" :key="key" class="stat-item fade-in-up">
          <span class="stat-number number-roll">{{ item.value }}</span>
          <span class="stat-label">{{ t(`home.stats.${key}`) }}</span>
        </div>
      </div>
    </section>

    <!-- 资源分类 -->
    <section class="page-section">
      <div class="container">
        <div class="section-title">
          <h2>{{ t('home.sections.categories') }}</h2>
          <p>{{ t('home.sections.categoriesDesc') }}</p>
        </div>
        <div class="category-grid">
          <div
            v-for="cat in categories"
            :key="cat.key"
            class="category-item ethnic-card fade-in-up"
            @click="goToResources(cat.type)"
          >
            <div class="category-icon">
              <EthnicIcons :name="cat.icon" :size="52" :color="cat.color" />
            </div>
            <h3>{{ t(`home.categories.${cat.key}`) }}</h3>
            <p>{{ t(`home.categories.${cat.key}Desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 精选文化遗产 -->
    <section class="page-section page-section--alt">
      <div class="container">
        <div class="section-title">
          <h2>{{ t('home.sections.featured') }}</h2>
          <p>{{ t('home.sections.featuredDesc') }}</p>
        </div>
        <div class="featured-grid">
          <CultureCard
            v-for="item in featuredResources"
            :key="item.id"
            :item="item"
            @click="goToDetail(item.id)"
          />
        </div>
        <div class="section-more">
          <el-button type="primary" plain round @click="router.push('/resources')">
            {{ t('home.sections.viewAll') }}
            <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </section>

    <!-- 非遗传承人 -->
    <section class="page-section">
      <div class="container">
        <div class="section-title">
          <h2>{{ t('home.sections.inheritors') }}</h2>
          <p>{{ t('home.sections.inheritorsDesc') }}</p>
        </div>
        <div class="inheritor-list">
          <div
            v-for="person in featuredInheritors"
            :key="person.id"
            class="inheritor-card ethnic-card fade-in-up"
            @click="openInheritorDetail(person)"
          >
            <div class="inheritor-avatar">
              <img :src="person.avatar" :alt="l(person.name)" loading="lazy" @error="handleAvatarError" />
            </div>
            <div class="inheritor-info">
              <h4>{{ l(person.name) }}</h4>
              <p class="inheritor-skill">{{ l(person.skill) }}</p>
              <div class="inheritor-meta">
                <span :class="['ethnic-tag', `ethnic-tag--${person.ethnicity}`]">
                  {{ getEthnicLabel(person.ethnicity) }}
                </span>
                <span class="level-badge" :style="{ color: getLevelColor(person.level) }">
                  {{ getLevelLabel(person.level) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="section-more">
          <el-button type="primary" plain round @click="router.push('/inheritors')">
            {{ t('home.sections.viewMore') }}
            <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </section>

    <!-- 传承人详情弹窗 -->
    <el-dialog v-model="inheritorDialogVisible" :title="l(selectedInheritor?.name)" width="680px" top="5vh" :lock-scroll="false">
      <div class="person-dialog" v-if="selectedInheritor">
        <div class="dialog-top">
          <div class="dialog-avatar">
            <img :src="selectedInheritor.avatar" :alt="l(selectedInheritor.name)" @error="handleAvatarError" />
          </div>
          <div class="dialog-info">
            <el-tag size="small" :color="getLevelColor(selectedInheritor.level)" effect="dark" style="border:none;color:#fff;margin-bottom:8px">
              {{ getLevelLabel(selectedInheritor.level) }}
            </el-tag>
            <div class="info-grid">
              <div class="info-item">
                <label>{{ t('inheritors.info.ethnicity') }}</label>
                <span>{{ getEthnicLabel(selectedInheritor.ethnicity) }}</span>
              </div>
              <div class="info-item">
                <label>{{ t('inheritors.info.skill') }}</label>
                <span>{{ l(selectedInheritor.skill) }}</span>
              </div>
              <div class="info-item">
                <label>{{ t('inheritors.info.region') }}</label>
                <span>{{ l(selectedInheritor.region) }}</span>
              </div>
              <div class="info-item">
                <label>{{ t('inheritors.info.years') }}</label>
                <span>{{ selectedInheritor.years }} {{ t('common.year') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="silver-divider"></div>

        <div class="dialog-section">
          <h4 class="ethnic-title-decoration">{{ t('inheritors.info.intro') }}</h4>
          <p>{{ l(selectedInheritor.intro) }}</p>
        </div>

        <div class="dialog-section" v-if="selectedInheritor.works?.length">
          <h4 class="ethnic-title-decoration">{{ t('inheritors.info.works') }}</h4>
          <div class="works-grid">
            <div v-for="(w, i) in selectedInheritor.works" :key="i" class="work-item">
              <img :src="w.image" :alt="l(w.title)" @error="handleWorkError" />
              <span>{{ l(w.title) }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 虚拟漫游入口 -->
    <section class="page-section tour-section">
      <div class="container">
        <div class="tour-entry">
          <div class="tour-text fade-in-left">
            <h2>{{ t('home.sections.tour') }}</h2>
            <p>{{ t('home.sections.tourDesc') }}</p>
            <el-button type="primary" size="large" round @click="router.push('/virtual-tour')">
              <el-icon><View /></el-icon>
              {{ t('home.sections.tourStart') }}
            </el-button>
          </div>
          <div class="tour-preview fade-in-right">
            <div class="tour-card" v-for="scene in tourScenes" :key="scene.id" @click="router.push('/virtual-tour')">
              <img :src="scene.cover" :alt="l(scene.name)" loading="lazy" @error="handleImgError" />
              <div class="tour-card-overlay">
                <span>{{ l(scene.name) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Search, View, ArrowRight } from '@element-plus/icons-vue'
import CultureCard from '@/components/common/CultureCard.vue'
import EthnicIcons from '@/components/icons/EthnicIcons.vue'
import { culturalResources, inheritors, tourScenes, heroStats } from '@/utils/mockData'
import { ETHNICITIES, INHERITOR_LEVELS } from '@/utils/constants'
import { useLocaleData } from '@/composables/useLocaleData'
import { onImgError, DEFAULT_AVATAR, DEFAULT_SCENE, DEFAULT_WORK } from '@/utils/defaultImage'

const router = useRouter()
const { t, locale } = useI18n()
const { l } = useLocaleData()

const statsDisplay = computed(() => ({
  resources: { value: heroStats.resources.toLocaleString() },
  inheritors: { value: heroStats.inheritors.toLocaleString() },
  ethnicGroups: { value: heroStats.ethnicGroups },
  visits: { value: (heroStats.visits / 10000).toFixed(1) + (locale.value === 'en' ? 'w' : '万') }
}))

const categories = [
  { key: 'ancientBooks', type: 'ancientBooks', icon: 'bronze-drum', color: '#1A535C' },
  { key: 'skills', type: 'skills', icon: 'embroidered-ball', color: '#FF6B6B' },
  { key: 'folklore', type: 'folklore', icon: 'wind-rain-bridge', color: '#4ECDC4' },
  { key: 'music', type: 'music', icon: 'drum-tower', color: '#C5A100' }
]

const featuredResources = computed(() => culturalResources.slice(0, 6))
const featuredInheritors = computed(() => inheritors.slice(0, 4))

const inheritorDialogVisible = ref(false)
const selectedInheritor = ref(null)

const openInheritorDetail = (person) => {
  selectedInheritor.value = person
  inheritorDialogVisible.value = true
}

const getEthnicLabel = (val) => {
  const found = ETHNICITIES.find(e => e.value === val)
  return found ? t(found.labelKey) : val
}
const getLevelLabel = (val) => {
  const found = INHERITOR_LEVELS.find(l => l.value === val)
  return found ? t(found.labelKey) : val
}
const getLevelColor = (val) => INHERITOR_LEVELS.find(l => l.value === val)?.color || '#636E72'

const goToResources = (type) => router.push({ path: '/resources', query: { type } })
const goToDetail = (id) => router.push(`/resources/${id}`)

const handleAvatarError = (e) => onImgError(e, DEFAULT_AVATAR)
const handleImgError = (e) => onImgError(e, DEFAULT_SCENE)
const handleWorkError = (e) => onImgError(e, DEFAULT_WORK)
</script>

<style lang="scss" scoped>
/* ===== Hero Section ===== */
.hero-section {
  position: relative;
  padding: 80px 0 40px;
  background: linear-gradient(165deg, #F7FFF7 0%, #E8F5F0 50%, #F0F3F5 100%);
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-pattern {
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  opacity: 0.03;
  background-image:
    linear-gradient(45deg, #1A535C 25%, transparent 25%),
    linear-gradient(-45deg, #1A535C 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #1A535C 75%),
    linear-gradient(-45deg, transparent 75%, #1A535C 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
}

.hero-text {
  flex: 1;

  h1 {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
  }

  .hero-title-main {
    font-size: 38px;
    font-weight: 700;
    color: #1A535C;
    line-height: 1.2;
  }

  .hero-title-sub {
    font-size: 28px;
    font-weight: 600;
    color: #FF6B6B;
    line-height: 1.3;
  }

  .hero-desc {
    font-size: 16px;
    color: #636E72;
    line-height: 1.8;
    margin-bottom: 32px;
    max-width: 480px;
  }
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  .el-button {
    padding: 12px 28px;
    font-size: 15px;

    &:active {
      transform: scale(0.98);
    }
  }

  .btn-outline-hero {
    color: #1A535C;
    border-color: #1A535C;

    &:hover {
      background: #1A535C;
      color: #fff;
    }
  }
}

.hero-illustration {
  flex-shrink: 0;
  opacity: 0.15;

  @media (max-width: 768px) {
    display: none;
  }
}

/* ===== Stats ===== */
.hero-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-top: 48px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  backdrop-filter: blur(4px);
  min-width: 120px;

  .stat-number {
    display: block;
    font-size: 28px;
    font-weight: 700;
    color: #1A535C;
    line-height: 1.2;
  }

  .stat-label {
    display: block;
    font-size: 13px;
    color: #636E72;
    margin-top: 4px;
  }
}

/* ===== Category Grid ===== */
.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
}

.category-item {
  padding: 32px 24px;
  text-align: center;
  cursor: pointer;

  .category-icon {
    margin-bottom: 16px;
  }

  h3 {
    font-size: 18px;
    color: #2D3436;
    margin-bottom: 8px;
  }

  p {
    font-size: 13px;
    color: #636E72;
    line-height: 1.6;
  }
}

/* ===== Featured Grid ===== */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
}

.section-more {
  text-align: center;
  margin-top: 32px;

  .el-button:active {
    transform: scale(0.98);
  }
}

/* ===== Inheritor List ===== */
.inheritor-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
}

.inheritor-card {
  padding: 24px;
  text-align: center;
  cursor: pointer;
}

.inheritor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 16px;
  border: 3px solid #DFE6E9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.inheritor-info {
  h4 {
    font-size: 16px;
    color: #2D3436;
    margin-bottom: 4px;
  }

  .inheritor-skill {
    font-size: 13px;
    color: #636E72;
    margin-bottom: 10px;
  }

  .inheritor-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .level-badge {
    font-size: 12px;
    font-weight: 500;
  }
}

/* ===== Tour Section ===== */
.tour-section {
  background: linear-gradient(175deg, #F0F3F5 0%, #E8F5F0 100%);
}

.tour-entry {
  display: flex;
  align-items: center;
  gap: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
}

.tour-text {
  flex: 1;

  h2 {
    font-size: 28px;
    color: #1A535C;
    margin-bottom: 16px;
  }

  p {
    font-size: 15px;
    color: #636E72;
    line-height: 1.8;
    margin-bottom: 24px;
  }

  .el-button:active {
    transform: scale(0.98);
  }
}

.tour-preview {
  display: flex;
  gap: 16px;
  flex-shrink: 0;
}

.tour-card {
  width: 220px;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .tour-card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 14px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
    color: #fff;
    font-size: 14px;
    font-weight: 500;
  }

  @media (max-width: 576px) {
    width: 160px;
    height: 120px;
  }
}

/* ===== 传承人详情弹窗 ===== */
.dialog-top {
  display: flex;
  gap: 24px;

  @media (max-width: 576px) { flex-direction: column; align-items: center; }
}

.dialog-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid #DFE6E9;
  img { width: 100%; height: 100%; object-fit: cover; }
}

.dialog-info { flex: 1; }

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.info-item {
  label { display: block; font-size: 12px; color: #B2BEC3; margin-bottom: 2px; }
  span { font-size: 14px; color: #2D3436; font-weight: 500; }
}

.dialog-section {
  margin-top: 20px;
  h4 { font-size: 16px; color: #1A535C; margin-bottom: 12px; }
  p { font-size: 14px; color: #2D3436; line-height: 1.8; }
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 576px) { grid-template-columns: repeat(2, 1fr); }
}

.work-item {
  img { width: 100%; aspect-ratio: 3/2; object-fit: cover; border-radius: 8px; }
  span { display: block; font-size: 12px; color: #636E72; margin-top: 6px; text-align: center; }
}
</style>
