const Joi = require('joi');

const logObat = Joi.object({
  nama_obat: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Nama obat tidak boleh kosong',
    'any.required': 'Nama obat wajib diisi'
  }),
  dokter_id: Joi.number().integer().allow(null),
  dosis: Joi.string().max(50).allow('', null),
  frekuensi: Joi.string().max(100).allow('', null),
  waktu_minum: Joi.array().items(Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)).required().messages({
    'any.required': 'Waktu minum wajib diisi',
    'string.pattern.base': 'Format waktu minum harus HH:mm'
  }),
  tgl_mulai: Joi.date().iso().required().messages({
    'any.required': 'Tanggal mulai wajib diisi'
  }),
  tgl_selesai: Joi.date().iso().min(Joi.ref('tgl_mulai')).allow(null),
  catatan: Joi.string().max(1000).allow('', null),
  status_aktif: Joi.boolean().default(true)
});

const logMinum = Joi.object({
  jadwal_minum: Joi.date().iso().required().messages({
    'any.required': 'Jadwal minum wajib diisi'
  }),
  waktu_diminum: Joi.date().iso().allow(null),
  status: Joi.string().valid('tepat_waktu', 'terlambat', 'terlewat').required().messages({
    'any.only': 'Status kepatuhan tidak valid',
    'any.required': 'Status wajib diisi'
  })
});

module.exports = {
  logObat,
  logMinum
};
