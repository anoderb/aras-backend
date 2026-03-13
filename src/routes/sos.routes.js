const router = require('express').Router();
const SOSController = require('../controllers/sos.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);

router.post('/aktifkan', SOSController.aktifkan);
router.get('/rs-terdekat', SOSController.rsTerdekat);
router.post('/notif-kontak-darurat', SOSController.notifKontak);
router.get('/ringkasan-kesehatan', SOSController.ringkasan);
router.put('/nonaktifkan', SOSController.nonaktifkan);

module.exports = router;
