import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: { title: '首頁', showTabBar: true, icon: 'home' }
      },
      {
        path: 'map',
        name: 'map',
        component: () => import('@/views/Map/index.vue'),
        meta: { title: '地圖', showTabBar: true, icon: 'map' }
      },
      {
        path: 'route-plan',
        name: 'route-plan',
        component: () => import('@/views/RoutePlan/index.vue'),
        meta: { title: '路線規劃', showTabBar: true, icon: 'route' }
      },
      {
        path: 'discover',
        name: 'discover',
        component: () => import('@/views/Discover.vue'),
        meta: { title: '發現', showTabBar: true, icon: 'compass' }
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/My/index.vue'),
        meta: { title: '我的', showTabBar: true, icon: 'user' }
      },
      // 其他頁面
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/Search/index.vue'),
        meta: { title: '搜索' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 設置頁面標題
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - 車來了`
  }
  next()
})

export default router
