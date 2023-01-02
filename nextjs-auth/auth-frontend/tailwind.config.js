/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "randomly-move": "cursor-move 6s ease infinite",
      },
      keyframes: {
        "cursor-move": {
          "0%, 80%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "10%": { transform: "translate(-300px, -100px) rotate(25deg)" },
          "15%": { transform: "translate(-300px, -100px) rotate(25deg)" },
          "40%": { transform: "translate(-100px, 100px) rotate(35deg)" },
          "60%": { transform: "translate(200px, -80px) rotate(-25deg)" },
          "65%": { transform: "translate(200px, -80px) rotate(-25deg)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
}
