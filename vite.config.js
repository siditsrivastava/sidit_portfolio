import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import { createContactRouter } from './server/contact.js'
import express from 'express'

export default defineConfig({ plugins: [react(), {
  name: 'portfolio-contact-api',
  configureServer(server) {
    if (existsSync('.env')) process.loadEnvFile('.env')
    const app = express()
    app.disable('x-powered-by')
    app.use('/api/contact', createContactRouter())
    server.middlewares.use(app)
  },
}] })
