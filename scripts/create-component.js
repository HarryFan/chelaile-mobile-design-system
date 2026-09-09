#!/usr/bin/env node
/**
 * 元件腳手架（Vue 版，與 React 版 scripts/create-component.mjs 對齊）。
 *
 * 這支腳本存在的理由：規範寫在文件裡沒有人會照做，寫成生成器就沒有選擇。
 * 每個元件強制產出五個檔案——元件、composable、story、測試、出口，
 * 少寫哪一個都會在 code review 被看見。
 *
 * 用法：npm run create:component -- status-banner
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const input = process.argv[2];
if (!input) {
  console.error('請提供元件名稱，例如：npm run create:component -- status-banner');
  process.exit(1);
}

const toPascal = (s) =>
  s
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (_, c) => c.toUpperCase());

const toKebab = (s) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

const Pascal = toPascal(input);
const kebab = toKebab(Pascal);
const dir = join(ROOT, 'src', 'components', kebab);

if (existsSync(dir)) {
  console.error(`元件已存在：src/components/${kebab}`);
  process.exit(1);
}

const files = {
  [`${Pascal}.vue`]: `<script setup lang="ts">
import type { ${Pascal}Props } from './use${Pascal}';
import { use${Pascal} } from './use${Pascal}';

const props = withDefaults(defineProps<${Pascal}Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  /** 使用者點擊元件本體 */
  action: [];
}>();

const { rootClass } = use${Pascal}(props);

const onClick = () => {
  if (props.disabled) return;
  emit('action');
};
</script>

<template>
  <div :class="rootClass" @click="onClick">
    <span class="cl-${kebab}__title">{{ title }}</span>
  </div>
</template>

<!-- 不用 scoped：class 命名走 BEM，與 React 版共用同一套 cl-* 選擇器 -->
<style>
.cl-${kebab} {
  font-family: var(--cl-font-family);
  color: var(--cl-text);
}

.cl-${kebab}__title {
  font-size: var(--cl-font-size-body);
  line-height: var(--cl-line-height-body);
}

.cl-${kebab}.is-disabled {
  color: var(--cl-text-placeholder);
  pointer-events: none;
}
</style>
`,

  [`use${Pascal}.ts`]: `import { computed, type ComputedRef } from 'vue';

export interface ${Pascal}Props {
  /** TODO: 定義 props。空值占位由父層負責，元件不自己補 '--'。 */
  title: string;
  /** 停用狀態，root 會加上 is-disabled */
  disabled?: boolean;
}

export interface Use${Pascal}Options {
  disabled?: boolean;
}

export interface Use${Pascal}Return {
  rootClass: ComputedRef<string[]>;
}

/**
 * ${Pascal} 的行為與樣式推導。
 *
 * 邏輯放這裡、畫面放 .vue：同一份行為要被第二個元件用到時才不必複製。
 */
export function use${Pascal}(options: Use${Pascal}Options = {}): Use${Pascal}Return {
  const rootClass = computed(() => [
    'cl-${kebab}',
    ...(options.disabled ? ['is-disabled'] : []),
  ]);

  return { rootClass };
}
`,

  [`${Pascal}.stories.ts`]: `import type { Meta, StoryObj } from '@storybook/vue3';
import ${Pascal} from './${Pascal}.vue';

const meta = {
  title: 'Basic/${Pascal}',
  component: ${Pascal},
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { title: '${Pascal}', disabled: false },
} satisfies Meta<typeof ${Pascal}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 預設: Story = {};

export const 停用: Story = {
  args: { disabled: true },
};
`,

  [`__tests__/${Pascal}.test.ts`]: `import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ${Pascal} from '../${Pascal}.vue';

describe('${Pascal}', () => {
  it('渲染標題', () => {
    const wrapper = mount(${Pascal}, { props: { title: '測試' } });
    expect(wrapper.text()).toContain('測試');
  });

  // TODO: 補上行為測試
  // 只有 render 測試等於沒測，改壞了也不會紅。每元件至少 4 個行為測試。
});
`,

  'index.ts': `import type { App } from 'vue';
import ${Pascal} from './${Pascal}.vue';

export { ${Pascal} };
export type { ${Pascal}Props, Use${Pascal}Options, Use${Pascal}Return } from './use${Pascal}';
export { use${Pascal} } from './use${Pascal}';

export default {
  install(app: App) {
    app.component('${Pascal}', ${Pascal});
  },
};
`,
};

await mkdir(join(dir, '__tests__'), { recursive: true });

for (const [name, content] of Object.entries(files)) {
  await writeFile(join(dir, name), content, 'utf8');
}

// 自動掛到套件出口，少一個「忘了 export」的常見疏漏
const entryPath = join(ROOT, 'src', 'components', 'index.ts');
const entry = await readFile(entryPath, 'utf8');
const addition = `\nexport { ${Pascal} } from './${kebab}';\nexport type { ${Pascal}Props } from './${kebab}';\n`;
await writeFile(entryPath, entry.trimEnd() + '\n' + addition, 'utf8');

console.log(`已建立 src/components/${kebab}/`);
console.log(Object.keys(files).map((f) => `  ${f}`).join('\n'));
console.log('已更新 src/components/index.ts');
