import { useTheme } from "../context/ThemeContext";
import { Sliders } from "lucide-react";

export default function QualitySlider({ quality, setQuality }) {
  const { theme } = useTheme();

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <label style={{ color: theme.textMuted, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
          <Sliders size={16} />
          Compression Level
        </label>
        <span style={{ color: theme.primary, fontWeight: '700', fontSize: '0.85rem', background: theme.inputBg, padding: '5px 11px', borderRadius: '8px', minWidth: '45px', textAlign: 'center' }}>
          {quality}%
        </span>
      </div>
      <input
        type="range"
        min="10"
        max="100"
        step="1"
        value={quality}
        onChange={(e) => setQuality(Number(e.target.value))}
        style={{
          width: '100%',
          height: '6px',
          borderRadius: '3px',
          background: `linear-gradient(to right, ${theme.primary} 0%, ${theme.primary} ${quality}%, ${theme.borderColor} ${quality}%, ${theme.borderColor} 100%)`,
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          WebkitAppearance: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.height = '8px';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.height = '6px';
        }}
      />
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          borderRadius: 50%;
          background: ${theme.primary};
          cursor: pointer;
          box-shadow: 0 2px 6px ${theme.primary}40;
          border: none;
          transition: all 0.2s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          width: 22px;
          height: 22px;
          box-shadow: 0 4px 12px ${theme.primary}60;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          borderRadius: 50%;
          background: ${theme.primary};
          cursor: pointer;
          box-shadow: 0 2px 6px ${theme.primary}40;
          border: none;
          transition: all 0.2s ease;
        }
        input[type="range"]::-moz-range-thumb:hover {
          width: 22px;
          height: 22px;
          box-shadow: 0 4px 12px ${theme.primary}60;
        }
      `}</style>
    </div>
  );
}