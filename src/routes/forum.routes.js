const router = require('express').Router();
const ForumController = require('../controllers/forum.controller');
const validate = require('../middleware/validate.middleware');
const { buatPertanyaan, buatJawaban } = require('../validations/forum.validation');
const auth = require('../middleware/auth.middleware');

// Publik
router.get('/', ForumController.daftar);
router.get('/:id', ForumController.detail);

// Login Required
router.use(auth);
router.post('/', validate(buatPertanyaan), ForumController.buat);
router.put('/:id', validate(buatPertanyaan), ForumController.edit);
router.delete('/:id', ForumController.hapus);

router.post('/:id/jawaban', validate(buatJawaban), ForumController.tambahJawaban);
router.delete('/:id/jawaban/:jawaban_id', ForumController.hapusJawaban);
router.put('/:id/jawaban/:jawaban_id/terbaik', ForumController.setTerbaik);
router.post('/:id/jawaban/:jawaban_id/suka', ForumController.sukaJawaban);

module.exports = router;
