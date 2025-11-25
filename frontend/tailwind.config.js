import typography from "@tailwindcss/typography";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",   // Azul oscuro profesional
        secondary: "#0F172A", // Azul petróleo para secciones contrastadas
      },
    },
  },
  plugins: [typography],
};
