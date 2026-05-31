import React, { useEffect, useState } from 'react';
import { History, Search, RefreshCw, XCircle } from 'lucide-react';
import { useReview } from '../../hooks/useReview';
import HistoryCard from './HistoryCard';
import Pagination from './Pagination';

export const HistorySidebar = ({ onSelectReview, activeReviewId, onDeleteReview }) => {
  const {
    history,
    pagination,
    loadingHistory,
    fetchHistory,
    error
  } = useReview();

  const [searchQuery, setSearchQuery] = useState('');

  // Initial history load on mount
  useEffect(() => {
    fetchHistory(1);
  }, [fetchHistory]);

  const handlePageChange = (page) => {
    fetchHistory(page);
  };

  const handleRefresh = () => {
    fetchHistory(1);
  };

  // Filter history client-side based on search query
  const filteredHistory = history.filter((item) =>
    (item.language || '').toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '480px',
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      {/* Title Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <History size={18} color="var(--primary)" />
          <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>Review History</span>
        </div>

        <button
          onClick={handleRefresh}
          disabled={loadingHistory}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.2s',
            animation: loadingHistory ? 'spin 1s linear infinite' : 'none'
          }}
          title="Refresh History"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Language Search */}
      <div style={{ padding: '12px 16px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="custom-input"
            placeholder="Search language..."
            style={{
              paddingLeft: '36px',
              paddingTop: '8px',
              paddingBottom: '8px',
              fontSize: '0.82rem',
              background: 'rgba(5, 7, 15, 0.5)'
            }}
          />
        </div>
      </div>

      {/* History Items list container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '6px 16px 16px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {loadingHistory ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 0',
            gap: '10px',
            color: 'var(--text-muted)',
            fontSize: '0.8rem'
          }}>
            <div className="mini-loader" style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '2px solid rgba(99, 102, 241, 0.1)',
              borderTopColor: 'var(--primary)',
              animation: 'spin 0.8s linear infinite'
            }} />
            <span>Loading sessions...</span>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 10px',
            textAlign: 'center',
            color: 'var(--text-muted)',
            gap: '8px'
          }}>
            <XCircle size={24} color="var(--text-muted)" />
            <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>
              {searchQuery ? 'No matching language found.' : 'No review history yet.'}
            </span>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <HistoryCard
              key={item._id}
              review={item}
              active={activeReviewId === item._id}
              onClick={() => onSelectReview(item._id)}
              onDelete={onDeleteReview}
            />
          ))
        )}
      </div>

      {/* Pagination control panel */}
      {!loadingHistory && (
        <div style={{ padding: '0 16px 12px 16px' }}>
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
            disabled={loadingHistory}
          />
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HistorySidebar;
