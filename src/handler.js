// handler.js

const fetch = require('node-fetch');

module.exports.searchLyrics = async (event) => {
  const { lyrics } = event.queryStringParameters;
  try {
    const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(lyrics)}`);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error searching songs' }),
    };
  }
};
