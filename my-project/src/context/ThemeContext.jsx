// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Initialize theme from local storage or default to 'light'
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      // Check for user's system preference if no theme is stored
      if (storedTheme) {
        return storedTheme;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light'; // Default to light if no preference or not in browser env
  });

  // Effect to apply the 'dark' class to the html element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      // Remove both classes first to ensure only one is present
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      localStorage.setItem('theme', theme); // Persist the chosen theme
    }
  }, [theme]); // Re-run whenever the theme state changes

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};