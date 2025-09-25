import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiService } from "../services/apiService";
import { useTheme } from "../contexts/ThemeContext";

const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
  background: ${props => props.theme.isDarkMode 
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)'
  };
  min-height: 100vh;
  transition: all 0.3s ease;
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
  color: ${props => props.theme.isDarkMode ? '#94a3b8' : '#64748b'};
  font-weight: 500;
  transition: color 0.3s ease;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 24px;
  background: ${props => props.isLive 
    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  };
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const InsightBox = styled.div`
  background: ${props => props.theme.isDarkMode 
    ? 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)'
    : 'white'
  };
  border-radius: 20px;
  box-shadow: ${props => props.theme.isDarkMode 
    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
    : '0 8px 32px rgba(99, 102, 241, 0.15)'
  };
  padding: 32px;
  margin-bottom: 24px;
  border: 1px solid ${props => props.theme.isDarkMode 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(255, 255, 255, 0.2)'
  };
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.isDarkMode 
      ? '0 12px 40px rgba(0, 0, 0, 0.4)'
      : '0 12px 40px rgba(99, 102, 241, 0.2)'
    };
  }
`;

const InsightTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${props => props.theme.isDarkMode ? '#f8fafc' : '#374151'};
  line-height: 1.4;
  transition: color 0.3s ease;
`;
const InsightText = styled.div`
  font-size: 1.1rem;
  color: ${props => props.theme.isDarkMode ? '#94a3b8' : '#64748b'};
  line-height: 1.6;
  margin-bottom: 16px;
  transition: color 0.3s ease;
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
  background: ${props => props.theme.isDarkMode 
    ? 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)'
    : 'white'
  };
  border-radius: 20px;
  padding: 48px;
  text-align: center;
  box-shadow: ${props => props.theme.isDarkMode 
    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
    : '0 8px 32px rgba(99, 102, 241, 0.15)'
  };
  border: 1px solid ${props => props.theme.isDarkMode 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(255, 255, 255, 0.2)'
  };
  transition: all 0.3s ease;
`;

const LoadingText = styled.div`
  color: ${props => props.theme.isDarkMode ? '#f8fafc' : '#6366f1'};
  font-size: 1.3rem;
  font-weight: 600;
  transition: color 0.3s ease;
`;

const ErrorCard = styled.div`
  background: ${props => props.theme.isDarkMode 
    ? 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)'
    : '#fef2f2'
  };
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  border: 2px solid ${props => props.theme.isDarkMode ? '#dc2626' : '#fecaca'};
  color: ${props => props.theme.isDarkMode ? '#fca5a5' : '#ef4444'};
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
`;

const NewsSource = styled.span`
  color: ${props => props.theme.isDarkMode ? '#94a3b8' : '#9ca3af'};
  font-size: 0.9rem;
  transition: color 0.3s ease;
`;

function KeyInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newsData, setNewsData] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await apiService.fetchNews();
        setInsights(data.articles || []);
        setNewsData(data);
      } catch (e) {
        setError("Failed to fetch financial news. Please try again later.");
        console.error('News fetch error:', e);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <Container theme={theme}>
      <Header>
        <Title>Key Market Insights</Title>
        <Subtitle theme={theme}>Stay informed with the latest financial headlines and market-moving news</Subtitle>
        
        {newsData && (
          <StatusBadge isLive={newsData.source === 'live'}>
            {newsData.source === 'live' ? (
              <>🟢 Live News Feed</>
            ) : (
              <>🟡 Curated Financial News</>
            )}
          </StatusBadge>
        )}
      </Header>
      
      {loading && (
        <LoadingCard theme={theme}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📈</div>
          <LoadingText theme={theme}>
            Loading latest market insights...
          </LoadingText>
        </LoadingCard>
      )}
      
      {error && (
        <ErrorCard theme={theme}>
          ⚠️ {error}
        </ErrorCard>
      )}
      
      {insights.length > 0 && (
        <div>
          {insights.slice(0, 10).map((insight, idx) => (
            <InsightBox key={idx} theme={theme}>
              <InsightTitle theme={theme}>{insight.title}</InsightTitle>
              {(insight.description || insight.text) && (
                <InsightText theme={theme}>{insight.description || insight.text}</InsightText>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                <NewsSource theme={theme}>
                  📰 {insight.source?.name || 'Financial News'}
                  {insight.publishedAt && (
                    <span style={{ marginLeft: '12px' }}>
                      🕒 {new Date(insight.publishedAt).toLocaleDateString()}
                    </span>
                  )}
                </NewsSource>
                {insight.url && insight.url !== '#' && (
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
