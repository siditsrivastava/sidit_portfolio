import express from 'express'
import nodemailer from 'nodemailer'
import { rateLimit } from 'express-rate-limit'
import { contact } from '../src/data/portfolio.js'

export function createContactRouter({ sendMail = sendEnquiry } = {}) {
  const router = express.Router()
  router.use((_req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })
  router.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many enquiries. Please try again in 15 minutes.' },
  }))
  router.use(express.json({ limit: '16kb' }))
  router.post('/', async (req, res) => {
    if (req.body?.website) return res.json({ success: true })
    const fields = {}
    const limits = { name: 100, email: 254, project: 120, budget: 120, message: 5000 }
    for (const [key, limit] of Object.entries(limits)) {
      const value = req.body?.[key]
      if (value !== undefined && typeof value !== 'string') {
        return res.status(400).json({ error: 'Please check your enquiry details.' })
      }
      fields[key] = (value ?? '').trim()
      if (fields[key].length > limit || (key !== 'budget' && !fields[key])) {
        return res.status(400).json({ error: 'Please complete all required fields within the allowed length.' })
      }
    }
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email) || /[\r\n]/.test(fields.name + fields.project)) {
      return res.status(400).json({ error: 'Please enter a valid name and email address.' })
    }
    try {
      await sendMail(fields)
      return res.json({ success: true })
    } catch (error) {
      if (error.code === 'MAIL_NOT_CONFIGURED') {
        return res.status(503).json({ error: `Email delivery is being set up. Please email ${contact.email} directly.` })
      }
      return res.status(502).json({ error: 'Your enquiry could not be sent. Please try again or email me directly.' })
    }
  })
  router.all('/', (_req, res) => res.status(405).json({ error: 'Use POST to send an enquiry.' }))
  router.use((error, _req, res, _next) => {
    const tooLarge = error.type === 'entity.too.large'
    res.status(tooLarge ? 413 : 400).json({ error: tooLarge ? 'Your enquiry is too long.' : 'Invalid enquiry data.' })
  })
  return router
}

async function sendEnquiry(fields) {
  const user = process.env.MAIL_USER?.trim()
  const pass = process.env.MAIL_APP_PASSWORD?.replace(/\s/g, '')
  if (!user || !pass) {
    throw Object.assign(new Error('Mail is not configured'), { code: 'MAIL_NOT_CONFIGURED' })
  }
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  })
  const result = await transport.sendMail({
    from: { name: 'Sidit Portfolio', address: user },
    to: contact.email,
    replyTo: { name: fields.name, address: fields.email },
    subject: `Portfolio enquiry: ${fields.project} from ${fields.name}`,
    text: `Name: ${fields.name}\nEmail: ${fields.email}\nProject: ${fields.project}\nBudget / timeline: ${fields.budget || 'Not provided'}\n\nMessage:\n${fields.message}`,
  })
  if (!result.accepted?.includes(contact.email)) throw new Error('Recipient was not accepted')
}
