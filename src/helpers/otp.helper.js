const crypto = require('crypto');

const buatOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const hashOtp = (otp, secret) => {
  return crypto.createHmac('sha256', secret).update(otp).digest('hex');
};

module.exports = { buatOtp, hashOtp };
