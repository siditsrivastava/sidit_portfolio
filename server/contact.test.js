import test from 'node:test'
import assert from 'node:assert/strict'
import express from 'express'
import nodemailer from 'nodemailer'
import { createContactRouter } from './contact.js'
import { contact } from '../src/data/portfolio.js'

const enquiry = { name: 'Test Client', email: 'client@example.com', project: 'Web application', budget: '4 weeks', message: 'Please build an application.' }

async function withServer(options, run) {
  const app = express()
  app.use('/api/contact', createContactRouter(options))
  const server = await new Promise(resolve => {
    const instance = app.listen(0, '127.0.0.1', () => resolve(instance))
  })
  const submit = (data, method = 'POST') => fetch(`http://127.0.0.1:${server.address().port}/api/contact`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(method === 'POST' ? { body: JSON.stringify(data) } : {}),
  })
  try { await run(submit) } finally { await new Promise(resolve => server.close(resolve)) }
}

test('invalid data and oversized bodies never send mail', async () => {
  let calls = 0
  await withServer({ sendMail: async () => { calls++ } }, async submit => {
    for (const data of [{ ...enquiry, name: ' ' }, { ...enquiry, email: 'invalid' }, { ...enquiry, email: ['client@example.com'] }, { ...enquiry, name: 'Client\r\nBcc: someone@example.com' }]) {
      assert.equal((await submit(data)).status, 400)
    }
    assert.equal((await submit({ ...enquiry, message: 'x'.repeat(20000) })).status, 413)
    assert.equal(calls, 0)
  })
})

test('honeypot does not send and ordinary enquiries retain all client details', async () => {
  const sent = []
  await withServer({ sendMail: async fields => sent.push(fields) }, async submit => {
    assert.equal((await submit({ ...enquiry, website: 'spam' })).status, 200)
    assert.equal(sent.length, 0)
    const response = await submit({ ...enquiry, name: ' Test Client ' })
    assert.deepEqual(await response.json(), { success: true })
    assert.deepEqual(sent, [enquiry])
  })
})

test('mail failures do not report success', async () => {
  await withServer({ sendMail: async () => { throw new Error('SMTP failed') } }, async submit => {
    const response = await submit(enquiry)
    assert.equal(response.status, 502)
    assert.ok((await response.json()).error)
  })
})

test('missing mail setup returns a useful error without connecting to Gmail', async () => {
  const saved = process.env.MAIL_APP_PASSWORD
  delete process.env.MAIL_APP_PASSWORD
  try {
    await withServer({}, async submit => {
      const response = await submit(enquiry)
      assert.equal(response.status, 503)
      assert.ok((await response.json()).error.includes(contact.email))
    })
  } finally {
    if (saved === undefined) delete process.env.MAIL_APP_PASSWORD
    else process.env.MAIL_APP_PASSWORD = saved
  }
})

test('Gmail message uses the fixed recipient, client Reply-To, and server-only credentials', async () => {
  const original = nodemailer.createTransport
  const savedUser = process.env.MAIL_USER
  const savedPassword = process.env.MAIL_APP_PASSWORD
  process.env.MAIL_USER = 'sender@example.com'
  process.env.MAIL_APP_PASSWORD = 'test password'
  let config, mail
  nodemailer.createTransport = options => {
    config = options
    return { sendMail: async message => { mail = message; return { accepted: [contact.email] } } }
  }
  try {
    await withServer({}, async submit => assert.equal((await submit(enquiry)).status, 200))
    assert.equal(config.host, 'smtp.gmail.com')
    assert.equal(config.secure, true)
    assert.equal(config.auth.pass, 'testpassword')
    assert.equal(mail.to, contact.email)
    assert.equal(mail.from.address, 'sender@example.com')
    assert.deepEqual(mail.replyTo, { name: enquiry.name, address: enquiry.email })
    assert.ok(mail.text.includes(enquiry.message))
    assert.ok(mail.text.includes(enquiry.budget))
    nodemailer.createTransport = () => ({ sendMail: async () => ({ accepted: [] }) })
    await withServer({}, async submit => assert.equal((await submit(enquiry)).status, 502))
  } finally {
    nodemailer.createTransport = original
    if (savedUser === undefined) delete process.env.MAIL_USER
    else process.env.MAIL_USER = savedUser
    if (savedPassword === undefined) delete process.env.MAIL_APP_PASSWORD
    else process.env.MAIL_APP_PASSWORD = savedPassword
  }
})

test('submission rate is limited and unsupported methods are rejected', async () => {
  await withServer({ sendMail: async () => {} }, async submit => {
    assert.equal((await submit(null, 'GET')).status, 405)
    for (let index = 0; index < 4; index++) assert.equal((await submit(enquiry)).status, 200)
    assert.equal((await submit(enquiry)).status, 429)
  })
})
