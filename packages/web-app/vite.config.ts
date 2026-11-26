import pandacss from '@pandacss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // The runtime `css` comes from the design system, so nothing is generated here.
  plugins: [pandacss({ codegen: false }), react()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
