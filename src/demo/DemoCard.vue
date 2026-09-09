<script setup lang="ts">
/**
 * Demo 頁元件卡片，對應 React 版 `demo/App.tsx` 的 `Card`。
 * React 的 `note` prop（ReactNode）在這裡是具名 slot `note`。
 */
withDefaults(
  defineProps<{
    title: string;
    icon: string;
    tag?: string;
    span?: 4 | 6 | 8 | 12;
  }>(),
  { tag: undefined, span: 6 },
);
</script>

<template>
  <article :class="`demo-card demo-card--${span}`">
    <div class="demo-card__head">
      <h3 class="demo-card__title"><i :class="icon" aria-hidden="true" />{{ title }}</h3>
      <span v-if="tag" class="demo-card__tag">{{ tag }}</span>
    </div>
    <p v-if="$slots.note" class="demo-card__note"><slot name="note" /></p>
    <div class="demo-card__body"><slot /></div>
  </article>
</template>
