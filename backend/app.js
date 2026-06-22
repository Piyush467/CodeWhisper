const express = require('express');
const cookieParser = require('cookie-parser');
const corsMiddleware = require('./config/cors');
const errorMiddleware = require('./middlewares/errorMiddleware');
const logger = require('./utils/logger');

// Import routes
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const historyRoutes = require('./routes/historyRoutes');

const app = express();

app.set('trust proxy', 1);

// Request logging middleware
app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.originalUrl}`);
  next();
});

// Basic parser middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Enable CORS
app.use(corsMiddleware);

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/review-history', historyRoutes); // We map to /api/review-history or similar to avoid conflict with /api/review/:id

// Health Check API
app.use('/health', (req, res) => {
  res.status(200).json({ status: 'ok', time: new Date() });
});

// Global Error Handler Middleware
app.use(errorMiddleware);

module.exports = app;
