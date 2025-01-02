const { Configuration, OpenAIApi } = require('openai');

// Replace with your OpenAI API key
const configuration = new Configuration({
  apiKey: 'your-openai-api-key', 
});

const openai = new OpenAIApi(configuration);

module.exports = openai;
