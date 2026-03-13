const router = require('express').Router();
const SecondOpinionController = require('../controllers/second-opinion.controller');
const validate = require('../middleware/validate.middleware');
const { ajukanSecondOpinion, beriPendapat } = require('../validations/second-opinion.validation');
const auth = require('../middleware/auth.middleware');
const { isDokter } = require('../middleware/role.middleware');

router.use(auth);

// USER
router.get('/', SecondOpinionController.riwayat);
router.post('/', validate(ajukanSecondOpinion), SecondOpinionController.ajukan);
router.get('/:id', SecondOpinionController.detail);
router.put('/:id/batalkan', SecondOpinionController.batalkan);

// DOKTER
router.get('/dokter/antrian', isDokter, SecondOpinionController.antrianDokter);
router.post('/:id/pendapat', isDokter, validate(beriPendapat), SecondOpinionController.beriPendapat);
router.put('/:id/selesai', isDokter, SecondOpinionController.beriPendapat); // Alias or explicit endpoint

module.exports = router;
