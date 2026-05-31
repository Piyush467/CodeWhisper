import React, { useState } from 'react';
import { useReview } from '../hooks/useReview';
import DashboardLayout from '../layouts/DashboardLayout';
import HistorySidebar from '../components/history/HistorySidebar';
import CodeEditor from '../components/editor/CodeEditor';
import ImprovedCode from '../components/review/ImprovedCode';
import ExplanationPanel from '../components/review/ExplanationPanel';
import IssueList from '../components/review/IssueList';
import SuggestionPanel from '../components/review/SuggestionPanel';
import Modal from '../components/common/Modal';
import Toast from '../components/common/Toast';
import Loader from '../components/common/Loader';
import { ArrowLeft, Play, AlertTriangle } from 'lucide-react';

export const Dashboard = () => {
  const {
    activeReview,
    submitCodeReview,
    fetchReviewDetails,
    removeReview,
    resetActiveReview,
    loadingReview,
    error
  } = useReview();

  // Confirmation Modal and Toast notification states
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  const triggerToast = (msg, type = 'info') => {
    setToastMessage(msg);
    setToastType(type);
  };

  const handleCodeSubmit = async (code, language) => {
    try {
      triggerToast('Submitting code to Gemini API review engine...', 'info');
      await submitCodeReview(code, language);
      triggerToast('AI Code Review completed successfully!', 'success');
    } catch (err) {
      triggerToast(err.message || 'Error occurred while reviewing code.', 'error');
    }
  };

  const handleSelectReview = async (id) => {
    try {
      await fetchReviewDetails(id);
      triggerToast('Review details loaded.', 'success');
    } catch (err) {
      triggerToast('Failed to load review details.', 'error');
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      await removeReview(deleteTargetId);
      triggerToast('Review session deleted successfully.', 'success');
    } catch (err) {
      triggerToast('Failed to delete review session.', 'error');
    } finally {
      setIsDeleting(false);
      setDeleteTargetId(null);
    }
  };

  return (
    <DashboardLayout>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '24px',
        width: '100%',
        alignItems: 'stretch'
      }} className="dashboard-grid">
        
        {/* Left Side: Sidebar list */}
        <div style={{ minWidth: 0 }}>
          <HistorySidebar
            activeReviewId={activeReview?._id || activeReview?.id}
            onSelectReview={handleSelectReview}
            onDeleteReview={handleDeleteClick}
          />
        </div>

        {/* Right Side: Main Workspace area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
          
          {loadingReview ? (
            <div className="glass-panel" style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '480px',
              background: 'rgba(10, 15, 30, 0.4)'
            }}>
              <Loader message="Gemini AI is examining your code patterns..." />
            </div>
          ) : !activeReview ? (
            // 1. Initial State: Show code editor to enter and submit code
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: '16px' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', marginBottom: '4px' }}>
                  Analyze Code Quality
                </h1>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Select your language, paste your code snippet, and get instantaneous production-grade AI refactoring.
                </p>
              </div>
              <CodeEditor onSubmit={handleCodeSubmit} loading={loadingReview} />
            </div>
          ) : (
            // 2. Active State: Display Comparison split panels, issues list and high-level descriptions
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Active Review Navigation / Action Bar */}
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
                  onClick={resetActiveReview}
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
                  <span>Review New Code</span>
                </button>

                <div style={{
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  color: 'var(--text-secondary)'
                }}>
                  Language: <strong style={{ textTransform: 'uppercase', color: 'var(--secondary)' }}>{activeReview.language}</strong>
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
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        title="Delete Review Session"
        confirmText="Delete Session"
        onConfirm={handleConfirmDelete}
        confirmVariant="danger"
        loading={isDeleting}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <AlertTriangle size={24} color="var(--severity-critical)" style={{ flexShrink: 0 }} />
          <div>
            <p style={{ fontWeight: '600', color: '#ffffff', marginBottom: '6px' }}>Are you absolutely sure?</p>
            <p>This action cannot be undone. This code review session will be permanently erased from your history logs.</p>
          </div>
        </div>
      </Modal>

      {/* Floating alert toaster */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage('')}
      />

      <style>{`
        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
          .bottom-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Dashboard;
