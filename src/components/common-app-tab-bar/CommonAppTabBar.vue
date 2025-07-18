<template>
  <van-tabbar v-model="active" route safe-area-inset-bottom>
    <van-tabbar-item
      v-for="item in tabBars"
      :key="item.path"
      :to="item.path"
      :icon="item.icon"
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Tabbar, TabbarItem } from 'vant';

const route = useRoute();
const active = ref(0);

const tabBars = [
  {
    title: '首頁',
    path: '/home',
    icon: 'home-o',
    name: 'home'
  },
  {
    title: '地圖',
    path: '/map',
    icon: 'map-marked',
    name: 'map'
  },
  {
    title: '路線',
    path: '/route-plan',
    icon: 'guide-o',
    name: 'route-plan'
  },
  {
    title: '發現',
    path: '/discover',
    icon: 'compass-o',
    name: 'discover'
  },
  {
    title: '我的',
    path: '/my',
    icon: 'user-o',
    name: 'my'
  }
];

// 監聽路由變化，更新選中狀態
watch(() => route.path, (newPath) => {
  const index = tabBars.findIndex(item => item.path === newPath);
  if (index !== -1) {
    active.value = index;
  }
}, { immediate: true });
</script>

<style scoped>
:deep(.van-tabbar) {
  height: 50px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

:deep(.van-tabbar-item) {
  font-size: 10px;
}

:deep(.van-tabbar-item__icon) {
  font-size: 20px;
  margin-bottom: 2px;
}

:deep(.van-tabbar-item--active) {
  color: #1989fa;
}

/* 適配 iPhone X 等有劉海的手機 */
@supports (padding-bottom: constant(safe-area-inset-bottom)) {
  :deep(.van-tabbar) {
    padding-bottom: constant(safe-area-inset-bottom);
  }
}

@supports (padding-bottom: env(safe-area-inset-bottom)) {
  :deep(.van-tabbar) {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
