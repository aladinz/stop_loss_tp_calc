// Vercel serverless function for financial news
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const NEWS_API_KEY = process.env.NEWS_API_KEY || '9ddd41e65fdd4d2abfa44e8f08b07c4e';
    const url = `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${NEWS_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.articles && data.articles.length > 0) {
      // Filter out articles with null or empty content
      const validArticles = data.articles
        .filter(article => article.title && article.description)
        .slice(0, 10); // Limit to 10 articles
        
      return res.json({ articles: validArticles });
    } else {
      // Fallback news data
      const fallbackNews = [
        {
          title: "Markets Show Mixed Performance",
          description: "Stock markets display varied performance across different sectors with technology leading gains.",
          source: { name: "Market Update" },
          url: "#"
        },
        {
          title: "Economic Indicators Signal Growth",
          description: "Recent economic data suggests continued growth momentum in key sectors of the economy.",
          source: { name: "Economic Report" },
          url: "#"
        },
        {
          title: "Federal Reserve Policy Update",
          description: "Central bank maintains current monetary policy stance while monitoring inflation trends.",
          source: { name: "Fed Watch" },
          url: "#"
        }
      ];
      
      return res.json({ articles: fallbackNews });
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    
    // Fallback news data
    const fallbackNews = [
      {
        title: "News Service Temporarily Unavailable",
        description: "Unable to fetch live financial news at this time. Please check back later for updated market news.",
        source: { name: "System Notice" },
        url: "#"
      }
    ];
    
    return res.json({ articles: fallbackNews });
  }
}
