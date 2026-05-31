import React from 'react';

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  icon: Icon = null,
  className = '',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'danger':
        return 'btn-danger';
      default:
        return 'btn-primary';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn ${getVariantClass()} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          {/* Neon Mini Spinner */}
          <svg className="animate-spin h-4 w-4 text-current" style={{
            animation: 'spin 1s linear infinite',
            width: '16px',
            height: '16px'
          }} viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        <>
          {Icon && <Icon size={18} />}
          {children}
        </>
      )}
      
      {/* Dynamic Keyframe Inline style to guarantee spin animation works without tailwind */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};

export default Button;
