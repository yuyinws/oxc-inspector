import { DevTools } from '@vitejs/devtools'
import { defineConfig } from 'vite'
import { DevToolsOxc } from 'oxc-inspector/vite'

export default defineConfig({
  plugins: [DevTools(), DevToolsOxc()],
  build: {
    rolldownOptions: {
      devtools: {}, // enable devtools mode
    },
  },
})
