const Joi = require('joi');

const buatPost = Joi.object({
  isi: Joi.string().required().messages({
    'any.required': 'Isi postingan wajib diisi'
  }),
  foto: Joi.array().items(Joi.string().max(255)).allow(null),
  kategori: Joi.string().valid('cerita', 'tips', 'tanya', 'mental_health', 'ibu_anak', 'penyakit_kronis', 'nutrisi', 'olahraga').required().messages({
    'any.only': 'Kategori tidak valid',
    'any.required': 'Kategori wajib diisi'
  }),
  is_anonim: Joi.boolean().default(false)
});

const buatKomentar = Joi.object({
  isi: Joi.string().required().messages({
    'any.required': 'Isi komentar wajib diisi'
  }),
  komentar_induk_id: Joi.number().integer().allow(null),
  is_anonim: Joi.boolean().default(false)
});

const buatLaporan = Joi.object({
  alasan: Joi.string().valid('misinformasi', 'tidak_pantas', 'spam', 'berbahaya', 'lainnya').required(),
  keterangan: Joi.string().allow('', null)
});

module.exports = {
  buatPost,
  buatKomentar,
  buatLaporan
};
