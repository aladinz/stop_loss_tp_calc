# Stop Loss & Take Profit Calculator

A modern, beautiful React app for calculating stop loss and take profit levels for stocks and options.

## Features
- Enter ticker symbol and entry price
- Fetches company info and price
- Mini price chart
- ATR and Percentage calculators for stop loss and take profit
- Responsive, clean UI

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the app locally:**
   ```sh
   npm start
   ```
3. **Build for deployment:**
   ```sh
   npm run build
   ```
   The production build will be in the `build/` folder.

## Deployment
You can deploy the `build/` folder to any static hosting (Netlify, Vercel, GitHub Pages, etc).

## API Note
The demo uses Yahoo Finance's public endpoint for price info. For production, use a proper finance API (e.g., Finnhub, Alpha Vantage, or RapidAPI Yahoo Finance) and secure your keys.
