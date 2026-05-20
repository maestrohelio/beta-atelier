// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold:       '#b5ac97',
        taupe:      '#69636e',
        dark:       '#151515',
        black:      '#000000',
        offwhite:   '#f3f1ec',
        muted:      '#929292',
        accent:     '#b8860b',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Times', 'serif'],
        sans:  ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['60px', { lineHeight: '68px', fontWeight: '400' }],
        'section': ['36px', { lineHeight: '45px', fontWeight: '500' }],
        'sub':     ['24px', { lineHeight: '32px', fontWeight: '500' }],
        'body':    ['16px', { lineHeight: '26px', fontWeight: '400' }],
        'caption': ['13px', { lineHeight: '18px', letterSpacing: '1px',
                               fontWeight: '500' }],
      },
      borderRadius: {
        none:  '0px',
        input: '4px',
      },
      transitionTimingFunction: {
        smooth: 'ease-in-out',
        fade:   'ease-out',
      },
      transitionDuration: {
        '300': '300ms',
        '400': '400ms',
      },
      boxShadow: {
        card: 'rgba(0,0,0,0.4) 0px 4px 12px 0px',
      },
      borderColor: {
        gold:    'rgb(181,172,151)',
        subtle:  'rgba(255,255,255,0.1)',
      },
    },
  },
  plugins: [],
}
