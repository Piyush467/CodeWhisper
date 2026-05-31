const formatMessage = (level, message) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
};

const logger = {
  info: (message) => {
    console.log(formatMessage('info', message));
  },
  warn: (message) => {
    console.warn(formatMessage('warn', message));
  },
  error: (message, error = null) => {
    let errorDetails = '';
    if (error) {
      errorDetails = error.stack ? `\nStack: ${error.stack}` : `\nDetails: ${JSON.stringify(error)}`;
    }
    console.error(formatMessage('error', `${message}${errorDetails}`));
  },
  debug: (message) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(formatMessage('debug', message));
    }
  }
};

module.exports = logger;
