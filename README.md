# Chelaile 移動端設計系統

[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vant](https://img.shields.io/badge/Vant-4.x-1989FA?logo=vant)](https://vant-contrib.gitee.io/vant/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

本設計系統是基於「車來了 App」的移動端組件庫，採用現代前端技術棧構建，專注於提供一致、高效且美觀的用戶界面。

## ✨ 功能特點

- 🎨 統一的設計語言和視覺風格
- 📱 移動優先，響應式設計
- ⚡ 基於 Vue 3 的組合式 API
- 🛠️ 豐富的預製組件
- 🎨 可定制的主題系統
- 🚀 優異的性能表現

## 🚀 技術棧

- **框架**: Vue 3
- **組件庫**: Vant 4
- **樣式**: Tailwind CSS
- **構建工具**: Vite
- **語言**: TypeScript
- **代碼規範**: ESLint + Prettier

## 🎨 設計規範

### 主題配色

| 名稱 | 色值 | 用途 |
|------|------|------|
| 主色 | `#2D6DFF` | 主要按鈕、重要操作 |
| 警示色 | `#FF4D4F` | 錯誤提示、警告信息 |
| 文本主色 | `#1F2329` | 主要文字 |
| 文本次色 | `#8A8F99` | 次要文字 |
| 背景色 | `#F7F8FA` | 頁面背景 |
| 邊框色 | `#E5E6EB` | 分割線、邊框 |

### 字體

- 主要字體: Noto Sans TC
- 字體大小: 12px - 16px
- 行高: 1.5

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
