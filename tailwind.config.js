/** @type {import('tailwindcss').Config} */
// 所有 color / spacing / radius / fontSize 都 map 到 src/styles/tokens.css 的 --cl-* 變數。
// 舊的 rgb(var(--color-*)) 條目保留給既有 class（text-text-primary 等）。
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--cl-primary)',
          light: 'var(--cl-primary-light)',
          dark: 'var(--cl-primary-dark)',
        },
        success: 'var(--cl-success)',
        warning: 'var(--cl-warning)',
        danger: 'var(--cl-danger)',
        info: 'var(--cl-info)',
        // text-text → --cl-text；text-text-secondary / text-text-placeholder → --cl-*
        // text-text-primary 是舊 class，維持 RGB 別名
        text: {
          DEFAULT: 'var(--cl-text)',
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'var(--cl-text-secondary)',
          placeholder: 'var(--cl-text-placeholder)',
        },
        border: 'var(--cl-border)',
        background: 'var(--cl-background)',
        'card-background': 'var(--cl-card-background)',
      },
      fontFamily: {
        sans: ['var(--cl-font-family)'],
      },
      fontSize: {
        title: ['var(--cl-font-size-title)', 'var(--cl-line-height-title)'],
        subtitle: ['var(--cl-font-size-subtitle)', 'var(--cl-line-height-subtitle)'],
        body: ['var(--cl-font-size-body)', 'var(--cl-line-height-body)'],
        caption: ['var(--cl-font-size-caption)', 'var(--cl-line-height-caption)'],
      },
      borderRadius: {
        card: 'var(--cl-radius-card)',
        pill: 'var(--cl-radius-pill)',
        // 舊 class rounded-button 仍可用
        button: 'var(--cl-radius-pill)',
      },
      spacing: {
        xs: 'var(--cl-space-xs)',
        sm: 'var(--cl-space-sm)',
        md: 'var(--cl-space-md)',
        lg: 'var(--cl-space-lg)',
      },
      boxShadow: {
        card: 'var(--cl-shadow-card)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
