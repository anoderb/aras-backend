const bcrypt = require('bcryptjs');
const config = require('../config/app.config');

const hashSandi = async (sandi) => {
  const salt = await bcrypt.genSalt(config.keamanan.bcryptSaltRounds);
  return await bcrypt.hash(sandi, salt);
};

const cocokkanSandi = async (sandi, hash) => {
  return await bcrypt.compare(sandi, hash);
};

module.exports = {
  hashSandi,
  cocokkanSandi,
};
