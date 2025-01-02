const nodemailer = require('nodemailer');

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Can be replaced with other email services like SendGrid, Mailgun, etc.
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password', // Replace with your email password (or app-specific password for Gmail)
  },
});

module.exports = transporter;
