const Joi = require('joi');

const daftarSchema = Joi.object({
  nama: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  no_telepon: Joi.string().min(10).max(15).pattern(/^[0-9]+$/).required(),
  kata_sandi: Joi.string().min(6).required(),
  peran: Joi.string().valid('user', 'dokter').default('user')
});

const masukSchema = Joi.object({
  email: Joi.string().email().required(),
  kata_sandi: Joi.string().required()
});

const refreshTokenSchema = Joi.object({
  refresh_token: Joi.string().required()
});

const lupaSandiSchema = Joi.object({
  email: Joi.string().email().required()
});

const resetSandiSchema = Joi.object({
  token: Joi.string().required(),
  kata_sandi_baru: Joi.string().min(6).required()
});

// Skema untuk endpoint yang di-mock
const verifikasiEmailSchema = Joi.object({
  token: Joi.string().required()
});

const kirimUlangOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  tipe: Joi.string().valid('whatsapp', 'email').default('whatsapp')
});

const verifikasiOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required()
});

module.exports = {
  daftarSchema,
  masukSchema,
  refreshTokenSchema,
  lupaSandiSchema,
  resetSandiSchema,
  verifikasiEmailSchema,
  kirimUlangOtpSchema,
  verifikasiOtpSchema
};
