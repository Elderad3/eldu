module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'azul': '#3c8dbc',
        'laranja': '#d64000'
      }
    },
    fontFamily: {
      'display': ["Segoe UI"]
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
