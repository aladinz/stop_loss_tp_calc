// Vercel serverless function for historical data
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { symbol } = req.query;
  
  if (!symbol) {
    return res.status(400).json({ error: 'Missing symbol parameter' });
  }

  try {
    const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY || 'TUI5G4DGI2MT36N7';
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}&outputsize=compact`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data['Time Series (Daily)']) {
      const prices = Object.values(data['Time Series (Daily)'])
        .map(day => parseFloat(day['4. close']))
        .reverse()
        .slice(0, 30); // Last 30 days
        
      return res.json({ symbol: symbol.toUpperCase(), prices });
    } else if (data['Note']) {
      return res.status(429).json({ 
        error: 'API call frequency limit reached. Please try again later.',
        raw: data 
      });
    } else {
      return res.status(404).json({ 
        error: 'Historical data not found',
        raw: data 
      });
    }
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch historical data',
      details: error.message 
    });
  }
}
