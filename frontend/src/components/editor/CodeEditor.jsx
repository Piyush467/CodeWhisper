import React, { useState, useEffect, useRef } from 'react';
import { FileCode, Trash2, Clipboard } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import ReviewButton from './ReviewButton';
import { INITIAL_CODE_TEMPLATES } from '../../utils/constants';

export const CodeEditor = ({ onSubmit, loading }) => {
  const [code, setCode] = useState(INITIAL_CODE_TEMPLATES.javascript);
  const [language, setLanguage] = useState('javascript');
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef(null);
  const lineCounterRef = useRef(null);

  // Auto-update character count
  useEffect(() => {
    setCharCount((code || '').length);
  }, [code]);

  // Handle template loading when language selector is changed
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    // Load matching code template if existing code is empty or unmodified from default
    if (!code.trim() || Object.values(INITIAL_CODE_TEMPLATES).includes(code)) {
      setCode(INITIAL_CODE_TEMPLATES[newLang] || '');
    }
  };

  // Sync scrolling between textarea and line numbers panel
  const handleScroll = () => {
    if (textareaRef.current && lineCounterRef.current) {
      lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleClear = () => {
    setCode('');
    if (textareaRef.current) textareaRef.current.focus();
  };

  // Calculate dynamic line numbers
  const lines = (code || '').split('\n');
  const totalLines = Math.max(1, lines.length);

  const handleSubmit = () => {
    if (!code.trim()) return;
    onSubmit(code, language);
  };

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      height: '100%',
      minHeight: '480px'
    }}>
      {/* Editor Header Panel */}
      <div style={{
        padding: '12px 18px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(10, 15, 30, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileCode size={18} color="var(--primary)" />
          <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Source Editor</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <LanguageSelector
            value={language}
            onChange={handleLanguageChange}
            disabled={loading}
          />
          
          <button
            onClick={handleClear}
            disabled={loading || !code}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => !loading && (e.target.style.color = '#ef4444')}
            onMouseOut={(e) => (e.target.style.color = 'var(--text-muted)')}
            title="Clear Code"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Editor Input Area with dynamic line counts */}
      <div style={{
        display: 'flex',
        flex: 1,
        background: '#040710',
        position: 'relative',
        minHeight: '340px'
      }}>
        {/* Line Numbers panel */}
        <div 
          ref={lineCounterRef}
          style={{
            width: '46px',
            padding: '14px 8px',
            textAlign: 'right',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            borderRight: '1px solid rgba(255, 255, 255, 0.04)',
            background: '#03050c',
            userSelect: 'none',
            overflow: 'hidden',
            lineHeight: '1.6',
            whiteSpace: 'pre'
          }}
        >
          {Array.from({ length: totalLines }).map((_, index) => (
            <div key={index} style={{ height: '1.35rem' }}>{index + 1}</div>
          ))}
        </div>

        {/* Real TextArea code input */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          disabled={loading}
          className="custom-editor-textarea"
          placeholder="Paste or write your source code here..."
          spellCheck="false"
          maxLength={50000}
          style={{
            flex: 1,
            height: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: '14px 16px',
            color: '#e2e8f0',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            resize: 'none',
            overflowY: 'auto',
            whiteSpace: 'pre'
          }}
        />
      </div>

      {/* Editor Footer Panel */}
      <div style={{
        padding: '12px 18px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(10, 15, 30, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Character count bar */}
        <div style={{
          fontSize: '0.8rem',
          color: charCount > 40000 ? '#fca5a5' : 'var(--text-secondary)'
        }}>
          Length: <strong style={{
            color: charCount > 40000 ? '#ef4444' : 'var(--primary)'
          }}>{charCount.toLocaleString()}</strong> / 50,000 chars
        </div>

        <ReviewButton
          onClick={handleSubmit}
          loading={loading}
          disabled={loading || !code.trim() || charCount > 50000}
        />
      </div>

      <style>{`
        .custom-editor-textarea::placeholder {
          color: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default CodeEditor;
