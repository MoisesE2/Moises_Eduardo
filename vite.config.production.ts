import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

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