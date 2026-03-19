const https = require('https');

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only POST allowed
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      console.error('Missing ANTHROPIC_API_KEY');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'API key not configured',
          message: 'ANTHROPIC_API_KEY environment variable is not set'
        })
      };
    }

    // Parse request
    let requestData;
    try {
      requestData = JSON.parse(event.body);
    } catch (e) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      };
    }

    console.log('Making request to Anthropic API...');

    // Make HTTPS request
    return new Promise((resolve) => {
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
        },
        timeout: 120000 // 2 minute timeout
      };

      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          console.log(`Response status: ${res.statusCode}`);
          
          try {
            const jsonData = JSON.parse(data);
            
            resolve({
              statusCode: res.statusCode,
              headers,
              body: JSON.stringify(jsonData)
            });
          } catch (parseError) {
            console.error('Failed to parse response:', parseError);
            console.error('Raw response:', data.substring(0, 500));
            
            resolve({
              statusCode: 500,
              headers,
              body: JSON.stringify({ 
                error: 'Failed to parse API response',
                details: data.substring(0, 200)
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
            error: 'Failed to connect to Anthropic API',
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
            message: 'The request took too long to complete'
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
        message: error.message
      })
    };
  }
};
