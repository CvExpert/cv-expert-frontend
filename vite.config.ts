import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendUri = env.VITE_BACKEND_URI || 'http://localhost:3000';
  // console.log('Using BACKEND_URI:', backendUri);

  return {
    appType: 'spa', // Enable SPA fallback for client-side routing
    server: {
      port: 5173,
      proxy: {
        '/user': backendUri,
        '/analyze': backendUri,
        '/file': backendUri,
      },
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
    },
    base: '/',
    plugins: [react(), tsconfigPaths()],
  };
});
