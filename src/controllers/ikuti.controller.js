const IkutiService = require('../services/ikuti.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class IkutiController {
  async ikuti(req, res) {
    try {
      await IkutiService.ikuti(req.user.id, req.params.pengguna_id);
      return res.status(200).json(berhasil('Berhasil mengikuti pengguna'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async berhentiIkuti(req, res) {
    try {
      await IkutiService.berhentiIkuti(req.user.id, req.params.pengguna_id);
      return res.status(200).json(berhasil('Berhasil berhenti mengikuti pengguna'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async pengikut(req, res) {
    try {
      const data = await IkutiService.daftarPengikut(req.user.id);
      return res.status(200).json(berhasil('Daftar pengikut berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async mengikuti(req, res) {
    try {
      const data = await IkutiService.daftarMengikuti(req.user.id);
      return res.status(200).json(berhasil('Daftar mengikuti berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async status(req, res) {
    try {
      const mengikuti = await IkutiService.cekStatus(req.user.id, req.params.pengguna_id);
      return res.status(200).json(berhasil('Status mengikuti berhasil diambil', { mengikuti }));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }
}

module.exports = new IkutiController();
