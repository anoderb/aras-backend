const router = require('express').Router();
const PenggunaController = require('../controllers/pengguna.controller');
const validate = require('../middleware/validate.middleware');
const { updateProfil, gantiSandi } = require('../validations/pengguna.validation');
const upload = require('../middleware/upload.middleware');
const auth = require('../middleware/auth.middleware');

// Terapkan middleware auth untuk semua endpoint pengguna
router.use(auth);

router.get('/profil', PenggunaController.lihatProfil);
router.put('/profil', validate(updateProfil), PenggunaController.updateProfil);
router.put('/foto-profil', upload.single('foto'), PenggunaController.uploadFoto);
router.put('/ganti-sandi', validate(gantiSandi), PenggunaController.gantiSandi);
router.delete('/akun', PenggunaController.hapusAkun);
router.get('/dashboard', PenggunaController.dashboard);
router.get('/statistik', PenggunaController.statistik);

module.exports = router;
