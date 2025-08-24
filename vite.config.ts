import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  appType: 'spa', // Enable SPA fallback for client-side routing
  server: {
    port: 5173,
    proxy: {
      '/user': process.env.BACKEND_URI || 'http://localhost:3000',
      '/analyze': process.env.BACKEND_URI || 'http://localhost:3000',
      // '/upload': 'http://localhost:3000', // REMOVE THIS LINE
      '/file': process.env.BACKEND_URI || 'http://localhost:3000',
    },
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  base: '/',
  plugins: [react(), tsconfigPaths()],
});
