const router = require('express').Router();
const ArtikelController = require('../controllers/artikel.controller');
const validate = require('../middleware/validate.middleware');
const { buatArtikel, updateArtikel } = require('../validations/artikel.validation');
const auth = require('../middleware/auth.middleware');
const { isDokter } = require('../middleware/role.middleware');

// Publik
router.get('/', ArtikelController.feed);
router.get('/populer', ArtikelController.populer);
router.get('/:id', ArtikelController.detail);

// User
router.post('/:id/simpan', auth, ArtikelController.simpan);
router.delete('/:id/simpan', auth, ArtikelController.hapusSimpan);
router.get('/tersimpan', auth, ArtikelController.tersimpan);

// Dokter
router.get('/saya', auth, isDokter, ArtikelController.saya);
router.post('/saya', auth, isDokter, validate(buatArtikel), ArtikelController.buat);
router.get('/saya/:id', auth, isDokter, ArtikelController.detail);
router.put('/saya/:id', auth, isDokter, validate(updateArtikel), ArtikelController.update);
router.delete('/saya/:id', auth, isDokter, ArtikelController.hapus);

module.exports = router;
