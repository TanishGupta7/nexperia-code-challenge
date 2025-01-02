import React, { useState } from 'react';
import { api } from '../../services/api';

const EmailSuggestions = () => {
  const [campaignDescription, setCampaignDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleGenerateSuggestions = async () => {
    setLoading(true);
    try {
      const response = await api.post('/ai/generate-email', {
        campaignDescription,
      });
      setSubject(response.data.subject);
      setBody(response.data.body);
      setMessage('Suggestions generated successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error generating suggestions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Email Suggestions</h2>
      <div className="form-group">
        <label>Campaign Description</label>
        <textarea
          className="form-control"
          rows="4"
          value={campaignDescription}
          onChange={(e) => setCampaignDescription(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleGenerateSuggestions} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Suggestions'}
      </button>

      {message && <div className="alert mt-3">{message}</div>}

      {subject && (
        <div className="mt-4">
          <h4>Suggested Subject:</h4>
          <p>{subject}</p>

          <h4>Suggested Body:</h4>
          <p>{body}</p>
        </div>
      )}
    </div>
  );
};

export default EmailSuggestions;
