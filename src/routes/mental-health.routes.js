const router = require('express').Router();
const MentalHealthController = require('../controllers/mental-health.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);

router.get('/skrining/soal', MentalHealthController.soalSkrining);
router.post('/skrining/hasil', MentalHealthController.simpanHasil);
router.get('/mood/statistik', MentalHealthController.statistikMood);

module.exports = router;
