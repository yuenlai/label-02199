<template>
  <div class="search-filter">
    <div class="filter-row">
      <el-input
        v-model="localFilter.keyword"
        :placeholder="t('resources.filter.keyword')"
        clearable
        prefix-icon="Search"
        size="large"
        class="filter-keyword"
        @keyup.enter="handleSearch"
      />
      <el-select
        v-model="localFilter.ethnicity"
        :placeholder="t('resources.filter.ethnicity')"
        clearable
        size="large"
        class="filter-select"
      >
        <el-option
          v-for="item in ethnicOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="localFilter.type"
        :placeholder="t('resources.filter.type')"
        clearable
        size="large"
        class="filter-select"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="localFilter.region"
        :placeholder="t('resources.filter.region')"
        clearable
        size="large"
        class="filter-select"
      >
        <el-option
          v-for="item in regionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="filter-actions">
      <el-button type="primary" size="large" @click="handleSearch">
        <el-icon><Search /></el-icon>
        {{ t('resources.filter.search') }}
      </el-button>
      <el-button size="large" @click="handleReset">
        <el-icon><Refresh /></el-icon>
        {{ t('resources.filter.reset') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search, Refresh } from '@element-plus/icons-vue'
import { ETHNICITIES, RESOURCE_TYPES, REGIONS } from '@/utils/constants'

const { t } = useI18n()

const emit = defineEmits(['search', 'reset'])

const localFilter = reactive({
  keyword: '',
  ethnicity: '',
  type: '',
  region: ''
})

const ethnicOptions = computed(() => ETHNICITIES.map(e => ({ value: e.value, label: t(e.labelKey) })))
const typeOptions = computed(() => RESOURCE_TYPES.map(rt => ({ value: rt.value, label: t(rt.labelKey) })))
const regionOptions = computed(() => REGIONS.map(r => ({ value: r.value, label: t(r.labelKey) })))

const handleSearch = () => {
  emit('search', { ...localFilter })
}

const handleReset = () => {
  localFilter.keyword = ''
  localFilter.ethnicity = ''
  localFilter.type = ''
  localFilter.region = ''
  emit('reset')
}
</script>

<style lang="scss" scoped>
.search-filter {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(26, 83, 92, 0.08);
  border: 1px solid #DFE6E9;
}

.filter-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  .filter-keyword {
    flex: 2;
    min-width: 200px;
  }

  .filter-select {
    flex: 1;
    min-width: 160px;
  }
}

.filter-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  justify-content: flex-end;

  .el-button {
    &:active {
      transform: scale(0.98);
    }
  }
}

@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
  }

  .filter-actions {
    justify-content: stretch;

    .el-button {
      flex: 1;
    }
  }
}
</style>
