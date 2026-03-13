const Joi = require('joi');

const logDokumen = Joi.object({
  judul: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Judul dokumen tidak boleh kosong',
    'any.required': 'Judul dokumen wajib diisi'
  }),
  jenis: Joi.string().valid('hasil_lab', 'resep', 'diagnosis', 'lainnya').required().messages({
    'any.only': 'Jenis dokumen tidak valid',
    'any.required': 'Jenis dokumen wajib diisi'
  }),
  nilai_abnormal: Joi.boolean().default(false),
  ringkasan: Joi.string().max(1000).allow('', null),
  tgl_dokumen: Joi.date().iso().required().messages({
    'any.required': 'Tanggal dokumen wajib diisi'
  })
});

const updateDokumen = Joi.object({
  judul: Joi.string().min(2).max(100),
  jenis: Joi.string().valid('hasil_lab', 'resep', 'diagnosis', 'lainnya'),
  nilai_abnormal: Joi.boolean(),
  ringkasan: Joi.string().max(1000).allow('', null),
  tgl_dokumen: Joi.date().iso()
});

module.exports = {
  logDokumen,
  updateDokumen
};
