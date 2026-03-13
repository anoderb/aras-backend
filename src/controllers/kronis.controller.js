const KronisService = require('../services/kronis.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class KronisController {
  async dashboard(req, res) {
    try {
      const data = await KronisService.dashboard(req.user.id);
      berhasil(res, data, 'Dashboard kronis berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }
}

module.exports = new KronisController();
