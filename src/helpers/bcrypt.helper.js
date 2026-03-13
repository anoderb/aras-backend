const bcrypt = require('bcryptjs');
const config = require('../config/app.config');

/**
 * Hash sandi menggunakan bcryptjs
 * @param {string} sandi - Sandi mentah
 * @returns {Promise<string>} - Password terenkripsi
 */
const hashSandi = async (sandi) => {
  const salt = await bcrypt.genSalt(config.keamanan.bcryptSaltRounds);
  return await bcrypt.hash(sandi, salt);
};

/**
 * Bandingkan sandi mentah dengan hash
 * @param {string} sandi - Sandi mentah
 * @param {string} hash - Password terenkripsi dari DB
 * @returns {Promise<boolean>} - True jika cocok
 */
const cocokkanSandi = async (sandi, hash) => {
  return await bcrypt.compare(sandi, hash);
};

module.exports = {
  hashSandi,
  cocokkanSandi,
};
