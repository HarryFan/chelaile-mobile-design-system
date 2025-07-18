<template>
  <div class="station-card">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-medium">{{ stationName }}</h3>
      <div class="text-sm text-text-secondary">
        <van-icon name="location" class="mr-1" />
        <span>{{ distance }}</span>
      </div>
    </div>
    
    <div class="bus-list">
      <div 
        v-for="bus in busList" 
        :key="bus.routeId" 
        class="bus-tag" 
        :class="{ 'bus-tag--highlighted': bus.isArriving }"
      >
        <span class="bus-route">{{ bus.routeName }}</span>
        <span v-if="bus.arrivalTime" class="bus-time">
          {{ bus.arrivalTime }}
        </span>
        <van-loading v-else size="16" type="spinner" class="ml-2" />
      </div>
    </div>
    
    <div v-if="showAction" class="mt-3 flex justify-end">
      <van-button 
        size="small" 
        plain 
        type="primary" 
        @click="$emit('action')"
      >
        {{ actionText }}
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon, Button, Loading } from 'vant';

// Fix TypeScript errors by importing App type from vue
import type { App } from 'vue';

// Fix TypeScript errors by importing nextTick from vue
import { nextTick } from 'vue';

export interface BusInfo {
  routeId: string;
  routeName: string;
  arrivalTime?: string;
  isArriving?: boolean;
}

const props = defineProps({
  stationName: {
    type: String,
    required: true
  },
  distance: {
    type: String,
    default: ''
  },
  busList: {
    type: Array as () => BusInfo[],
    default: () => []
  },
  showAction: {
    type: Boolean,
    default: false
  },
  actionText: {
    type: String,
    default: '查看詳情'
  }
});

const emit = defineEmits(['action']);
</script>

<style scoped>
.station-card {
  @apply bg-white dark:bg-gray-800 rounded-card p-4 shadow-sm;
}

.bus-list {
  @apply flex flex-wrap gap-2;
}

.bus-tag {
  @apply flex items-center px-3 py-1.5 rounded-full text-sm 
         bg-gray-100 dark:bg-gray-700 text-text-primary 
         transition-colors;
}

.bus-tag--highlighted {
  @apply bg-primary bg-opacity-10 text-primary dark:bg-opacity-20;
}

.bus-route {
  @apply font-medium;
}

.bus-time {
  @apply ml-2 text-xs text-text-secondary;
}
</style>
