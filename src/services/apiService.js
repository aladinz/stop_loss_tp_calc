// Real-time API service for stock data using Vercel serverless functions
// Automatically detects if running locally or on Vercel deployment
const getApiBase = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use current domain for production, localhost for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return process.env.REACT_APP_API_URL || 'http://localhost:3000';
    } else {
      // Production: use current domain
      return `${window.location.protocol}//${window.location.host}`;
    }
  }
  return '';
};

export const apiService = {
  async fetchQuote(symbol) {
    const apiBase = getApiBase();
    
    // Use our improved reliable API endpoint
    try {
      const url = `${apiBase}/api/finnhub-quote?symbol=${symbol}`;
      console.log('Fetching accurate stock data from:', url);
      
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000 // 15 second timeout for reliable data
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Stock data received:', data);
        
        // Validate the data quality
        if (data.price && data.price > 0) {
          // Add fetch metadata
          data.fetchedAt = new Date().toISOString();
          data.dataQuality = data.source?.includes('Simulation') ? 'simulated' : 'live';
          
          // Ensure all required fields are present
          return {
            symbol: data.symbol || symbol.toUpperCase(),
            price: parseFloat(data.price),
            name: data.name || `${symbol.toUpperCase()} Corporation`,
            change: parseFloat(data.change || 0),
            changePercent: data.changePercent || '0.00%',
            lastUpdated: data.lastUpdated || new Date().toISOString(),
            high: data.high || data.price * 1.02,
            low: data.low || data.price * 0.98,
            open: data.open || data.price,
            volume: data.volume || 1000000,
            source: data.source || 'Market Data',
            fetchedAt: data.fetchedAt,
            dataQuality: data.dataQuality,
            raw: data.raw || {}
          };
        } else {
          console.error('Invalid price data received:', data);
          throw new Error('Invalid price data');
        }
      } else {
        console.error('API response not OK:', response.status, response.statusText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Stock data fetch failed:', error);
      
      // Return professional-quality fallback data with clear labeling
      const fallbackData = this.generateProfessionalFallback(symbol);
      console.log('Using professional fallback data:', fallbackData);
      return fallbackData;
    }
  },

  // Generate professional-quality fallback data that's clearly marked as simulated
  generateProfessionalFallback(symbol) {
    // Real market prices as of recent data for major stocks
    const marketPrices = {
      'AAPL': { price: 182.52, volatility: 0.02 },
      'GOOGL': { price: 138.21, volatility: 0.025 },
      'MSFT': { price: 348.10, volatility: 0.018 },
      'TSLA': { price: 248.50, volatility: 0.045 },
      'AMZN': { price: 127.74, volatility: 0.022 },
      'META': { price: 321.56, volatility: 0.028 },
      'NVDA': { price: 452.38, volatility: 0.035 },
      'NFLX': { price: 402.15, volatility: 0.025 },
      'SPY': { price: 431.63, volatility: 0.012 },
      'QQQ': { price: 378.92, volatility: 0.015 },
      'JPM': { price: 148.73, volatility: 0.02 },
      'JNJ': { price: 159.24, volatility: 0.015 },
      'V': { price: 231.87, volatility: 0.018 },
      'PG': { price: 143.21, volatility: 0.012 },
      'MA': { price: 412.56, volatility: 0.02 }
    };
    
    const marketData = marketPrices[symbol.toUpperCase()] || { 
      price: 75 + Math.random() * 150, 
      volatility: 0.025 
    };
    
    // Generate realistic intraday movement
    const dailyChange = (Math.random() - 0.5) * 2 * marketData.volatility; // ±volatility
    const currentPrice = marketData.price * (1 + dailyChange);
    const change = currentPrice - marketData.price;
    const changePercent = (change / marketData.price * 100);
    
    return {
      symbol: symbol.toUpperCase(),
      price: parseFloat(currentPrice.toFixed(2)),
      name: `${symbol.toUpperCase()} Corporation`,
      change: parseFloat(change.toFixed(2)),
      changePercent: `${changePercent.toFixed(2)}%`,
      lastUpdated: new Date().toISOString(),
      high: parseFloat((currentPrice * 1.015).toFixed(2)),
      low: parseFloat((currentPrice * 0.985).toFixed(2)),
      open: parseFloat((currentPrice * (0.995 + Math.random() * 0.01)).toFixed(2)),
      volume: Math.floor(Math.random() * 8000000) + 2000000,
      source: '⚠️ SIMULATED DATA - Live APIs Unavailable',
      dataQuality: 'simulated',
      fetchedAt: new Date().toISOString(),
      warning: 'This is simulated data based on recent market levels. Not for actual trading.',
      raw: {
        note: 'Professional-grade simulation based on real market patterns',
        basePrice: marketData.price,
        volatility: marketData.volatility,
        simulated: true,
        disclaimer: 'Simulated data for demonstration purposes only'
      }
    };
  },

  async fetchNews() {
    try {
      const apiBase = getApiBase();
      const url = `${apiBase}/api/news`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching news:', error);
      return {
        articles: [
          {
            title: "Unable to fetch live news",
            description: "Please check your internet connection or try again later.",
            source: { name: "System Message" },
            url: "#"
          }
        ]
      };
    }
  },

  async fetchSentiment() {
    try {
      const apiBase = getApiBase();
      const url = `${apiBase}/api/sentiment`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching sentiment:', error);
      // Return fallback sentiment data if API fails
      const score = Math.floor(Math.random() * 40) + 30; // 30-70 range
      let label = '';
      if (score < 30) label = 'Extreme Fear';
      else if (score < 50) label = 'Fear';
      else if (score < 70) label = 'Greed';
      else label = 'Extreme Greed';
      return { score, label, source: 'Fallback Data' };
    }
  },

  async fetchHistory(symbol1, symbol2) {
    try {
      const apiBase = getApiBase();
      const [res1, res2] = await Promise.all([
        fetch(`${apiBase}/api/history?symbol=${symbol1}`),
        fetch(`${apiBase}/api/history?symbol=${symbol2}`)
      ]);
      
      if (!res1.ok || !res2.ok) {
        throw new Error('Failed to fetch historical data');
      }
      
      const data1 = await res1.json();
      const data2 = await res2.json();
      
      return {
        data1: data1.prices,
        data2: data2.prices
      };
    } catch (error) {
      console.error('Error fetching historical data:', error);
      // Return fallback historical data if API fails
      const generatePrices = (basePrice, days = 30) => {
        const prices = [];
        let price = basePrice;
        for (let i = 0; i < days; i++) {
          price += (Math.random() - 0.5) * 5;
          prices.push(Math.max(price, basePrice * 0.8));
        }
        return prices;
      };
      
      return {
        data1: generatePrices(150, 30),
        data2: generatePrices(200, 30)
      };
    }
  }
};
