<template>
  <div class="products-page">
    <section class="page-banner">
      <div class="container">
        <h1 class="ethnic-header">{{ t('products.title') }}</h1>
        <p>{{ t('products.subtitle') }}</p>
      </div>
    </section>

    <div class="container products-content">
      <!-- 分类标签 -->
      <div class="category-tabs">
        <el-radio-group v-model="activeCategory" size="large">
          <el-radio-button label="">{{ t('products.categories.all') }}</el-radio-button>
          <el-radio-button v-for="cat in PRODUCT_CATEGORIES" :key="cat.value" :label="cat.value">
            {{ t(cat.labelKey) }}
          </el-radio-button>
        </el-radio-group>
      </div>

      <!-- 产品网格 -->
      <div class="products-grid">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card ethnic-card fade-in-up"
        >
          <div class="product-image">
            <img :src="product.image" :alt="l(product.name)" loading="lazy" @error="handleImgError" />
            <span :class="['ethnic-tag', `ethnic-tag--${product.ethnicity}`]" class="product-ethnic">
              {{ getEthnicLabel(product.ethnicity) }}
            </span>
          </div>
          <div class="product-body">
            <h3 class="text-ellipsis">{{ l(product.name) }}</h3>
            <p class="product-desc text-ellipsis-2">{{ l(product.description) }}</p>
            <div class="product-footer">
              <span class="product-price">¥{{ product.price }}</span>
              <el-button type="primary" size="small" round @click="addToCart(product)">
                <el-icon><ShoppingCart /></el-icon>
                {{ t('products.addToCart') }}
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <el-empty v-if="!filteredProducts.length" :description="t('common.noProductsInCategory')" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ShoppingCart } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { products } from '@/utils/mockData'
import { PRODUCT_CATEGORIES, ETHNICITIES } from '@/utils/constants'
import { useLocaleData } from '@/composables/useLocaleData'
import { onImgError, DEFAULT_PRODUCT } from '@/utils/defaultImage'

const { t } = useI18n()
const { l } = useLocaleData()
const activeCategory = ref('')

const filteredProducts = computed(() => {
  if (!activeCategory.value) return products
  return products.filter(p => p.category === activeCategory.value)
})

const getEthnicLabel = (val) => {
  const found = ETHNICITIES.find(e => e.value === val)
  return found ? t(found.labelKey) : val
}

const addToCart = (product) => {
  ElMessage.success(t('common.addedToCart'))
}

const handleImgError = (e) => onImgError(e, DEFAULT_PRODUCT)
</script>

<style lang="scss" scoped>
.page-banner {
  background: linear-gradient(165deg, #F7FFF7 0%, #E8F5F0 100%);
  padding: 48px 0 32px;
  text-align: center;
  h1 { font-size: 28px; color: #1A535C; font-weight: 700; margin-bottom: 8px; }
  p { color: #636E72; font-size: 15px; }
}

.products-content {
  padding: 32px 0 48px;
}

.category-tabs {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;

  :deep(.el-radio-group) {
    flex-wrap: wrap;
    justify-content: center;
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
}

.product-card {
  display: flex;
  flex-direction: column;
}

.product-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  background: #F0F3F5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .product-card:hover & img {
    transform: scale(1.05);
  }

  .product-ethnic {
    position: absolute;
    top: 10px;
    left: 10px;
  }
}

.product-body {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 15px;
    color: #2D3436;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .product-desc {
    font-size: 12px;
    color: #636E72;
    line-height: 1.5;
    margin-bottom: 12px;
  }
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;

  .product-price {
    font-size: 20px;
    font-weight: 700;
    color: #FF6B6B;
  }

  .el-button {
    &:active { transform: scale(0.98); }
  }
}
</style>
