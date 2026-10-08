import express from 'express'
import { fileURLToPath } from 'node:url'
import { createContactRouter } from './contact.js'

const app = express()
const distPath = fileURLToPath(new URL('../dist/', import.meta.url))
app.disable('x-powered-by')
app.use('/api/contact', createContactRouter())
app.use('/api', (_req, res) => res.status(404).json({ error: 'Endpoint not found.' }))
app.use(express.static(distPath))
app.get('/{*path}', (_req, res) => res.sendFile('index.html', { root: distPath }))
const port = Number(process.env.PORT || 3000)
app.listen(port, () => console.log(`Portfolio available at http://localhost:${port}`))
