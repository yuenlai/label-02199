<template>
  <div class="resource-page">
    <!-- 页面标题 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="ethnic-header">{{ t('resources.title') }}</h1>
        <p>{{ t('resources.subtitle') }}</p>
      </div>
    </section>

    <!-- 搜索筛选 -->
    <section class="container filter-section">
      <SearchFilter @search="handleSearch" @reset="handleReset" />
      <p class="result-count" v-if="filteredResources.length">
        {{ t('resources.total', { count: filteredResources.length }) }}
      </p>
    </section>

    <!-- 资源列表 -->
    <section class="container resource-list-section">
      <div v-if="filteredResources.length" class="resource-grid">
        <CultureCard
          v-for="item in paginatedResources"
          :key="item.id"
          :item="item"
          @click="goToDetail(item.id)"
        />
      </div>
      <el-empty v-else :description="t('resources.noData')" />

      <!-- 分页 -->
      <div class="pagination-wrap" v-if="filteredResources.length > pageSize">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="filteredResources.length"
          layout="prev, pager, next"
          background
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SearchFilter from '@/components/common/SearchFilter.vue'
import CultureCard from '@/components/common/CultureCard.vue'
import { culturalResources } from '@/utils/mockData'
import { useLocaleData } from '@/composables/useLocaleData'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { l } = useLocaleData()

const currentPage = ref(1)
const pageSize = 9
const filter = ref({ keyword: '', ethnicity: '', type: '', region: '' })

// 从URL query读取初始筛选
onMounted(() => {
  if (route.query.type) {
    filter.value.type = route.query.type
  }
  if (route.query.ethnicity) {
    filter.value.ethnicity = route.query.ethnicity
  }
})

const filteredResources = computed(() => {
  return culturalResources.filter(item => {
    const { keyword, ethnicity, type, region } = filter.value
    if (keyword) {
      const title = l(item.title)
      const desc = l(item.description)
      const tags = l(item.tags) || []
      if (!title.includes(keyword) && !desc.includes(keyword) && !tags.some(tag => tag.includes(keyword))) return false
    }
    if (ethnicity && item.ethnicity !== ethnicity) return false
    if (type && item.type !== type) return false
    if (region && !l(item.region).includes(region)) return false
    return true
  })
})

const paginatedResources = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredResources.value.slice(start, start + pageSize)
})

const handleSearch = (f) => {
  filter.value = { ...f }
  currentPage.value = 1
}

const handleReset = () => {
  filter.value = { keyword: '', ethnicity: '', type: '', region: '' }
  currentPage.value = 1
}

const goToDetail = (id) => {
  router.push(`/resources/${id}`)
}
</script>

<style lang="scss" scoped>
.page-banner {
  background: linear-gradient(165deg, #F7FFF7 0%, #E8F5F0 100%);
  padding: 48px 0 32px;
  text-align: center;

  h1 {
    font-size: 28px;
    color: #1A535C;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    color: #636E72;
    font-size: 15px;
  }
}

.filter-section {
  margin-top: -16px;
  position: relative;
  z-index: 1;
  padding-bottom: 8px;
}

.result-count {
  margin-top: 12px;
  font-size: 13px;
  color: #636E72;
}

.resource-list-section {
  padding: 16px 0 48px;
}

.resource-grid {
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

.pagination-wrap {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
</style>
