const JanjiTemuService = require('../services/janji_temu.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class JanjiTemuController {
  // USER
  async daftarJanji(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await JanjiTemuService.daftarJanjiUser(req.user.id, halaman, per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Daftar janji temu berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async buat(req, res) {
    try {
      const data = await JanjiTemuService.buatJanji(req.user.id, req.body);
      return res.status(201).json(berhasil('Janji temu berhasil dibuat', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async detail(req, res) {
    try {
      const data = await JanjiTemuService.detailJanji(req.params.id, req.user.id, req.user.peran);
      return res.status(200).json(berhasil('Detail janji temu berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  async batalkan(req, res) {
    try {
      await JanjiTemuService.batalkanJanji(req.params.id, req.user.id);
      return res.status(200).json(berhasil('Janji temu telah dibatalkan'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  // DOKTER
  async daftarJanjiDokter(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await JanjiTemuService.daftarJanjiDokter(req.user.id, halaman, per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Laporan janji temu dokter berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async konfirmasi(req, res) {
    try {
      await JanjiTemuService.konfirmasiJanji(req.params.id, req.user.id);
      return res.status(200).json(berhasil('Janji temu berhasil dikonfirmasi'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async reschedule(req, res) {
    try {
      await JanjiTemuService.rescheduleJanji(req.params.id, req.user.id, req.body);
      return res.status(200).json(berhasil('Janji temu berhasil di-reschedule'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }
}

module.exports = new JanjiTemuController();
