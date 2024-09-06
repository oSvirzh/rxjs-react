import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ tsDecorators: true }), eslint()],
  resolve: {
    alias: [
      { find: '@/pages', replacement: '/src/pages' },
      { find: '@/shared', replacement: '/src/shared' },
      { find: '@/features', replacement: '/src/features' },
      { find: '@/app', replacement: '/src/app' },
      { find: '@/core', replacement: '/src/core' },
    ],
  },
});
