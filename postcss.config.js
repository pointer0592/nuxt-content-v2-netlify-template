module.exports = {
  plugins: {

    'alga-css': {
      extract: [
        './pages/**/*.vue',
        './layouts/**/*.vue',
        './components/**/*.vue'
      ]

    },

    tailwindcss: {},
    autoprefixer: {}
  }
}
