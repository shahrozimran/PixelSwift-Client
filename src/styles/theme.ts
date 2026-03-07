// Theme and inline styles
export const lightTheme = {
  bgColor: '#f8fafc',
  cardBg: '#ffffff',
  primary: '#4f46e5',
  primaryHover: '#4338ca',
  textMain: '#1e293b',
  textMuted: '#64748b',
  borderColor: '#e2e8f0',
  inputBg: '#f1f5f9',
  shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
};

export const darkTheme = {
  bgColor: '#0f172a',
  cardBg: '#1e293b',
  primary: '#818cf8',
  primaryHover: '#7c3aed',
  textMain: '#f8fafc',
  textMuted: '#94a3b8',
  borderColor: '#334155',
  inputBg: '#0f172a',
  shadow: '0 10px 15px -3px rgb(0 0 0 / 0.4)',
};

export const getTheme = (isDark: boolean) => isDark ? darkTheme : lightTheme;

export const styles = (theme: typeof lightTheme) => ({
  bodyStyle: {
    margin: 0,
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    backgroundColor: theme.bgColor,
    color: theme.textMain,
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
    minHeight: '80vh',
  },
  card: {
    background: theme.cardBg,
    borderRadius: '24px',
    padding: '32px',
    border: `1px solid ${theme.borderColor}`,
    boxShadow: theme.shadow,
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  button: {
    backgroundColor: theme.primary,
    color: 'white',
    padding: '12px 24px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: 600,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: theme.primaryHover,
    transform: 'translateY(-1px)',
  },
  buttonDisabled: {
    backgroundColor: '#cbd5e1',
    cursor: 'not-allowed',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: `1px solid ${theme.borderColor}`,
    background: theme.inputBg,
    color: theme.textMain,
    marginTop: '8px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    fontFamily: 'inherit',
  },
  slider: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: `1px solid ${theme.borderColor}`,
    background: theme.inputBg,
    color: theme.textMain,
    marginTop: '8px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    cursor: 'pointer',
  },
  label: {
    color: theme.textMuted,
    fontWeight: 600,
    marginBottom: '8px',
    display: 'block',
  },
  controlGroup: {
    marginBottom: '25px',
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
});
