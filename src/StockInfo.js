import React from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "./contexts/ThemeContext";

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.isDarkMode ? props.theme.colors.dark.cardBackground : props.theme.colors.light.cardBackground};
  border-radius: 16px;
  box-shadow: 0 4px 24px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.3)' : '#6366f11a'};
  padding: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  transition: all 0.3s ease;
`;
const Name = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.isDarkMode ? props.theme.colors.dark.text : props.theme.colors.light.text};
  transition: color 0.3s ease;
`;
const Price = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${props => props.theme.isDarkMode ? props.theme.colors.dark.primary : props.theme.colors.light.primary};
  transition: color 0.3s ease;
`;
const ChartBox = styled.div`
  width: 320px;
  height: 120px;
`;

function StockInfo({ stockData }) {
  const theme = useTheme();
  
  // Simulate chart data for demo
  const chartData = Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    price:
      Number(stockData.regularMarketPrice) +
      Math.sin(i / 5) * 5 +
      Math.random() * 2 - 1
  }));

  return (
    <InfoContainer theme={theme}>
      <div>
        <Name theme={theme}>{stockData.longName || stockData.shortName}</Name>
        <div style={{ 
          fontSize: "1.1rem", 
          color: theme.isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary,
          transition: "color 0.3s ease"
        }}>{stockData.symbol}</div>
      </div>
      <Price theme={theme}>${Number(stockData.regularMarketPrice).toFixed(2)}</Price>
      <ChartBox>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" hide={true} />
            <YAxis domain={["auto", "auto"]} hide={true} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={theme.isDarkMode ? theme.colors.dark.primary : theme.colors.light.primary} 
              strokeWidth={3} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartBox>
    </InfoContainer>
  );
}

export default StockInfo;
