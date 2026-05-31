const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    logger.info(`MongoDB Connected`);
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    // Do not crash the app immediately, but log it clearly
    process.exit(1);
  }
};

module.exports = connectDB;
