#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 獲取組件名稱
const componentName = process.argv[2];

if (!componentName) {
  console.error('請提供組件名稱');
  process.exit(1);
}

// 轉換為 PascalCase
const toPascalCase = (str) => {
  return str
    .replace(/\b\w/g, (match) => match.toUpperCase())
    .replace(/[^\w]/g, '');
};

const pascalName = toPascalCase(componentName);
const kebabName = pascalName
  .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
  .toLowerCase();

// 判斷是否為頁面組件
const isPage = componentName.startsWith('pages/');

// 組件目錄
const baseDir = isPage ? 'src/views' : 'src/components';
const componentPath = isPage ? componentName.replace('pages/', '') : kebabName;
const componentDir = join(process.cwd(), baseDir, componentPath);
const testDir = join(componentDir, '__tests__');

// 組件模板
const componentTemplate = (name) => `
<template>
  <div class="${kebabName}">
    <!-- 組件內容 -->
    <slot />
  </div>
</template>

<style scoped>
.${kebabName} {
  /* 組件樣式 */
}
</style>
`;

// 組合式函數模板
const composableTemplate = (name) => `
// 組件邏輯
  
  return {
    // 返回需要的值和方法
  };
`;

// 導出文件模板
const indexTemplate = (name) => `
import ${name} from './${name}.vue';

export default ${name};
`;

// 測試文件模板
const testTemplate = (name) => `
import { mount } from '@vue/test-utils';
import ${name} from '../${name}.vue';

describe('${name}', () => {
  it('renders correctly', () => {
    const wrapper = mount(${name}, {
      props: {
        // 測試 props
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
`;

// Storybook 模板
const storiesTemplate = (name) => `
import type { Meta, StoryObj } from '@storybook/vue3';
import ${name} from './${name}.vue';

const meta: Meta<typeof ${name}> = {
  title: 'Components/${name}',
  component: ${name},
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ${name}>;

export const Default: Story = {
  args: {
    // 默認參數
  },
};
`;

async function createComponent() {
  try {
    // 創建組件目錄
    await mkdir(componentDir, { recursive: true });
    await mkdir(testDir, { recursive: true });

    // 創建組件文件
    const files = [
      { path: join(componentDir, `${pascalName}.vue`), content: componentTemplate(pascalName) },
      { path: join(componentDir, `use${pascalName}.js`), content: composableTemplate(pascalName) },
      { path: join(componentDir, 'index.js'), content: indexTemplate(pascalName) },
      { path: join(testDir, `${pascalName}.test.js`), content: testTemplate(pascalName) },
      { path: join(componentDir, `${pascalName}.stories.js`), content: storiesTemplate(pascalName) },
    ];

    // 寫入文件
    for (const { path, content } of files) {
      try {
        await writeFile(path, content.trimStart(), 'utf8');
        console.log(`✅ 創建文件: ${path}`);
      } catch (error) {
        console.error(`❌ 創建文件失敗 ${path}:`, error);
        throw error;
      }
    }

    console.log(`✅ 組件 ${pascalName} 創建成功！`);
    console.log(`📁 路徑: ${componentDir}`);
  } catch (error) {
    console.error('創建組件時出錯:', error);
    process.exit(1);
  }
}

createComponent();
