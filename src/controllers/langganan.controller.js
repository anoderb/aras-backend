const LanggananService = require('../services/langganan.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class LanggananController {
  async status(req, res) {
    try {
      const data = await LanggananService.cekStatus(req.user.id);
      return res.status(200).json(berhasil('Status langganan berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async aktivasi(req, res) {
    try {
      await LanggananService.aktivasiPenuh(req.user.id);
      return res.status(200).json(berhasil('Aktivasi langganan berhasil (Promo Launching)'));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }
}

module.exports = new LanggananController();
