const Joi = require('joi');

const logAktivitas = Joi.object({
  jenis_aktivitas: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Jenis aktivitas tidak boleh kosong',
    'any.required': 'Jenis aktivitas wajib diisi'
  }),
  durasi_menit: Joi.number().min(1).max(1440).required().messages({ // 1440 min = 24h
    'number.min': 'Durasi minimal 1 menit',
    'any.required': 'Durasi aktivitas wajib diisi'
  }),
  kalori_terbakar: Joi.number().min(0).max(10000).allow(null),
  intensitas: Joi.string().valid('ringan', 'sedang', 'berat').required().messages({
    'any.only': 'Intensitas tidak valid',
    'any.required': 'Intensitas wajib diisi'
  }),
  catatan: Joi.string().max(1000).allow('', null)
});

module.exports = {
  logAktivitas
};
