const router = require('express').Router();
const KonsultasiController = require('../controllers/konsultasi.controller');
const validate = require('../middleware/validate.middleware');
const { mulaiKonsultasi, beriRating, kirimPesan, tambahCatatan } = require('../validations/konsultasi.validation');
const auth = require('../middleware/auth.middleware');
const { isDokter } = require('../middleware/role.middleware');

router.use(auth);

// USER
router.get('/', KonsultasiController.riwayat);
router.post('/', validate(mulaiKonsultasi), KonsultasiController.mulai);
router.get('/:id', KonsultasiController.detail);
router.put('/:id/selesai', KonsultasiController.selesai);
router.put('/:id/batalkan', KonsultasiController.batalkan);
router.post('/:id/rating', validate(beriRating), KonsultasiController.beriRating);

// PESAN
router.get('/:id/pesan', KonsultasiController.ambilPesan);
router.post('/:id/pesan', validate(kirimPesan), KonsultasiController.kirimPesan);
router.put('/:id/pesan/baca', KonsultasiController.tandaiBaca);

// DOKTER
router.get('/dokter/aktif', isDokter, KonsultasiController.konsultasiAktif);
router.get('/dokter/antrian', isDokter, KonsultasiController.antrian);
router.put('/:id/terima', isDokter, KonsultasiController.terima);
router.post('/:id/catatan', isDokter, validate(tambahCatatan), KonsultasiController.tambahCatatan);

module.exports = router;
