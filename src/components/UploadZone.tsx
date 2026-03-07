import { useDropzone } from "react-dropzone";
import { useTheme } from "../context/ThemeContext";
import { Upload } from "lucide-react";

interface Props {
  onFileSelect: (file: File) => void;
}

export default function UploadZone({ onFileSelect }: Props) {
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
        background: isDragActive ? theme.primary + '15' : theme.inputBg,
        borderRadius: '16px',
        padding: '48px 32px',
        border: `2px dashed ${isDragActive ? theme.primary : theme.borderColor}`,
        transition: 'all 0.3s ease',
        textAlign: "center", 
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        if (!isDragActive) {
          e.currentTarget.style.borderColor = theme.primary;
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragActive) {
          e.currentTarget.style.borderColor = theme.borderColor;
        }
      }}
    >
      <input {...getInputProps()} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <Upload size={40} color={theme.primary} strokeWidth={1.5} />
        <div>
          <p style={{ color: theme.textMain, fontWeight: 600, margin: '0 0 4px 0', fontSize: '1rem' }}>
            Drop image here
          </p>
          <p style={{ color: theme.textMuted, margin: 0, fontSize: '0.9rem' }}>or click to select</p>
        </div>
      </div>
    </div>
  );
}