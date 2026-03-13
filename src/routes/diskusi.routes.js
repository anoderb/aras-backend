const router = require('express').Router();
const DiskusiController = require('../controllers/diskusi.controller');
const validate = require('../middleware/validate.middleware');
const { buatPost, buatKomentar, buatLaporan } = require('../validations/diskusi.validation');
const auth = require('../middleware/auth.middleware');
const { isDokter } = require('../middleware/role.middleware');

// Publik
router.get('/', DiskusiController.feed);
router.get('/:id', DiskusiController.detail);

// User Login
router.use(auth);
router.post('/', validate(buatPost), DiskusiController.buat);
router.put('/:id', validate(buatPost), DiskusiController.edit);
router.delete('/:id', DiskusiController.hapus);

router.post('/:id/suka', DiskusiController.sukaPost);
router.post('/:id/lapor', validate(buatLaporan), DiskusiController.laporPost);

router.post('/:id/komentar', validate(buatKomentar), DiskusiController.tambahKomentar);
router.delete('/:id/komentar/:komentar_id', DiskusiController.hapusKomentar);

// Moderasi Dokter
router.put('/:id/pin-koreksi', isDokter, DiskusiController.pinKoreksi);
router.put('/:id/sembunyikan', isDokter, DiskusiController.sembunyikanPost);

module.exports = router;
