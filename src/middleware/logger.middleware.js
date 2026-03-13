const winston = require('winston');
const path = require('path');
const fs = require('fs');
const config = require('../config/app.config');

const logDir = path.dirname(path.resolve(config.log.fileError));
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
  level: config.log.level || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: config.app.nama },
  transports: [
    new winston.transports.File({
      filename: path.resolve(config.log.fileError),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.resolve(config.log.fileCombined)
    }),
  ],
});

if (config.app.env !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

const loggerMiddleware = (req, res, next) => {
  logger.info(`${req.method} ${req.url} - ${req.ip}`);
  next();
};

module.exports = { logger, loggerMiddleware };
