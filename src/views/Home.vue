<template>
  <div class="home p-4">
    <h1 class="text-2xl font-bold mb-6">車來了設計系統</h1>
    
    <!-- 定位狀態卡片 -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-3">定位狀態卡片</h2>
      <div class="space-y-4">
        <GeoStatusCard 
          title="當前位置" 
          status="success" 
          statusText="已成功定位到您的位置"
          :show-action="true"
          @action="handleLocationAction"
        />
        
        <GeoStatusCard 
          title="定位中..." 
          status="loading" 
          statusText="正在獲取精確位置"
          class="mt-4"
        />
        
        <GeoStatusCard 
          title="定位失敗" 
          status="error" 
          statusText="無法獲取位置信息"
          :show-action="true"
          action-text="重試"
          class="mt-4"
          @action="handleRetry"
        />
      </div>
    </div>
    
    <div class="mt-8">
      <van-button type="primary" block to="/about">前往關於頁面</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import GeoStatusCard from '@/components/geo-status-card/GeoStatusCard.vue';

const handleLocationAction = () => {
  showToast('查看位置詳情');
};

const handleRetry = () => {
  showToast('正在重新獲取位置...');
};
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
}

.van-button {
  margin-top: 20px;
}
</style>
