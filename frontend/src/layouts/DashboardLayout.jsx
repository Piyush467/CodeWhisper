import React from 'react';
import { LogOut, User, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#040712',
      overflowX: 'hidden'
    }}>
      {/* Background Glowing Accents */}
      <div className="glow-spot-indigo" style={{ top: '-10%', left: '30%', width: '600px', height: '600px' }} />
      <div className="glow-spot-teal" style={{ bottom: '-20%', right: '10%', width: '500px', height: '500px' }} />

      {/* Navigation Top Header Bar */}
      <header className="glass-panel" style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderRadius: 0,
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        background: 'rgba(10, 15, 30, 0.75)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>🛡️</span>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '800',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(to right, #ffffff, #c7d2fe, #38bdf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            Codewhisper
            <span style={{
              fontSize: '0.65rem',
              fontWeight: '700',
              padding: '2px 6px',
              borderRadius: '4px',
              background: 'rgba(99, 102, 241, 0.15)',
              color: '#a5b4fc',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>AI Engine v1.5</span>
          </h2>
        </div>

        {/* User profile & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* User Name Badge */}
          {user && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '20px'
            }}>
              <User size={14} color="var(--primary)" />
              <span style={{
                fontSize: '0.82rem',
                fontWeight: '600',
                color: '#f3f4f6'
              }}>
                {user.name}
              </span>
            </div>
          )}

          {/* Logout Action */}
          <button
            onClick={logout}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: '600',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.color = '#fca5a5'}
            onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Screen Panel Column */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 28px',
        maxWidth: '1600px',
        width: '100%',
        margin: '0 auto'
      }}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
