<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  AppHeader,
  Button,
  EmptyState,
  Loading,
  SearchBar,
  StationCard,
  StatusCard,
  TabBar,
  type BusInfo,
  type TabBarItem,
} from '@/components';
import DemoSection from './demo/DemoSection.vue';
import DemoCard from './demo/DemoCard.vue';

/**
 * Demo 頁：與 React 版 `demo/App.tsx` 結構、文案、class 逐字相同，只差語法層。
 * 元件行為全部來自元件庫；這裡只負責組合與展示。
 */

const FRAMEWORK = 'Vue 3';
const TEST_COUNT = 62;
const REPO_URL = 'https://github.com/HarryFan/chelaile-mobile-design-system';
const SISTER_URL = 'https://github.com/HarryFan/chelaile-design-system-react';

const tabs: TabBarItem[] = [
  { key: 'nearby', label: '附近', icon: 'ri-map-pin-2-line' },
  { key: 'favorites', label: '收藏', icon: 'ri-star-line', badge: 3 },
  { key: 'messages', label: '訊息', icon: 'ri-notification-3-line', badge: 120 },
  { key: 'me', label: '我的', icon: 'ri-user-3-line' },
];

interface Station {
  name: string;
  distance: string;
  buses: BusInfo[];
}

const stations: Station[] = [
  {
    name: '捷運台北車站',
    distance: '250 公尺',
    buses: [
      { routeId: '307', routeName: '307', arrivalTime: '進站中', isArriving: true },
      { routeId: '262', routeName: '262', arrivalTime: '3 分' },
      { routeId: '1', routeName: '1', arrivalTime: '12 分' },
      { routeId: '652', routeName: '652' },
    ],
  },
  {
    name: '忠孝敦化',
    distance: '480 公尺',
    buses: [
      { routeId: '204', routeName: '204', arrivalTime: '5 分' },
      { routeId: '278', routeName: '278', arrivalTime: '8 分', isArriving: false },
    ],
  },
  {
    name: '南京復興',
    distance: '900 公尺',
    buses: [],
  },
];

const colorTokens = [
  ['--cl-primary', '#2d6dff', '品牌主色'],
  ['--cl-primary-dark', '#1a4dcc', '主色按下'],
  ['--cl-primary-light', '#e6eeff', '主色底'],
  ['--cl-success', '#52c41a', '成功'],
  ['--cl-warning', '#faad14', '警告'],
  ['--cl-danger', '#ff4d4f', '危險'],
  ['--cl-info', '#1890ff', '資訊'],
  ['--cl-text', '#1f2329', '主要文字'],
  ['--cl-text-secondary', '#8a8f99', '次要文字'],
  ['--cl-border', '#e5e6eb', '邊框'],
  ['--cl-background', '#f7f8fa', '頁面底'],
  ['--cl-card-background', '#ffffff', '卡片底'],
] as const;

const typeTokens = [
  ['title', '18 / 28', '站牌名稱、頁面標題'],
  ['subtitle', '16 / 24', '卡片標題'],
  ['body', '14 / 22', '內文、按鈕'],
  ['caption', '12 / 18', '輔助說明、時間'],
] as const;

const spacingTokens = [
  ['xs', 4],
  ['sm', 8],
  ['md', 16],
  ['lg', 24],
] as const;

const tab = ref('nearby');
const query = ref('');
const searched = ref('');
const loading = ref(false);
const overlay = ref(false);
const dismissed = ref(false);

const filtered = computed(() => {
  const q = searched.value.trim();
  if (!q) return stations;
  return stations.filter(
    (s) => s.name.includes(q) || s.buses.some((b) => b.routeName.includes(q)),
  );
});

const currentTitle = computed(() => tabs.find((t) => t.key === tab.value)?.label);

const showOverlay = () => {
  overlay.value = true;
  window.setTimeout(() => (overlay.value = false), 1400);
};

const fakeSubmit = () => {
  loading.value = true;
  window.setTimeout(() => (loading.value = false), 1400);
};

const clearSearch = () => {
  query.value = '';
  searched.value = '';
};

// 模板裡拿不到 document / window，包成函式
const scrollToComponents = () => document.getElementById('components')?.scrollIntoView();
const openSister = () => window.open(SISTER_URL, '_blank');
</script>

<template>
  <header class="demo-nav">
    <div class="demo-container demo-nav__inner">
      <a class="demo-brand" href="#top"><span class="demo-brand__mark"><i class="ri-bus-2-fill" aria-hidden="true" /></span>車來了 Design System</a>
      <nav class="demo-nav__links" aria-label="頁內導覽">
        <a href="#components">元件</a>
        <a href="#tokens">Tokens</a>
        <a href="#principles">規範</a>
      </nav>
      <span class="demo-nav__spacer" />
      <span class="demo-framework"><span class="demo-framework__dot" aria-hidden="true" />{{ FRAMEWORK }}</span>
      <a class="demo-nav__cta" :href="REPO_URL" target="_blank" rel="noreferrer"><i class="ri-github-fill" aria-hidden="true" />GitHub</a>
    </div>
  </header>

  <section class="demo-hero demo-container" id="top">
    <div>
      <span class="demo-eyebrow"><i class="ri-git-branch-line" aria-hidden="true" />同一套規格 · React 與 Vue 逐字對齊</span>
      <h1 class="demo-hero__title">行動端設計系統，<br /><span>兩個框架，一份 API</span></h1>
      <p class="demo-hero__lede">
        公車到站 app「車來了」的元件庫。8 個元件、每個都是五件套（畫面、hook、樣式、Storybook、行為測試），
        props、事件、class、無障礙語意在 React 與 Vue 兩邊逐字一致，只差語法層。
      </p>
      <div class="demo-hero__actions">
        <Button size="lg" round @click="scrollToComponents">看元件</Button>
        <Button size="lg" round variant="secondary" @click="openSister">另一個框架版本</Button>
      </div>
      <div class="demo-stats" aria-label="專案數字">
        <div class="demo-stat">
          <div class="demo-stat__value">8</div>
          <div class="demo-stat__label">元件，五件套齊全</div>
        </div>
        <div class="demo-stat">
          <div class="demo-stat__value">{{ TEST_COUNT }}</div>
          <div class="demo-stat__label">行為測試，非 snapshot</div>
        </div>
        <div class="demo-stat">
          <div class="demo-stat__value">100%</div>
          <div class="demo-stat__label">樣式走 token，零硬編碼</div>
        </div>
      </div>
    </div>

    <div class="demo-device-wrap">
      <div class="demo-device" aria-label="互動示範：手機畫面">
        <div class="demo-device__screen">
          <div class="demo-device__island" aria-hidden="true" />
          <div class="demo-device__status" aria-hidden="true">
            <span>9:41</span>
            <span><i class="ri-signal-wifi-3-fill" /><i class="ri-battery-2-charge-fill" /></span>
          </div>
          <AppHeader :title="currentTitle" :show-back="tab !== 'nearby'" @back="tab = 'nearby'">
            <template #right>
              <Button size="sm" variant="ghost" @click="showOverlay"><i class="ri-refresh-line" aria-hidden="true" /> 重新整理</Button>
            </template>
          </AppHeader>
          <div class="demo-device__body">
            <template v-if="tab === 'nearby'">
              <SearchBar
                v-model="query"
                placeholder="搜尋站牌或路線"
                label="搜尋"
                @search="(v) => (searched = v)"
              />
              <StatusCard
                v-if="!dismissed"
                tone="success"
                title="定位成功"
                description="已鎖定信義區，顯示 1 公里內站牌"
                action-text="知道了"
                @action="dismissed = true"
              />
              <p class="demo-screen-title">附近站牌</p>
              <EmptyState
                v-if="filtered.length === 0"
                icon="ri-bus-line"
                title="找不到符合的站牌"
                description="換個關鍵字，或清空搜尋"
                action-text="清空搜尋"
                @action="clearSearch"
              />
              <template v-else>
                <StationCard
                  v-for="s in filtered"
                  :key="s.name"
                  :station-name="s.name"
                  :distance="s.distance"
                  :bus-list="s.buses"
                  :action-text="s.buses.length ? '查看全部' : undefined"
                />
              </template>
            </template>
            <template v-else-if="tab === 'favorites'">
              <EmptyState
                icon="ri-star-line"
                title="還沒有收藏的站牌"
                description="在站牌卡片上點「收藏」，下次打開直接看"
                action-text="去附近看看"
                @action="tab = 'nearby'"
              />
            </template>
            <template v-else-if="tab === 'messages'">
              <StatusCard tone="danger" title="服務中斷" description="系統維護中，到站資訊暫時無法取得" action-text="重試" @action="showOverlay" />
              <StatusCard tone="warning" title="路線繞駛" description="307 因施工改道，忠孝敦化站暫停停靠" action-text="查看詳情" />
              <StatusCard tone="info" title="票價調整" description="9 月 15 日起，跨區段票價調整為 30 元" />
              <StatusCard tone="success" title="已到站" description="262 已抵達捷運台北車站" />
            </template>
            <template v-else>
              <StatusCard tone="info" title="Harry Fan" description="悠遊卡 · 餘額 NT$ 320" />
              <p class="demo-screen-title">帳號</p>
              <Button block variant="secondary">通知設定</Button>
              <Button block variant="secondary">常用路線</Button>
              <Button block variant="ghost" @click="showOverlay">同步資料</Button>
              <Button block variant="danger" :loading="loading" @click="fakeSubmit">{{ loading ? '登出中' : '登出' }}</Button>
            </template>
          </div>
          <div class="demo-device__footer">
            <TabBar v-model="tab" :items="tabs" label="主導覽" />
            <div class="demo-device__home" aria-hidden="true" />
          </div>
          <Loading v-if="overlay" overlay text="同步中" />
        </div>
      </div>
    </div>
  </section>

  <DemoSection
    id="components"
    index="01 / COMPONENTS"
    title="8 個元件"
    lede="每張卡片標題旁的一句話，是這個元件最重要的設計決策。細節與測試名稱在 Storybook。"
  >
    <div class="demo-grid">
      <DemoCard title="Button" icon="ri-cursor-line" tag="4 變體 · 3 尺寸">
        <template #note><strong>loading 不設 disabled。</strong>disabled 會讓按鈕失去 Tab 焦點、被螢幕閱讀器跳過；改用 aria-busy + aria-disabled，點擊在 hook 內擋掉。</template>
        <div class="demo-row">
          <Button>主要</Button>
          <Button variant="secondary">次要</Button>
          <Button variant="danger">危險</Button>
          <Button variant="ghost">幽靈</Button>
        </div>
        <div class="demo-row">
          <Button size="sm">小</Button>
          <Button size="md">中</Button>
          <Button size="lg">大</Button>
          <Button round>膠囊</Button>
          <Button disabled>停用</Button>
          <Button :loading="loading" @click="fakeSubmit">{{ loading ? '送出中' : '按我 loading' }}</Button>
        </div>
        <Button block>撐滿寬度</Button>
      </DemoCard>

      <DemoCard title="SearchBar" icon="ri-search-line" tag="IME 組字安全">
        <template #note><strong>中文輸入法組字期間不送查詢。</strong>注音打「南京」會經過「ㄋ」「ㄋㄢ」，用 compositionstart / end 擋掉，Enter 在組字中是選字不是送出。</template>
        <SearchBar v-model="query" placeholder="試試用注音輸入站名" label="搜尋" @search="(v) => (searched = v)" />
        <p class="demo-hint">即時值 <code>{{ query || '（空）' }}</code>　debounce 300ms 後 <code>{{ searched || '（空）' }}</code></p>
      </DemoCard>

      <DemoCard title="StatusCard" icon="ri-alert-line" tag="role 依 tone">
        <template #note><strong>danger 才用 role=alert。</strong>其餘用 role=status + aria-live=polite，避免螢幕閱讀器被不重要的訊息一直打斷。</template>
        <StatusCard tone="success" title="已到站" description="307 已進站，請準備上車" />
        <StatusCard tone="warning" title="路線繞駛" description="因施工改道，部分站點暫停停靠" action-text="查看詳情" />
        <StatusCard tone="danger" title="服務中斷" description="到站資訊暫時無法取得" action-text="重試" @action="showOverlay" />
        <StatusCard tone="info" title="提示" description="拉到底可重新整理" />
      </DemoCard>

      <DemoCard title="StationCard" icon="ri-bus-line" tag="空值由父層負責">
        <template #note><strong>arrivalTime 缺值顯示「更新中」文字，不放 spinner。</strong>到站資訊是輪詢來的，缺值是常態不是錯誤；文字念得出來、也測得到。</template>
        <StationCard station-name="捷運台北車站" distance="250 公尺" :bus-list="stations[0].buses" action-text="查看全部" />
        <StationCard station-name="南京復興" :bus-list="[]" />
      </DemoCard>

      <DemoCard title="TabBar" icon="ri-layout-bottom-line" tag="tablist + roving tabindex">
        <template #note><strong>只有選中的 tab 可被 Tab 鍵聚焦，←/→ 循環切換。</strong>點已選中的 tab 不發 change，父層不用自己 dedupe；badge 超過 99 顯示 99+。</template>
        <div class="demo-preview">
          <TabBar v-model="tab" :items="tabs" label="示範導覽" />
        </div>
        <p class="demo-hint">目前 <code>{{ tab }}</code>。聚焦後按 ← → 試試。</p>
      </DemoCard>

      <DemoCard title="AppHeader" icon="ri-layout-top-line" tag="role=banner">
        <template #note><strong>路由跳轉是父層的事。</strong>元件只發 onBack；left 給了就取代返回鈕；沒 title 不渲染 h1。</template>
        <div class="demo-preview">
          <AppHeader title="站牌詳情" @back="showOverlay">
            <template #right><Button size="sm" variant="ghost">收藏</Button></template>
          </AppHeader>
        </div>
        <div class="demo-preview">
          <AppHeader :show-back="false" title="首頁">
            <template #right><Button size="sm" variant="ghost">設定</Button></template>
          </AppHeader>
        </div>
      </DemoCard>

      <DemoCard title="EmptyState" icon="ri-inbox-line" tag="role=status">
        <template #note><strong>icon 收字串，不綁圖庫。</strong>任何 Remix Icon class 都能用，元件只負責 aria-hidden。</template>
        <EmptyState icon="ri-bus-line" title="附近沒有站牌" description="換個地點或放大搜尋範圍" action-text="重新定位" @action="showOverlay" />
      </DemoCard>

      <DemoCard title="Loading" icon="ri-loader-4-line" tag="reduced-motion 放慢不停">
        <template #note><strong>停止動畫會讓人以為卡死。</strong>prefers-reduced-motion 時只放慢轉速；overlay 版本蓋全螢幕。</template>
        <div class="demo-row">
          <Loading size="sm" text="" />
          <Loading size="md" text="載入中" />
          <Loading size="lg" text="請稍候" />
          <Button size="sm" variant="secondary" @click="showOverlay">overlay 1.4s</Button>
        </div>
      </DemoCard>
    </div>
  </DemoSection>

  <DemoSection
    id="tokens"
    index="02 / TOKENS"
    title="Design Tokens"
    lede="全部 CSS 變數、--cl- 前綴，兩個 repo 逐字相同。使用端覆蓋 --cl-primary 就能換主題，不必碰元件。"
  >
    <div class="demo-grid">
      <DemoCard title="顏色" icon="ri-palette-line" :span="12">
        <div class="demo-swatches">
          <div v-for="[name, hex, label] in colorTokens" :key="name" class="demo-swatch">
            <div class="demo-swatch__chip" :style="{ background: `var(${name})`, boxShadow: 'inset 0 0 0 1px rgba(31,35,41,.06)' }" />
            <div class="demo-swatch__meta">
              <b>{{ name }}</b>
              <span>{{ label }} · {{ hex }}</span>
            </div>
          </div>
        </div>
      </DemoCard>

      <DemoCard title="字級" icon="ri-font-size-2" :span="6">
        <div class="demo-type">
          <div v-for="[name, size, use] in typeTokens" :key="name" class="demo-type__row">
            <small>{{ name }}</small>
            <span :style="{ fontSize: `var(--cl-font-size-${name})`, lineHeight: `var(--cl-line-height-${name})`, fontWeight: name === 'title' ? 700 : 400 }">捷運台北車站 307 進站中</span>
            <small>{{ size }} · {{ use }}</small>
          </div>
        </div>
      </DemoCard>

      <DemoCard title="間距與圓角" icon="ri-ruler-line" :span="6">
        <div class="demo-spacing">
          <div v-for="[name, px] in spacingTokens" :key="name" class="demo-spacing__item">
            <div class="demo-spacing__bar" :style="{ height: `${px * 3}px`, width: `${18 + px}px` }" />
            <span>{{ name }} · {{ px }}px</span>
          </div>
        </div>
        <p class="demo-hint">4px 基準。圓角 <code>--cl-radius-card 12px</code>、<code>--cl-radius-pill 9999px</code>，陰影 <code>--cl-shadow-card</code>。</p>
      </DemoCard>
    </div>
  </DemoSection>

  <DemoSection
    id="principles"
    index="03 / PRINCIPLES"
    title="規範能被強制執行，才叫規範"
    lede="元件庫的價值不在數量，在慣例能不能被工具逼著遵守。"
  >
    <div class="demo-principles">
      <div class="demo-principle">
        <i class="ri-stack-line" aria-hidden="true" />
        <h3>五件套，產生器生成</h3>
        <p>畫面、hook、樣式、Storybook、測試、出口。少一個就是 review 打回；用 CLI 生就沒有「忘了」。</p>
      </div>
      <div class="demo-principle">
        <i class="ri-flask-line" aria-hidden="true" />
        <h3>行為測試，不是 render 測試</h3>
        <p>「使用者做什麼 → 看到什麼」。只 render 等於沒測，改壞了也不會紅。</p>
      </div>
      <div class="demo-principle">
        <i class="ri-eye-line" aria-hidden="true" />
        <h3>無障礙是契約的一部分</h3>
        <p>role、aria-live、roving tabindex 寫進規格，兩個框架逐字相同，不是加分項。</p>
      </div>
      <div class="demo-principle">
        <i class="ri-translate-2" aria-hidden="true" />
        <h3>台灣產品的坑寫進測試</h3>
        <p>中文輸入法組字、到站資訊缺值、空狀態責任歸屬，這些英文教學不會教。</p>
      </div>
    </div>
    <pre class="demo-tree" style="margin-top: 16px"><b>src/components/station-card/</b>
├── StationCard.vue           <span>畫面，樣式在 SFC &lt;style&gt;</span>
├── useStationCard.ts         <span>行為，可獨立測試</span>
├── StationCard.stories.ts    <span>Storybook 文件</span>
├── __tests__/StationCard.test.ts
└── index.ts                  <span>對外出口</span></pre>
  </DemoSection>

  <footer class="demo-footer demo-container">
    <span>范綱栓 Harry Fan · {{ FRAMEWORK }} 版 · <a :href="REPO_URL" target="_blank" rel="noreferrer">GitHub</a></span>
    <span>姊妹專案：<a :href="SISTER_URL" target="_blank" rel="noreferrer">React 19 版</a></span>
  </footer>
</template>

<style>
/* 唯一的 demo 覆寫：Tailwind preflight 把 h1-h6 的 font-weight 重設為 inherit，
   demo.css 的 .demo-principle h3 只設字級、靠瀏覽器預設粗體；React 版沒有 preflight。 */
.demo-principle h3 {
  font-weight: bold;
}
</style>
