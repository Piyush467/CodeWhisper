const cors = require('cors');

const getAllowedOrigins = () => {
  const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

  const configuredOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URLS
  ]
    .filter(Boolean)
    .flatMap((value) => value.split(','))
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);

  return [...new Set([...configuredOrigins, ...defaultOrigins])];
};

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = getAllowedOrigins();
    const normalizedOrigin = origin?.replace(/\/+$/, '');
    
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
