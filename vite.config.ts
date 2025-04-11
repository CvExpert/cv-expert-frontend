import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: process.env.PORT as unknown as number,
  },
  base: '/',
  plugins: [react(), tsconfigPaths()],
});
