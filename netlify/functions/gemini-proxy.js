// netlify/functions/gemini-proxy.js
// Serverless function that proxies requests to Google Gemini API

const https = require('https');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return { 
        statusCode: 500, 
        headers, 
        body: JSON.stringify({ error: 'GEMINI_API_KEY not configured' }) 
      };
    }

    const requestData = JSON.parse(event.body);

    return new Promise((resolve) => {
      // Convert to Gemini API format
      const geminiRequest = {
        contents: [
          {
            parts: [
              {
                text: requestData.prompt || requestData.messages?.map(m => m.content).join('\n\n')
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: requestData.max_tokens || 4000
        }
      };

      const postData = JSON.stringify(geminiRequest);
      
      const options = {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            const geminiResponse = JSON.parse(data);
            
            // Convert Gemini response to Claude-like format for compatibility
            const claudeFormat = {
              content: [
                {
                  type: 'text',
                  text: geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text || 'No response'
                }
              ]
            };
            
            resolve({
              statusCode: res.statusCode,
              headers,
              body: JSON.stringify(claudeFormat)
            });
          } catch (e) {
            resolve({
              statusCode: 500,
              headers,
              body: JSON.stringify({ error: 'Parse failed', raw: data.substring(0, 200) })
            });
          }
        });
      });

      req.on('error', (error) => {
        resolve({
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: error.message })
        });
      });

      req.write(postData);
      req.end();
    });

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
