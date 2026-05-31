import React, { createContext, useState, useCallback } from 'react';
import { reviewApi } from '../api/reviewApi';

export const ReviewContext = createContext(null);

export const ReviewProvider = ({ children }) => {
  const [activeReview, setActiveReview] = useState(null);
  const [history, setHistory] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false
  });
  
  const [loadingReview, setLoadingReview] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Resets active review back to initial empty slate.
   */
  const resetActiveReview = useCallback(() => {
    setActiveReview(null);
    setError(null);
  }, []);

  /**
   * Submit code to AI review API.
   */
  const submitCodeReview = async (code, language) => {
    setLoadingReview(true);
    setError(null);
    try {
      const data = await reviewApi.submitReview(code, language);
      if (data && data.success) {
        setActiveReview(data.review);
        
        // Optimistically prepend or reload history
        fetchHistory(1); 
        return data.review;
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Failed to submit code for review.';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoadingReview(false);
    }
  };

  /**
   * Fetch paginated history from API.
   */
  const fetchHistory = useCallback(async (page = 1, limit = 7) => {
    setLoadingHistory(true);
    setError(null);
    try {
      const data = await reviewApi.getHistory(page, limit);
      if (data && data.success) {
        setHistory(data.items || []);
        setPagination(data.pagination);
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Failed to retrieve code review history.';
      setError(errMsg);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  /**
   * Fetch details of a single review.
   */
  const fetchReviewDetails = useCallback(async (id) => {
    setLoadingReview(true);
    setError(null);
    try {
      const data = await reviewApi.getReviewById(id);
      if (data && data.success) {
        setActiveReview(data.review);
        return data.review;
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Failed to retrieve review details.';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoadingReview(false);
    }
  }, []);

  /**
   * Deletes a review from history.
   */
  const removeReview = async (id) => {
    setError(null);
    try {
      const data = await reviewApi.deleteReview(id);
      if (data && data.success) {
        // Remove locally from history list
        setHistory(prev => prev.filter(item => item._id !== id));
        
        // If it was the currently loaded active review, clear it
        if (activeReview && activeReview.id === id) {
          setActiveReview(null);
        }
        
        // Refresh history page to maintain pagination item count
        fetchHistory(pagination.currentPage);
        return true;
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Failed to delete review record.';
      setError(errMsg);
      throw new Error(errMsg);
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        activeReview,
        history,
        pagination,
        loadingReview,
        loadingHistory,
        error,
        submitCodeReview,
        fetchHistory,
        fetchReviewDetails,
        removeReview,
        resetActiveReview,
        setActiveReview,
        setError
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
