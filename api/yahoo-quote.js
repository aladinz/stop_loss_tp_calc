// Alternative stock quote API using Yahoo Finance for more accurate real-time data
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
    // Yahoo Finance API (unofficial but more real-time)
    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?region=US&lang=en-US&includePrePost=false&interval=1m&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance`;
    
    const response = await fetch(yahooUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Yahoo Finance API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.chart && data.chart.result && data.chart.result[0]) {
      const result = data.chart.result[0];
      const meta = result.meta;
      const currentPrice = meta.regularMarketPrice || meta.previousClose;
      const previousClose = meta.previousClose;
      const change = currentPrice - previousClose;
      const changePercent = ((change / previousClose) * 100).toFixed(2);
      
      return res.json({
        symbol: symbol.toUpperCase(),
        price: parseFloat(currentPrice.toFixed(2)),
        name: meta.longName || `${symbol.toUpperCase()} Corporation`,
        change: parseFloat(change.toFixed(2)),
        changePercent: `${changePercent}%`,
        lastUpdated: new Date(meta.regularMarketTime * 1000).toISOString(),
        marketState: meta.marketState,
        source: 'Yahoo Finance',
        raw: {
          currentPrice,
          previousClose,
          marketState: meta.marketState,
          currency: meta.currency,
          exchangeName: meta.exchangeName
        }
      });
    } else {
      return res.status(404).json({ 
        error: 'Symbol not found in Yahoo Finance', 
        raw: data 
      });
    }
  } catch (error) {
    console.error('Error fetching from Yahoo Finance:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch stock data from Yahoo Finance',
      details: error.message 
    });
  }
}
