# Sidit Srivastava — AI Full Stack Developer

A personal portfolio showcasing production work, technical skills, experience,
education, and full-stack training. Built with React and Vite, with Framer Motion
animations and a Three.js hero scene.

## Features

- Responsive portfolio with profile, skills, experience, education, projects, and contact sections.
- Four project showcases: Real-Time Trading Platform, Email Automation Platform, AI Data Copilot, and Enterprise Management System.
- Updated resume viewing and download links.
- Custom browser-tab favicon.
- Contact form with a server-side Gmail email endpoint, client Reply-To address, validation, and submission rate limiting.
- Sending and success states, duplicate-submit prevention, and a direct-email fallback that preserves the form on failure.

## Technology

| Area | Stack |
| --- | --- |
| Frontend | React, Vite, CSS |
| Animation | Framer Motion, Three.js |
| Email API | Node.js, Express, Nodemailer |
| Request limits | express-rate-limit |
| API tests | Node.js test runner |

## Local development

Use Node.js 24 and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The development server also serves
`/api/contact`.

## Enable email delivery

Create `.env` from `.env.example` if `.env` does not already exist. Fill in the
server-only Gmail settings:

```env
MAIL_USER=siditsrivastava84@gmail.com
MAIL_APP_PASSWORD=your_gmail_app_password
PORT=3000
```

Use a Gmail app password, then restart the server after changing these settings.
See [CONTACT_SETUP.md](./CONTACT_SETUP.md) for the account setup instructions.

Notifications are sent to the email in `src/data/portfolio.js`. Replying to a
notification addresses the client who submitted the form. The API reports success
after Gmail accepts the message; actual inbox delivery requires a live test.

Without Gmail configuration, the form asks the visitor to email directly. It does
not display a successful-send message for failed requests.

`.env` is excluded from Git. Keep real credentials out of `.env.example` and
frontend environment variables.

## Build and production

```sh
npm run build
npm start
```

The Node.js server serves both the built frontend and the contact API, using
`PORT` or port `3000`. Configure the mail credentials as private server environment
variables on your hosting provider.

`npm run preview` previews the static frontend only. A static-only deployment of
`dist` needs a separately hosted `/api/contact` endpoint for email delivery.

## Tests

```sh
npm test
```

The six API tests cover validation, spam filtering, mail failure handling, missing
configuration, email recipient and Reply-To settings, and request limits. They mock
email sending and do not send real messages.

## Update portfolio content

| File | Purpose |
| --- | --- |
| `src/data/portfolio.js` | Projects, skills, experience, education, and contact details |
| `src/components/sections/IntroSections.jsx` | Hero heading and profile introduction |
| `src/components/sections/Contact.jsx` | Contact form and submission messages |
| `src/styles.css` | Portfolio styles and responsive layouts |
| `src/Scene.jsx` | Three.js hero scene |
| `public/sidit-srivastava-resume.pdf` | Downloadable resume |
| `public/favicon.svg` | Browser-tab icon |
| `index.html` | Page title, description, and favicon link |
| `server/contact.js` | Email delivery and contact API validation |
| `server/index.js` | Production web server |

## First push to GitHub

An initial commit must exist before the branch can be pushed:

```sh
git add .
git commit -m "Initial portfolio"
git push -u origin master
```

The configured remote is `https://github.com/siditsrivastava/sidit_portfolio.git`.
