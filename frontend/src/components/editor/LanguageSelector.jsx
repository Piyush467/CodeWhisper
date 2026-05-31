import React from 'react';
import { Terminal } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../utils/constants';

export const LanguageSelector = ({ value, onChange, disabled }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <Terminal size={16} color="var(--primary)" style={{
        filter: 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.4))'
      }} />
      
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="custom-input"
        style={{
          width: '160px',
          padding: '8px 12px 8px 12px',
          fontSize: '0.85rem',
          fontWeight: '500',
          cursor: 'pointer',
          borderRadius: '6px',
          background: 'rgba(15, 23, 42, 0.7)'
        }}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value} style={{
            background: '#090d16',
            color: '#ffffff'
          }}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
