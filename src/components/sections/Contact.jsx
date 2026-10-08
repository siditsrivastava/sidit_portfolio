import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { contact } from '../../data/portfolio.js'
import { Arrow } from '../ui.jsx'
import AnimatedText from '../AnimatedText.jsx'

export default function Contact() {
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sending = useRef(false)
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (sending.current) return
    const form = event.currentTarget
    const fields = Object.fromEntries(new FormData(form))
    for (const key of ['name', 'email', 'message']) {
      if (!fields[key]?.trim()) {
        setStatus('Please complete all required fields.')
        return
      }
    }
    sending.current = true
    setIsSubmitting(true)
    setStatus('Sending your enquiry…')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || result?.success !== true) {
        throw new Error(result?.error || 'Your enquiry could not be sent. Please try again or email me directly.')
      }
      form.reset()
      setStatus('Email sent successfully.')
    } catch {
      setStatus(`Please email ${contact.email} directly to complete your enquiry.`)
    } finally {
      sending.current = false
      setIsSubmitting(false)
    }
  }

  return <>
    <footer id="contact">
      <div className="section-label reveal">07 / Contact</div>
      <div className="contact-heading"><h2><AnimatedText>Have an idea?</AnimatedText><br /><i><AnimatedText delay={0.08}>Let’s make it real.</AnimatedText></i></h2><p><AnimatedText>Tell me a little about what you are building. I’ll read every detail and get back with a clear next step.</AnimatedText></p></div>
      <div className="contact-layout">
        <aside className="contact-aside reveal">
          <div className="availability"><i /><span><small>Current status</small><strong>Available for the right project</strong></span></div>
          <a href={`mailto:${contact.email}`}><small>Email</small><strong>{contact.email}</strong><Arrow /></a>
          <a href={`tel:${contact.phoneHref}`}><small>Phone</small><strong>{contact.phone}</strong><Arrow /></a>
          <div className="contact-meta"><small>Based in</small><strong>{contact.location}</strong></div>
          <div className="contact-meta"><small>Typical response</small><strong>Within 1–2 working days</strong></div>
        </aside>
        <motion.form className="contact-form reveal" onSubmit={handleSubmit} aria-busy={isSubmitting} whileHover={{ y: -3 }}>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
          <div className="field-row"><label><span>01 / Your name</span><input name="name" type="text" placeholder="What should I call you?" autoComplete="name" maxLength={100} required /></label><label><span>02 / Email address</span><input name="email" type="email" placeholder="you@company.com" autoComplete="email" maxLength={254} required /></label></div>
          <div className="field-row"><label><span>03 / Project type</span><select name="project" defaultValue="Full-stack development"><option>Full-stack development</option><option>Web application</option><option>Frontend development</option><option>AI integration & automation</option><option>Data copilot & visualization</option><option>Something else</option></select></label><label><span>04 / Budget or timeline</span><input name="budget" type="text" placeholder="e.g. 4–6 weeks" maxLength={120} /></label></div>
          <label><span>05 / Tell me about it</span><textarea name="message" rows="5" placeholder="The idea, goals, audience, and anything else I should know…" maxLength={5000} required /></label>
          <div className="form-bottom"><p>Your details are only used to reply to this enquiry.</p><button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send enquiry'} <Arrow /></button></div>
          <div className="form-status" aria-live="polite">{status}</div>
        </motion.form>
      </div>
      <div className="footer-bottom"><span>© 2026 SIDIT</span><div><a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={contact.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={`mailto:${contact.email}`}>Email ↗</a></div><a href="#top">Back to top ↑</a></div>
    </footer>
    <motion.a className="floating-status" href={`mailto:${contact.email}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} whileHover={{ y: -5, scale: 1.02 }}><i /> <span><small>STATUS</small><b>OPEN TO BUILD</b></span><Arrow /></motion.a>
  </>
}
