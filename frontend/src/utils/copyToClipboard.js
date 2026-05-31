/**
 * Copies a string of text to the clipboard.
 * Incorporates a reliable fallback when navigator.clipboard is unavailable.
 * @param {string} text 
 * @returns {Promise<boolean>} Resolves to true if successful, false otherwise
 */
export const copyToClipboard = async (text) => {
  if (!text) return false;

  // 1. Try modern navigator API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Clipboard API write failed, using fallback:', err);
    }
  }

  // 2. Fallback text selection copy
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Prevent zooming on iOS and hide it visually
    textArea.style.fontSize = '12pt';
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback clipboard copy failed:', err);
    return false;
  }
};
