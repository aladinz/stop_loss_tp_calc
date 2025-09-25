import React from "react";
import styled from "styled-components";
import ATRCalculator from "./ATRCalculator";
import PercentageCalculator from "./PercentageCalculator";
import { useTheme } from "./contexts/ThemeContext";

const PanelContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;
const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
  color: ${props => props.theme.isDarkMode ? props.theme.colors.dark.text : props.theme.colors.light.text};
  transition: color 0.3s ease;
`;

function CalculatorPanel({ entryPrice, stockData }) {
  const theme = useTheme();
  // Simulate ATR value for demo (in real app, fetch from API)
  const atrValue = 4.8;

  return (
    <>
      <SectionTitle theme={theme}>TAKE PROFIT CALCULATORS</SectionTitle>
      <PanelContainer>
        <ATRCalculator
          type="tp"
          entryPrice={entryPrice}
          atrValue={atrValue}
        />
        <PercentageCalculator
          type="tp"
          entryPrice={entryPrice}
        />
      </PanelContainer>
      <SectionTitle theme={theme}>STOP LOSS CALCULATORS</SectionTitle>
      <PanelContainer>
        <ATRCalculator
          type="sl"
          entryPrice={entryPrice}
          atrValue={atrValue}
        />
        <PercentageCalculator
          type="sl"
          entryPrice={entryPrice}
        />
      </PanelContainer>
    </>
  );
}

export default CalculatorPanel;
