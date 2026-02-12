<template>
  <div class="inheritor-page">
    <section class="page-banner">
      <div class="container">
        <h1 class="ethnic-header">{{ t('inheritors.title') }}</h1>
        <p>{{ t('inheritors.subtitle') }}</p>
      </div>
    </section>

    <!-- 筛选 -->
    <div class="container filter-bar">
      <el-radio-group v-model="filterLevel" size="large">
        <el-radio-button label="">{{ t('common.all') }}</el-radio-button>
        <el-radio-button v-for="lv in INHERITOR_LEVELS" :key="lv.value" :label="lv.value">{{ t(lv.labelKey) }}</el-radio-button>
      </el-radio-group>
      <el-select v-model="filterEthnicity" :placeholder="t('resources.filter.ethnicity')" clearable size="large" style="width:150px">
        <el-option v-for="e in ETHNICITIES" :key="e.value" :label="t(e.labelKey)" :value="e.value" />
      </el-select>
    </div>

    <!-- 传承人列表 -->
    <div class="container inheritor-list">
      <div
        v-for="person in filteredInheritors"
        :key="person.id"
        class="inheritor-detail-card ethnic-card fade-in-up"
        @click="openDetail(person)"
      >
        <div class="card-left">
          <div class="avatar-wrap">
            <img :src="person.avatar" :alt="l(person.name)" @error="handleImgError" />
            <span class="level-dot" :style="{ background: getLevelColor(person.level) }"></span>
          </div>
          <span :class="['ethnic-tag', `ethnic-tag--${person.ethnicity}`]">{{ getEthnicLabel(person.ethnicity) }}</span>
        </div>
        <div class="card-right">
          <div class="card-header">
            <h3>{{ l(person.name) }}</h3>
            <el-tag size="small" :color="getLevelColor(person.level)" effect="dark" style="border:none;color:#fff">
              {{ getLevelLabel(person.level) }}
            </el-tag>
          </div>
          <p class="skill-name"><el-icon><Trophy /></el-icon>{{ l(person.skill) }}</p>
          <div class="card-meta-row">
            <span><el-icon><Location /></el-icon>{{ l(person.region) }}</span>
            <span><el-icon><Timer /></el-icon>{{ person.years }} {{ t('common.year') }}</span>
          </div>
          <p class="intro text-ellipsis-3">{{ l(person.intro) }}</p>
          <div class="works-preview" v-if="person.works?.length">
            <img
              v-for="(w, i) in person.works.slice(0, 3)"
              :key="i"
              :src="w.image"
              :alt="w.title"
              @error="handleImgError"
            />
          </div>
        </div>
      </div>

      <el-empty v-if="!filteredInheritors.length" :description="t('resources.noInheritors')" />
    </div>

    <!-- 详情弹窗 -->
    <el-dialog v-model="dialogVisible" :title="l(selectedPerson?.name)" width="680px" top="5vh" :lock-scroll="false">
      <div class="person-dialog" v-if="selectedPerson">
        <div class="dialog-top">
          <div class="dialog-avatar">
            <img :src="selectedPerson.avatar" :alt="l(selectedPerson.name)" @error="handleImgError" />
          </div>
          <div class="dialog-info">
            <el-tag size="small" :color="getLevelColor(selectedPerson.level)" effect="dark" style="border:none;color:#fff;margin-bottom:8px">
              {{ getLevelLabel(selectedPerson.level) }}
            </el-tag>
            <div class="info-grid">
              <div class="info-item">
                <label>{{ t('inheritors.info.ethnicity') }}</label>
                <span>{{ getEthnicLabel(selectedPerson.ethnicity) }}</span>
              </div>
              <div class="info-item">
                <label>{{ t('inheritors.info.skill') }}</label>
                <span>{{ l(selectedPerson.skill) }}</span>
              </div>
              <div class="info-item">
                <label>{{ t('inheritors.info.region') }}</label>
                <span>{{ l(selectedPerson.region) }}</span>
              </div>
              <div class="info-item">
                <label>{{ t('inheritors.info.years') }}</label>
                <span>{{ selectedPerson.years }} {{ t('common.year') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="silver-divider"></div>

        <div class="dialog-section">
          <h4 class="ethnic-title-decoration">{{ t('inheritors.info.intro') }}</h4>
          <p>{{ l(selectedPerson.intro) }}</p>
        </div>

        <div class="dialog-section" v-if="selectedPerson.works?.length">
          <h4 class="ethnic-title-decoration">{{ t('inheritors.info.works') }}</h4>
          <div class="works-grid">
            <div v-for="(w, i) in selectedPerson.works" :key="i" class="work-item">
              <img :src="w.image" :alt="l(w.title)" @error="handleImgError" />
              <span>{{ l(w.title) }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Location, Timer, Trophy } from '@element-plus/icons-vue'
import { inheritors } from '@/utils/mockData'
import { ETHNICITIES, INHERITOR_LEVELS } from '@/utils/constants'
import { useLocaleData } from '@/composables/useLocaleData'
import { onImgError, DEFAULT_AVATAR } from '@/utils/defaultImage'

const { t } = useI18n()
const { l } = useLocaleData()

const filterLevel = ref('')
const filterEthnicity = ref('')
const dialogVisible = ref(false)
const selectedPerson = ref(null)

const filteredInheritors = computed(() => {
  return inheritors.filter(p => {
    if (filterLevel.value && p.level !== filterLevel.value) return false
    if (filterEthnicity.value && p.ethnicity !== filterEthnicity.value) return false
    return true
  })
})

const getEthnicLabel = (val) => {
  const found = ETHNICITIES.find(e => e.value === val)
  return found ? t(found.labelKey) : val
}
const getLevelLabel = (val) => {
  const found = INHERITOR_LEVELS.find(l => l.value === val)
  return found ? t(found.labelKey) : val
}
const getLevelColor = (val) => INHERITOR_LEVELS.find(l => l.value === val)?.color || '#636E72'

const openDetail = (person) => {
  selectedPerson.value = person
  dialogVisible.value = true
}

const handleImgError = (e) => onImgError(e, DEFAULT_AVATAR)
</script>

<style lang="scss" scoped>
.page-banner {
  background: linear-gradient(165deg, #F7FFF7 0%, #E8F5F0 100%);
  padding: 48px 0 32px;
  text-align: center;
  h1 { font-size: 28px; color: #1A535C; font-weight: 700; margin-bottom: 8px; }
  p { color: #636E72; font-size: 15px; }
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 0 8px;
  flex-wrap: wrap;
}

.inheritor-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 48px;
}

.inheritor-detail-card {
  display: flex;
  gap: 24px;
  padding: 24px;
  cursor: pointer;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.card-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.avatar-wrap {
  position: relative;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #DFE6E9;

  img { width: 100%; height: 100%; object-fit: cover; }

  .level-dot {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
}

.card-right {
  flex: 1;
  min-width: 0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;

  h3 { font-size: 18px; color: #2D3436; margin: 0; }
}

.skill-name {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #1A535C;
  font-weight: 500;
  margin-bottom: 8px;
}

.card-meta-row {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  flex-wrap: wrap;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #636E72;
  }
}

.intro {
  font-size: 14px;
  color: #636E72;
  line-height: 1.6;
  margin-bottom: 12px;
}

.works-preview {
  display: flex;
  gap: 8px;

  img {
    width: 72px;
    height: 54px;
    border-radius: 6px;
    object-fit: cover;
  }
}

/* 弹窗样式 */
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
