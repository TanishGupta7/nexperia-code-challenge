const express = require('express');
const { createTemplate, saveTemplate, editTemplate, getTemplates, getTemplate } = require('../controllers/templateController');
const router = express.Router();

// Define routes for template management
router.post('/create', createTemplate); // Create a new template
router.put('/edit/:id', editTemplate); // Edit an existing template
router.get('/', getTemplates); // Get all templates
router.get('/:id', getTemplate); // Get a specific template by ID
router.post("/", saveTemplate);
module.exports = router;
