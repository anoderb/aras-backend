const KesehatanService = require('../services/kesehatan.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class KesehatanController {
  async riwayat(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await KesehatanService.riwayat(req.user.id, halaman, per_halaman);
      berhasil(res, data, 'Riwayat kesehatan berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async tambah(req, res) {
    try {
      await KesehatanService.tambah(req.user.id, req.body);
      berhasil(res, null, 'Catatan kesehatan berhasil disimpan', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async detail(req, res) {
    try {
      const data = await KesehatanService.detail(req.user.id, req.params.id);
      berhasil(res, data, 'Detail catatan kesehatan berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  async update(req, res) {
    try {
      const data = await KesehatanService.update(req.user.id, req.params.id, req.body);
      berhasil(res, data, 'Catatan kesehatan berhasil diperbarui');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async hapus(req, res) {
    try {
      await KesehatanService.hapus(req.user.id, req.params.id);
      berhasil(res, null, 'Catatan kesehatan berhasil dihapus');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async grafik(req, res) {
    try {
      const rentang = req.query.rentang || 'minggu';
      const data = await KesehatanService.grafik(req.user.id, rentang);
      berhasil(res, data, 'Grafik kesehatan berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async ringkasan(req, res) {
    try {
      const rentang = req.query.rentang || 'minggu';
      const data = await KesehatanService.ringkasan(req.user.id, rentang);
      berhasil(res, data, 'Ringkasan kesehatan berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async ekspor(req, res) {
    try {
      const data = await KesehatanService.ekspor(req.user.id);
      berhasil(res, data, 'Berhasil mengenerate laporan kesehatan');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }
}

module.exports = new KesehatanController();
