const multer = require('multer');
const path = require('path');
const { gagal } = require('../helpers/response.helper');

// Simpan sementara di folder uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const unik = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + unik + path.extname(file.originalname));
  },
});

const filterFile = (req, file, cb) => {
  const tipeDiterima = /jpeg|jpg|png|pdf/;
  const ekstensi = tipeDiterima.test(path.extname(file.originalname).toLowerCase());
  const mimetype = tipeDiterima.test(file.mimetype);

  if (ekstensi && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Format file tidak didukung! (Hanya JPG, PNG, PDF)'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
  fileFilter: filterFile,
});

module.exports = upload;
