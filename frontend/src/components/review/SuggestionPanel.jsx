import React from 'react';
import { Lightbulb, ArrowUpRight } from 'lucide-react';

export const SuggestionPanel = ({ suggestions = [] }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="glass-panel" style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        paddingBottom: '10px'
      }}>
        <Lightbulb size={18} color="var(--severity-medium)" />
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '700',
          color: '#ffffff'
        }}>Best Practice Suggestions</h3>
      </div>

      <ul style={{
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {suggestions.map((suggestion, idx) => (
          <li 
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontSize: '0.88rem',
              color: '#cbd5e1',
              lineHeight: '1.5'
            }}
          >
            <ArrowUpRight 
              size={16} 
              color="var(--secondary)" 
              style={{
                flexShrink: 0,
                marginTop: '2px'
              }} 
            />
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionPanel;
