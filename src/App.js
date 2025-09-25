import React, { useState } from "react";
import styled from "styled-components";
import StockInfo from "./StockInfo";
import CalculatorPanel from "./CalculatorPanel";
import { apiService } from "./services/apiService";
import { useTheme } from "./contexts/ThemeContext";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 16px;
  background: ${props => props.theme.isDarkMode ? props.theme.colors.dark.background : props.theme.colors.light.background};
  min-height: 100vh;
  transition: all 0.3s ease;
`;
const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 8px;
  letter-spacing: -1px;
  background: ${props => props.theme.isDarkMode 
    ? 'linear-gradient(135deg, #9f7aea 0%, #667eea 50%, #68d391 100%)' 
    : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
`;
const Subtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${props => props.theme.isDarkMode ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary};
  margin-bottom: 40px;
  font-weight: 500;
  transition: color 0.3s ease;
`;
const Form = styled.form`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  background: ${props => props.theme.isDarkMode ? props.theme.colors.dark.cardBackground : props.theme.colors.light.cardBackground};
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 8px 32px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(99, 102, 241, 0.15)'};
  border: 1px solid ${props => props.theme.isDarkMode ? props.theme.colors.dark.border : props.theme.colors.light.border};
  transition: all 0.3s ease;
`;
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 8px;
  font-weight: 600;
  color: ${props => props.theme.isDarkMode ? props.theme.colors.dark.text : props.theme.colors.light.text};
  transition: color 0.3s ease;
`;
const Input = styled.input`
  padding: 12px 20px;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.isDarkMode ? '#4a5568' : '#e5e7eb'};
  font-size: 1.1rem;
  background: ${props => props.theme.isDarkMode ? '#2d3748' : '#f9fafb'};
  color: ${props => props.theme.isDarkMode ? '#f7fafc' : '#374151'};
  min-width: 200px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.isDarkMode ? '#9f7aea' : '#6366f1'};
    background: ${props => props.theme.isDarkMode ? '#4a5568' : 'white'};
    box-shadow: 0 0 0 3px ${props => props.theme.isDarkMode ? 'rgba(159, 122, 234, 0.1)' : 'rgba(99, 102, 241, 0.1)'};
  }
  
  &::placeholder {
    color: ${props => props.theme.isDarkMode ? '#a0aec0' : '#9ca3af'};
  }
`;
const SubmitButton = styled.button`
  padding: 12px 32px;
  border-radius: 12px;
  background: ${props => props.theme.isDarkMode 
    ? 'linear-gradient(135deg, #9f7aea 0%, #667eea 100%)' 
    : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'};
  color: white;
  font-weight: 700;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px ${props => props.theme.isDarkMode 
    ? 'rgba(159, 122, 234, 0.3)' 
    : 'rgba(99, 102, 241, 0.3)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${props => props.theme.isDarkMode 
      ? 'rgba(159, 122, 234, 0.4)' 
      : 'rgba(99, 102, 241, 0.4)'};
  }
  
  &:active {
    transform: translateY(0);
  }
`;
const LoadingText = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: ${props => props.theme.isDarkMode ? props.theme.colors.dark.primary : props.theme.colors.light.primary};
  font-weight: 600;
  transition: color 0.3s ease;
`;
const ErrorText = styled.p`
  color: ${props => props.theme.isDarkMode ? props.theme.colors.dark.error : props.theme.colors.light.error};
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  background: ${props => props.theme.isDarkMode ? 'rgba(252, 129, 129, 0.1)' : '#fef2f2'};
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.isDarkMode ? 'rgba(252, 129, 129, 0.2)' : '#fecaca'};
  transition: all 0.3s ease;
`;

function App() {
  const theme = useTheme();
  const [ticker, setTicker] = useState("NVDA");
  const [entryPrice, setEntryPrice] = useState(162.0);
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStockData = async (symbol) => {
    setLoading(true);
    setError("");
    try {
      const data = await apiService.fetchQuote(symbol);
      if (data.price) {
        setStockData({
          symbol: data.symbol,
          regularMarketPrice: data.price,
          longName: data.name,
          raw: data.raw
        });
      } else {
        setError("Ticker not found or API limit reached.");
        setStockData(null);
      }
    } catch (e) {
      setError("Failed to fetch stock data.");
      setStockData(null);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStockData(ticker);
  };

  return (
    <Container theme={theme}>
      <Title theme={theme}>Stop Loss & Take Profit Calculators</Title>
      <Subtitle theme={theme}>Professional tools for smart risk management in trading</Subtitle>
      <Form onSubmit={handleSubmit} theme={theme}>
        <InputGroup>
          <Label htmlFor="ticker" theme={theme}>Enter Ticker Symbol:</Label>
          <Input
            id="ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="e.g. NVDA"
            theme={theme}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="entry" theme={theme}>Your Entry Price:</Label>
          <Input
            id="entry"
            type="number"
            step="0.01"
            value={entryPrice}
            onChange={(e) => setEntryPrice(Number(e.target.value))}
            theme={theme}
            required
          />
        </InputGroup>
        <SubmitButton type="submit" theme={theme}>
          Fetch Stock Data
        </SubmitButton>
      </Form>
      {loading && <LoadingText theme={theme}>Loading stock data...</LoadingText>}
      {error && <ErrorText theme={theme}>{error}</ErrorText>}
      {stockData && (
        <>
          <StockInfo stockData={stockData} />
          <CalculatorPanel entryPrice={entryPrice} stockData={stockData} />
        </>
      )}
    </Container>
  );
}

export default App;
