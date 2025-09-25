# Vercel Environment Variables Setup

After pushing the code to GitHub, your Vercel deployment will automatically update. To enable real stock data, you need to set up environment variables in Vercel:

## 1. Access Vercel Dashboard
- Go to [vercel.com](https://vercel.com)
- Navigate to your `stop_loss_tp_calc` project

## 2. Set Environment Variables
In your Vercel project dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add these variables:

### Required Variables:
- **ALPHA_VANTAGE_KEY**: `TUI5G4DGI2MT36N7` (demo key, get your own from alphavantage.co)
- **NEWS_API_KEY**: `9ddd41e65fdd4d2abfa44e8f08b07c4e` (demo key, get your own from newsapi.org)

### Optional Variables:
- **NODE_ENV**: `production`

## 3. Redeploy
After setting the environment variables:
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment

## 4. Test Your Deployment
Once redeployed, test these endpoints:
- `https://your-app.vercel.app/api/quote?symbol=AAPL`
- `https://your-app.vercel.app/api/sentiment`
- `https://your-app.vercel.app/api/news`

## 5. Get Your Own API Keys (Recommended)
For production use:
- **Alpha Vantage**: Sign up at [alphavantage.co](https://www.alphavantage.co/support/#api-key) (free tier: 5 calls/minute)
- **NewsAPI**: Sign up at [newsapi.org](https://newsapi.org/) (free tier: 1000 requests/day)

Your app will now fetch real stock prices instead of mock data! 🚀
