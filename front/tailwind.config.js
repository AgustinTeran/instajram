/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
    	{
        mytheme: {
          primary: "#000",
          secondary: "#00f",
          accent: "#000",
          neutral: "#000",
          "base-content": "#000", /* Color de la letra */
          "base-100": "#fff",
          "base-200": "#eee",
          "base-300": "#ccc",
          error:"#d00"
        },
    	},
      {
        myDark: {
          primary: "#000",
          secondary: "#00f",
          accent: "#444",
          neutral: "#444",
          "base-content": "#fff", /* Color de la letra */
          "base-100": "#222",
          "base-200": "#fff",
          "base-300": "#444",
          error:"#d00"
      },
    },
    ],
  },
}


