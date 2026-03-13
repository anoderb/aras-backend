const router = require('express').Router();
const KesehatanController = require('../controllers/kesehatan.controller');
const validate = require('../middleware/validate.middleware');
const { logKesehatan } = require('../validations/kesehatan.validation');
const auth = require('../middleware/auth.middleware');

router.use(auth);

router.get('/harian', KesehatanController.riwayat);
router.post('/harian', validate(logKesehatan), KesehatanController.tambah);
router.get('/harian/grafik', KesehatanController.grafik);
router.get('/harian/ringkasan', KesehatanController.ringkasan);
router.get('/harian/ekspor', KesehatanController.ekspor);

router.get('/harian/:id', KesehatanController.detail);
router.put('/harian/:id', validate(logKesehatan), KesehatanController.update);
router.delete('/harian/:id', KesehatanController.hapus);

module.exports = router;
