const router = require('express').Router();
const NotifikasiController = require('../controllers/notifikasi.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);

router.get('/', NotifikasiController.daftar);
router.get('/belum-dibaca', NotifikasiController.belumDibaca);
router.put('/baca-semua', NotifikasiController.bacaSemua);
router.put('/:id/baca', NotifikasiController.baca);
router.delete('/:id', NotifikasiController.hapus);

module.exports = router;
