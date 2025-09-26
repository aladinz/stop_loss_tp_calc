import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Container = styled.div`
  padding: 40px;
  max-width: 800px;
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
  margin-bottom: 20px;
  width: 100%;
  font-size: 1.1rem;
  background: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.input : props.theme?.colors?.light.input};
  color: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.text : props.theme?.colors?.light.text};
  transition: all 0.3s ease;
  
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
const Result = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  margin-top: 24px;
  padding: 24px;
  background: ${props => props.theme?.isDarkMode 
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)'};
  border-radius: 16px;
  text-align: center;
  border: 2px solid ${props => props.theme?.isDarkMode ? '#334155' : '#bbf7d0'};
  color: ${props => props.theme?.isDarkMode ? '#bbf7d0' : '#166534'};
  transition: all 0.3s ease;
  
  span {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;
const Select = styled.select`
  padding: 12px 16px;
  border-radius: 12px;
  border: 2px solid ${props => props.theme?.isDarkMode ? '#334155' : '#e5e7eb'};
  margin-bottom: 20px;
  width: 100%;
  font-size: 1.1rem;
  background: ${props => props.theme?.isDarkMode ? '#1e293b' : '#f9fafb'};
  color: ${props => props.theme?.isDarkMode ? '#e2e8f0' : '#334155'};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    background: ${props => props.theme?.isDarkMode ? '#0f172a' : 'white'};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;
const ChartCard = styled.div`
  background: ${props => props.theme?.isDarkMode ? 'rgba(30, 41, 59, 0.7)' : 'white'};
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
  border: 1px solid ${props => props.theme?.isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
`;

function TrailingStop() {
  const { theme } = useTheme();
  const [entry, setEntry] = useState(100);
  const [trail, setTrail] = useState(5);
  const [trailType, setTrailType] = useState("amount");
  const [trailPercent, setTrailPercent] = useState(2);
  const [current, setCurrent] = useState(110);

  // Calculate trailing stop
  const trailValue = trailType === "amount" ? trail : (trailPercent / 100) * current;
  const trailingStop = current - trailValue;

  // Chart data: simulate price movement and trailing stop
  const chartData = Array.from({ length: 20 }, (_, i) => {
    const price = entry + i * ((current - entry) / 19);
    const tStop = price - (trailType === "amount" ? trail : (trailPercent / 100) * price);
    return { price: price, trailingStop: tStop };
  });

  return (
    <Container theme={theme}>
      <Header>
        <Title>Trailing Stop Calculator</Title>
        <Subtitle theme={theme}>Calculate your trailing stop price with advanced visualization</Subtitle>
      </Header>
      
      <FormCard theme={theme}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <Label theme={theme} htmlFor="entry">Entry Price ($):</Label>
            <Input theme={theme}
              id="entry"
              type="number"
              value={entry}
              min={0}
              onChange={e => setEntry(Number(e.target.value))}
            />
          </div>
          <div>
            <Label theme={theme} htmlFor="current">Current Price ($):</Label>
            <Input theme={theme}
              id="current"
              type="number"
              value={current}
              min={0}
              onChange={e => setCurrent(Number(e.target.value))}
            />
          </div>
        </div>

        <Label theme={theme}>Trail Type:</Label>
        <Select theme={theme} value={trailType} onChange={e => setTrailType(e.target.value)}>
          <option value="amount">Fixed Amount ($)</option>
          <option value="percent">Percentage (%)</option>
        </Select>

        {trailType === "amount" ? (
          <div>
            <Label theme={theme} htmlFor="trail">Trail Amount ($):</Label>
            <Input theme={theme}
              id="trail"
              type="number"
              value={trail}
              min={0}
              onChange={e => setTrail(Number(e.target.value))}
            />
          </div>
        ) : (
          <div>
            <Label theme={theme} htmlFor="trailPercent">Trail Percentage (%):</Label>
            <Input theme={theme}
              id="trailPercent"
              type="number"
              value={trailPercent}
              min={0}
              onChange={e => setTrailPercent(Number(e.target.value))}
            />
          </div>
        )}

        <Result theme={theme}>
          🎯 Trailing Stop Price: <span>${trailingStop.toFixed(2)}</span>
        </Result>
      </FormCard>

      <ChartCard theme={theme}>
        <h3 style={{ marginBottom: '24px', color: theme?.isDarkMode ? '#e2e8f0' : '#374151', fontWeight: '700' }}>📈 Price vs Trailing Stop Visualization</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData}>
            <XAxis 
              dataKey="price" 
              type="number" 
              domain={[entry, current]} 
              tickFormatter={v => `$${v.toFixed(0)}`}
              stroke={theme?.isDarkMode ? '#94a3b8' : '#64748b'}
            />
            <YAxis 
              type="number" 
              domain={[Math.min(...chartData.map(d => d.trailingStop)), Math.max(...chartData.map(d => d.price))]} 
              tickFormatter={v => `$${v.toFixed(0)}`}
              stroke={theme?.isDarkMode ? '#94a3b8' : '#64748b'}
            />
            <Tooltip 
              formatter={v => [`$${v.toFixed(2)}`, '']}
              labelFormatter={v => `Price: $${v.toFixed(2)}`}
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
              dataKey="price" 
              stroke="#6366f1" 
              strokeWidth={4} 
              dot={false} 
              name="Stock Price" 
            />
            <Line 
              type="monotone" 
              dataKey="trailingStop" 
              stroke="#10b981" 
              strokeWidth={4} 
              dot={false} 
              name="Trailing Stop" 
              strokeDasharray="8 8"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </Container>
  );
}

export default TrailingStop;
