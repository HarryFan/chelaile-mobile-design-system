# Chelaile 移動端設計系統

[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vant](https://img.shields.io/badge/Vant-4.x-1989FA?logo=vant)](https://vant-contrib.gitee.io/vant/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

本設計系統是基於「車來了 App」的移動端組件庫，採用現代前端技術棧構建，專注於提供一致、高效且美觀的用戶界面。

## ✨ 功能特點

- 🎨 **統一的設計語言**：遵循車來了品牌規範，提供一致的視覺體驗
- 📱 **移動優先**：專為移動設備優化，完美適配各種屏幕尺寸
- ⚡ **現代化開發**：基於 Vue 3 組合式 API 構建，開發更高效
- 🛠️ **豐富組件庫**：包含 30+ 高質量組件，覆蓋常見業務場景
- 🎨 **主題定制**：支持靈活的主題配置，一鍵切換品牌風格
- 🚀 **極致性能**：按需加載，體積輕量，加載迅速
- 🔍 **完整文檔**：詳細的 API 文檔和代碼示例
- 🧪 **測試覆蓋**：完善的單元測試，確保組件穩定性
- 🌍 **多語言**：內置 i18n 支持，輕鬆實現國際化
- 🛠️ **開發者友好**：完整的 TypeScript 類型定義，提升開發體驗

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

| 組件 | 描述 |
|------|------|
| `GeoStatusCard` | 定位狀態卡片，顯示當前定位狀態和權限信息 |
| `StationCard` | 站點卡片，顯示站點信息和到站預估 |
| `RouteBadge` | 路線標籤，用於顯示路線號碼和類型 |
| `BusArrivalTime` | 到站時間顯示組件 |
| `MapControl` | 地圖控制組件 |
| `TabBar` | 底部導航欄 |
| `SearchBar` | 搜索欄組件 |
| `TimeTable` | 時刻表組件 |
| `RouteList` | 路線列表組件 |
| `Notification` | 通知提示組件 |

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
