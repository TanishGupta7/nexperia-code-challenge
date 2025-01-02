const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse'); // Import csv-parse
const campaigns = require('../models/Campaign');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Files will be stored in "uploads" folder

// Function to validate and parse CSV
const uploadCSV = async (req, res) => {
  const file = req.file;

  if (!file || path.extname(file.originalname) !== '.csv') {
    return res.status(400).json({ message: 'Please upload a valid CSV file.' });
  }

  const emailData = [];
  const errors = []; // Array to collect invalid rows
  const filePath = file.path;

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8'); // Read file content

    // Parse CSV using csv-parse
    parse(
      fileContent,
      {
        columns: true, // Treat first row as headers
        trim: true, // Trim whitespace from fields
      },
      (err, rows) => {
        if (err) {
          fs.unlinkSync(filePath); // Cleanup file on error
          return res.status(400).json({ message: 'Error parsing CSV file.', error: err.message });
        }

        // Validate each row
        rows.forEach((row, index) => {
          const email = row['email'];
          const firstName = row['first_name'];

          // Check if required fields are present
          if (!email || !firstName) {
            console.log('Invalid Row:', row);
            errors.push({ row: index + 1, data: row }); // Log the invalid row
          } else {
            emailData.push({ email: email.trim(), first_name: firstName.trim() });
          }
        });

        // Cleanup uploaded file
        fs.unlinkSync(filePath);

        // If there are errors, send them in the response
        if (errors.length > 0) {
          return res.status(400).json({
            message: 'Invalid rows found in the CSV.',
            errors: errors,
          });
        }

        // If all rows are valid, save data
        campaigns.push({ id: campaigns.length + 1, data: emailData });

        // Send success response
        res.status(200).json({
          message: 'CSV uploaded successfully.',
          campaignId: campaigns.length,
        });
      }
    );
  } catch (error) {
    fs.unlinkSync(filePath); // Cleanup file on unexpected error
    res.status(500).json({ message: 'An error occurred while processing the file.', error: error.message });
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

on('data', (row) => {
  const trimmedRow = {
    email: row['email']?.trim(),
    first_name: row['first_name']?.trim(),
  };

  console.log('Parsed Row:', trimmedRow);

  if (!trimmedRow.email || !trimmedRow.first_name || !validateEmail(trimmedRow.email)) {
    console.log('Invalid Row:', trimmedRow);
    errorOccurred = true;
  } else {
    emailData.push(trimmedRow);
  }
});


module.exports = { upload, uploadCSV };
