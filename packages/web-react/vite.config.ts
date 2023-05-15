/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';


// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    watch: false,
  },
  plugins: [react(),
    vitePluginFaviconsInject('./public/city-agri-logo.svg'),]
});
