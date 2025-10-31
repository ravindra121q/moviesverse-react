module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backdropBlur: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },
    },
  },
  plugins: [require("@iconify/tailwind4")],
};
