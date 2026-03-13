const SecondOpinionService = require('../services/second-opinion.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class SecondOpinionController {
  // USER
  async riwayat(req, res) {
    try {
      const data = await SecondOpinionService.riwayatUser(req.user.id);
      berhasil(res, data, 'Riwayat second opinion berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async ajukan(req, res) {
    try {
      const data = await SecondOpinionService.ajukan(req.user.id, req.body);
      berhasil(res, data, 'Pengajuan second opinion berhasil dibuat', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async detail(req, res) {
    try {
      const data = await SecondOpinionService.detail(req.params.id, req.user.id, req.user.peran);
      berhasil(res, data, 'Detail second opinion berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  async batalkan(req, res) {
    try {
      await SecondOpinionService.batalkan(req.params.id, req.user.id);
      berhasil(res, null, 'Pengajuan telah dibatalkan');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  // DOKTER
  async antrianDokter(req, res) {
    try {
      const data = await SecondOpinionService.antrianDokter(req.user.id);
      berhasil(res, data, 'Antrian second opinion berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async beriPendapat(req, res) {
    try {
      await SecondOpinionService.beriPendapat(req.params.id, req.user.id, req.body.pendapat_dokter);
      berhasil(res, null, 'Pendapat dokter berhasil dikirim');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }
}

module.exports = new SecondOpinionController();
