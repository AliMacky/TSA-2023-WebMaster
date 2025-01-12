/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                kanit: ["Kanit", "sans-serif"],
            },
            fontSize: {
                xxs: ["0.6rem"],
                xxxs: ["0.4rem"],
            },
        },
        screens: {
            lg: "1025px",
            xl: "1600px",
        },
    },
    plugins: [],
};
