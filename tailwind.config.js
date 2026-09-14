/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: 'var(--c-ivory)',
        porcelain: 'var(--c-porcelain)',
        beige: 'var(--c-beige)',
        sand: 'var(--c-sand)',
        taupe: 'var(--c-taupe)',
        charcoal: 'var(--c-charcoal)',
        espresso: 'var(--c-espresso)',
        metallic: 'var(--c-metallic)',
        accent: {
          DEFAULT: 'var(--c-accent)',
          light: 'var(--c-accent-light)',
          dark: 'var(--c-accent-dark)',
        },
      },
      fontFamily: {
        serif: 'var(--f-serif)',
        sans: 'var(--f-sans)',
      },
      letterSpacing: {
        'editorial-wide': '0.18em',
        'editorial-wider': '0.28em',
      },
      maxWidth: {
        'editorial': '860px',
        'gallery': '1200px',
        'wide': '1440px',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
    },
  },
  plugins: [],
};
