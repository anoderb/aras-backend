const { gagal } = require('../helpers/response.helper');

const isUser = (req, res, next) => {
  if (req.pengguna && req.pengguna.peran === 'user') {
    return next();
  }
  return gagal(res, 'Akses ditolak, hanya untuk pasien', 403);
};

const isDokter = (req, res, next) => {
  if (req.pengguna && req.pengguna.peran === 'dokter') {
    return next();
  }
  return gagal(res, 'Akses ditolak, hanya untuk dokter', 403);
};

const isAdmin = (req, res, next) => {
  if (req.pengguna && req.pengguna.peran === 'admin') {
    return next();
  }
  return gagal(res, 'Akses ditolak, hanya untuk admin', 403);
};

module.exports = { isUser, isDokter, isAdmin };
