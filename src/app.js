const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/app.config');
const { gagal } = require('./helpers/response.helper');

const { loggerMiddleware } = require('./middleware/logger.middleware');

const app = express();

// Middleware Global
app.use(helmet());
app.use(loggerMiddleware); // Log request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup CORS
const corsOptions = {
  origin: config.cors.allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// Root Route
app.get('/api/v1', (req, res) => {
  res.json({
    status: true,
    pesan: `Selamat datang di ${config.app.nama} API v1`,
    env: config.app.env,
  });
});

// Import Routes
app.use('/api/v1', require('./routes/index'));

// Static Folders
app.use('/uploads', express.static('uploads'));

// Error 404 Handler
app.use((req, res) => {
  gagal(res, 'Endpoint tidak ditemukan', 404);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  gagal(
    res,
    'Terjadi kesalahan pada server',
    500,
    config.app.env === 'development' ? err.message : null
  );
});

module.exports = app;
