import { useState } from "react"; // Cleaned: Removed unused hooks
import UploadZone from "./components/UploadZone";
import FormatSelector from "./components/FormatSelector";
import QualitySlider from "./components/QualitySlider";
import PreviewCard from "./components/PreviewCard";
import { convertImage } from "./services/api";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { Sun, Moon, Download, Zap } from "lucide-react";

const Header = ({ isDarkMode, onToggleTheme }) => {
  const { theme } = useTheme();

  return (
    <header style={{
      padding: '18px 0',
      borderBottom: `1px solid ${theme.borderColor}`,
      background: theme.cardBg,
      backdropFilter: 'blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 28px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Zap size={28} color={theme.primary} strokeWidth={2.5} />
          <h2 style={{
            color: theme.primary,
            margin: 0,
            fontSize: '1.35rem',
            fontWeight: 700,
            letterSpacing: '-0.01em'
          }}>
            PixelSwift
          </h2>
        </div>

        <button
          onClick={onToggleTheme}
          style={{
            background: 'transparent',
            border: `1px solid ${theme.borderColor}`,
            borderRadius: '10px',
            padding: '8px 12px',
            cursor: 'pointer',
            color: theme.textMain,
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer style={{
      marginTop: 'auto',
      padding: '28px 0',
      textAlign: 'center',
      borderTop: `1px solid ${theme.borderColor}`,
      color: theme.textMuted,
      fontSize: '12px',
      background: theme.cardBg,
      transition: 'all 0.3s ease'
    }}>
      <p style={{ margin: 0 }}>PixelSwift - Fast Image Format Converter</p>
    </footer>
  );
};

function AppContent() {
  const { theme } = useTheme();
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("png");
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]); // Fixed: Now mapped below

  const handleConvert = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const blob = await convertImage(file, format, quality);
      const url = window.URL.createObjectURL(blob);
      const downloadExt = format === 'psd' ? 'tiff' : format;

      const link = document.createElement("a");
      link.href = url;
      link.download = `pixelswift-${Date.now()}.${downloadExt}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setHistory((prev) => [
        {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          url,
          format: downloadExt.toUpperCase(),
        },
        ...prev,
      ]);
    } catch (error) {
      console.error(error);
      alert("Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 28px', flex: 1 }}>
      {/* Hero Section with SEO optimized text */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 800, 
          color: theme.textMain, 
          marginBottom: '20px',
          letterSpacing: '-0.03em'
        }}>
          Convert Images <span style={{ color: theme.primary }}>Effortlessly</span>
        </h1>
        <p style={{ 
          color: theme.textMain, 
          fontSize: '1.2rem', 
          fontWeight: '500',
          maxWidth: '700px', 
          margin: '0 auto 12px auto',
          lineHeight: '1.6'
        }}>
          Professional-grade image conversion with zero data loss. 
          Secure, lightning-fast, and optimized for high-fidelity results.
        </p>
        <p style={{ color: theme.textMuted, fontSize: '1rem', margin: 0 }}>
          Transform your image files to any format with perfect quality control
        </p>
      </div>

      {/* Main Conversion Tool */}
      <div style={{ 
        background: theme.cardBg, 
        padding: '44px', 
        borderRadius: '24px', 
        border: `1px solid ${theme.borderColor}`,
        boxShadow: theme.shadowMd 
      }}>
        <UploadZone onFileSelect={setFile} />
        
        {file && (
          <div style={{ marginTop: '44px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px' }}>
            <PreviewCard file={file} />
            <div>
              <FormatSelector format={format} setFormat={setFormat} />
              <QualitySlider quality={quality} setQuality={setQuality} />
              <button 
                onClick={handleConvert} 
                disabled={loading} 
                style={{ 
                  width: '100%', 
                  backgroundColor: theme.primary, 
                  color: '#fff', 
                  padding: '14px', 
                  borderRadius: '12px', 
                  border: 'none', 
                  marginTop: '24px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                <Download size={18} style={{ marginRight: '8px' }} />
                {loading ? "Processing..." : "Convert & Download"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent History - Resolves 'history' unused warning */}
      {history.length > 0 && (
        <div style={{ marginTop: '60px' }}>
          <h3 style={{ color: theme.textMain, marginBottom: '20px' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {history.map(item => (
              <div key={item.id} style={{ 
                background: theme.cardBg, 
                padding: '12px 20px', 
                borderRadius: '12px', 
                border: `1px solid ${theme.borderColor}`,
                display: 'flex',
                justifyContent: 'space-between',
                color: theme.textMain
              }}>
                <span>{item.name}</span>
                <span style={{ color: theme.primary, fontWeight: 'bold' }}>{item.format}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

// Wrapper to fix the Dark Mode Background issue
function AppContainer({ children, isDarkMode }) {
  const { theme } = useTheme();
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: isDarkMode ? (theme.bodyBg || '#0f172a') : (theme.bodyBg || '#f8fafc'),
      transition: 'background-color 0.3s ease'
    }}>
      {children}
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeProvider isDark={isDarkMode}>
      <AppContainer isDarkMode={isDarkMode}>
        <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
        <AppContent />
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;