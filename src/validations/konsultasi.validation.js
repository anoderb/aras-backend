const Joi = require('joi');

const mulaiKonsultasi = Joi.object({
  dokter_id: Joi.number().integer().required().messages({
    'any.required': 'ID Dokter wajib diisi'
  }),
  jenis: Joi.string().valid('chat', 'video', 'tatap_muka').required().messages({
    'any.only': 'Jenis konsultasi tidak valid',
    'any.required': 'Jenis konsultasi wajib diisi'
  }),
  keluhan: Joi.string().required().messages({
    'any.required': 'Keluhan wajib diisi'
  }),
  biaya: Joi.number().min(0).required().messages({
    'any.required': 'Biaya konsultasi wajib diisi'
  })
});

const beriRating = Joi.object({
  nilai: Joi.number().integer().min(1).max(5).required().messages({
    'any.required': 'Nilai rating wajib diisi',
    'number.min': 'Rating minimal 1',
    'number.max': 'Rating maksimal 5'
  }),
  ulasan: Joi.string().max(500).allow('', null)
});

const kirimPesan = Joi.object({
  isi_pesan: Joi.string().required().messages({
    'any.required': 'Isi pesan wajib diisi'
  }),
  tipe_pesan: Joi.string().valid('teks', 'gambar', 'file', 'suara').default('teks')
});

const tambahCatatan = Joi.object({
  catatan_dokter: Joi.string().required().messages({
    'any.required': 'Catatan dokter wajib diisi'
  }),
  resep: Joi.string().allow('', null)
});

module.exports = {
  mulaiKonsultasi,
  beriRating,
  kirimPesan,
  tambahCatatan
};
