import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 40px;
  max-width: 900px;
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
const InsightBox = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
  padding: 32px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(99, 102, 241, 0.2);
  }
`;
const InsightTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #374151;
  line-height: 1.4;
`;
const InsightText = styled.div`
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 16px;
`;
const ReadMoreLink = styled.a`
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #8b5cf6;
    text-decoration: underline;
  }
`;
const LoadingCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 48px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;
const ErrorCard = styled.div`
  background: #fef2f2;
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  border: 2px solid #fecaca;
  color: #ef4444;
  font-weight: 600;
  font-size: 1.1rem;
`;

function KeyInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError("");
      try {
        const apiUrl = process.env.REACT_APP_API_URL || '';
        const res = await axios.get(`${apiUrl}/api/news`);
        setInsights(res.data.articles);
      } catch (e) {
        setError("Failed to fetch news.");
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Key Market Insights</Title>
        <Subtitle>Stay informed with the latest financial headlines and market-moving news</Subtitle>
      </Header>
      
      {loading && (
        <LoadingCard>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📈</div>
          <div style={{ fontSize: '1.3rem', fontWeight: '600', color: '#6366f1' }}>
            Loading latest market insights...
          </div>
        </LoadingCard>
      )}
      
      {error && (
        <ErrorCard>
          ⚠️ {error}
        </ErrorCard>
      )}
      
      {insights.length > 0 && (
        <div>
          {insights.slice(0, 10).map((insight, idx) => (
            <InsightBox key={idx}>
              <InsightTitle>{insight.title}</InsightTitle>
              {(insight.description || insight.text) && (
                <InsightText>{insight.description || insight.text}</InsightText>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: '#9ca3af' }}>
                <span>📰 {insight.source?.name || 'Financial News'}</span>
                {insight.url && (
                  <ReadMoreLink href={insight.url} target="_blank" rel="noopener noreferrer">
                    Read Full Article →
                  </ReadMoreLink>
                )}
              </div>
            </InsightBox>
          ))}
        </div>
      )}
    </Container>
  );
}

export default KeyInsights;
