const Joi = require('joi');

const logMakanan = Joi.object({
  nama_makanan: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Nama makanan tidak boleh kosong',
    'any.required': 'Nama makanan wajib diisi'
  }),
  porsi: Joi.number().min(0.1).max(1000).allow(null),
  satuan_porsi: Joi.string().max(20).allow('', null),
  kalori: Joi.number().min(0).max(10000).allow(null),
  karbohidrat: Joi.number().min(0).max(1000).allow(null),
  protein: Joi.number().min(0).max(1000).allow(null),
  lemak: Joi.number().min(0).max(1000).allow(null),
  sumber_data: Joi.string().valid('manual', 'barcode', 'database_lokal').required().messages({
    'any.only': 'Sumber data tidak valid',
    'any.required': 'Sumber data wajib diisi'
  }),
  barcode: Joi.string().max(50).allow('', null),
  waktu_makan: Joi.string().valid('sarapan', 'makan_siang', 'makan_malam', 'camilan').required().messages({
    'any.only': 'Waktu makan tidak valid',
    'any.required': 'Waktu makan wajib diisi'
  })
});

module.exports = {
  logMakanan
};
