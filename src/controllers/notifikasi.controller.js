const NotifikasiService = require('../services/notifikasi.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class NotifikasiController {
  async daftar(req, res) {
    try {
      const data = await NotifikasiService.ambilDaftarNotifikasi(req.user.id);
      berhasil(res, data, 'Daftar notifikasi berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async belumDibaca(req, res) {
    try {
      const total = await NotifikasiService.hitungBelumDibaca(req.user.id);
      berhasil(res, { total }, 'Jumlah notifikasi belum dibaca berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async baca(req, res) {
    try {
      await NotifikasiService.tandaiDibaca(req.params.id, req.user.id);
      berhasil(res, null, 'Notifikasi ditandai sebagai dibaca');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async bacaSemua(req, res) {
    try {
      await NotifikasiService.tandaiSemuaDibaca(req.user.id);
      berhasil(res, null, 'Semua notifikasi ditandai sebagai dibaca');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async hapus(req, res) {
    try {
      await NotifikasiService.hapusNotifikasi(req.params.id, req.user.id);
      berhasil(res, null, 'Notifikasi berhasil dihapus');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }
}

module.exports = new NotifikasiController();
