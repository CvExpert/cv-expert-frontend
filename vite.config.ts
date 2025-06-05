import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  appType: 'spa', // Enable SPA fallback for client-side routing
  server: {
    port: 5173,
    proxy: {
      '/user': 'http://localhost:3000',
      '/analyze': 'http://localhost:3000',
      // '/upload': 'http://localhost:3000', // REMOVE THIS LINE
      '/file': 'http://localhost:3000', // Add this if your API is /file/*
    },
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  base: '/',
  plugins: [react(), tsconfigPaths()],
});
