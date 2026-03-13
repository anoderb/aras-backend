const BadgeService = require('../services/badge.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class BadgeController {
  async badgeSaya(req, res) {
    try {
      const data = await BadgeService.badgeSaya(req.user.id);
      return res.status(200).json(berhasil('Daftar badge saya berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async badgeTersedia(req, res) {
    try {
      const data = await BadgeService.badgeTersedia();
      return res.status(200).json(berhasil('Daftar badge tersedia berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async badgePengguna(req, res) {
    try {
      const data = await BadgeService.badgePenggunaLain(req.params.id);
      return res.status(200).json(berhasil('Daftar badge pengguna berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }
}

module.exports = new BadgeController();
