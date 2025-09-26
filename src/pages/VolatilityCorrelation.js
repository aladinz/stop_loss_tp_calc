import React, { useState } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { apiService } from "../services/apiService";
import { useTheme } from "../contexts/ThemeContext";

const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
  background: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.background : props.theme?.colors?.light.background};
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
  background: ${props => props.theme?.isDarkMode 
    ? 'linear-gradient(135deg, #9f7aea 0%, #667eea 50%, #68d391 100%)' 
    : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
`;
const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.textSecondary : props.theme?.colors?.light.textSecondary};
  font-weight: 500;
  transition: color 0.3s ease;
`;
const FormCard = styled.div`
  background: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.cardBackground : props.theme?.colors?.light.cardBackground};
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.shadow : 'rgba(99, 102, 241, 0.15)'};
  margin-bottom: 32px;
  border: 1px solid ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.border : props.theme?.colors?.light.border};
  transition: all 0.3s ease;
`;
const Input = styled.input`
  padding: 12px 16px;
  border-radius: 12px;
  border: 2px solid ${props => props.theme?.isDarkMode ? '#4a5568' : '#e5e7eb'};
  margin-bottom: 16px;
  width: 100%;
  font-size: 1.2rem;
  background: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.input : props.theme?.colors?.light.input};
  color: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.text : props.theme?.colors?.light.text};
  transition: all 0.3s ease;
  text-align: center;
  font-weight: 700;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.primary : props.theme?.colors?.light.primary};
    background: ${props => props.theme?.isDarkMode ? '#2d3748' : 'white'};
    box-shadow: 0 0 0 3px ${props => props.theme?.isDarkMode ? 'rgba(159, 122, 234, 0.1)' : 'rgba(99, 102, 241, 0.1)'};
  }
`;
const Label = styled.label`
  font-weight: 700;
  margin-bottom: 8px;
  display: block;
  color: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.text : props.theme?.colors?.light.text};
  font-size: 1rem;
  transition: color 0.3s ease;
`;
const Button = styled.button`
  background: ${props => props.theme?.isDarkMode 
    ? 'linear-gradient(135deg, #9f7aea 0%, #667eea 100%)' 
    : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 16px;
  width: 100%;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px ${props => props.theme?.isDarkMode 
    ? 'rgba(159, 122, 234, 0.3)' 
    : 'rgba(99, 102, 241, 0.3)'};
  
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
const Result = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 24px;
  padding: 24px;
  background: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.cardBackground : props.theme?.colors?.light.cardBackground};
  color: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.text : props.theme?.colors?.light.text};
  border-radius: 16px;
  box-shadow: 0 8px 32px ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.shadow : 'rgba(99, 102, 241, 0.15)'};
  border: 1px solid ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.border : props.theme?.colors?.light.border};
  transition: all 0.3s ease;
`;
const MetricCard = styled.div`
  background: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.cardBackground : props.theme?.colors?.light.cardBackground};
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.shadow : 'rgba(99, 102, 241, 0.15)'};
  margin-bottom: 32px;
  border: 1px solid ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.border : props.theme?.colors?.light.border};
  transition: all 0.3s ease;
`;
const ChartCard = styled.div`
  background: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.cardBackground : props.theme?.colors?.light.cardBackground};
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.shadow : 'rgba(99, 102, 241, 0.15)'};
  border: 1px solid ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.border : props.theme?.colors?.light.border};
  transition: all 0.3s ease;
`;

function VolatilityCorrelation() {
  const { theme } = useTheme();
  const [symbol1, setSymbol1] = useState("AAPL");
  const [symbol2, setSymbol2] = useState("MSFT");
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [volatility1, setVolatility1] = useState(null);
  const [volatility2, setVolatility2] = useState(null);
  const [correlation, setCorrelation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper: Calculate daily returns
  function getReturns(prices) {
    return prices.slice(1).map((p, i) => (p - prices[i]) / prices[i]);
  }

  // Helper: Calculate standard deviation
  function std(arr) {
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    return Math.sqrt(arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length);
  }

  // Helper: Calculate correlation
  function corr(arr1, arr2) {
    const mean1 = arr1.reduce((a, b) => a + b, 0) / arr1.length;
    const mean2 = arr2.reduce((a, b) => a + b, 0) / arr2.length;
    const num = arr1.map((v, i) => (v - mean1) * (arr2[i] - mean2)).reduce((a, b) => a + b, 0);
    const denom = Math.sqrt(
      arr1.map(v => (v - mean1) ** 2).reduce((a, b) => a + b, 0) *
      arr2.map(v => (v - mean2) ** 2).reduce((a, b) => a + b, 0)
    );
    return num / denom;
  }

  // Fetch historical data from Alpha Vantage proxy
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const { data1: prices1, data2: prices2 } = await apiService.fetchHistory(symbol1, symbol2);
      setData1(prices1);
      setData2(prices2);
      // Calculate metrics
      const returns1 = getReturns(prices1);
      const returns2 = getReturns(prices2);
      setVolatility1(std(returns1));
      setVolatility2(std(returns2));
      setCorrelation(corr(returns1, returns2));
    } catch (e) {
      setError("Failed to fetch historical data.");
      setVolatility1(null);
      setVolatility2(null);
      setCorrelation(null);
    }
    setLoading(false);
  };

  // Chart data for symbol1
  const chartData = data1.map((price, i) => ({
    date: i + 1,
    [symbol1]: price,
    [symbol2]: data2[i] || null
  }));

  return (
    <Container theme={theme}>
      <Header>
        <Title>Volatility & Correlation Metrics</Title>
        <Subtitle theme={theme}>Advanced analysis of price volatility and correlation between securities</Subtitle>
      </Header>
      
      <FormCard theme={theme}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <Label theme={theme} htmlFor="symbol1">First Symbol:</Label>
            <Input
              theme={theme}
              id="symbol1"
              value={symbol1}
              onChange={e => setSymbol1(e.target.value.toUpperCase())}
              placeholder="AAPL"
            />
          </div>
          <div>
            <Label theme={theme} htmlFor="symbol2">Second Symbol:</Label>
            <Input
              theme={theme}
              id="symbol2"
              value={symbol2}
              onChange={e => setSymbol2(e.target.value.toUpperCase())}
              placeholder="MSFT"
            />
          </div>
        </div>
        <Button onClick={fetchData} disabled={loading}>
          {loading ? "🔄 Analyzing..." : "📊 Calculate Metrics"}
        </Button>
        {error && <div style={{ color: "#ef4444", marginTop: 16, textAlign: 'center', fontWeight: '600' }}>⚠️ {error}</div>}
      </FormCard>

      {volatility1 !== null && volatility2 !== null && (
        <MetricCard theme={theme}>
          <h3 style={{ marginBottom: '24px', color: theme?.isDarkMode ? '#e2e8f0' : '#374151', fontWeight: '700', textAlign: 'center' }}>📈 Volatility Analysis</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', textAlign: 'center' }}>
            <div style={{ padding: '20px', background: volatility1 > 0.03 ? '#fef2f2' : '#f0fdf4', borderRadius: '16px', border: `2px solid ${volatility1 > 0.03 ? '#fecaca' : '#bbf7d0'}` }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: volatility1 > 0.03 ? '#ef4444' : '#10b981' }}>{symbol1}</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', margin: '8px 0', color: volatility1 > 0.03 ? '#ef4444' : '#10b981' }}>{volatility1.toFixed(4)}</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600' }}>Daily Volatility</div>
            </div>
            <div style={{ padding: '20px', background: volatility2 > 0.03 ? '#fef2f2' : '#f0fdf4', borderRadius: '16px', border: `2px solid ${volatility2 > 0.03 ? '#fecaca' : '#bbf7d0'}` }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: volatility2 > 0.03 ? '#ef4444' : '#10b981' }}>{symbol2}</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', margin: '8px 0', color: volatility2 > 0.03 ? '#ef4444' : '#10b981' }}>{volatility2.toFixed(4)}</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600' }}>Daily Volatility</div>
            </div>
          </div>
        </MetricCard>
      )}

      {correlation !== null && (
        <MetricCard theme={theme}>
          <h3 style={{ marginBottom: '24px', color: theme?.isDarkMode ? '#e2e8f0' : '#374151', fontWeight: '700', textAlign: 'center' }}>🔗 Correlation Analysis</h3>
          <div style={{ textAlign: 'center', padding: '20px', background: Math.abs(correlation) > 0.7 ? '#fef2f2' : '#f0fdf4', borderRadius: '16px', border: `2px solid ${Math.abs(correlation) > 0.7 ? '#fecaca' : '#bbf7d0'}` }}>
            <div style={{ fontSize: '3rem', fontWeight: '800', margin: '8px 0', color: Math.abs(correlation) > 0.7 ? '#ef4444' : '#10b981' }}>{correlation.toFixed(4)}</div>
            <div style={{ fontSize: '1.2rem', color: '#64748b', fontWeight: '600' }}>Correlation Coefficient</div>
            <div style={{ fontSize: '1rem', color: '#64748b', marginTop: '8px' }}>
              {Math.abs(correlation) > 0.7 ? '🔴 High Correlation' : Math.abs(correlation) > 0.3 ? '🟡 Moderate Correlation' : '🟢 Low Correlation'}
            </div>
          </div>
        </MetricCard>
      )}

      {data1.length > 0 && data2.length > 0 && (
        <ChartCard theme={theme}>
          <h3 style={{ marginBottom: '24px', color: theme?.isDarkMode ? '#e2e8f0' : '#374151', fontWeight: '700' }}>📈 Historical Price Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis 
                dataKey="date" 
                stroke={theme?.isDarkMode ? '#94a3b8' : '#64748b'}
              />
              <YAxis 
                stroke={theme?.isDarkMode ? '#94a3b8' : '#64748b'}
                tickFormatter={v => `$${v.toFixed(0)}`}
              />
              <Tooltip 
                formatter={v => [`$${v?.toFixed(2)}`, '']}
                contentStyle={{
                  background: theme?.isDarkMode ? '#1e293b' : 'white',
                  color: theme?.isDarkMode ? '#e2e8f0' : '#334155',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey={symbol1}
                stroke={volatility1 !== null ? (volatility1 > 0.03 ? '#ef4444' : '#10b981') : '#6366f1'}
                strokeWidth={4}
                dot={false}
                name={symbol1}
              />
              <Line
                type="monotone"
                dataKey={symbol2}
                stroke={volatility2 !== null ? (volatility2 > 0.03 ? '#ef4444' : '#10b981') : '#8b5cf6'}
                strokeWidth={4}
                dot={false}
                name={symbol2}
                strokeDasharray="8 8"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      )}
    </Container>
  );
}

export default VolatilityCorrelation;
