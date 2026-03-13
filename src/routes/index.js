const express = require('express');
const router = express.Router();

// Import Routes
router.use('/auth', require('./auth.routes'));
router.use('/pengguna', require('./pengguna.routes'));
router.use('/keluarga', require('./keluarga.routes'));


module.exports = router;
