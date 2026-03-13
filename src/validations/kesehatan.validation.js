const Joi = require('joi');

const logKesehatan = Joi.object({
  berat_badan: Joi.number().min(10).max(300).allow(null),
  tinggi_badan: Joi.number().min(50).max(300).allow(null),
  tekanan_darah_sistolik: Joi.number().min(50).max(250).allow(null),
  tekanan_darah_diastolik: Joi.number().min(30).max(150).allow(null),
  gula_darah: Joi.number().min(20).max(600).allow(null),
  detak_jantung: Joi.number().min(30).max(250).allow(null),
  suhu_tubuh: Joi.number().min(30).max(45).allow(null),
  langkah_kaki: Joi.number().min(0).max(100000).allow(null),
  mood: Joi.string().valid('sangat_baik', 'baik', 'netral', 'buruk', 'sangat_buruk').allow('', null),
  catatan: Joi.string().max(1000).allow('', null)
}).min(1).messages({
  'object.min': 'Minimal satu data kesehatan harus diisi'
});

module.exports = {
  logKesehatan
};
