// Vercel serverless function for market sentiment
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Try Alternative Crypto Fear & Greed API (free, no key needed)
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
      
      return res.json({ 
        score, 
        label, 
        source: 'Crypto Fear & Greed Index',
        timestamp: altData.data[0].timestamp
      });
    }
    
    // Fallback: simulate realistic data if API fails
    const simulatedScore = Math.floor(Math.random() * 40) + 30; // 30-70 range
    let label = '';
    if (simulatedScore < 30) label = 'Extreme Fear';
    else if (simulatedScore < 50) label = 'Fear';
    else if (simulatedScore < 70) label = 'Greed';
    else label = 'Extreme Greed';
    
    return res.json({ 
      score: simulatedScore, 
      label, 
      source: 'Simulated Data (API Unavailable)' 
    });
    
  } catch (error) {
    console.error('Error fetching sentiment:', error);
    
    // Fallback: return simulated data
    const simulatedScore = Math.floor(Math.random() * 40) + 30;
    let label = '';
    if (simulatedScore < 30) label = 'Extreme Fear';
    else if (simulatedScore < 50) label = 'Fear';
    else if (simulatedScore < 70) label = 'Greed';
    else label = 'Extreme Greed';
    
    return res.json({ 
      score: simulatedScore, 
      label, 
      source: 'Fallback Data' 
    });
  }
}
