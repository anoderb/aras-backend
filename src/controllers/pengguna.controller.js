const PenggunaService = require('../services/pengguna.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class PenggunaController {
  async lihatProfil(req, res) {
    try {
      const user = await PenggunaService.getProfil(req.user.id);
      berhasil(res, user, 'Data profil berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  async updateProfil(req, res) {
    try {
      const updatedUser = await PenggunaService.updateProfil(req.user.id, req.body);
      berhasil(res, updatedUser, 'Profil berhasil diperbarui');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async uploadFoto(req, res) {
    try {
      if (!req.file) {
        return gagal(res, 'File foto wajib diunggah', 400);
      }
      const data = await PenggunaService.uploadFotoProfil(req.user.id, req.file);
      berhasil(res, data, 'Foto profil berhasil diunggah');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async gantiSandi(req, res) {
    try {
      const { sandi_lama, sandi_baru } = req.body;
      await PenggunaService.gantiSandi(req.user.id, sandi_lama, sandi_baru);
      berhasil(res, null, 'Kata sandi berhasil diubah');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async hapusAkun(req, res) {
    try {
      await PenggunaService.hapusAkun(req.user.id);
      berhasil(res, null, 'Akun berhasil dinonaktifkan');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async dashboard(req, res) {
    try {
      const data = await PenggunaService.getDashboard(req.user.id);
      berhasil(res, data, 'Data dashboard berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async statistik(req, res) {
    try {
      const data = await PenggunaService.getStatistik(req.user.id);
      berhasil(res, data, 'Data statistik berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }
}

module.exports = new PenggunaController();
