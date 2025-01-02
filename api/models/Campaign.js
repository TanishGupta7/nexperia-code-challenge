let campaigns = [];

const addCampaign = (data) => {
  const newCampaign = {
    id: campaigns.length + 1,
    data,
    status: {
      sent: 0,
      pending: data.length,  // All emails are initially pending
      failed: 0,
    },
  };
  campaigns.push(newCampaign);
  return newCampaign;
};

const updateCampaignStatus = (campaignId, status) => {
  const campaign = campaigns.find((c) => c.id === campaignId);
  if (campaign) {
    campaign.status = status;
  }
};

const getCampaignMetrics = () => {
  return campaigns.map((campaign) => ({
    id: campaign.id,
    sent: campaign.status.sent,
    pending: campaign.status.pending,
    failed: campaign.status.failed,
  }));
};

module.exports = { addCampaign, updateCampaignStatus, getCampaignMetrics };
