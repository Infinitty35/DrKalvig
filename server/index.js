'use strict';

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { sendEmail } = require('./sendEmail');

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
}));

// Validate that email is a plausible email address (no-regex to avoid ReDoS)
function isValidEmail(addr) {
  const at = typeof addr === 'string' ? addr.indexOf('@') : -1;
  if (at < 1) return false;
  const domain = addr.slice(at + 1);
  const dot = domain.lastIndexOf('.');
  return dot > 0 && dot < domain.length - 1 && !domain.includes('@');
}

// Contact-form submission endpoint
app.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields: name, email, message' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  try {
    await sendEmail({ name, email, phone, message });
    return res.json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
  }
});

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Email server listening on port ${PORT}`);
});
