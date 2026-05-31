import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  confirmText = 'Confirm',
  onConfirm = null,
  confirmVariant = 'primary',
  loading = false
}) => {
  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'rgba(3, 5, 12, 0.7)',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s'
        }}
      />

      {/* Modal Content Glass panel */}
      <div 
        className="glass-panel animate-fade-in"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '500px',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 0 24px rgba(99, 102, 241, 0.1)',
          borderRadius: '12px',
          zIndex: 1000,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            fontFamily: 'var(--font-sans)',
            color: '#ffffff'
          }}>{title}</h3>
          
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.color = '#ffffff'}
            onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{
          padding: '20px',
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.5'
        }}>
          {children}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(10, 15, 30, 0.3)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          {onConfirm && (
            <Button 
              variant={confirmVariant} 
              onClick={onConfirm} 
              loading={loading}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
