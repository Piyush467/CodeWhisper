import api from './axios';

export const reviewApi = {
  /**
   * Submits code to AI for review.
   */
  submitReview: async (code, language) => {
    const response = await api.post('/review', { code, language });
    return response.data;
  },

  /**
   * Gets a paginated list of reviews in user's history.
   */
  getHistory: async (page = 1, limit = 10) => {
    const response = await api.get('/review-history/history', {
      params: { page, limit }
    });
    return response.data;
  },

  /**
   * Retrieves full details of a specific review session by ID.
   */
  getReviewById: async (id) => {
    const response = await api.get(`/review-history/${id}`);
    return response.data;
  },

  /**
   * Deletes a review record from database.
   */
  deleteReview: async (id) => {
    const response = await api.delete(`/review-history/${id}`);
    return response.data;
  }
};
