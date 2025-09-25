// IEX Cloud API for accurate real-time stock data
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
    // IEX Cloud API - Free tier available
    const IEX_KEY = process.env.IEX_CLOUD_KEY || 'pk_c0a457ad42f742cd86d85d7b73b6a4f0';
    
    // Get real-time quote
    const baseUrl = 'https://cloud.iexapis.com/stable';
    const quoteUrl = `${baseUrl}/stock/${symbol}/quote?token=${IEX_KEY}`;
    
    const response = await fetch(quoteUrl);

    if (!response.ok) {
      throw new Error(`IEX Cloud API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.latestPrice && data.latestPrice > 0) {
      const currentPrice = data.latestPrice;
      const previousClose = data.previousClose || currentPrice;
      const change = data.change || (currentPrice - previousClose);
      const changePercent = data.changePercent ? (data.changePercent * 100).toFixed(2) : '0.00';
      
      return res.json({
        symbol: data.symbol || symbol.toUpperCase(),
        price: parseFloat(currentPrice.toFixed(2)),
        name: data.companyName || `${symbol.toUpperCase()} Corporation`,
        change: parseFloat(change.toFixed(2)),
        changePercent: `${changePercent}%`,
        lastUpdated: data.latestTime || new Date().toISOString(),
        high: data.high,
        low: data.low,
        open: data.open,
        previousClose: data.previousClose,
        volume: data.latestVolume,
        marketCap: data.marketCap,
        source: 'IEX Cloud Real-time',
        raw: {
          latestPrice: data.latestPrice,
          latestTime: data.latestTime,
          latestUpdate: data.latestUpdate,
          latestVolume: data.latestVolume,
          change: data.change,
          changePercent: data.changePercent,
          high: data.high,
          low: data.low,
          open: data.open,
          previousClose: data.previousClose,
          marketCap: data.marketCap,
          peRatio: data.peRatio,
          week52High: data.week52High,
          week52Low: data.week52Low
        }
      });
    } else {
      return res.status(404).json({ 
        error: 'Symbol not found or invalid response from IEX Cloud', 
        raw: data 
      });
    }
  } catch (error) {
    console.error('Error fetching from IEX Cloud:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch stock data from IEX Cloud',
      details: error.message 
    });
  }
}
