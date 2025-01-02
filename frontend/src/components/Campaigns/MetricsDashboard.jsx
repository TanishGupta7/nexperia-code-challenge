import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const MetricsDashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const response = await api.get('/metrics/metrics');
      setMetrics(response.data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Campaign Metrics Dashboard</h2>
      {loading ? (
        <p>Loading metrics...</p>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Campaign ID</th>
                <th>Sent</th>
                <th>Pending</th>
                <th>Failed</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((campaign) => (
                <tr key={campaign.id}>
                  <td>{campaign.id}</td>
                  <td>{campaign.sent}</td>
                  <td>{campaign.pending}</td>
                  <td>{campaign.failed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MetricsDashboard;
