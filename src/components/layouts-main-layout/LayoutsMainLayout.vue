<template>
  <div class="app-layout">
    <!-- 頂部導航欄 -->
    <app-header :title="currentRouteTitle" />
    
    <!-- 主要內容 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- 底部標籤欄 -->
    <app-tab-bar v-if="showTabBar" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '@/components/common-app-header/CommonAppHeader.vue';
import AppTabBar from '@/components/common-app-tab-bar/CommonAppTabBar.vue';

const route = useRoute();

// 獲取當前路由的標題
const currentRouteTitle = computed(() => route.meta.title || '');

// 是否顯示底部標籤欄
const showTabBar = computed(() => route.meta.showTabBar || false);
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f7f8fa;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

/* 頁面切換動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
