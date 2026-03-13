const BadgeService = require('../services/badge.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class BadgeController {
  async badgeSaya(req, res) {
    try {
      const data = await BadgeService.badgeSaya(req.user.id);
      berhasil(res, data, 'Daftar badge saya berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async badgeTersedia(req, res) {
    try {
      const data = await BadgeService.badgeTersedia();
      berhasil(res, data, 'Daftar badge tersedia berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async badgePengguna(req, res) {
    try {
      const data = await BadgeService.badgePenggunaLain(req.params.id);
      berhasil(res, data, 'Daftar badge pengguna berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }
}

module.exports = new BadgeController();
