const Header = ({ onNavClick }) => (
  <header style={{ 
    padding: '15px 0', 
    borderBottom: '1px solid #e2e8f0', 
    background: 'rgba(255, 255, 255, 0.8)', 
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 1000 
  }}>
    <div style={{ 
      maxWidth: '1000px', 
      margin: '0 auto', 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center', 
      padding: '0 20px' 
    }}>
      <h2 
        style={{ color: '#4f46e5', margin: 0, cursor: 'pointer', fontSize: '1.8rem', fontWeight: 800 }} 
        onClick={() => onNavClick('home')}
      >
        PixelSwift
      </h2>
    </div>
  </header>
);