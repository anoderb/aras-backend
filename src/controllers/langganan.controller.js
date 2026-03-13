const LanggananService = require('../services/langganan.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class LanggananController {
  async status(req, res) {
    try {
      const data = await LanggananService.cekStatus(req.user.id);
      berhasil(res, data, 'Status langganan berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async aktivasi(req, res) {
    try {
      await LanggananService.aktivasiPenuh(req.user.id);
      berhasil(res, null, 'Aktivasi langganan berhasil (Promo Launching)');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }
}

module.exports = new LanggananController();
