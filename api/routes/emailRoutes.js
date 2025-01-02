const express = require('express');
const { sendEmails,sendCampaignEmails} = require('../controllers/emailController');

const router = express.Router();

router.post('/send', sendEmails);
router.post('/send-campaign-emails', sendCampaignEmails);
router.get('/logs', (req, res) => {
    res.status(200).json(emailLogs);
  });
  
module.exports = router;
