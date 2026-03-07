export const lightTheme = {
  bgColor: '#f5f7fa',
  cardBg: '#ffffff',
  primary: '#5b4cff',
  primaryHover: '#4a3dcc',
  textMain: '#1a202c',
  textMuted: '#718096',
  borderColor: '#e2e8f0',
  inputBg: '#f7fafc',
  shadow: '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.08)',
  shadowMd: '0 4px 12px rgba(0, 0, 0, 0.08)',
  shadowLg: '0 10px 30px rgba(0, 0, 0, 0.1)',
  success: '#48bb78',
  error: '#f56565',
  warning: '#ed8936',
};

export const darkTheme = {
  bgColor: '#0f1419',
  cardBg: '#1a202c',
  primary: '#7c70ff',
  primaryHover: '#6b5ae8',
  textMain: '#f7fafc',
  textMuted: '#a0aec0',
  borderColor: '#2d3748',
  inputBg: '#2d3748',
  shadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.4)',
  shadowMd: '0 4px 12px rgba(0, 0, 0, 0.4)',
  shadowLg: '0 10px 30px rgba(0, 0, 0, 0.5)',
  success: '#48bb78',
  error: '#f56565',
  warning: '#ed8936',
};

export const getTheme = (isDark) => isDark ? darkTheme : lightTheme;
