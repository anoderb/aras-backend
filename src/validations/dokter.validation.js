const Joi = require('joi');

const updateProfilDokter = Joi.object({
  no_str: Joi.string().max(50).allow('', null),
  no_sip: Joi.string().max(50).allow('', null),
  spesialisasi: Joi.string().max(100).allow('', null),
  pendidikan: Joi.string().max(1000).allow('', null),
  pengalaman_tahun: Joi.number().integer().min(0).max(100).allow(null),
  bio: Joi.string().max(2000).allow('', null),
  biaya_konsultasi: Joi.number().min(0).allow(null),
  lokasi_praktik: Joi.string().max(255).allow('', null),
  jam_praktik: Joi.object().allow(null) // JSON object for schedule
});

const setKetersediaan = Joi.object({
  status_online: Joi.boolean().required().messages({
    'any.required': 'Status online wajib diisi'
  })
});

const verifikasiDokter = Joi.object({
  status_verifikasi: Joi.string().valid('terverifikasi', 'ditolak').required().messages({
    'any.only': 'Status verifikasi tidak valid',
    'any.required': 'Status verifikasi wajib diisi'
  })
});

module.exports = {
  updateProfilDokter,
  setKetersediaan,
  verifikasiDokter
};
