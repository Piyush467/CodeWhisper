import React from 'react';
import { Sparkles } from 'lucide-react';
import Button from '../common/Button';

export const ReviewButton = ({ onClick, loading, disabled }) => {
  return (
    <Button
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      icon={Sparkles}
      variant="primary"
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #0d9488 100%)',
        backgroundSize: '200% 200%',
        animation: 'shimmer 4s ease infinite',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 24px',
        fontSize: '0.95rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4), 0 0 16px rgba(168, 85, 247, 0.2)',
        overflow: 'hidden'
      }}
    >
      Submit for AI Review
      
      {/* Inline styles for shimmering neon borders */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </Button>
  );
};

export default ReviewButton;
