/**
 * Simple HTML escaping to mitigate XSS in text inputs or outputs.
 * @param {string} unsafe 
 * @returns {string} Safe text
 */
export const sanitizeHtml = (unsafe) => {
  if (!unsafe || typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Basic Markdown-to-Safe-HTML converter for explanations.
 * Converts simple headers, bold, and linebreaks securely.
 */
export const renderSimpleMarkdown = (text) => {
  if (!text) return '';
  
  // Escape raw HTML first
  let safe = sanitizeHtml(text);
  
  // Replace bold (`**text**` or `__text__`)
  safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace code inline (\`code\`)
  safe = safe.replace(/`(.*?)`/g, '<code class="inline-code">$1</code>');
  
  // Convert bullet lists
  safe = safe.replace(/^\s*\*\s+(.*?)$/gm, '<li>$1</li>');
  safe = safe.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
  
  // Double ul wrapper fix
  safe = safe.replace(/<\/ul>\s*<ul>/g, '');

  // Convert newlines to breaks
  safe = safe.replace(/\n/g, '<br />');
  
  return safe;
};
