/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            backgroundColor: {
                authBackground: '#F1F1F1',
            },
            colors: {
                themePurple: '#541554',
                hoverPurple: '#F4EDE4',
                themeGray: '#D9D9D9',
                backgroundPurple: 'var(--backgroundPurple)'
            },
        },
    },
    plugins: [],
};
