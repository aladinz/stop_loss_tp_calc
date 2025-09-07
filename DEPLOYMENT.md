# 🚀 Deployment Guide: Stop Loss & Take Profit Calculator

## 📋 Prerequisites
- Git account (GitHub/GitLab)
- Vercel account (free)
- Railway account (free)

## 🎯 Step 1: Deploy Backend to Railway

1. **Create Railway Account**: Go to [railway.app](https://railway.app) and sign up
2. **Connect GitHub**: Link your GitHub account
3. **Create New Project**: 
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `server` folder as root directory
4. **Set Environment Variables**:
   ```
   ALPHA_VANTAGE_KEY=TUI5G4DGI2MT36N7
   NEWS_API_KEY=9ddd41e65fdd4d2abfa44e8f08b07c4e
   NODE_ENV=production
   ```
5. **Deploy**: Railway will automatically deploy your backend
6. **Copy URL**: Note the Railway app URL (e.g., `https://your-app.railway.app`)

## 🎯 Step 2: Deploy Frontend to Vercel

1. **Create Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up
2. **Import Project**:
   - Click "New Project"
   - Import from GitHub
   - Select your repository
3. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
4. **Set Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```
5. **Deploy**: Vercel will build and deploy your React app

## 🎯 Step 3: Update CORS Settings

Update your Railway backend environment to include your Vercel domain:
```
FRONTEND_URL=https://your-app.vercel.app
```

## ✅ Step 4: Test Your Live App

Visit your Vercel URL and test all features:
- ✅ Home page calculator
- ✅ Portfolio dashboard
- ✅ Trailing stop calculator
- ✅ Volatility & correlation metrics
- ✅ Market sentiment
- ✅ Key insights

## 🌐 Your App is Now Live!

Frontend: `https://your-app.vercel.app`
Backend: `https://your-backend.railway.app`

## 🔧 Troubleshooting

**CORS Issues**: Make sure your Railway backend has the correct Vercel URL in CORS settings
**API Errors**: Check Railway logs for backend issues
**Build Errors**: Check Vercel build logs

## 📱 Mobile Access

Your app is now accessible from:
- ✅ Any web browser
- ✅ Mobile devices
- ✅ Tablets
- ✅ Desktop computers
- ✅ Anywhere in the world!

Enjoy your professional trading platform! 🎉📈
