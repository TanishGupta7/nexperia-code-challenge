const express = require('express');
const router = express.Router();
const { getEmailSuggestions } = require('../controllers/aiController');

router.post('/generate-email', getEmailSuggestions);

module.exports = router;
