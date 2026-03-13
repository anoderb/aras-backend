const express = require('express');
const router = express.Router();

// Import Routes
router.use('/auth', require('./auth.routes'));
// router.use('/pengguna', require('./pengguna.routes'));
// ... dan seterusnya

module.exports = router;
