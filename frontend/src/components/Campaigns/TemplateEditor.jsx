import React, { useState } from "react";
import ReactQuill from "react-quill";
import { api } from "../../services/api";

const TemplateEditor = () => {
  const [templateContent, setTemplateContent] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [message, setMessage] = useState("");

  const handleSaveTemplate = async () => {
    if (!templateName.trim() || !templateContent.trim()) {
      setMessage("Please provide a template name and content.");
      return;
    }

    try {
      const response = await api.post("/templates", {
        name: templateName,
        content: templateContent,
      });
      setMessage(response.data.message || "Template saved successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to save the template.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Email Template</h2>

      <div className="mb-3">
        <label htmlFor="templateName" className="form-label">
          Template Name
        </label>
        <input
          type="text"
          className="form-control"
          id="templateName"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="templateEditor" className="form-label">
          Template Content
        </label>
        <ReactQuill
          theme="snow"
          value={templateContent}
          onChange={setTemplateContent}
          placeholder="Write your email template here..."
        />
      </div>

      <button className="btn btn-primary" onClick={handleSaveTemplate}>
        Save Template
      </button>

      {message && <div className="alert mt-3">{message}</div>}
    </div>
  );
};

export default TemplateEditor;
