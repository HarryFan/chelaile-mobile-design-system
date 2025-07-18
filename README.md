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
| `GeoStatusCard` | 定位狀態卡片 |
| `StationCard` | 站點信息卡片 |
| `TabBar` | 底部導航欄 |
| `MapOverlayPOI` | 地圖地點浮層 |
| `RoutePlanner` | 路線規劃組件 |
| `NewsFeedCard` | 新聞資訊卡片 |

## 🚀 快速開始

### 安裝

```bash
# 克隆倉庫
git clone https://github.com/your-username/chelaile-mobile-design-system.git

# 進入項目目錄
cd chelaile-mobile-design-system

# 安裝依賴
npm install

# 啟動開發服務器
npm run dev
```

### 構建

```bash
# 構建生產版本
npm run build
```

## 📁 項目結構

```
chelaile-mobile-design-system/
├── src/
│   ├── assets/         # 靜態資源
│   ├── components/     # 公共組件
│   ├── composables/    # 組合式函數
│   ├── styles/         # 全局樣式
│   ├── utils/          # 工具函數
│   └── main.ts         # 入口文件
├── public/            # 公共資源
├── .env               # 環境變量
└── vite.config.ts     # Vite 配置
```

## 🧪 測試

```bash
# 運行單元測試
npm run test:unit

# 運行組件測試
npm run test:component
```

## 🤝 貢獻指南

1. Fork 本倉庫
2. 創建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟一個 Pull Request

## 📄 許可證

[MIT](LICENSE) © 2025 Chelaile Mobile Team
