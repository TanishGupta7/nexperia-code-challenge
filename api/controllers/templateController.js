const templates = require('../models/Template');

// Create a new template
const createTemplate = (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  const newTemplate = {
    id: templates.length + 1,
    title,
    content,
  };

  templates.push(newTemplate);
  res.status(201).json({ message: 'Template created successfully.', template: newTemplate });
};

const saveTemplate = (req, res) => {
  const { name, content } = req.body;

  if (!name || !content) {
    return res.status(400).json({ message: "Template name and content are required." });
  }

  const newTemplate = { id: templates.length + 1, name, content };
  templates.push(newTemplate);

  res.status(200).json({ message: "Template saved successfully.", template: newTemplate });
};
// Edit an existing template
const editTemplate = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const template = templates.find(t => t.id === parseInt(id));
  if (!template) {
    return res.status(404).json({ message: 'Template not found.' });
  }

  template.title = title || template.title;
  template.content = content || template.content;

  res.status(200).json({ message: 'Template updated successfully.', template });
};

// Get all templates
const getTemplates = (req, res) => {
  res.status(200).json(templates);
};

// Get a specific template by ID
const getTemplate = (req, res) => {
  const { id } = req.params;
  const template = templates.find(t => t.id === parseInt(id));

  if (!template) {
    return res.status(404).json({ message: 'Template not found.' });
  }

  res.status(200).json(template);
};

module.exports = { createTemplate, saveTemplate,editTemplate, getTemplates, getTemplate };
