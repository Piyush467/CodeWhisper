const crypto = require('crypto');
const logger = require('../../utils/logger');

const CACHE_LIMIT = 100;
const cache = new Map();
const queue = [];

const cacheService = {
  /**
   * Generates a unique key for the cache based on code and language.
   * @param {string} code 
   * @param {string} language 
   * @returns {string} MD5 Hash
   */
  generateKey: (code, language) => {
    const cleanCode = (code || '').trim();
    const cleanLang = (language || '').trim().toLowerCase();
    return crypto
      .createHash('md5')
      .update(`${cleanLang}:${cleanCode}`)
      .digest('hex');
  },

  /**
   * Retrieves an item from cache.
   * @param {string} key 
   * @returns {object|null}
   */
  get: (key) => {
    if (cache.has(key)) {
      logger.info('Cache hit for code review key.');
      return cache.get(key);
    }
    return null;
  },

  /**
   * Stores a review inside the cache.
   * Evicts the oldest item if it exceeds CACHE_LIMIT.
   * @param {string} key 
   * @param {object} review 
   */
  set: (key, review) => {
    try {
      if (cache.has(key)) {
        cache.set(key, review);
        return;
      }

      if (queue.length >= CACHE_LIMIT) {
        const oldestKey = queue.shift();
        cache.delete(oldestKey);
        logger.debug('Evicted oldest code review from cache.');
      }

      cache.set(key, review);
      queue.push(key);
      logger.info('Review successfully saved to in-memory cache.');
    } catch (error) {
      logger.error('Failed to save review in cache', error);
    }
  },

  /**
   * Clears the cache completely.
   */
  clear: () => {
    cache.clear();
    queue.length = 0;
    logger.info('Cache cleared.');
  }
};

module.exports = cacheService;
