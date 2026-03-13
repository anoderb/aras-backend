const router = require('express').Router();
const KesehatanController = require('../controllers/kesehatan.controller');
const validate = require('../middleware/validate.middleware');
const { logKesehatan } = require('../validations/kesehatan.validation');
const auth = require('../middleware/auth.middleware');

router.use(auth);

router.get('/', KesehatanController.riwayat);
router.post('/', validate(logKesehatan), KesehatanController.tambah);
router.get('/grafik', KesehatanController.grafik);
router.get('/ringkasan', KesehatanController.ringkasan);
router.get('/ekspor', KesehatanController.ekspor);

router.get('/:id', KesehatanController.detail);
router.put('/:id', validate(logKesehatan), KesehatanController.update);
router.delete('/:id', KesehatanController.hapus);

module.exports = router;
