/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#000000", // yes
        background: "#F2EFE4", //yes
        primary: "#100F0D", //yes
        secondary: "#A6A39D", // yes
        accent: "#FFFBF2", // yes
      },
    },
    animation: {
      "bounce-1": "bounce 1s linear infinite",
      "bounce-2": "bounce 1s 0.1s linear infinite",
      "bounce-3": "bounce 1s 0.2s linear infinite"
    }
  },
  plugins: [],
};
