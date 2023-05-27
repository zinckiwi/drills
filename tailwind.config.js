/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    cursor: {
      auto: 'auto',
      crosshair: 'crosshair',
      default: 'default',
      pointer: 'pointer',
    },
    fontFamily: {
      brand: ['Days One', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    },
      extend: {
        fontFamily: {
          'sans': ['Open Sans', ...defaultTheme.fontFamily.sans],
        },
      }

  },
  variants: ['responsive', 'group-hover', 'hover'],
  plugins: [daisyui],
}
