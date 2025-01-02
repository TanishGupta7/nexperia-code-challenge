const express = require('express');
const { getCampaignAnalytics } = require('../controllers/analyticsController');

const router = express.Router();

router.get('/:campaignId', getCampaignAnalytics);

module.exports = router;
