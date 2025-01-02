const express = require('express');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').config();


//authentication routes
const authRoutes = require('./routes/authRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const templateRoutes = require('./routes/templateRoutes');
const emailRoutes = require('./routes/emailRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const aiRoutes = require('./routes/aiRoutes');
const metricsRoutes = require('./routes/metricsRoutes');


// Middleware
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/campaign', campaignRoutes);
app.use('/templates', templateRoutes);
app.use('/email', emailRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/metrics', metricsRoutes);

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/campaigns", (req, res) => {
  res.status(200).json(campaigns); // Send the campaigns data
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
