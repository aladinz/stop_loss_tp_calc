import React from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px #6366f11a;
  padding: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;
const Name = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;
const Price = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: #6366f1;
`;
const ChartBox = styled.div`
  width: 320px;
  height: 120px;
`;

function StockInfo({ stockData }) {
  // Simulate chart data for demo
  const chartData = Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    price:
      Number(stockData.regularMarketPrice) +
      Math.sin(i / 5) * 5 +
      Math.random() * 2 - 1
  }));

  return (
    <InfoContainer>
      <div>
        <Name>{stockData.longName || stockData.shortName}</Name>
        <div style={{ fontSize: "1.1rem", color: "#64748b" }}>{stockData.symbol}</div>
      </div>
      <Price>${Number(stockData.regularMarketPrice).toFixed(2)}</Price>
      <ChartBox>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" hide={true} />
            <YAxis domain={["auto", "auto"]} hide={true} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartBox>
    </InfoContainer>
  );
}

export default StockInfo;
