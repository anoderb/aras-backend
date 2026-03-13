const JanjiTemuService = require('../services/janji_temu.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class JanjiTemuController {
  // USER
  async daftarJanji(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await JanjiTemuService.daftarJanjiUser(req.user.id, halaman, per_halaman);
      berhasil(res, data, 'Daftar janji temu berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async buat(req, res) {
    try {
      const data = await JanjiTemuService.buatJanji(req.user.id, req.body);
      berhasil(res, data, 'Janji temu berhasil dibuat', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async detail(req, res) {
    try {
      const data = await JanjiTemuService.detailJanji(req.params.id, req.user.id, req.user.peran);
      berhasil(res, data, 'Detail janji temu berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  async batalkan(req, res) {
    try {
      await JanjiTemuService.batalkanJanji(req.params.id, req.user.id);
      berhasil(res, null, 'Janji temu telah dibatalkan');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  // DOKTER
  async daftarJanjiDokter(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await JanjiTemuService.daftarJanjiDokter(req.user.id, halaman, per_halaman);
      berhasil(res, data, 'Laporan janji temu dokter berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async konfirmasi(req, res) {
    try {
      await JanjiTemuService.konfirmasiJanji(req.params.id, req.user.id);
      berhasil(res, null, 'Janji temu berhasil dikonfirmasi');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async reschedule(req, res) {
    try {
      await JanjiTemuService.rescheduleJanji(req.params.id, req.user.id, req.body);
      berhasil(res, null, 'Janji temu berhasil di-reschedule');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }
}

module.exports = new JanjiTemuController();
