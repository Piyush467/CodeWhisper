import React from 'react';
import { AlignLeft } from 'lucide-react';
import { renderSimpleMarkdown } from '../../utils/sanitizeHtml';

export const ExplanationPanel = ({ explanation }) => {
  return (
    <div className="glass-panel" style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        paddingBottom: '10px'
      }}>
        <AlignLeft size={18} color="var(--primary)" />
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '700',
          color: '#ffffff'
        }}>Review Summary</h3>
      </div>

      <div 
        dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(explanation) }}
        className="explanation-content"
        style={{
          fontSize: '0.92rem',
          color: '#cbd5e1',
          lineHeight: '1.7',
          maxHeight: '400px',
          overflowY: 'auto'
        }}
      />

      <style>{`
        .explanation-content strong {
          color: #ffffff;
          font-weight: 600;
        }
        .explanation-content .inline-code {
          background: rgba(99, 102, 241, 0.1);
          color: #a5b4fc;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 0.82rem;
        }
        .explanation-content ul {
          margin: 10px 0 10px 20px;
        }
        .explanation-content li {
          margin-bottom: 6px;
        }
      `}</style>
    </div>
  );
};

export default ExplanationPanel;
