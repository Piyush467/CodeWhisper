import React, { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export const Toast = ({
  message,
  type = 'info',
  onClose,
  duration = 4000
}) => {
  useEffect(() => {
    if (!message) return;
    
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} color="#10b981" />;
      case 'warning':
        return <AlertTriangle size={18} color="#f59e0b" />;
      case 'error':
        return <AlertCircle size={18} color="#ef4444" />;
      case 'info':
      default:
        return <Info size={18} color="#3b82f6" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'rgba(16, 185, 129, 0.4)';
      case 'warning':
        return 'rgba(245, 158, 11, 0.4)';
      case 'error':
        return 'rgba(239, 68, 68, 0.4)';
      case 'info':
      default:
        return 'rgba(59, 130, 246, 0.4)';
    }
  };

  return (
    <div 
      className="glass-panel animate-slide-in-right"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.9)',
        borderLeft: `4px solid ${getBorderColor()}`,
        borderRadius: '8px',
        padding: '14px 20px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 16px rgba(99, 102, 241, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '380px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {getIcon()}
      </div>
      <div style={{
        flex: 1,
        fontSize: '0.9rem',
        fontWeight: '500',
        color: '#f3f4f6',
        lineHeight: '1.4'
      }}>
        {message}
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#9ca3af',
          display: 'flex',
          alignItems: 'center',
          transition: 'color 0.2s'
        }}
        onMouseOver={(e) => e.target.style.color = '#ffffff'}
        onMouseOut={(e) => e.target.style.color = '#9ca3af'}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
