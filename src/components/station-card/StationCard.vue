<script setup lang="ts">
import { Button } from '../button';
import type { StationCardProps } from './useStationCard';
import { useStationCard } from './useStationCard';

const props = withDefaults(defineProps<StationCardProps>(), {
  distance: undefined,
  busList: () => [],
  actionText: undefined,
});

const emit = defineEmits<{
  /** 使用者點擊操作按鈕 */
  action: [];
}>();

const { hasDistance, isEmpty, rootClass, buses, emptyText } = useStationCard({
  get distance() {
    return props.distance;
  },
  get busList() {
    return props.busList;
  },
});
</script>

<template>
  <div :class="rootClass">
    <div class="cl-station-card__header">
      <h3 class="cl-station-card__name">{{ stationName }}</h3>
      <!-- 空值占位由父層負責：沒給 distance 就不渲染，元件不自己補 -- -->
      <span v-if="hasDistance" class="cl-station-card__distance"><i class="cl-icon ri-map-pin-line" aria-hidden="true" />{{ distance }}</span>
    </div>

    <p v-if="isEmpty" class="cl-station-card__empty">{{ emptyText }}</p>
    <ul v-else class="cl-station-card__list">
      <li v-for="bus in buses" :key="bus.key" :class="bus.className">
        <span class="cl-station-card__route">{{ bus.routeName }}</span>
        <span class="cl-station-card__time">{{ bus.timeText }}</span>
      </li>
    </ul>

    <div v-if="actionText" class="cl-station-card__footer">
      <Button variant="secondary" size="sm" round @click="emit('action')">{{ actionText }}</Button>
    </div>
  </div>
</template>

<!-- 不用 scoped：class 命名走 BEM，與 React 版共用同一套 cl-* 選擇器 -->
<style>
.cl-station-card {
  display: flex;
  flex-direction: column;
  gap: var(--cl-space-sm);
  padding: var(--cl-space-md);
  background: var(--cl-card-background);
  border-radius: var(--cl-radius-card);
  box-shadow: var(--cl-shadow-card);
  font-family: var(--cl-font-family);
  color: var(--cl-text);
}

.cl-station-card__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--cl-space-sm);
}

.cl-station-card__name {
  margin: 0;
  min-width: 0;
  font-size: var(--cl-font-size-subtitle);
  line-height: var(--cl-line-height-subtitle);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cl-station-card__distance {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: var(--cl-font-size-caption);
  line-height: var(--cl-line-height-caption);
  color: var(--cl-text-secondary);
}

.cl-station-card__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.cl-station-card__bus {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--cl-space-sm);
  padding: var(--cl-space-sm) 0;
  border-top: 1px solid var(--cl-border);
  font-size: var(--cl-font-size-body);
  line-height: var(--cl-line-height-body);
}

.cl-station-card__route {
  min-width: 0;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cl-station-card__time {
  flex-shrink: 0;
  color: var(--cl-text-secondary);
}

/* 即將進站：時間用品牌色強調，讓使用者一眼掃到 */
.cl-station-card__bus.is-arriving .cl-station-card__time {
  color: var(--cl-primary);
  font-weight: 600;
}

.cl-station-card__empty {
  margin: 0;
  padding: var(--cl-space-md) 0;
  text-align: center;
  font-size: var(--cl-font-size-body);
  line-height: var(--cl-line-height-body);
  color: var(--cl-text-secondary);
}

.cl-station-card__footer {
  display: flex;
  justify-content: flex-end;
  padding-top: var(--cl-space-xs);
}
</style>
