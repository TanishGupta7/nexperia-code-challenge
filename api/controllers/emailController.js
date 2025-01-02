const nodemailer = require('nodemailer');
const campaigns = require('../models/Campaign');
const templates = require('../models/Template');
const emailLogs = require('../models/EmailLog');
const transporter = require('../config/emailConfig'); 
const logger = require('../utils/logger');


const sendEmails = async (req, res) => {
  const { campaignId, templateId, senderEmail, senderPassword } = req.body;

  // Validate input
  if (!campaignId || !templateId || !senderEmail || !senderPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const campaign = campaigns.find((c) => c.id === campaignId);
  const template = templates.find((t) => t.id === templateId);

  if (!campaign || !template) {
    return res.status(404).json({ message: 'Campaign or template not found.' });
  }

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  const emailResults = [];
  for (const recipient of campaign.data) {
    const emailContent = template.content.replace(
      '{{first_name}}',
      recipient.first_name
    );

    const mailOptions = {
      from: senderEmail,
      to: recipient.email,
      subject: template.subject,
      html: emailContent,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      emailResults.push({ email: recipient.email, status: 'Sent', info });
    } catch (error) {
      emailResults.push({ email: recipient.email, status: 'Failed', error });
    }
  }

  // Log results
  emailLogs.push(...emailResults);

  res.status(200).json({
    message: 'Emails processed.',
    results: emailResults,
  });
};

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with your email
    to,
    subject,
    text,
    html, // For HTML emails
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } 
  
  catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

// Function to send emails from CSV data
const sendCampaignEmails = async (req, res) => {
  const { campaignId, templateId, emailData } = req.body;
  
  const template = {}; // Retrieve the template by `templateId` from the database (mocked here)

  const { subject, body } = template; // Assume these are stored in the template

  for (let i = 0; i < emailData.length; i++) {
    const email = emailData[i].email;
    const firstName = emailData[i].first_name;

    // Replace placeholders
    const personalizedSubject = subject.replace("{first_name}", firstName);
    const personalizedBody = body.replace("{first_name}", firstName);

    try {
      await sendEmail(email, personalizedSubject, personalizedBody, personalizedBody);
    } catch (error) {
      return res.status(500).json({ message: 'Error sending some emails', error: error.message });
    }
    
  }

  res.status(200).json({ message: 'Emails sent successfully.' });
};
module.exports = { sendEmails,sendEmail, sendCampaignEmails  };
