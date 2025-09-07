import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px #6366f11a;
  padding: 24px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;
`;
const Select = styled.select`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  background: #f1f5f9;
`;
const Result = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #10b981;
  margin-top: 12px;
`;

const percentages = [1, 2, 3, 4, 5, 7, 10, 15, 20];

function PercentageCalculator({ type, entryPrice }) {
  const [percent, setPercent] = useState(type === "sl" ? 2 : 4);

  let result = "-";
  if (type === "tp") {
    result = `$${(entryPrice * (1 + percent / 100)).toFixed(2)}`;
  } else {
    result = `$${(entryPrice * (1 - percent / 100)).toFixed(2)}`;
  }

  return (
    <Card>
      <Title>Percentage {type === "tp" ? "Take Profit" : "Stop Loss"} Calculator</Title>
      <div>
        Percentage:
        <Select
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
        >
          {percentages.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </Select>
      </div>
      <div>
        {type === "tp" ? "Take Profit Price:" : "Stop Loss Price:"}
        <Result>{result}</Result>
      </div>
    </Card>
  );
}

export default PercentageCalculator;
