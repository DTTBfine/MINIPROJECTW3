/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      witdh: {
        '1100': '1100px'
      },
      backgroundColor: {
        primary: '#e49dab',
        secondary: '#f78da7',
        grey: '#918c8d',
        'overlay-30': 'rgba(0,0,0,0.3)',
        'overlay-10': 'rgba(0,0,0,0.1)',
        'overlay-0': 'rgba(0,0,0,0)'
      },
      maxWidth: {
        '600': '600px'
      },
      cursor: {
        pointer: 'pointer'
      },
      textShadow: {
        'xl': '4px 4px 6px rgba(0, 0, 0, 0.1)', // Đổ bóng lớn
        'lg': '2px 2px 4px rgba(0, 0, 0, 0.2)', // Đổ bóng nhỏ hơn
      }
    },
  },
  plugins: [],
}