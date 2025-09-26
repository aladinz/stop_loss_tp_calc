import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContext";

const Container = styled.div`
  padding: 32px;
  max-width: 500px;
  margin: 0 auto;
  background: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.background : props.theme?.colors?.light.background};
  min-height: 100vh;
  transition: all 0.3s ease;
`;
const Input = styled.input`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.border : '#cbd5e1'};
  background: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.input : props.theme?.colors?.light.input};
  color: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.text : props.theme?.colors?.light.text};
  margin-bottom: 16px;
  width: 100%;
  font-size: 1.1rem;
  transition: all 0.3s ease;
`;
const Label = styled.label`
  font-weight: 700;
  margin-bottom: 4px;
  display: block;
  color: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.text : props.theme?.colors?.light.text};
  transition: color 0.3s ease;
`;
const Result = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${props => props.theme?.isDarkMode ? props.theme?.colors?.dark.success : props.theme?.colors?.light.success};
  margin-top: 24px;
  transition: color 0.3s ease;
`;

function PositionSizing() {
  const { theme } = useTheme();
  const [risk, setRisk] = useState(100);
  const [entry, setEntry] = useState(100);
  const [stop, setStop] = useState(95);

  const riskPerShare = Math.max(0, entry - stop);
  const positionSize = riskPerShare > 0 ? Math.floor(risk / riskPerShare) : 0;

  return (
    <Container theme={theme}>
      <h1>Position Sizing Calculator</h1>
      <p>Calculate how many shares/contracts to buy based on your risk per trade and stop loss distance.</p>
      <div>
        <Label theme={theme} htmlFor="risk">Risk Per Trade ($):</Label>
        <Input
          theme={theme}
          id="risk"
          type="number"
          value={risk}
          min={0}
          onChange={e => setRisk(Number(e.target.value))}
        />
      </div>
      <div>
        <Label theme={theme} htmlFor="entry">Entry Price ($):</Label>
        <Input
          theme={theme}
          id="entry"
          type="number"
          value={entry}
          min={0}
          onChange={e => setEntry(Number(e.target.value))}
        />
      </div>
      <div>
        <Label theme={theme} htmlFor="stop">Stop Loss Price ($):</Label>
        <Input
          theme={theme}
          id="stop"
          type="number"
          value={stop}
          min={0}
          onChange={e => setStop(Number(e.target.value))}
        />
      </div>
      <Result theme={theme}>
        Position Size: <span style={{ color: "#6366f1" }}>{positionSize}</span> shares/contracts
      </Result>
      <div style={{ marginTop: 8, color: '#64748b' }}>
        Risk per share: ${riskPerShare.toFixed(2)}
      </div>
    </Container>
  );
}

export default PositionSizing;
