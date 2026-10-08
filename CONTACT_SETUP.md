# Enable contact enquiry emails

The form sends enquiries to `/api/contact`. The server sends them through Gmail
to `siditsrivastava84@gmail.com`. The client's email is the Reply-To address.
The Gmail account is the sender; clicking Reply in your inbox addresses the client.

## Configure Gmail

1. Enable 2-Step Verification on your Google account.
2. Create a Gmail app password at https://myaccount.google.com/apppasswords.
3. If `.env` does not already exist, copy `.env.example` to `.env` in the project root.
4. Set `MAIL_APP_PASSWORD` in `.env` to that app password. Keep `MAIL_USER` as your Gmail address.
5. Keep the password out of chat, source control, and any `VITE_` environment variables.
6. Restart `npm run dev`, then submit an enquiry. Check your inbox and Spam.

Google's instructions: https://support.google.com/accounts/answer/185833.
Some Google accounts do not support app passwords; see the linked instructions.

## Run the portfolio

- Development: `npm run dev`. Vite serves the contact API as well as the frontend.
- Production: `npm run build`, then `npm start`. This serves both `dist` and the email API.
- Set `MAIL_USER` and `MAIL_APP_PASSWORD` as private environment variables on your Node.js hosting server.
- A static-only deployment of `dist` cannot send emails. Use the Node.js server or route `/api/contact` to it.

The API validates input, limits request size and submission frequency, and includes
a hidden spam field. It returns success only after Gmail accepts the message.
Missing mail configuration produces an API error; the form shows a simple
direct-email fallback instead of technical error details.
The browser preserves all fields on failure and prevents duplicate submissions while sending.

Actual inbox delivery still needs a test with configured credentials.
