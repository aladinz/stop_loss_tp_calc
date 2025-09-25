import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      return JSON.parse(savedTheme);
    }
    // Check system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    // Apply theme to document body
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      // Light mode colors
      light: {
        primary: '#667eea',
        secondary: '#764ba2',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        cardBackground: 'rgba(255, 255, 255, 0.95)',
        text: '#333333',
        textSecondary: '#666666',
        border: 'rgba(255, 255, 255, 0.2)',
        shadow: 'rgba(0, 0, 0, 0.1)',
        input: '#ffffff',
        button: '#667eea',
        buttonHover: '#5a67d8',
        success: '#48bb78',
        error: '#f56565',
        warning: '#ed8936'
      },
      // Dark mode colors
      dark: {
        primary: '#9f7aea',
        secondary: '#667eea',
        background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
        cardBackground: 'rgba(45, 55, 72, 0.95)',
        text: '#f7fafc',
        textSecondary: '#e2e8f0',
        border: 'rgba(255, 255, 255, 0.1)',
        shadow: 'rgba(0, 0, 0, 0.3)',
        input: '#4a5568',
        button: '#9f7aea',
        buttonHover: '#805ad5',
        success: '#68d391',
        error: '#fc8181',
        warning: '#f6ad55'
      }
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
