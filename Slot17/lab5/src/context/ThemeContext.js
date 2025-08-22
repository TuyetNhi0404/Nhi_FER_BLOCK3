import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const theme = {
    darkMode,
    toggleTheme,
    colors: {
      primary: darkMode ? '#2d5a3d' : '#8fbc8f',
      secondary: darkMode ? '#4a6741' : '#9acd32', 
      background: darkMode ? '#2c3e2d' : '#f0f8e8',
      surface: darkMode ? '#3a4f3b' : '#ffffff',
      text: darkMode ? '#e8f5e8' : '#2d4a2d',
      accent: darkMode ? '#5d7c5f' : '#7cb342'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};