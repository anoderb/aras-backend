const Joi = require('joi');

const buatArtikel = Joi.object({
  judul: Joi.string().max(200).required().messages({
    'any.required': 'Judul artikel wajib diisi'
  }),
  isi: Joi.string().required().messages({
    'any.required': 'Isi artikel wajib diisi'
  }),
  ringkasan: Joi.string().max(500).allow('', null),
  kategori: Joi.string().valid('penyakit', 'nutrisi', 'mental_health', 'ibu_anak', 'olahraga', 'mitos_fakta').required().messages({
    'any.only': 'Kategori artikel tidak valid',
    'any.required': 'Kategori artikel wajib diisi'
  }),
  thumbnail: Joi.string().max(255).allow('', null),
  status: Joi.string().valid('draft', 'diterbitkan', 'diarsipkan').default('draft')
});

const updateArtikel = Joi.object({
  judul: Joi.string().max(200),
  isi: Joi.string(),
  ringkasan: Joi.string().max(500).allow('', null),
  kategori: Joi.string().valid('penyakit', 'nutrisi', 'mental_health', 'ibu_anak', 'olahraga', 'mitos_fakta'),
  thumbnail: Joi.string().max(255).allow('', null),
  status: Joi.string().valid('draft', 'diterbitkan', 'diarsipkan')
});

module.exports = {
  buatArtikel,
  updateArtikel
};
