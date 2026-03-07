import React, { useState, useRef, useEffect } from "react";
import UploadZone from "./components/UploadZone";
import FormatSelector from "./components/FormatSelector";
import QualitySlider from "./components/QualitySlider";
import PreviewCard from "./components/PreviewCard";
import { convertImage } from "./services/api";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { Sun, Moon, Download, Zap } from "lucide-react";

// --- Header with Centered Logo and Theme Toggle ---
const Header = ({ isDarkMode, onToggleTheme }: { isDarkMode: boolean; onToggleTheme: () => void }) => {
  const { theme } = useTheme();

  return (
    <header style={{
      padding: '20px 0',
      borderBottom: `1px solid ${theme.borderColor}`,
      background: theme.cardBg,
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Zap size={28} color={theme.primary} strokeWidth={2.5} />
          <h2 style={{
            color: theme.primary,
            margin: 0,
            fontSize: '1.4rem',
            fontWeight: 700,
            letterSpacing: '-0.02em'
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
            gap: '6px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.inputBg;
            e.currentTarget.style.borderColor = theme.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = theme.borderColor;
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
      padding: '24px 0',
      textAlign: 'center',
      borderTop: `1px solid ${theme.borderColor}`,
      color: theme.textMuted,
      fontSize: '12px',
      background: theme.cardBg,
      transition: 'all 0.3s ease'
    }}>
      <p style={{ margin: 0 }}>© 2026 PixelSwift. Fast • Simple • Precise</p>
    </footer>
  );
};

function AppContent() {
  const { theme } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState("png");
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const apiRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);

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
          timestamp: new Date().toLocaleTimeString()
        },
        ...prev,
      ]);
    } catch (error) {
      alert("Conversion failed. Ensure your local server is running on port 5000 and the format is supported.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '48px 24px',
      minHeight: '80vh',
      flex: 1,
    }} ref={homeRef}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '60px', marginTop: '20px' }}>
        <h1 style={{ 
          fontSize: '2.8rem', 
          fontWeight: 700, 
          color: theme.textMain, 
          marginBottom: '12px', 
          letterSpacing: '-0.02em' 
        }}>
          Convert Images <span style={{ color: theme.primary }}>Instantly</span>
        </h1>
        <p style={{ color: theme.textMuted, fontSize: '1rem', margin: 0 }}>
          Lossless, fast, and precise image format conversion
        </p>
      </div>

      {/* Main Card */}
      <div style={{
        background: theme.cardBg,
        borderRadius: '20px',
        padding: '40px 32px',
        border: `1px solid ${theme.borderColor}`,
        boxShadow: theme.shadow,
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
        marginBottom: '60px'
      }}>
        <UploadZone onFileSelect={setFile} />
        
        {file && (
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'start' }}>
            <PreviewCard file={file} />
            
            <div>
              <FormatSelector format={format} setFormat={setFormat} />
              <div style={{ marginTop: '28px' }}>
                <QualitySlider quality={quality} setQuality={setQuality} />
              </div>
              
              <button
                onClick={handleConvert}
                disabled={loading}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = theme.primaryHover;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 8px 16px ${theme.primary}30`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = theme.primary;
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
                style={{
                  width: '100%',
                  marginTop: '32px',
                  height: '48px',
                  fontSize: '15px',
                  fontWeight: 600,
                  backgroundColor: loading ? '#cbd5e1' : theme.primary,
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Download size={18} />
                {loading ? "Converting..." : "Convert & Download"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity Section */}
      {history.length > 0 && (
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ marginBottom: '20px', color: theme.textMain, fontSize: '1.1rem', fontWeight: 600 }}>
            Recent Conversions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {history.slice(0, 5).map((item) => (
              <div key={item.id} style={{
                background: theme.cardBg,
                borderRadius: '12px',
                padding: '14px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: `1px solid ${theme.borderColor}`,
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.inputBg;
                e.currentTarget.style.borderColor = theme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = theme.cardBg;
                e.currentTarget.style.borderColor = theme.borderColor;
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <div style={{
                    background: theme.inputBg,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    color: theme.primary,
                    fontSize: '11px',
                    fontWeight: 700,
                    minWidth: '40px',
                    textAlign: 'center'
                  }}>
                    {item.format}
                  </div>
                  <span style={{ color: theme.textMuted, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </span>
                </div>
                <a href={item.url} download onClick={(e) => e.stopPropagation()} style={{ color: theme.primary, textDecoration: 'none', fontWeight: 600, fontSize: '13px', marginLeft: '12px' }}>
                  ↓
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeProvider isDark={isDarkMode}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', transition: 'background-color 0.3s ease' }}>
        <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
        <AppContent />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;