import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react({
      // Desabilitar fast refresh em produção
      fastRefresh: false,
    }),
    tailwindcss(),
  ],
  
  // Configurações específicas para produção
  build: {
    // Não falhar em warnings
    rollupOptions: {
      // Duas entradas: portfólio (moises.gcodevs.com) e site comercial (gcodevs.com)
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        gcodevs: fileURLToPath(new URL('./gcodevs.html', import.meta.url)),
      },
      onwarn(warning, warn) {
        // Ignora warnings de ESLint e outros warnings não críticos
        if (warning.code === 'EVAL' || warning.code === 'UNUSED_EXTERNAL_IMPORT') {
          return;
        }
        warn(warning);
      },
    },
    
    // Otimizações para produção
    minify: 'esbuild',
    sourcemap: false,
    
    // Configurações de chunk
    chunkSizeWarningLimit: 1000,
    
    // Configurações de assets
    assetsDir: 'assets',
    
    // Configurações de output
    emptyOutDir: true,
  },
  
  // Configurações de preview
  preview: {
    port: 4173,
    host: true,
  },
  
  // Configurações de servidor de desenvolvimento
  server: {
    port: 5173,
    host: true,
  },
}); 