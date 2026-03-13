require('dotenv').config();

const config = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    nama: process.env.APP_NAME || 'ARAS',
    url: process.env.APP_URL || 'https://api-aras.khamdanu.xyz',
    webUrl: process.env.WEB_URL || 'https://aras.khamdanu.xyz',
  },
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    nama: process.env.DB_NAME || 'aras_db',
    user: process.env.DB_USER || 'aras_user',
    pass: process.env.DB_PASS || '',
    poolMin: parseInt(process.env.DB_POOL_MIN) || 2,
    poolMax: parseInt(process.env.DB_POOL_MAX) || 20,
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    pass: process.env.REDIS_PASS || '',
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
    ttlStatis: parseInt(process.env.REDIS_TTL_STATIS) || 3600,
    ttlSemi: parseInt(process.env.REDIS_TTL_SEMI) || 900,
    ttlSesi: parseInt(process.env.REDIS_TTL_SESI) || 86400,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },
  keamanan: {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12,
    otpSecret: process.env.OTP_SECRET || 'otp_secret',
    otpExpiresIn: parseInt(process.env.OTP_EXPIRES_IN) || 300,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    folder: process.env.CLOUDINARY_FOLDER || 'aras',
  },
  firebase: {
    serviceAccountPath: process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './firebase-service-account.json',
    projectId: process.env.FIREBASE_PROJECT_ID || '',
  },
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.EMAIL_FROM || 'ARAS Support <no-reply@aras.khamdanu.xyz>',
  },
  fonnte: {
    token: process.env.FONNTE_TOKEN || '',
    sender: process.env.FONNTE_SENDER || '',
  },
  jitsi: {
    domain: process.env.JITSI_DOMAIN || 'meet.jit.si',
    appId: process.env.JITSI_APP_ID || 'aras',
    appSecret: process.env.JITSI_APP_SECRET || '',
  },
  eksternalApi: {
    bpom: process.env.BPOM_API_URL || 'https://api-meso.pom.go.id',
    openfda: process.env.OPENFDA_API_URL || 'https://api.fda.gov',
    openfdaKey: process.env.OPENFDA_API_KEY || '',
    openFoodFacts: process.env.OPENFOODFACTS_API_URL || 'https://world.openfoodfacts.org/api/v2',
    openFoodFactsUserAgent: process.env.OPENFOODFACTS_USER_AGENT || 'ARAS/1.0',
    nominatim: process.env.NOMINATIM_API_URL || 'https://nominatim.openstreetmap.org',
    nominatimEmail: process.env.NOMINATIM_EMAIL || '',
    overpass: process.env.OVERPASS_API_URL || 'https://overpass-api.de/api/interpreter',
    rxnorm: process.env.RXNORM_API_URL || 'https://rxnav.nlm.nih.gov/REST',
    medlinePlus: process.env.MEDLINEPLUS_API_URL || 'https://wsearch.nlm.nih.gov/ws/query',
  },
  socket: {
    corsOrigin: process.env.SOCKET_CORS_ORIGIN || '*',
    pingTimeout: parseInt(process.env.SOCKET_PING_TIMEOUT) || 60000,
    pingInterval: parseInt(process.env.SOCKET_PING_INTERVAL) || 25000,
  },
  upload: {
    maxSizeMb: parseInt(process.env.UPLOAD_MAX_SIZE_MB) || 10,
    allowedTypes: (process.env.UPLOAD_ALLOWED_TYPES || 'jpg,jpeg,png,pdf,webp').split(','),
  },
  cors: {
    allowedOrigins: (process.env.CORS_ALLOWED_ORIGINS || '').split(','),
  },
  log: {
    level: process.env.LOG_LEVEL || 'info',
    fileError: process.env.LOG_FILE_ERROR || './logs/error.log',
    fileCombined: process.env.LOG_FILE_COMBINED || './logs/combined.log',
  },
};

module.exports = config;
