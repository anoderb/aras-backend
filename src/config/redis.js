const Redis = require('ioredis');
const config = require('./app.config');

const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on('connect', () => {
  console.log('✅ Redis Terhubung!');
});

redis.on('error', (err) => {
  console.error('❌ Redis Error:', err.message);
});

module.exports = redis;
