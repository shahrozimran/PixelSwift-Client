import { useDropzone } from "react-dropzone";
import { useTheme } from "../context/ThemeContext";
import { Upload, Cloud } from "lucide-react";

export default function UploadZone({ onFileSelect }) {
  const { theme } = useTheme();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) onFileSelect(acceptedFiles[0]);
    }
  });

  return (
    <div 
      {...getRootProps()} 
      style={{
        background: isDragActive ? `${theme.primary}08` : theme.inputBg,
        borderRadius: '16px',
        padding: '56px 32px',
        border: `2px dashed ${isDragActive ? theme.primary : theme.borderColor}`,
        transition: 'all 0.3s ease',
        textAlign: "center", 
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        if (!isDragActive) {
          e.currentTarget.style.borderColor = theme.primary;
          e.currentTarget.style.background = `${theme.primary}04`;
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragActive) {
          e.currentTarget.style.borderColor = theme.borderColor;
          e.currentTarget.style.background = theme.inputBg;
        }
      }}
    >
      <input {...getInputProps()} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '12px',
          background: `${theme.primary}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Cloud size={32} color={theme.primary} strokeWidth={1.5} />
        </div>
        <div>
          <p style={{ color: theme.textMain, fontWeight: 600, margin: '0 0 4px 0', fontSize: '1.05rem' }}>
            Drop your image here
          </p>
          <p style={{ color: theme.textMuted, margin: 0, fontSize: '0.9rem' }}>PNG, JPEG, WEBP and more</p>
        </div>
      </div>
    </div>
  );
}