import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import path from 'node:path'

export default defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ['../frontend/src/main.tsx'],

      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['resources/views/**/*.edge'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../frontend/src'),
      '#models': path.resolve(__dirname, './app/models'),
    },
  },
})
