import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        logoReveal: {
          '0%': { opacity: '0', transform: 'scale(0.5) rotate(-15deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        orbitPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        logoReveal: 'logoReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both',
        orbitPulse: 'orbitPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;