const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY || 'TUI5G4DGI2MT36N7';
const NEWS_API_KEY = process.env.NEWS_API_KEY || '9ddd41e65fdd4d2abfa44e8f08b07c4e';

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://stop-loss-tp-calc.vercel.app',
        'https://*.vercel.app'
      ]
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// NewsAPI endpoint for Key Insights page
app.get('/api/news', async (req, res) => {
  try {
    // Use NewsAPI demo endpoint for top headlines (replace with your own API key for more results)
    const url = `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${NEWS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.articles) {
      res.json({ articles: data.articles });
    } else {
      res.status(404).json({ error: 'No news found', raw: data });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/api/quote', async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) return res.status(400).json({ error: 'Missing symbol' });
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    // Format response for frontend compatibility
    if (data['Global Quote'] && data['Global Quote']['05. price']) {
      res.json({
        symbol: symbol,
        price: parseFloat(data['Global Quote']['05. price']),
        name: symbol,
        raw: data['Global Quote']
      });
    } else {
      res.status(404).json({ error: 'Symbol not found or API limit reached', raw: data });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Alpha Vantage' });
  }
});

app.get('/api/history', async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) return res.status(400).json({ error: 'Missing symbol' });
  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}&outputsize=compact`;
    const response = await fetch(url);
    const data = await response.json();
    if (data['Time Series (Daily)']) {
      const prices = Object.values(data['Time Series (Daily)'])
        .map(day => parseFloat(day['4. close']))
        .reverse();
      res.json({ symbol, prices });
    } else {
      res.status(404).json({ error: 'Symbol not found or API limit reached', raw: data });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch historical data from Alpha Vantage' });
  }
});
app.get('/api/quote', async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) return res.status(400).json({ error: 'Missing symbol' });
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    // Format response for frontend compatibility
    if (data['Global Quote'] && data['Global Quote']['05. price']) {
      res.json({
        symbol: symbol,
        price: parseFloat(data['Global Quote']['05. price']),
        name: symbol,
        raw: data['Global Quote']
      });
    } else {
      res.status(404).json({ error: 'Symbol not found or API limit reached', raw: data });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Alpha Vantage' });
  }
});

// Market Sentiment (CNN Fear & Greed Index) endpoint
app.get('/api/sentiment', async (req, res) => {
  try {
    // Try Alternative Crypto Fear & Greed API first (free, no key needed)
    const altUrl = 'https://api.alternative.me/fng/';
    const altResponse = await fetch(altUrl);
    const altData = await altResponse.json();
    
    if (altData.data && altData.data[0]) {
      const score = parseInt(altData.data[0].value, 10);
      let label = '';
      if (score < 30) label = 'Extreme Fear';
      else if (score < 50) label = 'Fear'; 
      else if (score < 70) label = 'Greed';
      else label = 'Extreme Greed';
      res.json({ score, label, source: 'Crypto Fear & Greed' });
      return;
    }
    
    // Fallback: simulate realistic data if API fails
    const simulatedScore = Math.floor(Math.random() * 40) + 30; // 30-70 range
    let label = '';
    if (simulatedScore < 30) label = 'Extreme Fear';
    else if (simulatedScore < 50) label = 'Fear';
    else if (simulatedScore < 70) label = 'Greed';
    else label = 'Extreme Greed';
    res.json({ score: simulatedScore, label, source: 'Simulated' });
    
  } catch (err) {
    // Fallback: return simulated data
    const simulatedScore = Math.floor(Math.random() * 40) + 30;
    let label = '';
    if (simulatedScore < 30) label = 'Extreme Fear';
    else if (simulatedScore < 50) label = 'Fear';
    else if (simulatedScore < 70) label = 'Greed';
    else label = 'Extreme Greed';
    res.json({ score: simulatedScore, label, source: 'Simulated (Fallback)' });
  }
});

app.listen(PORT, () => {
  console.log(`Alpha Vantage proxy server running on port ${PORT}`);
});
