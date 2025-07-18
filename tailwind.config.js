/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D6DFF',
        warning: '#FF4D4F',
        background: '#F7F8FA',
        text: {
          primary: '#1F2329',
          secondary: '#8A8F99',
        },
        border: '#E5E6EB',
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        button: '9999px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
      },
    },
  },
  plugins: [],
}
