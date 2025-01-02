import React, { useState } from "react";
import { api } from "../../services/api";

const CsvUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await api.post("/upload-csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
      fetchCampaigns(); // Refresh campaigns after upload
    } catch (error) {
      setMessage(error.response?.data?.message || "File upload failed.");
    }
  };

  const fetchCampaigns = async () => {
    try {
      const response = await api.get("/campaigns");
      setCampaigns(response.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload CSV</h2>
      <form onSubmit={handleFileUpload}>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Choose a CSV File
          </label>
          <input
            type="file"
            className="form-control"
            id="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
      {message && <div className="alert mt-3">{message}</div>}

      <h3 className="mt-5">Uploaded Campaigns</h3>
      <ul className="list-group">
        {campaigns.map((campaign, index) => (
          <li key={index} className="list-group-item">
            Campaign {campaign.id} - {campaign.data.length} emails uploaded
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CsvUpload;