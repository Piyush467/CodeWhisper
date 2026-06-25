require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const redis = require("./config/redis");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

// Catch synchronous exceptions that weren't caught elsewhere
process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION! Shutting down server safely...", err);
  process.exit(1);
});

// Connect to database
connectDB();

redis
  .ping()
  .then(() => logger.info("Redis Ready"))
  .catch((err) => logger.error(err));

// Start the server
const server = app.listen(PORT, () => {
  logger.info(
    `Server is running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
  );
});

// Catch asynchronous errors (rejected promises) that weren't handled
process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION! Closing server operations safely...", err);
  server.close(() => {
    process.exit(1);
  });
});
