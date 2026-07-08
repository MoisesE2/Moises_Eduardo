// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      // Duas entradas: portfólio (moises.gcodevs.com) e site comercial (gcodevs.com)
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        gcodevs: fileURLToPath(new URL('./gcodevs.html', import.meta.url)),
      },
    },
  },
});
