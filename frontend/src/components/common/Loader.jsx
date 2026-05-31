import React from 'react';

export const Loader = ({ fullScreen = false, message = 'Parsing with AI Reviewer...' }) => {
  const spinnerElement = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '24px'
    }}>
      {/* Revolving Neon Dual-Spinner */}
      <div style={{
        position: 'relative',
        width: '60px',
        height: '60px'
      }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '4px solid transparent',
          borderTopColor: '#6366f1',
          borderBottomColor: '#a855f7',
          animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          top: '10%',
          left: '10%',
          borderRadius: '50%',
          border: '4px solid transparent',
          borderLeftColor: '#0d9488',
          borderRightColor: '#06b6d4',
          animation: 'spin-reverse 1s linear infinite'
        }}></div>
      </div>
      <p style={{
        fontSize: '0.95rem',
        fontWeight: '500',
        color: '#c7d2fe',
        textShadow: '0 0 10px rgba(99, 102, 241, 0.4)',
        animation: 'pulse 1.8s infinite'
      }}>{message}</p>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );

  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: 'rgba(5, 7, 15, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
};

export default Loader;
