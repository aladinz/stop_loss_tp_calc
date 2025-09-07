import React, { useState } from "react";
import styled from "styled-components";
import { apiService } from "../services/apiService";

const Container = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  min-height: 100vh;
`;
const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;
const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  font-weight: 500;
`;
const SentimentBox = styled.div`
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
  padding: 48px;
  margin-top: 32px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: ${props => {
      if (props.score < 30) return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      if (props.score < 50) return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      if (props.score < 70) return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      return 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
    }};
  }
`;
const Score = styled.div`
  font-size: 4rem;
  font-weight: 900;
  margin: 24px 0;
  background: ${props => {
    if (props.fear) return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const Label = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #374151;
`;
const Button = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 16px 48px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 32px;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
const Description = styled.div`
  color: #64748b;
  font-size: 1.1rem;
  margin-top: 16px;
  line-height: 1.6;
`;
const Gauge = styled.div`
  width: 200px;
  height: 100px;
  margin: 24px auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 100px;
    border-radius: 100px 100px 0 0;
    background: linear-gradient(90deg, 
      #ef4444 0%, 
      #f59e0b 25%, 
      #10b981 50%, 
      #22c55e 75%, 
      #16a34a 100%
    );
    border: 8px solid white;
    box-sizing: border-box;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 80px;
    background: #374151;
    left: ${props => props.score ? `${props.score * 1.96 - 2}px` : '98px'};
    top: 8px;
    border-radius: 2px;
    transform-origin: bottom center;
    transition: all 0.5s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }
`;

function MarketSentiment() {
  const [score, setScore] = useState(null);
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch real sentiment from backend
  const fetchSentiment = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiService.fetchSentiment();
      setScore(data.score);
      setLabel(data.label);
    } catch (e) {
      setError("Failed to fetch sentiment.");
      setScore(null);
      setLabel("");
    }
    setLoading(false);
  };

  return (
    <Container>
      <Header>
        <Title>Market Fear & Greed Index</Title>
        <Subtitle>Real-time market sentiment analysis to guide your trading decisions</Subtitle>
      </Header>
      
      <div style={{ textAlign: 'center' }}>
        <Button onClick={fetchSentiment} disabled={loading}>
          {loading ? "🔄 Analyzing Market..." : "📊 Get Market Sentiment"}
        </Button>
      </div>
      
      {error && (
        <div style={{ 
          color: "#ef4444", 
          marginTop: 24, 
          textAlign: 'center',
          background: '#fef2f2',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid #fecaca',
          fontWeight: '600'
        }}>
          ⚠️ {error}
        </div>
      )}
      
      {score !== null && (
        <SentimentBox score={score}>
          <Label>{label}</Label>
          <Gauge score={score} />
          <Score fear={score < 50}>{score}</Score>
          <Description>
            {score < 30 && "🔴 Extreme Fear: Investors are very worried. This could be a buying opportunity for contrarian investors."}
            {score >= 30 && score < 50 && "🟠 Fear: Investors are concerned. Market may be oversold."}
            {score >= 50 && score < 70 && "🟢 Greed: Investors are optimistic. Normal market conditions."}
            {score >= 70 && "🔥 Extreme Greed: Investors are very optimistic. Market may be overbought - consider taking profits."}
          </Description>
        </SentimentBox>
      )}
    </Container>
  );
}

export default MarketSentiment;
