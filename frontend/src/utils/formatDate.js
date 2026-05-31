/**
 * Formats a Date object or ISO timestamp string.
 * @param {string|Date} dateVal 
 * @returns {string} Formatted string
 */
export const formatDate = (dateVal) => {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
