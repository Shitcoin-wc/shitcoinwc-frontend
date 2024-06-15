/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {

      animation: {
        'fade-in': 'fadeIn 3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      maxWidth: {
        'maxWidth1200': '1200px',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'], 
        'baloo': ['Baloo', 'sans-serif'],
      },   
      fontSize: {
        '2xs': '.75em',
        'xs': 'clamp(0.8125rem, 0.7898rem + 0.1136vi, 0.875rem)',
        'sm': 'clamp(0.9375rem, 0.892rem + 0.2273vi, 1.0625rem)',
        'base': 'clamp(1rem, 0.9273rem + 0.3636vi, 1.2rem)',
        'lg': 'clamp(1.15rem, 0.4836vi + 1.0533rem, 1.416rem)',
        'xl': 'clamp(1.3225rem, 0.6334vi + 1.1958rem, 1.6709rem)',
        '2xl': 'clamp(1.5209rem, 0.8196vi + 1.357rem, 1.9716rem)',
        '3xl': 'clamp(1.749rem, 1.05vi + 1.539rem, 2.3265rem)',
        '4xl': 'clamp(2.0114rem, 1.3345vi + 1.7445rem, 2.7453rem)',
        '5xl': 'clamp(2.3131rem, 1.6844vi + 1.9762rem, 3.2395rem)',
      },
      colors: {
        'blue3': 'var(--color-blue3)',
        'pale-grey': 'var(--color-pale-grey)',
        'super-light-turquoise': 'var(--color-super-light-turquoise)',
        'juicy-peach': 'var(--color-juicy-peach)',
        'light-peach': 'var(--color-light-peach)',
        'super-light-peach': 'var(--color-super-light-peach)',
        'ultra-light-peach': 'var(--color-ultra-light-peach)',
        'tuiles-bg': 'var(--color-tuiles-bg)',
        'pure-white': 'var(--color-pure-white)',
        'mint-cream': 'var(--color-mint-cream)',
        'button-bg': 'var(--color-button-bg)',
        'button-text': 'var(--color-button-text)',
        'header-bg': 'var(--color-header-bg)',
        'header-color': 'var(--color-header-color)',
        'dusty-rose': 'var(--color-dusty-rose)',
        'frosty-lavender': 'var(--color-frosty-lavender)',
        'misty-lavender': 'var(--color-misty-lavender)',
      },
      textColor: {
      },
    },
  },
  plugins: [],
}