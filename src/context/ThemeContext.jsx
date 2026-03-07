import { createContext, useContext } from 'react';
import { lightTheme, darkTheme } from '../styles/theme';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children, isDark }) {
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
