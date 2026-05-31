import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: '#040712',
      overflow: 'hidden'
    }}>
      {/* Background Glowing Accents */}
      <div className="glow-spot-indigo" style={{ top: '20%', left: '30%', width: '500px', height: '500px' }} />

      <div className="glass-panel" style={{
        padding: '40px',
        maxWidth: '460px',
        width: '100%',
        textAlign: 'center',
        background: 'rgba(15, 23, 42, 0.55)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 0 24px rgba(99, 102, 241, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        <AlertCircle size={48} color="var(--severity-critical)" style={{
          filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.4))'
        }} />

        <h1 style={{
          fontSize: '4rem',
          fontWeight: '900',
          lineHeight: '1',
          margin: 0,
          background: 'linear-gradient(135deg, #ffffff 0%, var(--text-muted) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>404</h1>

        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: '700',
          color: '#ffffff',
          letterSpacing: '-0.01em'
        }}>
          Page Not Found
        </h2>

        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.5'
        }}>
          The page link you tried to open might have moved, expired, or was entered incorrectly.
        </p>

        <Button 
          variant="primary" 
          onClick={() => navigate('/')} 
          icon={Home}
          style={{ width: '100%', marginTop: '10px' }}
        >
          Return Workspace Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
