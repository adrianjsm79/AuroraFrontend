import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const themeClasses = {
    header: isDarkMode 
      ? 'bg-dark-surface text-dark-text-primary border-b border-dark-secondary-surface' 
      : 'bg-white text-light-text-primary border-b border-gray-200',
    footer: isDarkMode 
      ? 'bg-dark-surface text-dark-text-secondary border-t border-dark-secondary-surface' 
      : 'bg-light-surface text-light-text-secondary border-t border-gray-200'
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, themeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};