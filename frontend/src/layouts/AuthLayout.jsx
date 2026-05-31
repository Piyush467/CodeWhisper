import React from 'react';

export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      overflow: 'hidden',
      background: '#040712'
    }}>
      {/* Background Glowing Accents */}
      <div className="glow-spot-indigo" style={{ top: '-10%', left: '-10%', width: '500px', height: '500px' }} />
      <div className="glow-spot-teal" style={{ bottom: '-15%', right: '-10%', width: '500px', height: '500px' }} />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '440px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Logo and Brand Title */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '28px',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
            padding: '12px',
            borderRadius: '16px',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
            fontSize: '1.8rem',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            🛡️
          </div>
          
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '800',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(to right, #ffffff, #a5b4fc, #81e6d9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(99, 102, 241, 0.2)'
          }}>
            SyntacticReview
          </h1>
          
          {subtitle && (
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              fontWeight: '500'
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Auth Glass Card */}
        <div 
          className="glass-panel" 
          style={{
            width: '100%',
            padding: '32px',
            background: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 24px rgba(99, 102, 241, 0.05)'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
