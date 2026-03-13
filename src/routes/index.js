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
router.use('/artikel', require('./artikel.routes'));
router.use('/diskusi', require('./diskusi.routes'));
router.use('/forum', require('./forum.routes'));
router.use('/ikuti', require('./ikuti.routes'));
router.use('/badge', require('./badge.routes'));
router.use('/notifikasi', require('./notifikasi.routes'));
router.use('/faskes', require('./faskes.routes'));
router.use('/sos', require('./sos.routes'));
router.use('/mental-health', require('./mental-health.routes'));
router.use('/kronis', require('./kronis.routes'));


module.exports = router;
