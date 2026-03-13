const express = require('express');
const router = express.Router();

// Import Routes
router.use('/auth', require('./auth.routes'));
router.use('/pengguna', require('./pengguna.routes'));
router.use('/keluarga', require('./keluarga.routes'));
router.use('/kesehatan', require('./kesehatan.routes'));
router.use('/nutrisi', require('./nutrisi.routes'));
router.use('/aktivitas', require('./aktivitas.routes'));


module.exports = router;
