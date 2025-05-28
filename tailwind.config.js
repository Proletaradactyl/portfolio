/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'gentleBob': 'gentleBob 3s infinite ease-in-out',
        'wave': 'wave 8s linear infinite',
        'cloudFloat': 'cloudFloat 100s linear infinite',
        'birdFly': 'birdFly 30s linear infinite',
        'sway': 'sway 3s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        },
        gentleBob: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-3px) rotate(2deg)' }
        },
        wave: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        },
        cloudFloat: {
          '0%': { transform: 'translateX(-10vw)' },
          '100%': { transform: 'translateX(110vw)' }
        },
        birdFly: {
          '0%': { transform: 'translateX(-5vw) translateY(0)' },
          '25%': { transform: 'translateX(25vw) translateY(-10px)' },
          '50%': { transform: 'translateX(50vw) translateY(5px)' },
          '75%': { transform: 'translateX(75vw) translateY(-5px)' },
          '100%': { transform: 'translateX(105vw) translateY(0)' }
        },
        sway: {
          '0%': { transform: 'translateY(-100%) rotate(-1deg)' },
          '100%': { transform: 'translateY(-100%) rotate(1deg)' }
        }
      }
    },
  },
  plugins: [],
}
