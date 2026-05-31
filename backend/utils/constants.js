const CONSTANTS = {
  ISSUE_TYPES: ['bug', 'security', 'performance', 'style', 'readability'],
  SEVERITIES: ['critical', 'high', 'medium', 'low'],
  LANGUAGES: [
    'javascript',
    'typescript',
    'python',
    'java',
    'cpp',
    'csharp',
    'go',
    'rust',
    'php',
    'ruby',
    'html',
    'css',
    'sql'
  ],
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 50
  },
  ERRORS: {
    AUTH: {
      INVALID_CREDENTIALS: 'Invalid email or password credentials.',
      DUPLICATE_EMAIL: 'An account with this email address already exists.',
      UNAUTHORIZED: 'Unauthenticated access. Please log in first.',
      TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
      TOKEN_INVALID: 'Invalid authentication token. Please log in again.'
    },
    REVIEW: {
      EMPTY_CODE: 'Code input cannot be empty.',
      CODE_TOO_LARGE: 'Code is too large. Maximum size allowed is 50,000 characters.',
      INVALID_LANG: 'Unsupported or missing language selection.',
      NOT_FOUND: 'The requested review history item was not found.',
      UNAUTHORIZED: 'You do not have permission to view this review session.'
    }
  }
};

module.exports = CONSTANTS;
