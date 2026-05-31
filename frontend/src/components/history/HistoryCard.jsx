import React from 'react';
import { Terminal, Calendar, AlertCircle, Trash2, ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export const HistoryCard = ({ review, active, onClick, onDelete }) => {
  const { _id, language, explanation, detectedIssues = [], createdAt } = review;

  const handleDelete = (e) => {
    e.stopPropagation(); // Avoid triggering card selection click
    onDelete(_id);
  };

  const getIssuesSummaryText = () => {
    if (!detectedIssues || detectedIssues.length === 0) return 'Clean Code';
    
    const count = detectedIssues.length;
    return `${count} ${count === 1 ? 'issue' : 'issues'} found`;
  };

  return (
    <div 
      onClick={onClick}
      className="glass-panel"
      style={{
        padding: '12px 14px',
        background: active ? 'rgba(99, 102, 241, 0.08)' : 'rgba(15, 23, 42, 0.25)',
        borderColor: active ? 'var(--primary)' : 'rgba(255, 255, 255, 0.04)',
        boxShadow: active ? '0 0 16px rgba(99, 102, 241, 0.15)' : 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        position: 'relative',
        transition: 'all 0.2s ease'
      }}
    >
      {/* Title / Language Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Terminal size={14} color={active ? 'var(--primary)' : 'var(--text-secondary)'} />
          <span style={{
            fontSize: '0.82rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: active ? '#ffffff' : 'var(--text-secondary)'
          }}>{language}</span>
        </div>

        <button
          onClick={handleDelete}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            padding: '2px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.color = '#ef4444'}
          onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
          title="Delete History Item"
        >
          <Trash2 size={13} style={{ pointerEvents: 'none' }} />
        </button>
      </div>

      {/* Date */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
        <Calendar size={12} />
        <span>{formatDate(createdAt)}</span>
      </div>

      {/* Issues Badge Summary */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '2px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.76rem',
          fontWeight: '600',
          color: detectedIssues.length > 0 ? '#fca5a5' : '#a7f3d0'
        }}>
          <AlertCircle size={12} />
          <span>{getIssuesSummaryText()}</span>
        </div>

        {active && (
          <ArrowRight size={14} color="var(--primary)" style={{
            filter: 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.5))'
          }} />
        )}
      </div>
    </div>
  );
};

export default HistoryCard;
