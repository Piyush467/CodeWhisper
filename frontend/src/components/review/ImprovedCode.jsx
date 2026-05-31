import React, { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../../utils/copyToClipboard';

export const ImprovedCode = ({ code, language, onToast }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      if (onToast) {
        onToast('Code copied to clipboard successfully!', 'success');
      }
      setTimeout(() => setCopied(false), 2000);
    } else {
      if (onToast) {
        onToast('Failed to copy code to clipboard.', 'error');
      }
    }
  };

  const lines = (code || '').split('\n');
  const totalLines = Math.max(1, lines.length);

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      height: '100%',
      minHeight: '480px'
    }}>
      {/* Header Panel */}
      <div style={{
        padding: '12px 18px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(13, 148, 136, 0.1)', // Subtle teal tint
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--secondary)" style={{
            filter: 'drop-shadow(0 0 4px rgba(13, 148, 136, 0.4))'
          }} />
          <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--secondary)' }}>
            Refactored Code
          </span>
        </div>

        <button
          onClick={handleCopy}
          disabled={!code}
          style={{
            background: copied ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${copied ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '0.8rem',
            fontWeight: '600',
            cursor: 'pointer',
            color: copied ? '#a7f3d0' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s'
          }}
        >
          {copied ? (
            <>
              <Check size={14} color="#10b981" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div style={{
        display: 'flex',
        flex: 1,
        background: '#02050b',
        position: 'relative',
        minHeight: '340px'
      }}>
        {/* Line Numbers */}
        <div style={{
          width: '46px',
          padding: '14px 8px',
          textAlign: 'right',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          color: '#1e293b', // darker muted
          borderRight: '1px solid rgba(255, 255, 255, 0.03)',
          background: '#010306',
          userSelect: 'none',
          overflow: 'hidden',
          lineHeight: '1.6',
          whiteSpace: 'pre'
        }}>
          {Array.from({ length: totalLines }).map((_, index) => (
            <div key={index} style={{ height: '1.35rem' }}>{index + 1}</div>
          ))}
        </div>

        {/* Code Renderer */}
        <pre style={{
          flex: 1,
          margin: 0,
          padding: '14px 16px',
          color: '#cbd5e1',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          overflowX: 'auto',
          overflowY: 'auto',
          whiteSpace: 'pre',
          height: '100%',
          maxHeight: '480px'
        }}>
          <code>{code || '// No improved version produced'}</code>
        </pre>
      </div>
    </div>
  );
};

export default ImprovedCode;
