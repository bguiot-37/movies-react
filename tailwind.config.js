/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      font_1: ["font_1", "sans-serif"],
      font_2: ["font_2", "sans-serif"],
    },
    colors: {
      color_1: "#546fe4",
      color_2: "#212040",
      color_3: "rgb(100, 100, 100)",
      black: "#060d2c",
      white: "rgb(238, 238, 238)",
      alert: "#FF0000",
      gradientFrom: "rgba(195, 34, 34, 0)",
      gradientTo: "rgba(6, 13, 44, 0.55)",
      modalBg: "rgba(51, 51, 51, .6)",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
