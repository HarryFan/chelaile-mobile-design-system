<script setup lang="ts">
/**
 * Demo 頁章節容器，對應 React 版 `demo/App.tsx` 的 `Section`。
 * props、class、標籤層級逐字相同。
 */
defineProps<{
  index: string;
  title: string;
  lede: string;
  id: string;
}>();
</script>

<template>
  <section class="demo-section demo-container" :id="id">
    <div class="demo-section__head">
      <div>
        <div class="demo-section__index">{{ index }}</div>
        <h2>{{ title }}</h2>
        <p>{{ lede }}</p>
      </div>
    </div>
    <slot />
  </section>
</template>
