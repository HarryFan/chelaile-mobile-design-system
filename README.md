# chelaile-design-system 使用手冊

本設計系統來源自「車來了 App」原型模版，採用 Vue 3 + Vant 4 + Tailwind CSS 架構設計，針對手機瀏覽器使用者優化，包含地圖、站點、路線等功能模組。

## 🎨 主題配色
- 主色（CTA 藍）：`#2D6DFF`
- 警示色（紅）：`#FF4D4F`
- 字體：Noto Sans TC

## 🧱 元件對應表

| 元件名稱 | 對應畫面 | 功能簡述 |
|----------|----------|----------|
| GeoStatusCard | 定位城市 | 顯示定位成功並進入指定城市 |
| StationCard | 首頁 | 附近站點名稱、距離、路線列表 |
| TabBar | 全域 | 底部導覽選單 |
| MapOverlayPOI | 搜索結果 | 地點詳情 + 導航 CTA |
| RoutePlanner | 路線規畫 | 顯示從起點到終點的路線 |
| NewsFeedCard | 發現頁 | 圖文資訊卡片（如有使用） |

## 🧠 Windsurf / GPT 使用語意提示範例

```prompt
根據 chelaile-design-system，建立一個 Vue 3 + Vant + Tailwind 畫面：
畫面包含一張 StationCard 卡片，顯示站名「招商銀行大廈」、距離 100 公尺、包含兩條公車資訊，使用 primary 色系強調 CTA。
```

---

© 2025 Van Harris / chelaile-mobile
