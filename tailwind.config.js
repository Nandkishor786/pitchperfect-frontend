import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class", //  dark mode enable
  theme: {
    extend: {
      colors: {
        primary: "#5044E5",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [scrollbar],
};
