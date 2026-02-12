<template>
  <div class="culture-card ethnic-card fade-in-up" @click="$emit('click', item)">
    <div class="card-cover">
      <img :src="item.cover" :alt="item.title" loading="lazy" @error="handleImgError" />
      <span class="card-type-badge">{{ typeLabel }}</span>
    </div>
    <div class="card-body">
      <h3 class="card-title text-ellipsis">{{ l(item.title) }}</h3>
      <p class="card-desc text-ellipsis-2">{{ l(item.description) }}</p>
      <div class="card-meta">
        <span :class="['ethnic-tag', `ethnic-tag--${item.ethnicity}`]">
          {{ ethnicLabel }}
        </span>
        <span class="card-region">
          <el-icon :size="12"><Location /></el-icon>
          {{ l(item.region) }}
        </span>
      </div>
      <div class="card-tags" v-if="localTags && localTags.length">
        <el-tag v-for="tag in localTags.slice(0, 3)" :key="tag" size="small" effect="plain" round>
          {{ tag }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Location } from '@element-plus/icons-vue'
import { ETHNICITIES, RESOURCE_TYPES } from '@/utils/constants'
import { useLocaleData } from '@/composables/useLocaleData'
import { onImgError, DEFAULT_COVER } from '@/utils/defaultImage'

const { t } = useI18n()
const { l } = useLocaleData()

const props = defineProps({
  item: { type: Object, required: true }
})

defineEmits(['click'])

const ethnicLabel = computed(() => {
  const found = ETHNICITIES.find(e => e.value === props.item.ethnicity)
  return found ? t(found.labelKey) : props.item.ethnicity
})

const typeLabel = computed(() => {
  const found = RESOURCE_TYPES.find(rt => rt.value === props.item.type)
  return found ? t(found.labelKey) : props.item.type
})

const localTags = computed(() => l(props.item.tags) || [])

const handleImgError = (e) => onImgError(e, DEFAULT_COVER)
</script>

<style lang="scss" scoped>
.culture-card {
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-cover {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: #F0F3F5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .culture-card:hover & img {
    transform: scale(1.05);
  }
}

.card-type-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 3px 10px;
  background: rgba(26, 83, 92, 0.85);
  color: #fff;
  font-size: 12px;
  border-radius: 12px;
  backdrop-filter: blur(4px);
}

.card-body {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #2D3436;
  margin: 0;
}

.card-desc {
  font-size: 13px;
  color: #636E72;
  line-height: 1.6;
  margin: 0;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding-top: 8px;
}

.card-region {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  color: #B2BEC3;
}

.card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  padding-top: 4px;

  .el-tag {
    --el-tag-border-color: #DFE6E9;
    --el-tag-text-color: #636E72;
    font-size: 11px;
  }
}
</style>
