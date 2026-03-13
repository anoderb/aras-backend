const NotifikasiService = require('../services/notifikasi.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class NotifikasiController {
  async daftar(req, res) {
    try {
      const data = await NotifikasiService.daftarNotifikasi(req.user.id);
      return res.status(200).json(berhasil('Daftar notifikasi berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async belumDibaca(req, res) {
    try {
      const total = await NotifikasiService.jumlahBelumDibaca(req.user.id);
      return res.status(200).json(berhasil('Jumlah notifikasi belum dibaca berhasil diambil', { total }));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async baca(req, res) {
    try {
      await NotifikasiService.bacaNotifikasi(req.params.id, req.user.id);
      return res.status(200).json(berhasil('Notifikasi ditandai sebagai dibaca'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async bacaSemua(req, res) {
    try {
      await NotifikasiService.bacaSemua(req.user.id);
      return res.status(200).json(berhasil('Semua notifikasi ditandai sebagai dibaca'));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async hapus(req, res) {
    try {
      await NotifikasiService.hapusNotifikasi(req.params.id, req.user.id);
      return res.status(200).json(berhasil('Notifikasi berhasil dihapus'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }
}

module.exports = new NotifikasiController();
