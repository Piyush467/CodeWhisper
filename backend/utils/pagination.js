/**
 * Pagination helper
 */
const pagination = {
  /**
   * Computes pagination parameters.
   * @param {number|string} page 
   * @param {number|string} limit 
   * @returns {object} { skip, limitNum, pageNum }
   */
  getParams: (page, limit) => {
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 10)); // max limit of 50
    const skip = (pageNum - 1) * limitNum;

    return { skip, limitNum, pageNum };
  },

  /**
   * Formats the paginated output.
   * @param {Array} items 
   * @param {number} totalCount 
   * @param {number} page 
   * @param {number} limit 
   * @returns {object} Paginated metadata and list
   */
  formatResponse: (items, totalCount, page, limit) => {
    const totalPages = Math.ceil(totalCount / limit);
    
    return {
      items,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }
};

module.exports = pagination;
