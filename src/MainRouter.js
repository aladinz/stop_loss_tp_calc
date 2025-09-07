import MarketSentiment from "./pages/MarketSentiment";
import KeyInsights from "./pages/KeyInsights";
import VolatilityCorrelation from "./pages/VolatilityCorrelation";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./pages/Home";
import PortfolioDashboard from "./pages/PortfolioDashboard";
import TrailingStop from "./pages/TrailingStop";

function MainRouter() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/portfolio" element={<PortfolioDashboard />} />
  <Route path="/trailing-stop" element={<TrailingStop />} />
  <Route path="/volatility-correlation" element={<VolatilityCorrelation />} />
  <Route path="/market-sentiment" element={<MarketSentiment />} />
  <Route path="/key-insights" element={<KeyInsights />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
