import React, { createContext, useContext, ReactNode } from 'react';
import { lightTheme, darkTheme } from '../styles/theme';

interface ThemeContextType {
  isDark: boolean;
  theme: typeof lightTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, isDark }: { children: ReactNode; isDark: boolean }) {
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
