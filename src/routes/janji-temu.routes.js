const router = require('express').Router();
const JanjiTemuController = require('../controllers/janji_temu.controller');
const validate = require('../middleware/validate.middleware');
const { buatJanji, konfirmasiJanji, rescheduleJanji } = require('../validations/janji_temu.validation');
const auth = require('../middleware/auth.middleware');
const { isDokter } = require('../middleware/role.middleware');

router.use(auth);

// USER
router.get('/', JanjiTemuController.daftarJanji);
router.post('/', validate(buatJanji), JanjiTemuController.buat);
router.get('/:id', JanjiTemuController.detail);
router.put('/:id/batalkan', JanjiTemuController.batalkan);

// DOKTER
router.get('/dokter', isDokter, JanjiTemuController.daftarJanjiDokter);
router.put('/:id/konfirmasi', isDokter, validate(konfirmasiJanji), JanjiTemuController.konfirmasi);
router.put('/:id/reschedule', isDokter, validate(rescheduleJanji), JanjiTemuController.reschedule);

module.exports = router;
