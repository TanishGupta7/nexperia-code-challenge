import React, { useState } from 'react';
import { api } from '../../services/api';

const EmailCampaign = ({ campaignData }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendEmails = async () => {
    setLoading(true);
    try {
      const response = await api.post('/email/send-campaign-emails', {
        campaignId: campaignData.id,
        templateId: campaignData.templateId, // Replace with actual template ID
        emailData: campaignData.emailData, // List of emails from CSV upload
      });
      setMessage(response.data.message || 'Emails sent successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending emails.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Email Campaign</h2>
      <button className="btn btn-primary" onClick={handleSendEmails} disabled={loading}>
        {loading ? 'Sending...' : 'Send Campaign Emails'}
      </button>
      {message && <div className="alert mt-3">{message}</div>}
    </div>
  );
};

export default EmailCampaign;
