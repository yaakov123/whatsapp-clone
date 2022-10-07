/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          "whatsapp-1": "#00a884",
          "whatsapp-2": "#008069",
          "owner-message": "#d9fdd3",
          "chat-bg": "#efeae2",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
