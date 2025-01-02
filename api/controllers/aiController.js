const openai = require('../config/openaiConfig');

// Function to generate email subject and body using OpenAI
const generateEmailContent = async (description) => {
  try {
    const prompt = `Generate a catchy email subject and body for the following campaign description: ${description}`;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 300,
    });

    const aiResponse = response.data.choices[0].text.trim();
    const [subject, body] = aiResponse.split('\n');

    return { subject, body };
  } catch (error) {
    console.error('Error generating email content:', error);
    throw new Error('Failed to generate email content');
  }
};

// API endpoint for generating email suggestions
const getEmailSuggestions = async (req, res) => {
  const { campaignDescription } = req.body;

  if (!campaignDescription) {
    return res.status(400).json({ message: 'Campaign description is required.' });
  }

  try {
    const { subject, body } = await generateEmailContent(campaignDescription);
    res.status(200).json({ subject, body });
  } catch (error) {
    res.status(500).json({ message: 'Error generating email suggestions', error: error.message });
  }
};

module.exports = { getEmailSuggestions };
