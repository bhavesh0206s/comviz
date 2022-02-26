module.exports = {
    content: ['./public/**/*.html', './src/**/*.{js,ts,jsx,tsx}'],
    media: false, // or 'media' or 'class'
    theme: {
        screens: {
            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
            '3xl': '1872px',
            // => @media (min-width: 1536px) { ... }
        },
        fontFamily: {
            inter: ['Inter', 'sans-serif'],
            sora: ['Sora', 'sans-serif'],
        },
        extend: {
            transitionProperty: {
                height: 'height',
                spacing: 'margin, padding',
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['checked'],
            borderColor: ['checked'],
        },
    },
    plugins: [require('daisyui')],
};
