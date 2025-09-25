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
    
    // Try to get intraday data first (more recent)
    const intradayUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${ALPHA_VANTAGE_KEY}`;
    const intradayResponse = await fetch(intradayUrl);
    const intradayData = await intradayResponse.json();
    
    // Check if we got valid intraday data
    if (intradayData['Time Series (1min)']) {
      const timeSeries = intradayData['Time Series (1min)'];
      const latestTime = Object.keys(timeSeries)[0]; // Most recent timestamp
      const latestPrice = parseFloat(timeSeries[latestTime]['4. close']);
      const previousTime = Object.keys(timeSeries)[1];
      const previousPrice = parseFloat(timeSeries[previousTime]['4. close']);
      const change = latestPrice - previousPrice;
      const changePercent = ((change / previousPrice) * 100).toFixed(2);
      
      return res.json({
        symbol: symbol.toUpperCase(),
        price: latestPrice,
        name: `${symbol.toUpperCase()} Corporation`,
        change: change,
        changePercent: `${changePercent}%`,
        lastUpdated: latestTime,
        source: 'Alpha Vantage Intraday',
        raw: { latestTime, latestPrice, previousPrice }
      });
    }
    
    // Fallback to global quote if intraday fails
    const globalUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}`;
    const globalResponse = await fetch(globalUrl);
    const globalData = await globalResponse.json();
    
    // Check if we got valid global quote data
    if (globalData['Global Quote'] && globalData['Global Quote']['05. price']) {
      const quote = globalData['Global Quote'];
      return res.json({
        symbol: symbol.toUpperCase(),
        price: parseFloat(quote['05. price']),
        name: `${symbol.toUpperCase()} Corporation`,
        change: parseFloat(quote['09. change']),
        changePercent: quote['10. change percent'],
        lastUpdated: quote['07. latest trading day'],
        source: 'Alpha Vantage Global Quote',
        raw: quote
      });
    } else if (globalData['Note']) {
      // API limit reached
      return res.status(429).json({ 
        error: 'API call frequency limit reached. Please try again later.',
        raw: globalData 
      });
    } else {
      return res.status(404).json({ 
        error: 'Symbol not found or invalid response', 
        raw: globalData 
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
