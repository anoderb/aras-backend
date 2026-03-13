const SecondOpinionService = require('../services/second-opinion.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class SecondOpinionController {
  // USER
  async riwayat(req, res) {
    try {
      const data = await SecondOpinionService.riwayatUser(req.user.id);
      return res.status(200).json(berhasil('Riwayat second opinion berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async ajukan(req, res) {
    try {
      const data = await SecondOpinionService.ajukan(req.user.id, req.body);
      return res.status(201).json(berhasil('Pengajuan second opinion berhasil dibuat', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async detail(req, res) {
    try {
      const data = await SecondOpinionService.detail(req.params.id, req.user.id, req.user.peran);
      return res.status(200).json(berhasil('Detail second opinion berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  async batalkan(req, res) {
    try {
      // Small adjustment: updateStatus repo should handle this status
      await SecondOpinionService.batalkan(req.params.id, req.user.id);
      return res.status(200).json(berhasil('Pengajuan telah dibatalkan'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  // DOKTER
  async antrianDokter(req, res) {
    try {
      const data = await SecondOpinionService.antrianDokter(req.user.id);
      return res.status(200).json(berhasil('Antrian second opinion berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async beriPendapat(req, res) {
    try {
      await SecondOpinionService.beriPendapat(req.params.id, req.user.id, req.body.pendapat_dokter);
      return res.status(200).json(berhasil('Pendapat dokter berhasil dikirim'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }
}

module.exports = new SecondOpinionController();
