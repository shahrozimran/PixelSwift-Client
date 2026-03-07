import { useTheme } from "../context/ThemeContext";
import { Eye } from "lucide-react";

export default function PreviewCard({ file }) {
  const { theme } = useTheme();

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <Eye size={16} color={theme.textMuted} />
        <span style={{ color: theme.textMuted, fontWeight: 600, fontSize: '0.9rem' }}>Image Preview</span>
      </div>
      <div style={{
        background: theme.inputBg,
        borderRadius: '14px',
        padding: '14px',
        border: `1px solid ${theme.borderColor}`,
        overflow: 'hidden',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          style={{ width: "100%", borderRadius: '10px', objectFit: 'cover', maxHeight: '280px' }}
        />
        <div style={{ marginTop: '14px' }}>
          <p style={{ color: theme.textMain, marginTop: 0, marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {file.name}
          </p>
          <p style={{ color: theme.textMuted, marginTop: 0, marginBottom: 0, fontSize: '0.8rem' }}>
            {formatFileSize(file.size)}
          </p>
        </div>
      </div>
    </div>
  );
}