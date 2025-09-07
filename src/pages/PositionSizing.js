import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 32px;
  max-width: 500px;
  margin: 0 auto;
`;
const Input = styled.input`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  margin-bottom: 16px;
  width: 100%;
  font-size: 1.1rem;
`;
const Label = styled.label`
  font-weight: 700;
  margin-bottom: 4px;
  display: block;
`;
const Result = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #10b981;
  margin-top: 24px;
`;

function PositionSizing() {
  const [risk, setRisk] = useState(100);
  const [entry, setEntry] = useState(100);
  const [stop, setStop] = useState(95);

  const riskPerShare = Math.max(0, entry - stop);
  const positionSize = riskPerShare > 0 ? Math.floor(risk / riskPerShare) : 0;

  return (
    <Container>
      <h1>Position Sizing Calculator</h1>
      <p>Calculate how many shares/contracts to buy based on your risk per trade and stop loss distance.</p>
      <div>
        <Label htmlFor="risk">Risk Per Trade ($):</Label>
        <Input
          id="risk"
          type="number"
          value={risk}
          min={0}
          onChange={e => setRisk(Number(e.target.value))}
        />
      </div>
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
        <Label htmlFor="stop">Stop Loss Price ($):</Label>
        <Input
          id="stop"
          type="number"
          value={stop}
          min={0}
          onChange={e => setStop(Number(e.target.value))}
        />
      </div>
      <Result>
        Position Size: <span style={{ color: "#6366f1" }}>{positionSize}</span> shares/contracts
      </Result>
      <div style={{ marginTop: 8, color: '#64748b' }}>
        Risk per share: ${riskPerShare.toFixed(2)}
      </div>
    </Container>
  );
}

export default PositionSizing;
