import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

const Nav = styled.nav`
  background: ${props => props.theme.isDarkMode 
    ? 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)' 
    : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'};
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 24px ${props => props.theme.isDarkMode 
    ? 'rgba(0, 0, 0, 0.3)' 
    : 'rgba(99, 102, 241, 0.3)'};
  border-bottom: 1px solid ${props => props.theme.isDarkMode 
    ? props.theme.colors.dark.border 
    : props.theme.colors.light.border};
  transition: all 0.3s ease;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  flex: 1;
`;

const ThemeToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const NavLink = styled(Link)`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 10px 16px;
  }
`;

function Navigation() {
  const theme = useTheme();

  return (
    <Nav theme={theme}>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/portfolio">Portfolio Dashboard</NavLink>
        <NavLink to="/trailing-stop">Trailing Stop</NavLink>
        <NavLink to="/volatility-correlation">Volatility & Correlation</NavLink>
        <NavLink to="/market-sentiment">Market Fear & Greed</NavLink>
        <NavLink to="/key-insights">Key Insights</NavLink>
      </NavLinks>
      <ThemeToggleContainer>
        <ThemeToggle />
      </ThemeToggleContainer>
    </Nav>
  );
}

export default Navigation;
