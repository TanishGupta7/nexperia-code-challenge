const express = require('express');
const { upload, uploadCSV } = require('../controllers/campaignController');

const router = express.Router();

// Endpoint for uploading CSV
router.post('/upload', upload.single('file'), uploadCSV);

module.exports = router;
