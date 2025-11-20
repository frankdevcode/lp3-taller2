import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0d0d0d',
        },
        foreground: '#ffffff',
        card: '#1f1f1f',
        primary: {
          DEFAULT: '#ff6b35',
          foreground: '#ffffff',
        },
        'primary-foreground': '#ffffff',
        secondary: {
          DEFAULT: '#004e89',
          foreground: '#ffffff',
        },
        'secondary-foreground': '#ffffff',
        muted: {
          DEFAULT: '#666666',
          foreground: '#999999',
        },
        'muted-foreground': '#999999',
        border: '#333333',
        input: '#2e2e2e',
        destructive: {
          DEFAULT: '#ff4444',
          foreground: '#ffffff',
        },
        accent: '#ff6b35',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

