const router = require('express').Router();
const FaskesController = require('../controllers/faskes.controller');

router.get('/terdekat', FaskesController.terdekat);
router.get('/cari', FaskesController.cari);
router.get('/geocode', FaskesController.geocode);
router.get('/reverse', FaskesController.reverse);

module.exports = router;
