const campaigns = require('../models/Campaign');
const emailLogs = require('../models/EmailLog');

const getCampaignAnalytics = (req, res) => {
  const { campaignId } = req.params;

  const campaign = campaigns.find((c) => c.id === parseInt(campaignId));
  if (!campaign) {
    return res.status(404).json({ message: 'Campaign not found.' });
  }

  const logsForCampaign = emailLogs.filter((log) =>
    campaign.data.some((recipient) => recipient.email === log.email)
  );

  const totalEmails = logsForCampaign.length;
  const sentEmails = logsForCampaign.filter((log) => log.status === 'Sent').length;
  const failedEmails = logsForCampaign.filter((log) => log.status === 'Failed').length;

  res.status(200).json({
    campaignId: campaignId,
    totalEmails,
    sentEmails,
    failedEmails,
  });
};

module.exports = { getCampaignAnalytics };
