const cloudinary = require('cloudinary').v2;
const config = require('./app.config');

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

console.log('✅ Cloudinary Terkonfigurasi!');

module.exports = cloudinary;
