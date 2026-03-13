const IkutiService = require('../services/ikuti.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class IkutiController {
  async ikuti(req, res) {
    try {
      await IkutiService.ikuti(req.user.id, req.params.pengguna_id);
      berhasil(res, null, 'Berhasil mengikuti pengguna');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async berhentiIkuti(req, res) {
    try {
      await IkutiService.berhentiIkuti(req.user.id, req.params.pengguna_id);
      berhasil(res, null, 'Berhasil berhenti mengikuti pengguna');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async pengikut(req, res) {
    try {
      const data = await IkutiService.daftarPengikut(req.user.id);
      berhasil(res, data, 'Daftar pengikut berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async mengikuti(req, res) {
    try {
      const data = await IkutiService.daftarMengikuti(req.user.id);
      berhasil(res, data, 'Daftar mengikuti berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async status(req, res) {
    try {
      const mengikuti = await IkutiService.cekStatus(req.user.id, req.params.pengguna_id);
      berhasil(res, { mengikuti }, 'Status mengikuti berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }
}

module.exports = new IkutiController();
