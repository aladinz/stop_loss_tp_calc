import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  padding: 20px 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 24px rgba(99, 102, 241, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
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
  return (
    <Nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/portfolio">Portfolio Dashboard</NavLink>
  <NavLink to="/trailing-stop">Trailing Stop</NavLink>
  <NavLink to="/volatility-correlation">Volatility & Correlation</NavLink>
  <NavLink to="/market-sentiment">Market Fear & Greed</NavLink>
  <NavLink to="/key-insights">Key Insights</NavLink>
    </Nav>
  );
}

export default Navigation;
