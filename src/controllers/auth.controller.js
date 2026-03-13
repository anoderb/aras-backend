const AuthService = require('../services/auth.service');
const { berhasil, gagal } = require('../helpers/response.helper');

const AuthController = {
  daftar: async (req, res, next) => {
    try {
      const result = await AuthService.daftar(req.body);
      berhasil(res, result, 'Registrasi berhasil', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  },

  masuk: async (req, res, next) => {
    try {
      const result = await AuthService.masuk(req.body);
      berhasil(res, result, 'Login berhasil', 200);
    } catch (error) {
      gagal(res, error.message, 401);
    }
  },

  keluar: async (req, res, next) => {
    try {
      await AuthService.keluar(req.user.id);
      berhasil(res, null, 'Berhasil keluar (logout)', 200);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refresh_token } = req.body;
      const tokens = await AuthService.refreshToken(refresh_token);
      berhasil(res, tokens, 'Token berhasil diperbarui', 200);
    } catch (error) {
      gagal(res, error.message, 401);
    }
  },

  lupaSandi: async (req, res, next) => {
    try {
      const result = await AuthService.lupaSandi(req.body.email);
      berhasil(res, null, result.pesan, 200);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  },

  resetSandi: async (req, res, next) => {
    try {
      const result = await AuthService.resetSandi(req.body);
      berhasil(res, result, 'Sandi berhasil direset', 200);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  },

  verifikasiEmail: async (req, res, next) => {
    try {
      await AuthService.verifikasiEmail(req.body.token);
      berhasil(res, null, 'Email berhasil diverifikasi (SIMULASI)', 200);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  },

  kirimUlangOtp: async (req, res, next) => {
    try {
      const { email, tipe } = req.body;
      const result = await AuthService.kirimUlangOtp(email, tipe);
      berhasil(res, null, result.pesan, 200);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  },

  verifikasiOtp: async (req, res, next) => {
    try {
      const { email, otp } = req.body;
      await AuthService.verifikasiOtp(email, otp);
      berhasil(res, null, 'OTP berhasil diverifikasi (SIMULASI)', 200);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }
};

module.exports = AuthController;
