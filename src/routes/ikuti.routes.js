const router = require('express').Router();
const IkutiController = require('../controllers/ikuti.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);

router.post('/:pengguna_id', IkutiController.ikuti);
router.delete('/:pengguna_id', IkutiController.berhentiIkuti);
router.get('/pengikut', IkutiController.pengikut);
router.get('/mengikuti', IkutiController.mengikuti);
router.get('/:pengguna_id/status', IkutiController.status);

module.exports = router;
