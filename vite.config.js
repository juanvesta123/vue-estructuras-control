import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/vue-estructuras-control/',
  test: { environment: 'jsdom' },
})
