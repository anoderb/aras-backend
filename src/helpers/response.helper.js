/**
 * Format response API standar ARAS
 */

const berhasil = (res, data = null, pesan = 'Data berhasil diambil', kode = 200, meta = null) => {
  return res.status(kode).json({
    status: true,
    kode,
    pesan,
    data,
    ...(meta && { meta }),
  });
};

const gagal = (res, pesan = 'Terjadi kesalahan', kode = 400, error = null) => {
  return res.status(kode).json({
    status: false,
    kode,
    pesan,
    ...(error && { error }),
  });
};

module.exports = { berhasil, gagal };
