import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  envPrefix: 'REACT_APP_',
  plugins: [react(), tsconfigPaths({ root: '.' }), eslint()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    port: 8081,
  },
})
