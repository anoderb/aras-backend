const Joi = require('joi');

const tambahAnggota = Joi.object({
  nama: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Nama tidak boleh kosong',
    'any.required': 'Nama wajib diisi'
  }),
  hubungan: Joi.string().valid('pasangan', 'anak', 'orang_tua', 'lainnya').required().messages({
    'any.only': 'Hubungan tidak valid',
    'any.required': 'Hubungan wajib diisi'
  }),
  email: Joi.string().email().allow('', null),
  tgl_lahir: Joi.date().iso().allow('', null),
  jenis_kelamin: Joi.string().valid('laki-laki', 'perempuan').allow('', null),
  golongan_darah: Joi.string().valid('A', 'B', 'AB', 'O').allow('', null),
});

const updateAnggota = Joi.object({
  nama: Joi.string().min(3).max(100),
  hubungan: Joi.string().valid('pasangan', 'anak', 'orang_tua', 'lainnya'),
  tgl_lahir: Joi.date().iso().allow('', null),
  jenis_kelamin: Joi.string().valid('laki-laki', 'perempuan').allow('', null),
  golongan_darah: Joi.string().valid('A', 'B', 'AB', 'O').allow('', null),
});

module.exports = { tambahAnggota, updateAnggota };
