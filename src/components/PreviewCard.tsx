import { useTheme } from "../context/ThemeContext";
import { Eye } from "lucide-react";

interface Props {
  file: File;
}

export default function PreviewCard({ file }: Props) {
  const { theme } = useTheme();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Eye size={16} color={theme.textMuted} />
        <span style={{ color: theme.textMuted, fontWeight: 600, fontSize: '0.95rem' }}>Preview</span>
      </div>
      <div style={{
        background: theme.inputBg,
        borderRadius: '16px',
        padding: '16px',
        border: `1px solid ${theme.borderColor}`,
        overflow: 'hidden',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          style={{ width: "100%", borderRadius: "12px", objectFit: 'cover', maxHeight: '300px' }}
        />
        <p style={{ color: theme.textMuted, marginTop: '12px', marginBottom: 0, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {file.name}
        </p>
        <p style={{ color: theme.textMuted, marginTop: '4px', marginBottom: 0, fontSize: '0.8rem' }}>
          {(file.size / 1024).toFixed(1)} KB
        </p>
      </div>
    </div>
  );
}