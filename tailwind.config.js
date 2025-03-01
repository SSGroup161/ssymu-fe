/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ["Montserrat", "sans-serif"],
                playwrite: ["Playwrite US Trad", "sans-serif"],
            },
            colors: {
                primary: "#C9A575",
            },
        },
    },
    plugins: [],
};
