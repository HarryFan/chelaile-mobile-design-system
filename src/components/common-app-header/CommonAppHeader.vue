<template>
  <header class="app-header">
    <div class="header-content">
      <!-- 返回按鈕 -->
      <van-icon 
        v-if="showBack" 
        name="arrow-left" 
        class="back-icon" 
        @click="handleBack"
      />
      
      <!-- 標題 -->
      <h1 class="title">{{ title }}</h1>
      
      <!-- 右側操作區 -->
      <div class="right-actions">
        <slot name="right">
          <!-- 默認右側內容 -->
          <van-icon 
            v-if="showSearch" 
            name="search" 
            class="action-icon"
            @click="handleSearch"
          />
        </slot>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Icon as VanIcon } from 'vant';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  showBack: {
    type: Boolean,
    default: true
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  backUrl: {
    type: String,
    default: ''
  }
});

const router = useRouter();

const handleBack = () => {
  if (props.backUrl) {
    router.push(props.backUrl);
  } else {
    router.go(-1);
  }
};

const handleSearch = () => {
  router.push('/search');
};
</script>

<style scoped>
.app-header {
  position: relative;
  height: 46px;
  background-color: #1989fa;
  color: #fff;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 12px;
  box-sizing: border-box;
}

.back-icon,
.action-icon {
  font-size: 20px;
  color: #fff;
  padding: 8px;
}

.title {
  flex: 1;
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 8px;
}

.right-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 44px;
}
</style>
