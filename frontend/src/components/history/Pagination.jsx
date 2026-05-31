import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  pagination,
  onPageChange,
  disabled = false
}) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '10px 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.04)',
      marginTop: '8px'
    }}>
      {/* Prev Page */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage || disabled}
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '6px',
          padding: '4px',
          cursor: !hasPrevPage || disabled ? 'not-allowed' : 'pointer',
          color: !hasPrevPage || disabled ? 'var(--text-muted)' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.2s'
        }}
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page indicator */}
      <span style={{
        fontSize: '0.8rem',
        fontWeight: '600',
        color: 'var(--text-secondary)'
      }}>
        Page <strong style={{ color: '#ffffff' }}>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>

      {/* Next Page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage || disabled}
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '6px',
          padding: '4px',
          cursor: !hasNextPage || disabled ? 'not-allowed' : 'pointer',
          color: !hasNextPage || disabled ? 'var(--text-muted)' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.2s'
        }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
