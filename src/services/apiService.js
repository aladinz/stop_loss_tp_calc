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
    try {
      const apiBase = getApiBase();
      const url = `${apiBase}/api/quote?symbol=${symbol}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching stock quote:', error);
      throw new Error(`Failed to fetch stock data for ${symbol}. ${error.message}`);
    }
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
