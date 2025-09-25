// Simple API test endpoint for debugging
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Return environment information for debugging
  return res.json({
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV || 'development',
      hasAlphaVantageKey: !!process.env.ALPHA_VANTAGE_KEY,
      hasNewsApiKey: !!process.env.NEWS_API_KEY,
    },
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
    }
  });
}
