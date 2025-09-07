import React, { useState } from "react";
import styled from "styled-components";
import StockInfo from "./StockInfo";
import CalculatorPanel from "./CalculatorPanel";
import { apiService } from "./services/apiService";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  min-height: 100vh;
`;
const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 8px;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const Subtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 40px;
  font-weight: 500;
`;
const Form = styled.form`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
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
  color: #374151;
`;
const Input = styled.input`
  padding: 12px 20px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  font-size: 1.1rem;
  background: #f9fafb;
  min-width: 200px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    background: white;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;
const SubmitButton = styled.button`
  padding: 12px 32px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  font-weight: 700;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;
const LoadingText = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #6366f1;
  font-weight: 600;
`;
const ErrorText = styled.p`
  color: #ef4444;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  background: #fef2f2;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #fecaca;
`;

function App() {
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
    <Container>
      <Title>Stop Loss & Take Profit Calculators</Title>
      <Subtitle>Professional tools for smart risk management in trading</Subtitle>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="ticker">Enter Ticker Symbol:</Label>
          <Input
            id="ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="e.g. NVDA"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="entry">Your Entry Price:</Label>
          <Input
            id="entry"
            type="number"
            step="0.01"
            value={entryPrice}
            onChange={(e) => setEntryPrice(Number(e.target.value))}
            required
          />
        </InputGroup>
        <SubmitButton type="submit">
          Fetch Stock Data
        </SubmitButton>
      </Form>
      {loading && <LoadingText>Loading stock data...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
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
