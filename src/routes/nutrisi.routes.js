const router = require('express').Router();
const NutrisiController = require('../controllers/nutrisi.controller');
const validate = require('../middleware/validate.middleware');
const { logMakanan } = require('../validations/nutrisi.validation');
const auth = require('../middleware/auth.middleware');

// Public Endpoints
router.get('/cari', NutrisiController.cariMakanan);
router.get('/barcode/:kode', NutrisiController.cariBarcode);
router.get('/database-lokal', NutrisiController.databaseLokal);

// Protected Endpoints
router.use(auth);

router.get('/makanan', NutrisiController.riwayatMakanan);
router.post('/makanan', validate(logMakanan), NutrisiController.tambahMakanan);
router.get('/makanan/ringkasan', NutrisiController.ringkasanHarian);
router.get('/makanan/grafik', NutrisiController.grafik);

router.get('/makanan/:id', NutrisiController.detailMakanan);
router.put('/makanan/:id', validate(logMakanan), NutrisiController.updateMakanan);
router.delete('/makanan/:id', NutrisiController.hapusMakanan);

module.exports = router;
