const router = require('express').Router();
const BadgeController = require('../controllers/badge.controller');
const auth = require('../middleware/auth.middleware');

// Kebanyakan endpoint badge bersifat publik untuk profil, namun /badge (milik sendiri) butuh auth
router.get('/tersedia', BadgeController.badgeTersedia);
router.get('/pengguna/:id', BadgeController.badgePengguna);

router.use(auth);
router.get('/', BadgeController.badgeSaya);

module.exports = router;
