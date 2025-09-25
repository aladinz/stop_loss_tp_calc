// Vercel serverless function for stock quotes
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
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // Check if we got valid data
    if (data['Global Quote'] && data['Global Quote']['05. price']) {
      return res.json({
        symbol: symbol.toUpperCase(),
        price: parseFloat(data['Global Quote']['05. price']),
        name: `${symbol.toUpperCase()} Corporation`,
        raw: data['Global Quote']
      });
    } else if (data['Note']) {
      // API limit reached
      return res.status(429).json({ 
        error: 'API call frequency limit reached. Please try again later.',
        raw: data 
      });
    } else {
      return res.status(404).json({ 
        error: 'Symbol not found or invalid response', 
        raw: data 
      });
    }
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch stock data',
      details: error.message 
    });
  }
}
