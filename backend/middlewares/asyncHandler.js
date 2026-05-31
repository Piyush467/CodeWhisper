/**
 * Async Handler Middleware
 * Wraps express controllers to catch asynchronous errors and forward them to the error middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
