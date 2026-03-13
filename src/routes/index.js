const express = require('express');
const router = express.Router();

// Import Routes
router.use('/auth', require('./auth.routes'));
router.use('/pengguna', require('./pengguna.routes'));
router.use('/keluarga', require('./keluarga.routes'));
router.use('/kesehatan', require('./kesehatan.routes'));
router.use('/nutrisi', require('./nutrisi.routes'));
router.use('/aktivitas', require('./aktivitas.routes'));
router.use('/obat', require('./obat.routes'));
router.use('/dokumen', require('./dokumen.routes'));
router.use('/dokter', require('./dokter.routes'));
router.use('/konsultasi', require('./konsultasi.routes'));
router.use('/janji-temu', require('./janji-temu.routes'));
router.use('/program', require('./program.routes'));
router.use('/second-opinion', require('./second-opinion.routes'));


module.exports = router;
