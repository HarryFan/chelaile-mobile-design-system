# DEVLOG — chelaile-mobile-design-system

> 開發脈絡紀錄。每一輪寫：起點是什麼狀態、做了什麼決定、哪裡卡、**AI 哪裡判斷錯、怎麼發現、怎麼修**。
> 這份不是 changelog（那看 git log），是「為什麼這樣走」。時間倒序。

## 第二輪 · 2026-09-09 下午 — 補齊 8 個元件、接線、發布面（Claude Code / Claude Fable 5.1）

### 起點診斷（與第一輪手札對照）

第一輪手札把批次 C/D/E 標「進行中」就中斷了。本輪重新盤點時**我先判斷錯了一次**：

| 我一開始的判斷 | 實際 | 怎麼發現 |
|---|---|---|
| StationCard「已對齊，只缺 composable」 | 還是 Vant 舊版：`van-button`、`showAction` prop、Tailwind class，零 `cl-*` | 派完 agent 後想順手補 `useStationCard.ts`，打開 SFC 才看到 |
| SearchBar / StatusCard 目錄存在 = 有東西 | 兩個目錄是**空的** | `find -type f` 列出來沒有檔案 |

教訓寫進 `AGENTS.md`：**檔案齊全 ≠ 規格對齊，要看內容（class 是不是 `cl-*`、prop 是不是 spec 的）**。盤點用 `find -type f` 不用 `ls`。

修正後的真實狀態：8 個 spec 元件只有 Button 完成，StationCard 要重寫，其餘 6 個要新建；`package.json` 的 `types` 指向不存在的 `dist/index.d.ts`（第一輪手札有記「跳過」，但 `types` 欄位已經先寫了）。

### 派工策略

- **主線**：StationCard 重寫、`vite-plugin-dts`、README、最後接 `components/index.ts`。
- **fork agent A**：SearchBar、StatusCard（+ GeoStatusCard 改薄包裝）、TabBar。
- **fork agent B**：AppHeader、EmptyState、Loading。
- 分工原則：**按目錄切所有權，兩個 agent 都禁碰 `index.ts`**，接線主線做。用 fork 而不是新 agent，因為本 session 已經建立「哪些檔不能動、Button 是參考形狀、React 版是行為基準」這些判斷，重講一次比繼承貴。
- 給 agent 的 prompt 固定四段：範圍與禁區 → 參考實作（Vue Button 看形狀、React 對應目錄看行為 1:1 翻譯）→ 驗證閘（`vitest run` + `build` 必須綠）→ 結構化回報（檔案、測試數、build、**規格偏差與理由**，300 字內）。

### 並行時的一個「假 bug」

agent A 收尾跑全套測試，回報「57 過 / 2 失敗，都在 `loading/`，不是我的檔，沒修」。那兩個紅是 agent B 正在寫 Loading 寫到一半。**規則有寫「不是你的目錄就回報不修」，agent 照做了，沒有跨目錄亂改。** 等 B 收尾後全綠。這條規則的價值就在這裡：並行時紅燈不一定是 bug。

### agent 回報的規格偏差（主線審過，全部接受）

| 偏差 | 理由 |
|---|---|
| SearchBar / TabBar 用 `modelValue` + `update:modelValue` | Vue v-model 慣例，spec §2.2 / §2.5 本來就寫 Vue 用 `modelValue` |
| `StatusCard.description` 只收 `string`（React 收 `ReactNode`） | Vue 沒有 ReactNode 對應物；不加 slot，維持 API 面一致，要富文本時再開 |
| AppHeader `left` / `right` 從 prop 改具名 slot | Vue 慣例，spec §2.6 明寫 |
| 用 Vue 3.5 `useId` 做 label/input 關聯 | repo 已是 vue ^3.5.17 |
| SearchBar `clear` 在 `change('')` / `search('')` 之後才 emit | 對齊 React 順序 |

### 本輪完成

- 8 個元件五件套齊全，`GeoStatusCard` 改為 `StatusCard` 薄包裝保留舊 API。
- `components/index.ts` 匯出 9 個元件 + composable + 型別，`install()` 註冊為 `ClXxx`。
- `vite-plugin-dts` 產出 `dist/index.d.ts`，`types` 欄位終於指向存在的檔。
- 刪：`common-app-header/`、`common-app-tab-bar/`、`layouts-main-layout/`、單檔 `EmptyState.vue` / `Loading.vue`、舊 `views/{Map,My,RoutePlan,Search}`、`router/index.js`、過期的 `src/types/components.d.ts`。
- README 元件清單改成真的（第一輪手札：「README 把 ~20 個不存在的元件標 ✅」）。
- 測試 18 → 59，build + d.ts 綠。`COMPONENT-SPEC.md` 從母目錄搬進 repo（GitHub 上原本點不到）。
- 加 `AGENTS.md` / `docs/` / CI / Storybook Pages（本檔所在的這個 commit）。

### 驗證閘與 git 紀律

- commit 前：59 tests、`npm run build`、`dist/index.d.ts` 內 `export declare const` 列出 9 個元件，三個都看過才 commit。
- `git add` 只列明確路徑；`*.bak-20260909` 六個備份檔加進 `.gitignore`，不進 git。
- 沒驗證、老實寫：示範 app（`App.vue` / `main.js` 還吃 Vant + `@iconify/vue`）沒跑 `npm run dev`；Storybook 只跑 build 沒人工看過每個 story。

### Token / context 怎麼省

- 主線不讀大檔：對 React 版 8 個目錄的讀取交給 agent，主線只拿回報。
- 讀之前先估行數；超過 500 行的一律派出去。
- 同一件事最多重試 2 輪，第 3 次換方法（本輪沒觸發）。

---

## 第一輪 · 2026-09-09 上午 — 雙框架趨同（另一個 Claude Code session，模型未記錄）

> 以下由當時的 `開發手札.html` 轉成 markdown，內容照原樣，只改格式。原 HTML 已刪，避免兩份來源。

### 起點診斷

| 項目 | 狀態 | 說明 |
|---|---|---|
| 真元件 | 2 | GeoStatusCard、StationCard 有實作 + 行為測試；其餘 6 個是 scaffold 殼或 Options API 舊件 |
| Scaffold 殼 | 7 個 | `views/{Map,My,RoutePlan,Search}` 四頁 12 行空殼 + `usePages*.js` 頂層 `return` 語法錯誤；common-app-header、common-app-tab-bar、layouts-main-layout 為快照測試殼 |
| 產生器 | 壞 | `scripts/create-component.js` 產出 JS、composable 有頂層 return、測試沒 import describe、story 是 TS 語法寫進 .js |
| Vitest | 未設 | 無 test 區塊、無 jsdom、無 globals，`npm test` 全紅 |
| Storybook | 未設 | 無 `.storybook/`；storybook@^7.5 與 @storybook/*@^8.6 版本錯配 |
| Token | 三套打架 | `style.css` RGB 三元組、`global.scss` Vant 藍 #1989fa、`variables.scss` #007BFF；README 還寫了第四套 |
| Router | 壞 | `router/index.js` import 不存在的路徑，且蓋過可用的 `index.ts` |
| vite.config | 過期 | `reactivityTransform: true` 在 Vue 3.4 已移除 |
| README / TODO | 失真 | README 把 ~20 個不存在的元件標 ✅；TODO 反向把已做的標未做 |
| 雜物 | 不動 | `AudioPlayer.vue`、`services/bookService.ts`、`variables.scss` 來自別的專案，本輪不刪不 export |

### 趨同決策

- 向 React 版慣例靠攏：五件套、BEM class `cl-<kebab>__part`、token 只用 `var(--cl-*)`、a11y 語意逐字對齊。
- 保留 Vant 為 app 層依賴，但設計系統元件自畫：Button / Loading / StatusCard 不再包 `van-button` / `van-loading`，否則兩邊樣式與 DOM 無法一致，測試也難共用選擇器。
- Token 單一來源：新增 `src/styles/tokens.css`（與 React 逐字相同），`tailwind.config.js` 全部 map 到 `var(--cl-*)`；舊 RGB 三元組保留為別名不破壞既有 class。
- GeoStatusCard 降為薄包裝：內部改用新 StatusCard，status→tone 對映（error→danger、loading→info）。
- 移除 `showAction`：StationCard 改成「有 `actionText` 才顯示按鈕」，與 React 一致。
- 目錄改名：`common-app-tab-bar`→`tab-bar`（改吃 `items` prop，不再硬編碼五個 tab）、`common-app-header`→`app-header`；EmptyState / Loading 從平面檔搬進資料夾五件套。

### 批次 0 完成明細（基礎修復）

- Vitest：`vite.config.js` 加 test 區塊（globals / jsdom / setupFiles / css / include），新增 `vitest.setup.ts`；`server.deps.inline: ['vant']` 是因為 VantResolver 會拉 .css 進 Node。
- Storybook 8：`.storybook/main.ts`（vue3-vite + addon-essentials）、`preview.ts`（vant css + style.css，背景 #F7F8FA）。
- Token：`src/styles/tokens.css`，`style.css` 頂部 import；`tailwind.config.js` 的 colors / spacing / radius / fontSize / fontFamily / boxShadow 全 map 到 `var(--cl-*)`。
- `vite.config.js`：移除 `reactivityTransform`、scss additionalData、terser（未安裝）、manualChunks（與 external 衝突）。加 `build.lib`（es + cjs，external: `['vue', /^vant/]`）。
- 產生器重寫為 TS 五件套；`PascalProps` 放在 `usePascal.ts`（SFC 內的型別沒 vue-tsc 拿不到）；用 `zz-probe` 驗證 esbuild / vitest / storybook 三關後清掉。
- 入口與套件：`src/index.ts`；`package.json` 加 main / module / types / exports / files / sideEffects / peerDependencies。
- 跳過：vue-tsc 未裝，`types: ./dist/index.d.ts` 已宣告但尚未產出。（→ 第二輪補 `vite-plugin-dts`）

### 踩坑記錄

- `npm install` 第一次失敗：ERESOLVE，`@storybook/addon-essentials@8.6.14` 要求 `storybook@^8.6.14`，package.json 卻寫 `^7.5.0`。
- 第二次失敗：`~/.npm-cache` 一筆損壞快取（EACCES rename / File exists，同一 sha512 反覆撞）。解法：`npm install --cache <scratch dir>` 換乾淨快取，不刪使用者快取。
- **上一輪 commit `ebc0198` 說「移除語法錯誤的 hook」，實際 `views/*/usePages*.js` 四支仍在、仍是頂層 return。** commit message 宣稱與 diff 不符，這是 AI 生成 commit 常見的錯：寫了「打算做的」不是「做到的」。

### 待辦（留給下一輪）

- Dark mode：`.dark` 區塊改成覆蓋 `--cl-*`，與 React 端同步。
- 清掉 `global.scss` / `variables.scss` 的舊 token，或明確標為 legacy。
- 決定 AudioPlayer / bookService 去留。
- 設計 JSON `chelaile-design-system.json` 的 StationCard prop 仍寫 `routes`，實作是 `busList`，要同步。

---

## 更早 · 2025-07-19 ～ 2026-08-14

- **2025-07-19**（12 個 commit 同一天）：從設計圖與設計 JSON 起專案，Vue 3 + Vant 4 + Tailwind。AI 生成了大量 scaffold：頁面殼、hook 殼、README 把約 20 個元件標「✅ 已完成」。**真正有實作的只有 GeoStatusCard 與 StationCard。**
- **2026-08-14 `ebc0198`**：回頭盤點，刪空殼元件與語法錯誤的 hook、修 README 宣稱。這是第一次「發現 AI 產出跟 README 說的不一樣」，但如上所述，這次清理本身也漏了四支。
- 教訓：**AI 很會寫「完成了」，不會自己驗證。** 之後每一輪的手札都先做「起點診斷」表，用檔案內容而不是 README 當事實來源。
