const KronisService = require('../services/kronis.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class KronisController {
  async dashboard(req, res) {
    try {
      const data = await KronisService.dashboard(req.user.id);
      return res.status(200).json(berhasil('Dashboard kronis berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }
}

module.exports = new KronisController();
