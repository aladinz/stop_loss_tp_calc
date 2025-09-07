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
const Value = styled.span`
  font-weight: 700;
  color: #6366f1;
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

const atrMultiples = ["None", 1, 1.5, 2, 2.5, 3, 4];

function ATRCalculator({ type, entryPrice, atrValue }) {
  const [multiple, setMultiple] = useState(type === "sl" ? 2 : "None");

  let result = "-";
  if (multiple !== "None") {
    if (type === "tp") {
      result = `$${(entryPrice + atrValue * multiple).toFixed(2)}`;
    } else {
      result = `$${(entryPrice - atrValue * multiple).toFixed(2)}`;
    }
  }

  return (
    <Card>
      <Title>ATR {type === "tp" ? "Take Profit" : "Stop Loss"} Calculator</Title>
      <div>
        ATR Value: <Value>{atrValue}</Value>
      </div>
      <div>
        ATR Multiple to Use:
        <Select
          value={multiple}
          onChange={(e) => setMultiple(e.target.value === "None" ? "None" : Number(e.target.value))}
        >
          {atrMultiples.map((m) => (
            <option key={m} value={m}>{m}</option>
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

export default ATRCalculator;
