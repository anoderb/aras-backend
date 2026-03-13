const router = require('express').Router();
const DokterController = require('../controllers/dokter.controller');
const validate = require('../middleware/validate.middleware');
const { updateProfilDokter, setKetersediaan, verifikasiDokter } = require('../validations/dokter.validation');
const auth = require('../middleware/auth.middleware');
const { isDokter, isAdmin } = require('../middleware/role.middleware');

// Publik
router.get('/', DokterController.daftarDokter);
router.get('/spesialisasi', DokterController.daftarSpesialisasi);
router.get('/terdekat', DokterController.dokterTerdekat);
router.get('/:id', DokterController.profilPublik);

// Login Required (Dokter)
router.get('/saya/profil', auth, isDokter, DokterController.lihatProfil);
router.put('/saya/profil', auth, isDokter, validate(updateProfilDokter), DokterController.updateProfil);
router.put('/saya/ketersediaan', auth, isDokter, validate(setKetersediaan), DokterController.setKetersediaan);
router.get('/saya/statistik', auth, isDokter, DokterController.statistik);

// Login Required (Admin)
router.get('/verifikasi/antrian', auth, isAdmin, DokterController.antrianVerifikasi);
router.put('/verifikasi/:id/setujui', auth, isAdmin, DokterController.setujuiVerifikasi);
router.put('/verifikasi/:id/tolak', auth, isAdmin, DokterController.tolakVerifikasi);

module.exports = router;
