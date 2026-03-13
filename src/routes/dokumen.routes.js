const router = require('express').Router();
const DokumenController = require('../controllers/dokumen.controller');
const validate = require('../middleware/validate.middleware');
const { logDokumen, updateDokumen } = require('../validations/dokumen.validation');
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.use(auth);

router.get('/', DokumenController.daftar);
router.post('/', upload.single('file'), validate(logDokumen), DokumenController.upload);
router.get('/hasil-lab', DokumenController.filterHasilLab);
router.get('/resep', DokumenController.filterResep);

router.get('/:id', DokumenController.detail);
router.put('/:id', validate(updateDokumen), DokumenController.update);
router.delete('/:id', DokumenController.hapus);
router.post('/:id/bagikan/:dokter_id', DokumenController.bagikan);

module.exports = router;
