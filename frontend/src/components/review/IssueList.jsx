import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, AlertOctagon, Zap, ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';

export const IssueList = ({ issues = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return <span className="badge badge-critical">Critical</span>;
      case 'high':
        return <span className="badge badge-high">High</span>;
      case 'medium':
        return <span className="badge badge-medium">Medium</span>;
      case 'low':
      default:
        return <span className="badge badge-low">Low</span>;
    }
  };

  const getIssueIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'security':
        return <ShieldAlert size={18} color="#ef4444" />;
      case 'bug':
        return <AlertOctagon size={18} color="#f97316" />;
      case 'performance':
        return <Zap size={18} color="#eab308" />;
      case 'style':
      case 'readability':
      default:
        return <CheckCircle2 size={18} color="#06b6d4" />;
    }
  };

  if (!issues || issues.length === 0) {
    return (
      <div className="glass-panel" style={{
        padding: '24px',
        textAlign: 'center',
        color: 'var(--text-secondary)'
      }}>
        <CheckCircle2 size={36} color="#10b981" style={{
          margin: '0 auto 12px auto',
          display: 'block',
          filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.3))'
        }} />
        <h4 style={{ color: '#ffffff', marginBottom: '4px', fontWeight: '600' }}>No Critical Issues Found</h4>
        <p style={{ fontSize: '0.85rem' }}>Your code follows exceptional patterns and is clean of compile bugs!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <AlertCircle size={18} color="#a855f7" />
        <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff' }}>
          Detected Issues ({issues.length})
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {issues.map((issue, idx) => {
          const isExpanded = expandedIndex === idx;
          const hasLineNumber = issue.line !== null && issue.line !== undefined;
          
          return (
            <div 
              key={idx}
              className="glass-panel"
              style={{
                borderRadius: '8px',
                borderLeft: `3px solid ${
                  issue.severity === 'critical' ? 'var(--severity-critical)' :
                  issue.severity === 'high' ? 'var(--severity-high)' :
                  issue.severity === 'medium' ? 'var(--severity-medium)' : 'var(--severity-low)'
                }`,
                background: 'rgba(15, 23, 42, 0.3)',
                overflow: 'hidden'
              }}
            >
              {/* Issue Collapsible Header */}
              <div 
                onClick={() => toggleExpand(idx)}
                style={{
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  {getIssueIcon(issue.type)}
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: '600',
                      color: '#ffffff' 
                    }}>
                      {issue.description.substring(0, 75)}
                      {issue.description.length > 75 ? '...' : ''}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Category: <strong style={{ textTransform: 'capitalize', color: 'var(--text-secondary)' }}>{issue.type}</strong>
                      {hasLineNumber && ` | Line ${issue.line}`}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {getSeverityBadge(issue.severity)}
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Issue Details Expanded Section */}
              {isExpanded && (
                <div style={{
                  padding: '0 16px 16px 44px',
                  fontSize: '0.88rem',
                  color: '#cbd5e1',
                  borderTop: '1px solid rgba(255, 255, 255, 0.03)',
                  background: 'rgba(5, 7, 15, 0.2)'
                }}>
                  <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                    <strong style={{ color: '#ffffff', display: 'block', marginBottom: '4px' }}>Description</strong>
                    <p style={{ lineHeight: '1.5' }}>{issue.description}</p>
                  </div>
                  
                  {issue.recommendation && (
                    <div style={{
                      padding: '10px 14px',
                      background: 'rgba(99, 102, 241, 0.05)',
                      border: '1px dashed rgba(99, 102, 241, 0.2)',
                      borderRadius: '6px',
                      marginTop: '8px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '4px',
                        color: '#a5b4fc',
                        fontWeight: '600'
                      }}>
                        <RefreshCw size={14} />
                        <span>Actionable Fix Recommendation</span>
                      </div>
                      <p style={{ fontSize: '0.84rem', lineHeight: '1.5', color: '#c7d2fe' }}>
                        {issue.recommendation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IssueList;
