/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'body': 'var(--body)',
                'widget': 'var(--widget)',
                'sidebar': 'var(--sidebar)',
                'header': 'var(--header)',
                'header-light': 'var(--header-light)',
                'border-dark': 'var(--border-dark)',
                'border': 'var(--border)',
                'label': 'var(--label)',
                'yellow': 'var(--yellow)',
                'peach': 'var(--peach)',
                'turquoise': 'var(--turquoise)',
                'red': 'var(--red)',
                'blue': 'var(--blue)',
            },
            transitionDuration: {
                'DEFAULT': '300ms',
            },
            borderColor: {
                'DEFAULT': 'var(--border)',
            },
            fontFamily: {
                'sans': ['Manrope', 'sans-serif'],
            },
            screens: {
                'xxs': '375px',
                'xs': '414px',
                '3xl': '1440px',
                '4xl': '1920px',
                '5xl': '2560px',
            }
        },
    },
    plugins: [],
}