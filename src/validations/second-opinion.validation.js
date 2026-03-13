const Joi = require('joi');

const ajukanSecondOpinion = Joi.object({
  dokter_id: Joi.number().integer().required().messages({
    'any.required': 'ID Dokter spesialis wajib diisi'
  }),
  diagnosis_awal: Joi.string().required().messages({
    'any.required': 'Diagnosis awal wajib diisi'
  }),
  dokumen_medis: Joi.array().items(Joi.number().integer()).allow(null),
  pertanyaan: Joi.string().required().messages({
    'any.required': 'Pertanyaan spesifik wajib diisi'
  }),
  biaya: Joi.number().min(0).required().messages({
    'any.required': 'Biaya wajib diisi'
  })
});

const beriPendapat = Joi.object({
  pendapat_dokter: Joi.string().required().messages({
    'any.required': 'Pendapat dokter wajib diisi'
  })
});

module.exports = {
  ajukanSecondOpinion,
  beriPendapat
};
