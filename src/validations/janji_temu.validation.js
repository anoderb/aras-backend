const Joi = require('joi');

const buatJanji = Joi.object({
  dokter_id: Joi.number().integer().required().messages({
    'any.required': 'ID Dokter wajib diisi'
  }),
  tgl_jadwal: Joi.date().iso().required().messages({
    'any.required': 'Tanggal & jam janji temu wajib diisi',
    'date.format': 'Format tanggal tidak valid'
  }),
  jenis: Joi.string().valid('online', 'tatap_muka').required().messages({
    'any.only': 'Jenis pertemuan tidak valid',
    'any.required': 'Jenis pertemuan wajib diisi'
  }),
  lokasi: Joi.string().max(255).allow('', null),
  keluhan: Joi.string().required().messages({
    'any.required': 'Keluhan wajib diisi'
  }),
  catatan: Joi.string().max(500).allow('', null)
});

const konfirmasiJanji = Joi.object({
  status: Joi.string().valid('dikonfirmasi').required().messages({
    'any.only': 'Status konfirmasi tidak valid',
    'any.required': 'Status konfirmasi wajib diisi'
  })
});

const rescheduleJanji = Joi.object({
  tgl_jadwal: Joi.date().iso().required().messages({
    'any.required': 'Tanggal & jam baru wajib diisi',
    'date.format': 'Format tanggal tidak valid'
  }),
  catatan: Joi.string().max(500).required().messages({
    'any.required': 'Alasan reschedule wajib diisi'
  })
});

module.exports = {
  buatJanji,
  konfirmasiJanji,
  rescheduleJanji
};
