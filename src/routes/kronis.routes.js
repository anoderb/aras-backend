const router = require('express').Router();
const KronisController = require('../controllers/kronis.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);

router.get('/dashboard', KronisController.dashboard);

module.exports = router;
