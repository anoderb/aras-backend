const Joi = require('joi');

const buatPertanyaan = Joi.object({
  judul: Joi.string().max(200).required().messages({
    'any.required': 'Judul pertanyaan wajib diisi'
  }),
  isi: Joi.string().required().messages({
    'any.required': 'Detail pertanyaan wajib diisi'
  }),
  kategori: Joi.string().max(50).required().messages({
    'any.required': 'Kategori wajib diisi'
  })
});

const buatJawaban = Joi.object({
  isi: Joi.string().required().messages({
    'any.required': 'Isi jawaban wajib diisi'
  })
});

module.exports = {
  buatPertanyaan,
  buatJawaban
};
