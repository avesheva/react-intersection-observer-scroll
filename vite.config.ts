import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.tsx'),
      name: 'react-intersection-observer-scroll',
      fileName: format => `react-intersection-observer-scroll.${ format }.js`,
    },
    rollupOptions: {
      external: ['react'],
    },
  },

  plugins: [react()],
})
