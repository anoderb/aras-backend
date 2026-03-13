const Joi = require('joi');

const buatProgram = Joi.object({
  pengguna_id: Joi.number().integer().required().messages({
    'any.required': 'ID Pasien wajib diisi'
  }),
  judul: Joi.string().max(100).required().messages({
    'any.required': 'Judul program wajib diisi'
  }),
  deskripsi: Joi.string().allow('', null),
  durasi_hari: Joi.number().integer().min(1).required().messages({
    'any.required': 'Durasi program wajib diisi'
  }),
  kategori: Joi.string().valid('diet', 'olahraga', 'pemulihan', 'penyakit_kronis', 'lainnya').required().messages({
    'any.only': 'Kategori program tidak valid',
    'any.required': 'Kategori program wajib diisi'
  }),
  tgl_mulai: Joi.date().iso().required().messages({
    'any.required': 'Tanggal mulai wajib diisi'
  }),
  tgl_selesai: Joi.date().iso().required().messages({
    'any.required': 'Tanggal selesai wajib diisi'
  })
});

const tambahTugas = Joi.object({
  hari_ke: Joi.number().integer().min(1).required(),
  judul_tugas: Joi.string().max(100).required(),
  deskripsi: Joi.string().allow('', null),
  tipe: Joi.string().valid('checklist', 'input_data', 'artikel', 'olahraga').required(),
  target_nilai: Joi.string().max(50).allow('', null)
});

const updateProgres = Joi.object({
  status: Joi.string().valid('belum', 'selesai', 'dilewati').required(),
  nilai_aktual: Joi.string().max(50).allow('', null),
  catatan: Joi.string().allow('', null)
});

module.exports = {
  buatProgram,
  tambahTugas,
  updateProgres
};
