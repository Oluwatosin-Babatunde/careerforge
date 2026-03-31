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
      console.error('GEMINI_API_KEY not found');
      return { 
        statusCode: 500, 
        headers, 
        body: JSON.stringify({ error: 'GEMINI_API_KEY not configured. Please add it to Netlify environment variables.' }) 
      };
    }

    const requestData = JSON.parse(event.body);
    console.log('Request received, converting to Gemini format...');

    // Convert Claude format to Gemini format
    let promptText = '';
    
    if (requestData.messages && Array.isArray(requestData.messages)) {
      // Convert messages array to single prompt
      promptText = requestData.messages
        .map(msg => {
          if (typeof msg.content === 'string') {
            return msg.content;
          } else if (Array.isArray(msg.content)) {
            return msg.content.map(c => c.text || '').join('\n');
          }
          return '';
        })
        .join('\n\n');
    } else if (requestData.prompt) {
      promptText = requestData.prompt;
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No prompt or messages found in request' })
      };
    }

    return new Promise((resolve) => {
      const geminiRequest = {
        contents: [
          {
            parts: [
              {
                text: promptText
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8000,
          topP: 0.95
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
        },
        timeout: 60000
      };

      console.log('Calling Gemini API...');

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          console.log(`Gemini response status: ${res.statusCode}`);
          
          try {
            const geminiResponse = JSON.parse(data);
            
            if (res.statusCode !== 200) {
              console.error('Gemini API error:', geminiResponse);
              resolve({
                statusCode: res.statusCode,
                headers,
                body: JSON.stringify({ 
                  error: geminiResponse.error?.message || 'Gemini API error',
                  details: geminiResponse
                })
              });
              return;
            }
            
            // Extract text from Gemini response
            const responseText = geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (!responseText) {
              console.error('No text in Gemini response:', geminiResponse);
              resolve({
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                  error: 'No response text from Gemini',
                  response: geminiResponse
                })
              });
              return;
            }
            
            // Convert to Claude-compatible format
            const claudeFormat = {
              content: [
                {
                  type: 'text',
                  text: responseText
                }
              ],
              id: 'gemini-' + Date.now(),
              model: 'gemini-1.5-flash',
              role: 'assistant'
            };
            
            console.log('Successfully converted response');
            
            resolve({
              statusCode: 200,
              headers,
              body: JSON.stringify(claudeFormat)
            });
          } catch (parseError) {
            console.error('JSON parse error:', parseError);
            resolve({
              statusCode: 500,
              headers,
              body: JSON.stringify({ 
                error: 'Failed to parse Gemini response',
                details: data.substring(0, 500)
              })
            });
          }
        });
      });

      req.on('error', (error) => {
        console.error('Request error:', error);
        resolve({
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Failed to connect to Gemini API',
            message: error.message
          })
        });
      });

      req.on('timeout', () => {
        console.error('Request timeout');
        req.destroy();
        resolve({
          statusCode: 504,
          headers,
          body: JSON.stringify({ 
            error: 'Request timeout',
            message: 'Gemini API took too long to respond'
          })
        });
      });

      req.write(postData);
      req.end();
    });

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        stack: error.stack
      })
    };
  }
};
