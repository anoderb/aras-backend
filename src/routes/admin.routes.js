const router = require('express').Router();
const AdminController = require('../controllers/admin.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

router.use(auth, role.isAdmin);

// Dashboard
router.get('/dashboard', AdminController.dashboard);

// Kelola Pengguna
router.get('/pengguna', AdminController.daftarPengguna);
router.put('/pengguna/:id/suspend', AdminController.suspendAkun);
router.put('/pengguna/:id/aktifkan', AdminController.aktifkanAkun);

// Verifikasi Dokter
router.get('/verifikasi/antrian', AdminController.antrianVerifikasi);
router.put('/verifikasi/:id/setujui', AdminController.setujui);
router.put('/verifikasi/:id/tolak', AdminController.tolak);

// Moderasi Konten
router.get('/moderasi/laporan', AdminController.daftarLaporan);
router.put('/moderasi/:id/tindak', AdminController.tindakLaporan);

module.exports = router;
