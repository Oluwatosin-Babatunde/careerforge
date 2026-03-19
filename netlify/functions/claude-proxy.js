// netlify/functions/claude-proxy.js
const https = require('https');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not found');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured in Netlify' })
      };
    }

    const requestData = JSON.parse(event.body);

    // Use node-fetch if available, otherwise use https
    let response;
    try {
      // Try using fetch (Node 18+)
      const fetch = globalThis.fetch || (await import('node-fetch')).default;
      
      response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Anthropic API error:', data);
        return {
          statusCode: response.status,
          headers,
          body: JSON.stringify({ 
            error: data.error?.message || 'API request failed',
            details: data
          })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };

    } catch (fetchError) {
      console.error('Fetch failed, trying https module:', fetchError);
      
      // Fallback to https module
      return new Promise((resolve, reject) => {
        const postData = JSON.stringify(requestData);
        
        const options = {
          hostname: 'api.anthropic.com',
          path: '/v1/messages',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'Content-Length': Buffer.byteLength(postData)
          }
        };

        const req = https.request(options, (res) => {
          let data = '';
          
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            try {
              const jsonData = JSON.parse(data);
              
              if (res.statusCode !== 200) {
                resolve({
                  statusCode: res.statusCode,
                  headers,
                  body: JSON.stringify({ 
                    error: jsonData.error?.message || 'API request failed',
                    details: jsonData
                  })
                });
              } else {
                resolve({
                  statusCode: 200,
                  headers,
                  body: JSON.stringify(jsonData)
                });
              }
            } catch (parseError) {
              console.error('JSON parse error:', parseError);
              resolve({
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                  error: 'Failed to parse API response',
                  raw: data
                })
              });
            }
          });
        });

        req.on('error', (error) => {
          console.error('HTTPS request error:', error);
          resolve({
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
              error: 'Failed to connect to Anthropic API',
              message: error.message
            })
          });
        });

        req.write(postData);
        req.end();
      });
    }

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
