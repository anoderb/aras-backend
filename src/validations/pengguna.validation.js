const Joi = require('joi');

const updateProfil = Joi.object({
  nama: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Nama tidak boleh kosong',
    'string.min': 'Nama minimal 3 karakter',
    'any.required': 'Nama wajib diisi'
  }),
  no_telepon: Joi.string().max(20).allow('', null),
  tgl_lahir: Joi.date().iso().allow('', null),
  jenis_kelamin: Joi.string().valid('laki-laki', 'perempuan').allow('', null),
  golongan_darah: Joi.string().valid('A', 'B', 'AB', 'O').allow('', null),
  alergi: Joi.string().max(1000).allow('', null),
  kondisi_kronis: Joi.string().max(1000).allow('', null),
  kontak_darurat_nama: Joi.string().max(100).allow('', null),
  kontak_darurat_telepon: Joi.string().max(20).allow('', null)
});

const gantiSandi = Joi.object({
  sandi_lama: Joi.string().required().messages({
    'string.empty': 'Kata sandi lama tidak boleh kosong',
    'any.required': 'Kata sandi lama wajib diisi'
  }),
  sandi_baru: Joi.string().min(6).required().messages({
    'string.empty': 'Kata sandi baru tidak boleh kosong',
    'string.min': 'Kata sandi baru minimal 6 karakter',
    'any.required': 'Kata sandi baru wajib diisi'
  }),
  konfirmasi_sandi: Joi.any().valid(Joi.ref('sandi_baru')).required().messages({
    'any.only': 'Konfirmasi sandi tidak cocok dengan sandi baru',
    'any.required': 'Konfirmasi sandi wajib diisi'
  })
});

module.exports = {
  updateProfil,
  gantiSandi
};
