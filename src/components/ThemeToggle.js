import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const ToggleContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  cursor: pointer;
`;

const ToggleSwitch = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.isDark ? '#9f7aea' : '#667eea'};
  border-radius: 30px;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);

  &:before {
    content: '';
    position: absolute;
    height: 24px;
    width: 24px;
    left: ${props => props.isDark ? '33px' : '3px'};
    top: 3px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const ToggleIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: white;
  
  &.sun {
    left: 8px;
    opacity: ${props => props.isDark ? '0' : '1'};
  }
  
  &.moon {
    right: 8px;
    opacity: ${props => props.isDark ? '1' : '0'};
  }
  
  transition: opacity 0.3s ease;
`;

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleContainer onClick={toggleTheme} title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
      <ToggleSwitch isDark={isDarkMode}>
        <ToggleIcon className="sun" isDark={isDarkMode}>☀️</ToggleIcon>
        <ToggleIcon className="moon" isDark={isDarkMode}>🌙</ToggleIcon>
      </ToggleSwitch>
    </ToggleContainer>
  );
};

export default ThemeToggle;
