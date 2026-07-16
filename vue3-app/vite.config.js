import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  build: {
    rollupOptions: {
      input: {
        site: fileURLToPath(new URL('./index.html', import.meta.url)),
        studio: fileURLToPath(new URL('./studio/index.html', import.meta.url)),
      },
    },
  },
});
