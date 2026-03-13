const PenggunaService = require('../services/pengguna.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class PenggunaController {
  async lihatProfil(req, res) {
    try {
      const user = await PenggunaService.getProfil(req.user.id);
      return res.status(200).json(berhasil('Data profil berhasil diambil', user));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  async updateProfil(req, res) {
    try {
      const updatedUser = await PenggunaService.updateProfil(req.user.id, req.body);
      return res.status(200).json(berhasil('Profil berhasil diperbarui', updatedUser));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async uploadFoto(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json(gagal('File foto wajib diunggah'));
      }
      const data = await PenggunaService.uploadFotoProfil(req.user.id, req.file);
      return res.status(200).json(berhasil('Foto profil berhasil diunggah', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async gantiSandi(req, res) {
    try {
      const { sandi_lama, sandi_baru } = req.body;
      await PenggunaService.gantiSandi(req.user.id, sandi_lama, sandi_baru);
      return res.status(200).json(berhasil('Kata sandi berhasil diubah'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async hapusAkun(req, res) {
    try {
      await PenggunaService.hapusAkun(req.user.id);
      return res.status(200).json(berhasil('Akun berhasil dinonaktifkan'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async dashboard(req, res) {
    try {
      const data = await PenggunaService.getDashboard(req.user.id);
      return res.status(200).json(berhasil('Data dashboard berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async statistik(req, res) {
    try {
      const data = await PenggunaService.getStatistik(req.user.id);
      return res.status(200).json(berhasil('Data statistik berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }
}

module.exports = new PenggunaController();
