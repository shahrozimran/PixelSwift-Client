import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Image as ImageIcon } from "lucide-react";

interface Props {
  format: string;
  setFormat: (value: string) => void;
}

export default function FormatSelector({ format, setFormat }: Props) {
  const { theme } = useTheme();

  return (
    <div style={{ marginBottom: '8px' }}>
      <label htmlFor="format-select" style={{ color: theme.textMuted, fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
        <ImageIcon size={16} />
        Format
      </label>
      <select
        id="format-select"
        style={{
          width: '100%',
          padding: '12px 14px',
          borderRadius: '10px',
          border: `1px solid ${theme.borderColor}`,
          background: theme.cardBg,
          color: theme.textMain,
          marginTop: '8px',
          transition: 'all 0.2s ease',
          fontFamily: 'inherit',
          fontSize: '0.95rem',
          fontWeight: 500,
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${theme.primary}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          backgroundSize: '18px',
          paddingRight: '40px',
        }}
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = theme.primary;
          e.currentTarget.style.backgroundColor = theme.inputBg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = theme.borderColor;
          e.currentTarget.style.backgroundColor = theme.cardBg;
        }}
      >
        <optgroup label="Standard">
          <option value="png">PNG - Lossless</option>
          <option value="jpeg">JPEG - Lossy</option>
          <option value="webp">WEBP - Modern</option>
        </optgroup>
        <optgroup label="Professional">
          <option value="psd">PSD - Photoshop</option>
          <option value="tiff">TIFF - Archive</option>
          <option value="avif">AVIF - Next-Gen</option>
          <option value="ico">ICO - Icon</option>
        </optgroup>
        <optgroup label="Advanced">
          <option value="svg">SVG - Vector</option>
        </optgroup>
      </select>
    </div>
  );
}