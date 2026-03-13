const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { auth } = require('../middleware/auth.middleware');
const authValidation = require('../validations/auth.validation');

router.post('/daftar', validate(authValidation.daftarSchema), AuthController.daftar);
router.post('/masuk', validate(authValidation.masukSchema), AuthController.masuk);
router.post('/keluar', auth, AuthController.keluar);
router.post('/refresh-token', validate(authValidation.refreshTokenSchema), AuthController.refreshToken);
router.post('/lupa-sandi', validate(authValidation.lupaSandiSchema), AuthController.lupaSandi);
router.post('/reset-sandi', validate(authValidation.resetSandiSchema), AuthController.resetSandi);
router.post('/verifikasi-email', validate(authValidation.verifikasiEmailSchema), AuthController.verifikasiEmail);
router.post('/kirim-ulang-otp', validate(authValidation.kirimUlangOtpSchema), AuthController.kirimUlangOtp);
router.post('/verifikasi-otp', validate(authValidation.verifikasiOtpSchema), AuthController.verifikasiOtp);

module.exports = router;
