/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          950: '#030a16',
          900: '#06162d',
          850: '#092144',
          800: '#0d2d5c',
          700: '#144383',
          600: '#1a5db2',
          500: '#237be6',
          400: '#4fa1ff',
          300: '#8ac4ff',
          200: '#c2e1ff',
          100: '#e5f2ff',
        },
        cyanGlow: '#00f2fe',
        marineEmerald: '#05d5b0',
        coralAccent: '#ff6b6b'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'ocean-radial': 'radial-gradient(circle at 50% 20%, rgba(35, 123, 230, 0.15) 0%, rgba(6, 22, 45, 0) 70%)',
        'aquatic-gradient': 'linear-gradient(135deg, #06162d 0%, #030a16 100%)',
        'glow-gradient': 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'swim-across': 'swim 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        swim: {
          '0%': { transform: 'translateX(-10%) translateY(0px)' },
          '50%': { transform: 'translateX(5%) translateY(-10px)' },
          '100%': { transform: 'translateX(-10%) translateY(0px)' },
        }
      }
    },
  },
  plugins: [],
}
