// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // <--- This line is likely the issue

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <--- Ensure it's called as a function
  ],
});