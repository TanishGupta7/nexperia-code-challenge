import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CsvUpload from "./components/Campaigns/CsvUpload";
import TemplateEditor from "./components/Campaigns/TemplateEditor";
import EmailCampaign from "./components/Campaigns/EmailCampaign";
import EmailSuggestions from './components/Campaigns/EmailSuggestions'; 
import MetricsDashboard from './components/Campaigns/MetricsDashboard'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload-csv" element={<CsvUpload />} />
        <Route path="/template-editor" element={<TemplateEditor />} />
        <Route path="/EmailCampaign" element={<EmailCampaign />} />
        <Route path="/ai-suggestions" element={<EmailSuggestions />} />
        <Route path="/metrics-dashboard" element={<MetricsDashboard />} />

      </Routes>
    </Router>
  );
};

export default App;
