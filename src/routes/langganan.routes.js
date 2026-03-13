const router = require('express').Router();
const LanggananController = require('../controllers/langganan.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);

router.get('/status', LanggananController.status);
router.post('/aktivasi', LanggananController.aktivasi);

module.exports = router;
