import React, { useState } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
const FormCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
  margin-bottom: 32px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;
const Input = styled.input`
  padding: 12px 16px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  margin-bottom: 20px;
  width: 100%;
  font-size: 1.1rem;
  background: #f9fafb;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    background: white;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;
const Label = styled.label`
  font-weight: 700;
  margin-bottom: 8px;
  display: block;
  color: #374151;
  font-size: 1rem;
`;
const Result = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  margin-top: 24px;
  padding: 24px;
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  border-radius: 16px;
  text-align: center;
  border: 2px solid #bbf7d0;
  
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
  border: 2px solid #e5e7eb;
  margin-bottom: 20px;
  width: 100%;
  font-size: 1.1rem;
  background: #f9fafb;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    background: white;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;
const ChartCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

function TrailingStop() {
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
    <Container>
      <Header>
        <Title>Trailing Stop Calculator</Title>
        <Subtitle>Calculate your trailing stop price with advanced visualization</Subtitle>
      </Header>
      
      <FormCard>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <Label htmlFor="entry">Entry Price ($):</Label>
            <Input
              id="entry"
              type="number"
              value={entry}
              min={0}
              onChange={e => setEntry(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="current">Current Price ($):</Label>
            <Input
              id="current"
              type="number"
              value={current}
              min={0}
              onChange={e => setCurrent(Number(e.target.value))}
            />
          </div>
        </div>

        <Label>Trail Type:</Label>
        <Select value={trailType} onChange={e => setTrailType(e.target.value)}>
          <option value="amount">Fixed Amount ($)</option>
          <option value="percent">Percentage (%)</option>
        </Select>

        {trailType === "amount" ? (
          <div>
            <Label htmlFor="trail">Trail Amount ($):</Label>
            <Input
              id="trail"
              type="number"
              value={trail}
              min={0}
              onChange={e => setTrail(Number(e.target.value))}
            />
          </div>
        ) : (
          <div>
            <Label htmlFor="trailPercent">Trail Percentage (%):</Label>
            <Input
              id="trailPercent"
              type="number"
              value={trailPercent}
              min={0}
              onChange={e => setTrailPercent(Number(e.target.value))}
            />
          </div>
        )}

        <Result>
          🎯 Trailing Stop Price: <span>${trailingStop.toFixed(2)}</span>
        </Result>
      </FormCard>

      <ChartCard>
        <h3 style={{ marginBottom: '24px', color: '#374151', fontWeight: '700' }}>📈 Price vs Trailing Stop Visualization</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData}>
            <XAxis 
              dataKey="price" 
              type="number" 
              domain={[entry, current]} 
              tickFormatter={v => `$${v.toFixed(0)}`}
              stroke="#64748b"
            />
            <YAxis 
              type="number" 
              domain={[Math.min(...chartData.map(d => d.trailingStop)), Math.max(...chartData.map(d => d.price))]} 
              tickFormatter={v => `$${v.toFixed(0)}`}
              stroke="#64748b"
            />
            <Tooltip 
              formatter={v => [`$${v.toFixed(2)}`, '']}
              labelFormatter={v => `Price: $${v.toFixed(2)}`}
              contentStyle={{
                background: 'white',
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
