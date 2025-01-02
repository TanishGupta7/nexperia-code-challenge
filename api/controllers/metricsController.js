const { getCampaignMetrics } = require('../models/Campaign');

// Get metrics for all campaigns
const getMetrics = (req, res) => {
  try {
    const metrics = getCampaignMetrics();
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign metrics', error: error.message });
  }
};

module.exports = { getMetrics };
