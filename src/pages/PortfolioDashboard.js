import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContext";

const Container = styled.div`
  padding: 40px;
  max-width: 1200px;
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
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.cardBackground : props.theme?.colors?.light.cardBackground};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.shadow : 'rgba(99, 102, 241, 0.15)'};
  border: 1px solid ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.border : props.theme?.colors?.light.border};
  transition: all 0.3s ease;
`;
const Th = styled.th`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  padding: 20px 16px;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.border : '#f1f5f9'};
  text-align: center;
  font-weight: 500;
  color: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.text : props.theme?.colors?.light.text};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme?.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc'};
  }
`;
const Button = styled.button`
  background: ${props => props.danger ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: 700;
  cursor: pointer;
  margin: 0 4px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px ${props => props.danger ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${props => props.danger ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)'};
  }
`;
const Input = styled.input`
  padding: 12px 16px;
  border-radius: 10px;
  border: 2px solid ${props => props.theme?.isDarkMode ? '#374151' : '#e5e7eb'};
  font-size: 1rem;
  background: ${props => props.theme?.isDarkMode ? '#1f2937' : '#f9fafb'};
  color: ${props => props.theme?.isDarkMode ? '#f8fafc' : '#374151'};
  min-width: 120px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    background: ${props => props.theme?.isDarkMode ? '#111827' : 'white'};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme?.isDarkMode ? '#9ca3af' : '#9ca3af'};
  }
`;
const RiskSummary = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
  margin-top: 32px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;
const RiskAmount = styled.span`
  font-size: 2rem;
  font-weight: 800;
  color: #ef4444;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

function PortfolioDashboard() {
  const { theme } = useTheme();
  const [positions, setPositions] = useState([]);
  const [form, setForm] = useState({ symbol: "", entry: "", stop: "", shares: "" });

  // Calculate total risk
  const totalRisk = positions.reduce((sum, pos) => {
    const riskPerShare = Math.max(0, pos.entry - pos.stop);
    return sum + riskPerShare * pos.shares;
  }, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.symbol || !form.entry || !form.stop || !form.shares) return;
    setPositions([
      ...positions,
      {
        symbol: form.symbol.toUpperCase(),
        entry: Number(form.entry),
        stop: Number(form.stop),
        shares: Number(form.shares)
      }
    ]);
    setForm({ symbol: "", entry: "", stop: "", shares: "" });
  };

  const handleRemove = (idx) => {
    setPositions(positions.filter((_, i) => i !== idx));
  };

  return (
    <Container theme={theme}>
      <Header>
        <Title>Portfolio Risk Dashboard</Title>
        <Subtitle theme={theme}>Track your open positions, total risk exposure, and remaining risk budget</Subtitle>
      </Header>
      
      <FormCard theme={theme}>
        <h3 style={{ marginBottom: '24px', color: theme?.isDarkMode ? '#f8fafc' : '#374151', fontWeight: '700' }}>Add New Position</h3>
        <form onSubmit={handleAdd} style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "end" }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme?.isDarkMode ? '#f8fafc' : '#374151' }}>Symbol</label>
            <Input
              theme={theme}
              name="symbol"
              value={form.symbol}
              onChange={handleChange}
              placeholder="AAPL"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme?.isDarkMode ? '#f8fafc' : '#374151' }}>Entry Price</label>
            <Input
              theme={theme}
              name="entry"
              type="number"
              value={form.entry}
              onChange={handleChange}
              placeholder="150.00"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme?.isDarkMode ? '#f8fafc' : '#374151' }}>Stop Loss</label>
            <Input
              theme={theme}
              name="stop"
              type="number"
              value={form.stop}
              onChange={handleChange}
              placeholder="145.00"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme?.isDarkMode ? '#f8fafc' : '#374151' }}># Shares</label>
            <Input
              theme={theme}
              name="shares"
              type="number"
              value={form.shares}
              onChange={handleChange}
              placeholder="100"
            />
          </div>
          <Button type="submit">Add Position</Button>
        </form>
      </FormCard>

      {positions.length > 0 && (
        <Table theme={theme}>
          <thead>
            <tr>
              <Th>Symbol</Th>
              <Th>Entry</Th>
              <Th>Stop</Th>
              <Th>Shares</Th>
              <Th>Risk/Share</Th>
              <Th>Total Risk</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos, idx) => (
              <tr key={idx}>
                <Td theme={theme} style={{ fontWeight: '700', color: theme?.isDarkMode ? '#818cf8' : '#6366f1' }}>{pos.symbol}</Td>
                <Td theme={theme}>${pos.entry.toFixed(2)}</Td>
                <Td theme={theme}>${pos.stop.toFixed(2)}</Td>
                <Td theme={theme}>{pos.shares}</Td>
                <Td theme={theme}>${(pos.entry - pos.stop).toFixed(2)}</Td>
                <Td theme={theme} style={{ fontWeight: '700', color: theme?.isDarkMode ? '#f87171' : '#ef4444' }}>${((pos.entry - pos.stop) * pos.shares).toFixed(2)}</Td>
                <Td theme={theme}>
                  <Button danger onClick={() => handleRemove(idx)}>
                    Remove
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <RiskSummary>
        <h2 style={{ marginBottom: '16px', color: theme?.isDarkMode ? '#f8fafc' : '#374151', fontWeight: '700' }}>Total Portfolio Risk</h2>
        <RiskAmount>${totalRisk.toFixed(2)}</RiskAmount>
      </RiskSummary>
    </Container>
  );
}

export default PortfolioDashboard;
