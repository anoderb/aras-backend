const AktivitasService = require('../services/aktivitas.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class AktivitasController {
  async riwayat(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await AktivitasService.riwayat(req.user.id, halaman, per_halaman);
      berhasil(res, data, 'Riwayat aktivitas berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async tambah(req, res) {
    try {
      await AktivitasService.tambah(req.user.id, req.body);
      berhasil(res, null, 'Log aktivitas berhasil disimpan', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async detail(req, res) {
    try {
      const data = await AktivitasService.detail(req.user.id, req.params.id);
      berhasil(res, data, 'Detail aktivitas berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  async update(req, res) {
    try {
      const data = await AktivitasService.update(req.user.id, req.params.id, req.body);
      berhasil(res, data, 'Log aktivitas berhasil diperbarui');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async hapus(req, res) {
    try {
      await AktivitasService.hapus(req.user.id, req.params.id);
      berhasil(res, null, 'Log aktivitas berhasil dihapus');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async ringkasan(req, res) {
    try {
      const data = await AktivitasService.ringkasan(req.user.id);
      berhasil(res, data, 'Ringkasan aktivitas harian berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }
}

module.exports = new AktivitasController();
