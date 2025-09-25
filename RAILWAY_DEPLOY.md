# Railway Deployment Guide

## Deploy Backend to Railway

1. Visit [railway.app](https://railway.app) and sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your `stop_loss_tp_calc` repository
4. Railway will detect the server folder and deploy it automatically

## Environment Variables

Set these in Railway dashboard:
- `ALPHA_VANTAGE_KEY`: Your Alpha Vantage API key (or use the demo key: TUI5G4DGI2MT36N7)
- `NEWS_API_KEY`: Your NewsAPI key (or use the demo key: 9ddd41e65fdd4d2abfa44e8f08b07c4e)
- `NODE_ENV`: production

## After Deployment

1. Copy your Railway app URL (e.g., https://your-app.railway.app)
2. Update the REACT_APP_API_URL in your frontend environment variables
3. Redeploy your frontend to Vercel/Netlify with the new backend URL

## Test Your Deployment

Visit: `https://your-railway-app.railway.app/api/quote?symbol=AAPL`
