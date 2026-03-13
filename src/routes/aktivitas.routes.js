const router = require('express').Router();
const AktivitasController = require('../controllers/aktivitas.controller');
const validate = require('../middleware/validate.middleware');
const { logAktivitas } = require('../validations/aktivitas.validation');
const auth = require('../middleware/auth.middleware');

router.use(auth);

router.get('/', AktivitasController.riwayat);
router.post('/', validate(logAktivitas), AktivitasController.tambah);
router.get('/ringkasan', AktivitasController.ringkasan);
router.get('/:id', AktivitasController.detail);
router.put('/:id', validate(logAktivitas), AktivitasController.update);
router.delete('/:id', AktivitasController.hapus);

module.exports = router;
