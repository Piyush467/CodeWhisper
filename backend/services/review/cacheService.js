const crypto = require("crypto");
const redis = require("../../config/redis");
const logger = require("../../utils/logger");

const CACHE_TTL = 3600;

const cacheService = {
  generateKey(code, language) {
    return crypto.createHash("md5").update(`${language}:${code}`).digest("hex");
  },

  async get(key) {
    try {
      const data = await redis.get(key);

      if (!data) return null;

      logger.info("Redis cache hit");

      return JSON.parse(data);
    } catch (err) {
      logger.error("Redis get error", err);
      return null;
    }
  },

  async set(key, value) {
    try {
      await redis.set(key, JSON.stringify(value), "EX", CACHE_TTL);

      logger.info("Review cached in Redis");
    } catch (err) {
      logger.error("Redis set error", err);
    }
  },

  async clear() {
    await redis.flushall();
  },
};

module.exports = cacheService;
