// Simplified API functions for static deployment
const API_BASE = '';

// Mock API responses for static deployment
const mockStockData = {
  symbol: 'AAPL',
  price: 175.43,
  name: 'Apple Inc.',
  raw: { '05. price': '175.43' }
};

const mockNews = [
  {
    title: "Markets Rally on Strong Economic Data",
    description: "Stock markets continue their upward trend as economic indicators show positive growth.",
    source: { name: "Financial News" },
    url: "#"
  },
  {
    title: "Tech Sector Leads Market Gains",
    description: "Technology stocks are outperforming other sectors with significant gains across major indices.",
    source: { name: "Market Watch" },
    url: "#"
  },
  {
    title: "Federal Reserve Maintains Interest Rates",
    description: "The Federal Reserve decided to keep interest rates unchanged, supporting market stability.",
    source: { name: "Economic Times" },
    url: "#"
  }
];

// Check if we're in a local development environment
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const apiService = {
  async fetchQuote(symbol) {
    if (isLocal) {
      // Use local API when running locally
      const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/quote?symbol=${symbol}`);
      return await response.json();
    } else {
      // Use mock data for static deployment
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      return {
        ...mockStockData,
        symbol: symbol.toUpperCase(),
        name: `${symbol.toUpperCase()} Corporation`
      };
    }
  },

  async fetchNews() {
    if (isLocal) {
      const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/news`);
      return await response.json();
    } else {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { articles: mockNews };
    }
  },

  async fetchSentiment() {
    if (isLocal) {
      const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/sentiment`);
      return await response.json();
    } else {
      await new Promise(resolve => setTimeout(resolve, 600));
      const score = Math.floor(Math.random() * 60) + 20; // 20-80 range
      let label = '';
      if (score < 30) label = 'Extreme Fear';
      else if (score < 50) label = 'Fear';
      else if (score < 70) label = 'Greed';
      else label = 'Extreme Greed';
      return { score, label, source: 'Demo Data' };
    }
  },

  async fetchHistory(symbol1, symbol2) {
    if (isLocal) {
      const [res1, res2] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL || ''}/api/history?symbol=${symbol1}`),
        fetch(`${process.env.REACT_APP_API_URL || ''}/api/history?symbol=${symbol2}`)
      ]);
      return {
        data1: (await res1.json()).prices,
        data2: (await res2.json()).prices
      };
    } else {
      await new Promise(resolve => setTimeout(resolve, 1200));
      // Generate mock historical data
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
