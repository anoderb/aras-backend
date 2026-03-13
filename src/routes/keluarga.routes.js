const router = require('express').Router();
const KeluargaController = require('../controllers/keluarga.controller');
const validate = require('../middleware/validate.middleware');
const { tambahAnggota, updateAnggota } = require('../validations/keluarga.validation');
const auth = require('../middleware/auth.middleware');

router.use(auth);

router.get('/', KeluargaController.daftarAnggota);
router.post('/', validate(tambahAnggota), KeluargaController.tambahAnggota);
router.get('/:id', KeluargaController.detailAnggota);
router.put('/:id', validate(updateAnggota), KeluargaController.updateAnggota);
router.delete('/:id', KeluargaController.hapusAnggota);
router.get('/:id/kesehatan', KeluargaController.dataKesehatan);

module.exports = router;
