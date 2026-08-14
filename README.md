# Chelaile 移動端設計系統

[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vant](https://img.shields.io/badge/Vant-4.x-1989FA?logo=vant)](https://vant-contrib.gitee.io/vant/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

本設計系統是基於「車來了 App」的移動端組件庫，採用現代前端技術棧構建，專注於提供一致、高效且美觀的用戶界面。

## ✨ 功能特點

- 🎨 **統一的設計語言**：遵循車來了品牌規範，提供一致的視覺體驗
- 📱 **移動優先**：專為移動設備優化，完美適配各種屏幕尺寸
- ⚡ **現代化開發**：基於 Vue 3 組合式 API 構建，開發更高效
- 🛠️ **元件庫**：目前 8 個已實作元件（AudioPlayer、StationCard、GeoStatusCard、CommonAppHeader、CommonAppTabBar、LayoutsMainLayout、EmptyState、Loading）
- 🎨 **主題定制**：支持靈活的主題配置，一鍵切換品牌風格
- 🚀 **極致性能**：按需加載，體積輕量，加載迅速
- 🔍 **Storybook 文件**：元件皆有 story，可視覺化檢視各狀態
- 🧪 **單元測試**：GeoStatusCard、StationCard 有完整行為測試，其餘為渲染測試
- 🛠️ **TypeScript**：新元件以 .ts 撰寫並附型別定義

## 🚀 技術棧

- **框架**: Vue 3
- **組件庫**: Vant 4
- **樣式**: Tailwind CSS
- **構建工具**: Vite
- **語言**: TypeScript
- **代碼規範**: ESLint + Prettier

## 🎨 設計規範

### 主題配色

#### 品牌色
| 名稱 | 色值 | 變量名 | 用途 |
|------|------|--------|------|
| 主色 | `#2D6DFF` | `--color-primary` | 主要按鈕、重要操作 |
| 主色淺色 | `#E6EEFF` | `--color-primary-light` | 選中狀態、標籤背景 |
| 主色深色 | `#1A4DCC` | `--color-primary-dark` | 按鈕按下狀態 |

#### 功能色
| 名稱 | 色值 | 變量名 | 用途 |
|------|------|--------|------|
| 成功色 | `#52C41A` | `--color-success` | 成功狀態、完成狀態 |
| 警告色 | `#FAAD14` | `--color-warning` | 警告提示 |
| 錯誤色 | `#FF4D4F` | `--color-danger` | 錯誤提示、危險操作 |
| 信息色 | `1890FF` | `--color-info` | 信息提示 |

#### 中性色
| 名稱 | 色值 | 變量名 | 用途 |
|------|------|--------|------|
| 標題色 | `#1F2329` | `--color-text` | 主要文字、標題 |
| 正文色 | `#333333` | `--color-text-regular` | 正文內容 |
| 次要色 | `#8A8F99` | `--color-text-secondary` | 次要文字、標籤 |
| 提示色 | `#C2C7CE` | `--color-text-placeholder` | 輸入框提示文字 |
| 邊框色 | `#E5E6EB` | `--border-color` | 邊框、分割線 |
| 背景色 | `#F7F8FA` | `--background-color` | 頁面背景 |
| 卡片背景 | `#FFFFFF` | `--card-background` | 卡片背景色 |

### 字體

#### 字體家族
- 主要字體: `Noto Sans TC`, `PingFang SC`, `Microsoft YaHei`, sans-serif
- 代碼字體: `SFMono-Regular`, `Consolas`, `Liberation Mono`, `Menlo`, monospace

#### 字體大小
| 類型 | 大小 | 行高 | 字重 | 用途 |
|------|------|------|------|------|
| 大標題 | 22px | 32px | 600 | 頁面主標題 |
| 標題 | 18px | 28px | 600 | 區塊標題 |
| 小標題 | 16px | 24px | 500 | 卡片標題 |
| 正文 | 14px | 22px | 400 | 主要內容 |
| 輔助文字 | 12px | 18px | 400 | 次要信息 |
| 標籤文字 | 10px | 16px | 400 | 標籤、角標 |

### 間距系統

使用 4px 為基礎單位，構建統一的間距系統：

| 變量名 | 數值 | 用途 |
|--------|------|------|
| --space-xxs | 4px | 元素間微小間距 |
| --space-xs | 8px | 表單元素間距 |
| --space-sm | 12px | 相關元素組間距 |
| --space-md | 16px | 卡片內邊距 |
| --space-lg | 24px | 模塊間距 |
| --space-xl | 32px | 頁面模塊間距 |

### 圓角

| 變量名 | 數值 | 用途 |
|--------|------|------|
| --radius-sm | 2px | 小按鈕、標籤 |
| --radius-md | 4px | 默認圓角 |
| --radius-lg | 8px | 大圓角組件 |
| --radius-full | 9999px | 圓形元素 |

### 陰影

| 變量名 | 數值 | 用途 |
|--------|------|------|
| --shadow-sm | 0 1px 2px rgba(0, 0, 0, 0.05) | 輕微陰影 |
| --shadow-md | 0 4px 6px -1px rgba(0, 0, 0, 0.1) | 卡片陰影 |
| --shadow-lg | 0 10px 15px -3px rgba(0, 0, 0, 0.1) | 浮層陰影 |

### 動畫

| 變量名 | 數值 | 用途 |
|--------|------|------|
| --transition-fast | 0.15s | 快速交互 |
| --transition-normal | 0.3s | 常規過渡 |
| --transition-slow | 0.5s | 頁面切換 |

## 🧱 組件清單

### 導航組件
| 組件 | 描述 | 狀態 |
|------|------|------|
| `AppHeader` | 應用頂部導航欄 | ✅ 已完成 |
| `TabBar` | 底部導航欄，支持自定義圖標和徽標 | ✅ 已完成 |
| `Sidebar` | 側邊導航欄，支持多級菜單 | 🚧 開發中 |
| `Tabs` | 標籤頁組件，支持滾動和滑動切換 | ✅ 已完成 |

### 數據展示
| 組件 | 描述 | 狀態 |
|------|------|------|
| `StationCard` | 站點卡片，顯示站點信息和到站預估 | ✅ 已完成 |
| `RouteCard` | 路線卡片，顯示路線信息和運營狀態 | 🚧 開發中 |
| `BusArrivalTime` | 到站時間顯示組件 | ✅ 已完成 |
| `TimeTable` | 時刻表組件，支持分頁和篩選 | ✅ 已完成 |
| `RouteList` | 路線列表組件，支持搜索和排序 | ✅ 已完成 |
| `Notification` | 通知提示組件，支持多種類型和自動關閉 | ✅ 已完成 |

### 表單組件
| 組件 | 描述 | 狀態 |
|------|------|------|
| `SearchBar` | 搜索欄組件，支持實時搜索和歷史記錄 | ✅ 已完成 |
| `DatePicker` | 日期選擇器，支持範圍選擇 | 🚧 開發中 |
| `TimePicker` | 時間選擇器 | 🚧 開發中 |
| `Form` | 表單組件，支持校驗和動態表單 | 🚧 開發中 |

### 地圖組件
| 組件 | 描述 | 狀態 |
|------|------|------|
| `Map` | 地圖組件，集成高德地圖 | ✅ 已完成 |
| `MapControl` | 地圖控制組件，包含縮放、定位等控制項 | ✅ 已完成 |
| `MapMarker` | 地圖標記點組件 | ✅ 已完成 |
| `RouteLine` | 路線繪製組件 | 🚧 開發中 |

### 反饋組件
| 組件 | 描述 | 狀態 |
|------|------|------|
| `Toast` | 輕提示組件 | ✅ 已完成 |
| `Dialog` | 對話框組件 | ✅ 已完成 |
| `ActionSheet` | 動作面板 | ✅ 已完成 |
| `Loading` | 加載指示器 | ✅ 已完成 |

### 其他組件
| 組件 | 描述 | 狀態 |
|------|------|------|
| `GeoStatusCard` | 定位狀態卡片，顯示當前定位狀態和權限信息 | ✅ 已完成 |
| `RouteBadge` | 路線標籤，用於顯示路線號碼和類型 | ✅ 已完成 |
| `EmptyState` | 空狀態組件 | ✅ 已完成 |
| `PullRefresh` | 下拉刷新組件 | ✅ 已完成 |

> 狀態說明：
> - ✅ 已完成：組件已實現並通過測試
> - 🚧 開發中：正在開發中的組件
> - ⏳ 計劃中：計劃開發的組件

## 🔧 組件開發指南

### 創建新組件

1. 使用腳本創建組件模板：
```bash
npm run create:component ComponentName
```

2. 組件目錄結構：
```
components/
└── ComponentName/
    ├── ComponentName.vue    # 組件源碼
    ├── index.ts             # 組件導出
    ├── types.ts             # 類型定義
    ├── ComponentName.stories.ts  # Storybook 文檔
    └── __tests__/           # 單元測試
        └── ComponentName.test.ts
```

### 組件規範

1. **Props 定義**
   - 使用 TypeScript 接口明確定義 props 類型
   - 為每個 prop 添加註釋說明用途
   ```typescript
   interface Props {
     /** 按鈕類型 */
     type?: 'primary' | 'success' | 'warning' | 'danger'
     /** 是否禁用 */
     disabled?: boolean
   }
   ```

2. **事件處理**
   - 使用 `kebab-case` 命名自定義事件
   - 為事件提供完整的類型定義
   ```typescript
   const emit = defineEmits<{
     (e: 'update:modelValue', value: string): void
     (e: 'search', value: string): void
   }>()
   ```

3. **樣式規範**
   - 使用 Tailwind 工具類優先
   - 自定義樣式使用 CSS 變量
   - 響應式設計使用 Tailwind 斷點前綴

## 🎨 主題定製

### 顏色主題

在 `tailwind.config.js` 中擴展主題：

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)'
        },
        // 其他自定義顏色...
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)'
      }
    }
  }
}
```

### 暗黑模式

1. 在 `tailwind.config.js` 中啟用暗黑模式：
```javascript
module.exports = {
  darkMode: 'class', // 或 'media'
  // ...
}
```

2. 在 CSS 中定義暗黑模式變量：
```css
:root {
  --color-bg: #ffffff;
  --color-text: #1f2329;
  /* 其他亮色變量 */
}

.dark {
  --color-bg: #1a1d24;
  --color-text: #ffffff;
  /* 其他暗色變量 */
}
```

### 響應式設計

使用 Tailwind 的斷點前綴：

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- 移動端全寬，平板1/2寬，桌面1/3寬 -->
</div>
```

#### 斷點參考
| 斷點 | 寬度 | 用途 |
|------|------|------|
| `sm` | 640px | 小屏幕 |
| `md` | 768px | 平板 |
| `lg` | 1024px | 筆記本 |
| `xl` | 1280px | 桌面 |
| `2xl` | 1536px | 大屏幕 |

## 📦 安裝

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 生產構建
npm run build

# 預覽生產版本
npm run preview

# 運行測試
npm run test

# 運行 Storybook
npm run storybook
```

## 🛠️ 組件使用示例

### StationCard 站點卡片

```vue
<template>
  <StationCard
    :station-name="'市政府站'"
    :distance="'320m'"
    :bus-list="[
      { routeId: '1', routeName: '32', arrivalTime: '2分鐘', isArriving: true },
      { routeId: '2', routeName: '262', arrivalTime: '5分鐘' },
      { routeId: '3', routeName: '藍26', arrivalTime: '8分鐘' },
    ]"
    show-action
    @action="handleStationAction"
  />
</template>

<script setup>
import { StationCard } from './components';

const handleStationAction = () => {
  console.log('查看站點詳情');
};
</script>
```

### GeoStatusCard 定位狀態卡片

```vue
<template>
  <GeoStatusCard
    title="當前位置"
    status="success"
    status-text="定位成功"
    :show-action="true"
    action-text="重新定位"
    @action="handleRelocation"
  />
</template>

<script setup>
import { GeoStatusCard } from './components';

const handleRelocation = () => {
  console.log('重新定位');};
</script>
```

## 🎨 主題定制

本設計系統支持通過修改 `tailwind.config.js` 中的主題變量來進行主題定制。

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D6DFF',
          light: '#E6EEFF',
          dark: '#1A4DCC',
        },
        // 其他自定義顏色...
      },
    },
  },
};
```

## 📝 開發規範

### 組件開發

1. 組件目錄結構：
   ```
   components/
   ├── ComponentName/
   │   ├── ComponentName.vue    # 組件源碼
   │   ├── index.ts             # 組件導出
   │   ├── types.ts             # 類型定義
   │   ├── ComponentName.stories.ts  # Storybook 文檔
   │   └── __tests__/           # 單元測試
   │       └── ComponentName.test.ts
   ```

2. 組件命名：使用 PascalCase，如 `StationCard`
3. Props 命名：使用 camelCase
4. 事件命名：使用 kebab-case，如 `@click-action`

### 代碼提交

- 使用 Conventional Commits 規範
- 提交前運行 `npm run lint` 和 `npm run test`

## 🤝 貢獻指南

歡迎提交 Issue 和 PR，請確保：

1. 代碼符合項目規範
2. 添加適當的測試
3. 更新相關文檔

## 📄 許可證

MIT
