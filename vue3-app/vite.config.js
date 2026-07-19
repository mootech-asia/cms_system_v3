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
      // Only studio is built here — the front-end SPA (site) was replaced by
      // the static HTML site at the repo root; keeping this entry would ship
      // a dead ~40KB bundle and emit a dist/index.html that must never be
      // copied over the static site's own index.html.
      input: {
        studio: fileURLToPath(new URL('./studio/index.html', import.meta.url)),
      },
    },
  },
});
