import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "./contexts/ThemeContext";

const Card = styled.div`
  background: ${props => props.theme.isDarkMode ? props.theme.colors.dark.cardBackground : props.theme.colors.light.cardBackground};
  border-radius: 16px;
  box-shadow: 0 4px 24px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.3)' : '#6366f11a'};
  padding: 24px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
`;
const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${props => props.theme.isDarkMode ? props.theme.colors.dark.text : props.theme.colors.light.text};
  transition: color 0.3s ease;
`;
const Value = styled.span`
  font-weight: 700;
  color: ${props => props.theme.isDarkMode ? props.theme.colors.dark.primary : props.theme.colors.light.primary};
  transition: color 0.3s ease;
`;
const Select = styled.select`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.isDarkMode ? '#4a5568' : '#cbd5e1'};
  font-size: 1rem;
  background: ${props => props.theme.isDarkMode ? '#2d3748' : '#f1f5f9'};
  color: ${props => props.theme.isDarkMode ? '#f7fafc' : '#374151'};
  transition: all 0.3s ease;
`;
const Result = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${props => props.theme.isDarkMode ? props.theme.colors.dark.success : props.theme.colors.light.success};
  margin-top: 12px;
  transition: color 0.3s ease;
`;

const atrMultiples = ["None", 1, 1.5, 2, 2.5, 3, 4];

function ATRCalculator({ type, entryPrice, atrValue }) {
  const theme = useTheme();
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
    <Card theme={theme}>
      <Title theme={theme}>ATR {type === "tp" ? "Take Profit" : "Stop Loss"} Calculator</Title>
      <div style={{ color: theme.isDarkMode ? theme.colors.dark.text : theme.colors.light.text }}>
        ATR Value: <Value theme={theme}>{atrValue}</Value>
      </div>
      <div style={{ color: theme.isDarkMode ? theme.colors.dark.text : theme.colors.light.text }}>
        ATR Multiple to Use:
        <Select
          theme={theme}
          value={multiple}
          onChange={(e) => setMultiple(e.target.value === "None" ? "None" : Number(e.target.value))}
        >
          {atrMultiples.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </Select>
      </div>
      <div style={{ color: theme.isDarkMode ? theme.colors.dark.text : theme.colors.light.text }}>
        {type === "tp" ? "Take Profit Price:" : "Stop Loss Price:"}
        <Result theme={theme}>{result}</Result>
      </div>
    </Card>
  );
}

export default ATRCalculator;
