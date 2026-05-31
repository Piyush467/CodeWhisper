import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReview } from '../hooks/useReview';
import DashboardLayout from '../layouts/DashboardLayout';
import ImprovedCode from '../components/review/ImprovedCode';
import ExplanationPanel from '../components/review/ExplanationPanel';
import IssueList from '../components/review/IssueList';
import SuggestionPanel from '../components/review/SuggestionPanel';
import Loader from '../components/common/Loader';
import Toast from '../components/common/Toast';
import { ArrowLeft, Play } from 'lucide-react';

export const ReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeReview, fetchReviewDetails, loadingReview } = useReview();
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  const triggerToast = (msg, type = 'info') => {
    setToastMessage(msg);
    setToastType(type);
  };

  useEffect(() => {
    if (id) {
      fetchReviewDetails(id).catch(() => {
        triggerToast('Failed to load review details.', 'error');
        setTimeout(() => navigate('/'), 2000);
      });
    }
  }, [id, fetchReviewDetails, navigate]);

  if (loadingReview || !activeReview) {
    return (
      <DashboardLayout>
        <div className="glass-panel" style={{
          padding: '80px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px'
        }}>
          <Loader message="Loading code review session..." />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Navigation / Action Bar */}
        <div className="glass-panel" style={{
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          background: 'rgba(99, 102, 241, 0.05)'
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              fontWeight: '700',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
            onMouseOut={(e) => e.target.style.color = '#ffffff'}
          >
            <ArrowLeft size={16} />
            <span>Back to Workspace Dashboard</span>
          </button>

          <div style={{
            fontSize: '0.82rem',
            fontWeight: '600',
            color: 'var(--text-secondary)'
          }}>
            Reviewing Language: <strong style={{ textTransform: 'uppercase', color: 'var(--secondary)' }}>{activeReview.language}</strong>
          </div>
        </div>

        {/* Side-by-Side Comparison panels */}
        <div className="split-viewer">
          {/* Left Column: Original Code */}
          <div className="glass-panel" style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            minHeight: '480px'
          }}>
            <div style={{
              padding: '12px 18px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              background: 'rgba(239, 68, 68, 0.05)', // Subtle red tint
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Play size={16} color="var(--severity-critical)" style={{ transform: 'rotate(90deg)' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fda4af' }}>Original Source Code</span>
            </div>

            <div style={{ display: 'flex', flex: 1, background: '#03050a' }}>
              <div style={{
                width: '46px',
                padding: '14px 8px',
                textAlign: 'right',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: '#1e293b',
                borderRight: '1px solid rgba(255, 255, 255, 0.03)',
                background: '#010306',
                userSelect: 'none',
                lineHeight: '1.6',
                whiteSpace: 'pre'
              }}>
                {Array.from({ length: Math.max(1, (activeReview.originalCode || '').split('\n').length) }).map((_, idx) => (
                  <div key={idx} style={{ height: '1.35rem' }}>{idx + 1}</div>
                ))}
              </div>

              <pre style={{
                flex: 1,
                margin: 0,
                padding: '14px 16px',
                color: '#94a3b8',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                lineHeight: '1.6',
                overflowX: 'auto',
                overflowY: 'auto',
                whiteSpace: 'pre',
                maxHeight: '480px'
              }}>
                <code>{activeReview.originalCode}</code>
              </pre>
            </div>
          </div>

          {/* Right Column: Refactored improved version */}
          <ImprovedCode
            code={activeReview.improvedCode}
            language={activeReview.language}
            onToast={triggerToast}
          />
        </div>

        {/* High-level explanations underneath */}
        <ExplanationPanel explanation={activeReview.explanation} />

        {/* Bottom Side-by-side: IssueList and Suggestions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '24px'
        }} className="bottom-grid">
          <IssueList issues={activeReview.detectedIssues} />
          <SuggestionPanel suggestions={activeReview.suggestions} />
        </div>

      </div>

      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage('')}
      />

      <style>{`
        @media (max-width: 900px) {
          .bottom-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default ReviewDetail;
