const router = require('express').Router();
const ObatController = require('../controllers/obat.controller');
const validate = require('../middleware/validate.middleware');
const { logObat, logMinum } = require('../validations/obat.validation');
const auth = require('../middleware/auth.middleware');

// Publik
router.get('/cari', ObatController.cariObat);
router.get('/barcode/:kode', ObatController.cariBarcode);

// Protected
router.use(auth);

router.get('/', ObatController.daftarAktif);
router.post('/', validate(logObat), ObatController.tambah);
router.get('/riwayat', ObatController.riwayat);
router.get('/interaksi', ObatController.cekInteraksi);

router.get('/:id', ObatController.detail);
router.put('/:id', validate(logObat), ObatController.update);
router.delete('/:id', ObatController.hapus);
router.put('/:id/nonaktifkan', ObatController.nonaktifkan);
router.post('/:id/log-minum', validate(logMinum), ObatController.logMinum);
router.get('/:id/kepatuhan', ObatController.statistikKepatuhan);

module.exports = router;
