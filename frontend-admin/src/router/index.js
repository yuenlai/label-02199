import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/layout/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomePage.vue'),
        meta: { title: '首页 - 文化遗产总览' }
      },
      {
        path: '/resources',
        name: 'Resources',
        component: () => import('@/views/ResourceClassification.vue'),
        meta: { title: '资源分类' }
      },
      {
        path: '/resources/:id',
        name: 'ResourceDetail',
        component: () => import('@/views/ResourceDetail.vue'),
        meta: { title: '资源详情' }
      },
      {
        path: '/virtual-tour',
        name: 'VirtualTour',
        component: () => import('@/views/VirtualTour.vue'),
        meta: { title: '3D虚拟漫游' }
      },
      {
        path: '/inheritors',
        name: 'Inheritors',
        component: () => import('@/views/InheritorDisplay.vue'),
        meta: { title: '非遗传承人' }
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('@/views/CulturalProducts.vue'),
        meta: { title: '文创产品' }
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
        meta: { title: '页面未找到' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

// 设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? `${to.meta.title} | 广西少数民族文化遗产平台`
    : '广西少数民族文化遗产数字化保护与展示平台'
  next()
})

export default router
