const { verifikasiToken } = require('../helpers/jwt.helper');
const { gagal } = require('../helpers/response.helper');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return gagal(res, 'Sesi tidak valid, silakan login kembali', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const terdecode = verifikasiToken(token);
    req.pengguna = terdecode; // Menyimpan data pengguna ke request
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return gagal(res, 'Sesi telah berakhir, silakan login ulang', 401);
    }
    return gagal(res, 'Token tidak valid', 401);
  }
};

module.exports = auth;
