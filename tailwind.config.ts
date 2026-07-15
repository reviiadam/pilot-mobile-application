import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.vue',
    './layouts/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0e2138',
          light: '#1c3654',
          soft: '#eef1f5'
        },
        brand: {
          red: '#e63757'
        },
        surface: {
          bg: '#f5f6f8',
          card: '#ffffff',
          line: '#e6e9ee'
        },
        ink: {
          DEFAULT: '#0e2138',
          muted: '#5b6b80',
          faint: '#98a3b3'
        },
        status: {
          good: '#1fbf8f',
          warn: '#f59e0b',
          danger: '#e63757'
        },
        chart: {
          DEFAULT: '#22c5e8'
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif']
      },
      borderRadius: {
        card: '16px',
        pill: '999px'
      },
      boxShadow: {
        card: '0 1px 2px rgba(14,33,56,0.04), 0 8px 24px -12px rgba(14,33,56,0.12)',
        raised: '0 4px 16px -4px rgba(14,33,56,0.18)'
      }
    }
  },
  plugins: []
}
